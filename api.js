import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Record from "./models/record.js";
import express from "express";
import Currency from "./models/currency.js";
import Bank from "./models/bank.js";
import sendEmail from "./pages/sendEmail.js";

dotenv.config();
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

//Check connection
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//Get all records from the last 24 hours
app.get("/api/all-records", (req, res) => {
  const page = req.query.page;
  const perPage = req.query.perPage;
  let date = req.query.date;
  Record.find()
    .then((result) => {
      if (!date) date = new Date();
      else date = new Date(+new Date(date) + 1000 * 60 * 60 * 24 - 1); //so it's the end of the day
      const data = result.filter(
        (record) =>
          +record.createdAt - +date + 1000 * 60 * 60 * 24 > 0 &&
          record.createdAt < date
      );
      if (page && perPage) {
        const newData = data.slice(page * perPage - perPage, page * perPage);
        const totalPages = Math.ceil(data.length / perPage);
        res.send({
          totalPages: totalPages,
          page: parseInt(page),
          numberOfElements: data.length,
          perPage: parseInt(perPage),
          results: newData,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//Get all records from a specific bank from a period of time
app.get("/api/all-records/:id", (req, res) => {
  const id = req.params.id;
  let date = req.query.date;
  const page = req.query.page;
  const perPage = req.query.perPage;
  Record.find({ bankId: id })
    .then((result) => {
      if (id) {
        if (!date) date = new Date();
        else date = new Date(+new Date(date) + 1000 * 60 * 60 * 24 - 1); //so it's the end of the day
        const data = result.filter(
          (record) => +record.createdAt - +date + 1000 * 60 * 60 * 24 > 0
        );
        if (page && perPage) {
          const newData = data.slice(page * perPage - perPage, page * perPage);
          const totalPages = Math.ceil(data.length / perPage);
          res.send({
            totalPages: totalPages,
            page: parseInt(page),
            numberOfElements: data.length,
            perPage: parseInt(perPage),
            results: newData,
          });
        } else {
          res.send(data);
        }
      } else {
        res
          .status(400)
          .send("Please add the required parameters: the id of the bank");
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});
//Get all currencies info
app.get("/api/get-currencies", (req, res) => {
  const page = req.query.page;
  const perPage = req.query.perPage;
  Currency.find()
    .then((result) => {
      if (page && perPage) {
        const data = result.map((e) => {
          return {
            _id: e._id,
            currency: e.currency,
            name: e.name,
          };
        });
        const newData = data.slice(page * perPage - perPage, page * perPage);
        const totalPages = Math.ceil(data.length / perPage);
        res.send({
          totalPages: totalPages,
          page: parseInt(page),
          numberOfElements: data.length,
          perPage: parseInt(perPage),
          results: newData,
        });
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

//Get specific currency info
app.get("/api/get-currencies/:id", (req, res) => {
  const currencyId = req.params.id;
  if (!currencyId) {
    res.status(400).send("Specify the id of the currency");
    return;
  }
  Currency.findOne({ _id: currencyId })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

//Get all banks details
app.get("/api/get-banks", (req, res) => {
  const page = req.query.page;
  const perPage = req.query.perPage;
  Bank.find()
    .then((result) => {
      if (page && perPage) {
        const newData = result.slice(page * perPage - perPage, page * perPage);
        const totalPages = Math.ceil(result.length / perPage);
        res.send({
          totalPages: totalPages,
          numberOfElements: result.length,
          page: parseInt(page),
          perPage: parseInt(perPage),
          results: newData,
        });
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

//Get specific bank details
app.get("/api/get-banks/:id", (req, res) => {
  const bankId = req.params.id;
  if (!bankId) {
    res.status(400).send("Specify the id of the bank");
    return;
  }
  Bank.findOne({ _id: bankId })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

// Send an email

app.post("/api/contact", async (req, res) => {
  const subject = req.body.subject;
  const text = req.body.text;
  const from = req.body.from;

  console.log("=>>", subject, text, from);

  if (subject && text && from) {
    console.log("111");
    await sendEmail({ subject, text, from }).catch((e) => console.log(e));
    console.log("222");
    res.sendStatus(200);
    return;
  }
  console.log("333");
  res.status(400).send("Add all params");
});
const PORT = process.env.PORT || 4000;

//Listening on the PORT variable and then console logging the port

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

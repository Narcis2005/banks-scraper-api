import puppeteer from "puppeteer";
import tiranabank from "./pages/tiranabank.js";
import alphabank from "./pages/alphabank.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import abi from "./pages/abi.js";
import bankacredins from "./pages/bankacredins.js";
import fibank from "./pages/fibank.js";
import intesasanpaolobank from "./pages/intesasanpaolobank.js";
import procreditbank from "./pages/procreditbank.js";
import raiffeisen from "./pages/raiffeisen.js";
import otpbank from "./pages/otpbank.js";
import uba from "./pages/uba.js";
import bkt from "./pages/bkt.js";
import bankofalbania from "./pages/bankofalbania.js";
import unionbank from "./pages/unionbank.js";
import sendEmail from "./pages/sendEmail.js";
dotenv.config();
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const launchBot = async () => {
  const emailText = (text) => {
    return {
      text: text,
      to: "rotaru1221@gmail.com",
      subject: "Error found on web scrapper",
    };
  };
  const currentDate = new Date();
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await tiranabank(page, currentDate).catch(
    async (error) =>
     await sendEmail(emailText(error)).catch((err) => console.log(err))
  );

  //Website unavailable

  // await alphabank(page, currentDate).catch(
  //   async (error) => await sendEmail(emailText(error)).catch(err => console.log(err))
  // );
  //test
  await abi(page, currentDate).catch(
    async (error) =>
      await sendEmail(emailText(error)).catch((err) => console.log(err))
  );
  await bankacredins(page, currentDate).catch(
    async (error) =>
      await sendEmail(emailText(error)).catch((err) => console.log(err))
  );
  await fibank(page, currentDate).catch(
    async (error) =>
      await sendEmail(emailText(error)).catch((err) => console.log(err))
  );
  await intesasanpaolobank(page, currentDate).catch(
    async (error) =>
      await sendEmail(emailText(error)).catch((err) => console.log(err))
  );
  await procreditbank(page, currentDate).catch(
    async (error) =>
      await sendEmail(emailText(error)).catch((err) => console.log(err))
  );
  await raiffeisen(page, currentDate).catch(
    async (error) =>
      await sendEmail(emailText(error)).catch((err) => console.log(err))
  );
  await otpbank(page, currentDate).catch(
    async (error) =>
      await sendEmail(emailText(error)).catch((err) => console.log(err))
  );
  await uba(page, currentDate).catch(
    async (error) =>
      await sendEmail(emailText(error)).catch((err) => console.log(err))
  );
  await bkt(page, currentDate).catch(
    async (error) =>
      await sendEmail(emailText(error)).catch((err) => console.log(err))
  );
  await bankofalbania(page, currentDate).catch(
    async (error) =>
      await sendEmail(emailText(error)).catch((err) => console.log(err))
  );
  await unionbank(page, currentDate).catch(
    async (error) =>
      await sendEmail(emailText(error)).catch((err) => console.log(err))
  );

  await browser.close();

  return;
};

setInterval(launchBot, 1000 * 60 * 10);
// launchBot();

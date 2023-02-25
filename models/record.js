import mongoose from "mongoose";

const recordSchema = mongoose.Schema({
  bankId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  values: [
    {
      code: {
        type: String,
      },
      buy: {
        type: Number,
      },
      sell: {
        type: Number,
      },
      difference: {
        type: Number,
      },
    },
  ],
});

const Record = mongoose.model("record", recordSchema);
export default Record;

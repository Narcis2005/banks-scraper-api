import mongoose from "mongoose";

const bankSchema = mongoose.Schema({
  name: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    postal_code: {
      type: String,
    },
    sector: {
      type: String,
    },
    number: {
      type: String,
    },
  },
  contact_details: {
    tel: {
      type: String,
    },
    fax: {
      type: String,
    },

    mail: {
      type: String,
    },
    website: {
      type: String,
    },
    SWIFT: {
      type: String,
    },
  },
  working_hours: {
    monday: {
      type: String,
    },
    tuesday: {
      type: String,
    },
    wednesday: {
      type: String,
    },
    thursday: {
      type: String,
    },
    friday: {
      type: String,
    },
    saturday: {
      type: String,
    },
    sunday: {
      type: String,
    },
  },
});

const Bank = mongoose.model("bank", bankSchema);
export default Bank;

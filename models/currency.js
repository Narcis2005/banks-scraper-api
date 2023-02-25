import mongoose from "mongoose";


const currencySchema = mongoose.Schema({
    currency: {
        type: String
    },
    int_name: {
        type: String
    },
    code_iso_4217: {
        type: String
    },
    code_iso_3166_1: {
        type: String
    },
    zecimal_nr: {
        type: String
    },
    name: {
        type: String
    },
    countries: [
        {
            type: String
        }
    ]

});

const Currency = mongoose.model("currency", currencySchema);
export default Currency;
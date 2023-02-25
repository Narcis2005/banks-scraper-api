import Bank from "../models/bank.js";

const getBankName = async (id) => {
    const bank = await Bank.findById(id);
    return bank.name;
}

export default getBankName;
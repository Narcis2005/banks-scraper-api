import saveInDb from "./saveInDb.js";
import getBankName from "./getBankName.js";
const procreditbank = async (page, date) => {
  await page.goto(
    "https://www.procreditbank.com.al/eng/about-us/legal-information/exchange-rate/"
  );
  const bankId = "61ec0c48001d4b23bab63dbf";
  const bankName = await getBankName(bankId);
  const text = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(".exchange-table tbody tr"),
      (element) => element.textContent
    );
  });
  if (text.length == 0) {
    throw "Element doesn't exist on procreditbank website";
  }
  const elements = text.map((element) => {
    return element.split(/\s/).filter((e) => e != "");
  });
  elements.pop();

  const result = {
    bankId: bankId,
    name: bankName,
    data: elements.map((e) => {
      return {
        code: e[0],
        buy: parseFloat(e[1]),
        sell: parseFloat(e[2]),
      };
    }),
  };
  saveInDb(result, date);
};

export default procreditbank;

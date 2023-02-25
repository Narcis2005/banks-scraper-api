import saveInDb from "./saveInDb.js";
import getBankName from "./getBankName.js";
const alphabank = async (page, date) => {
  await page.goto("https://www.alphabank.al/en");
  const bankId = "61ec0c48001d4b23bab63db9";
  const bankName = getBankName(bankId);
  const text = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll("#homepage_currency p"),
      (element) => element.textContent
    );
  });
  // If element doesn't exist anymore throw error

  if (text.length == 0) {
    throw "Element doesn't exist on alphabank website";
  }
  const elements = text.map((element) => {
    return element.split(/\s/).filter((e) => e != "");
  });
  const result = {
    bankId: bankId,
    name: bankName,
    data: elements.slice(0, elements.length/2).map((e) => {
      return {
        code: e[0],
        buy: parseFloat(e[2]),
        sell: parseFloat(e[4]),
      };
    }),
  };
  saveInDb(result, date);
};
export default alphabank;

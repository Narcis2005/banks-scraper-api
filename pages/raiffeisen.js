import saveInDb from "./saveInDb.js";
import getBankName from "./getBankName.js";
const raiffeisen = async (page, date) => {
  await page.goto("https://www.raiffeisen.al/en/page/exchange/");
  const bankId = "61ec0c48001d4b23bab63dc0";
  const bankName = await getBankName(bankId);
  const text = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll("#exchange_table table:nth-child(1) tr"),
      (element) => element.textContent
    );
  });
  if (text.length == 0) {
    throw "Element doesn't exist on raiffeisen website";
  }
  const elements = text.map((e) => {
    return e
      .split(/\n/)
      .slice(2, e.length)
      .filter((el) => el != "");
  });
  elements.shift();
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

export default raiffeisen;

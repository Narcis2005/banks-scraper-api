import saveInDb from "./saveInDb.js";
import getBankName from "./getBankName.js";
const fibank = async (page, date) => {
  await page.goto("https://www.fibank.al/en/tools/exchange/");
  const bankId = "61ec0c48001d4b23bab63dbd";
  const bankName = await getBankName(bankId);
  await page.waitForSelector(".scrollable-content");
  const text = await page.evaluate(() => {
    const element = Array.from(
      document.querySelectorAll(".scrollable-content tbody tr"),
      (newElement) => newElement.children
    );
    const response = [];

    for (let j = 0; j < element.length; j++) {
      const responseSubArray = [];
      for (let i = 0; i < element[j].length; i++) {
        responseSubArray.push(element[j][i].textContent);
      }
      response.push(responseSubArray);
    }

    return response.slice(0, 3);
  });
  // If element doesn't exist anymore throw error

  if (text.length == 0) {
    throw "Element doesn't exist on fibank website";
  }
  const data = {
    bankId: bankId,
    name: bankName,
    data: text.map((e) => {
      return {
        code: e[0],
        buy: parseFloat(e[3]),
        sell: parseFloat(e[4]),
      };
    }),
  };
  saveInDb(data, date);
};

export default fibank;

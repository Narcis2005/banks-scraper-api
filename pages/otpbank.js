import saveInDb from "./saveInDb.js";
import getBankName from "./getBankName.js";
const otpbank = async (page, date) => {
  await page.goto("https://www.otpbank.al/en/home/attachment/exchange-rate/#");
  const bankId = "61ec0c48001d4b23bab63dc1";
  const bankName = await getBankName(bankId);
  const text = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll("#zaku-table tbody tr td"),
      (element) => element.textContent
    );
  });
  if (text.length == 0) {
    throw "Element doesn't exist on otpbank website";
  }
  const elements = [];
  for (let i = 1; i < text.indexOf("Sell") - 3; i++) {
    elements.push({
      code: text[i].replace(/\s/g, ''),
      sell: parseFloat(text[text.indexOf("Sell") + i]),
      buy: parseFloat(text[text.indexOf("Buy") + i]),
    });
  }
  const data = {
    bankId: bankId,
    name: bankName,
    data: elements,
  };
  saveInDb(data, date);
};

export default otpbank;

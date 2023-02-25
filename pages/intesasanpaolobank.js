import saveInDb from "./saveInDb.js";
import getBankName from "./getBankName.js";
const intesasanpaolobank = async (page, date) => {
  await page.goto(
    "https://www.intesasanpaolobank.al/en/retail/exchange-rate-converter.html"
  );
  const bankId = "61ec0c48001d4b23bab63dbe";
  const bankName = await getBankName(bankId);
  await page.waitForSelector('[data-component="TableExchangeRate"] .tbl2__highlist li')
  await page.waitForTimeout(1000);
  let text = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        '[data-component="TableExchangeRate"] .tbl2__highlist li'
      ),
      (element) => element.textContent
    );
  });
  if (text.length == 0) {
    throw "Element doesn't exist on intesasanpaolobank website";
  }
  for (let i = 0; i < text.length; i += 3) {
    text[i] = text[i].slice(0, 3);
  }
  text = text.slice(4 * 3, text.length);
  for (let i = 1; i < text.length; i += 3) {
    text[i] = text[i].slice(3, text[i].length);
    text[i] = parseFloat(text[i].replace(",", "."));
  }
  for (let i = 2; i < text.length; i += 3) {
    text[i] = text[i].slice(4, text[i].length);
    text[i] = parseFloat(text[i].replace(",", "."));
  }
  const result = [];
  for (let i = 0; i < text.length; i += 3) {
    result.push({
      code: text[i],
      buy: text[i + 1],
      sell: text[i + 2],
    });
  }

  const finalResult = {
    bankId: bankId,
    name: bankName,
    data: result,
  };
  saveInDb(finalResult, date);
};

export default intesasanpaolobank;

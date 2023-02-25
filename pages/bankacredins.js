import saveInDb from "./saveInDb.js";
import getBankName from "./getBankName.js";
const bankacredins = async (page, date) => {
  await page.goto(
    "https://bankacredins.com/en/individuals/treasury-services-and-brokerage/money-exchange/"
  );
  const bankId = "61ec0c48001d4b23bab63dbc";
  const bankName = await getBankName(bankId);
  const text = await page.evaluate(() => {
    return document.querySelector(
      ".table-responsive.kembimi-valutor > table tbody"
    )?.textContent;
  });
  // If element doesn't exist anymore throw error

  if (text == null) {
    throw "Element doesn't exist on bankacredins website";
  }
  const elements = text.split(/\s/).filter((e) => e != "");
  const result = [];
  for (let i = 0; i < elements.length; i += 3) {
    result.push({
      code: elements[i],
      buy: parseFloat(elements[i + 1]),
      sell: parseFloat(elements[i + 2]),
    });
  }
  const finalResult = {
    name: bankName,
    bankId: bankId,
    data: result,
  };
  saveInDb(finalResult, date);
};

export default bankacredins;

import getBankName from "./getBankName.js";
import saveInDb from "./saveInDb.js";

const unionbank = async (page, date) => {
  await page.goto("https://www.unionbank.al/");
  const bankId = "61ec0c48001d4b23bab63dc3";
  const bankName = await getBankName(bankId);
  const text = await page.evaluate(() => {
    return document.querySelector("#quicklinks .quicklinks:nth-child(1) tbody")
      ?.textContent;
  });
  if (text == null) {
    throw "Element doesn't exist on unionbank website";
  }
  let elements = text.split(/\s/).filter((e) => e != "");
  elements = elements.slice(3, elements.length);
  const newElements = [];
  for (let i = 0; i < elements.length; i += 3) {
    newElements.push({
      code: elements[i].split("/")[0],
      buy: elements[i + 1],
      sell: elements[i + 2],
    });
  }
  const data = {
    bankId: bankId,
    name: bankName,
    data: newElements,
  };
  saveInDb(data, date);
};

export default unionbank;

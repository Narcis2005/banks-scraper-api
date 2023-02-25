import saveInDb from "./saveInDb.js";
import getBankName from "./getBankName.js";
const abi = async (page, date) => {
  await page.goto("https://www.abi.al/d/256/kurset-e-kembimit");
  const bankId = "61ec0c48001d4b23bab63dba";
  const bankName = await getBankName(bankId);
  const text = await page.evaluate(() => {
    return document.querySelector(".tableholder table")?.textContent;
  });

  // If element doesn't exist anymore throw error
  if (text == null) {
    throw "Element doesn't exist on abi website";
  }

  // Refactor the text in a nice way
  let elements = text.split(/\n/).filter((e) => e != "");
  elements.shift();
  elements = [
    elements.slice(0, elements.indexOf("Blihet")),
    elements.slice(elements.indexOf("Blihet") + 1, elements.indexOf("Shitet")),
    elements.slice(elements.indexOf("Shitet") + 1, elements.length),
  ];
  const result = {
    bankId: bankId,
    name: bankName,
    data: elements[0].map((e, index) => {
      return {
        code: e,
        buy: parseFloat(elements[1][index]),
        sell: parseFloat(elements[2][index]),
      };
    }),
  };
  saveInDb(result, date);
};

export default abi;

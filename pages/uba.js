import saveInDb from "./saveInDb.js";
import getBankName from "./getBankName.js";

const uba = async (page, date) => {
  await page.goto("https://www.uba.com.al/sq/thesari/kembimi-valutor-f-x.html");
  const bankId = "61ec0c48001d4b23bab63dc4";
  const bankName = await getBankName(bankId);
  const text = await page.evaluate(() => {
    return document.querySelector("table")?.textContent;
  });
  if (text == null) {
    throw "Element doesn't exist on uba website";
  }
  let elements = text.split(/\s/).filter((e) => e != "");
  elements = elements.slice(3, elements.length);
  // Format text in different subarrays
  const newElements = [
    elements.slice(0, elements.indexOf("BLERJE")),
    elements.slice(elements.indexOf("BLERJE"), elements.indexOf("SHITJE")),
    elements.slice(elements.indexOf("SHITJE"), elements.length),
  ];
  // Remove no neded words
  newElements[1].shift();
  newElements[2].shift();
  const result = [];
  for (let i = 0; i < newElements[0].length; i++) {
    result.push({
      code: newElements[0][i],
      buy: newElements[1][i],
      sell: newElements[2][i],
    });
  }
  const finalResult = {
    bankId: bankId,
    name: bankName,
    data: result,
  };
  saveInDb(finalResult, date);
};

export default uba;

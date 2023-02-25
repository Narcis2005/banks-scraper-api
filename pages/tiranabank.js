import saveInDb from "./saveInDb.js";
import getBankName from "./getBankName.js";
const tiranabank = async (page, date) => {
  await page.goto("https://tiranabank.al/eng/c/79/kursi-i-kembimit/");
  const bankId = "61ec0c48001d4b23bab63dc2";
  const bankName = await getBankName(bankId);
  const text = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(".col table tr"),
      (element) => element.textContent
    );
  });
  // If element doesn't exist anymore throw error

  if (text.length == 0) {
    throw "Element doesn't exist on tiranabank website";
  }
  // Remove spaces and new lines
  const elements = text.map((element) =>
    element.split(/\n/).filter((e) => e != "")
  );
  // The first element cotained the strings sell and buy so i removed it
  elements.shift();
  // Just rearrange the result in a nicer way
  const result = {
    bankId: bankId,
    name: bankName,
    data: elements.map((element) => {
      return {
        code: element[0].replace(/\s+/g, ""),
        buy: parseFloat(element[1]),
        sell: parseFloat(element[2]),
      };
    }),
  };
  saveInDb(result, date);
};

export default tiranabank;

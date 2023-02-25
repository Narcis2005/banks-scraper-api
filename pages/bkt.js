import saveInDb from "./saveInDb.js";
import getBankName from "./getBankName.js";
const bkt = async (page, date) => {
  await page.goto("https://www.bkt.com.al/en/default");
  const bankId = "61ec0c48001d4b23bab63dbb";
  const bankName = await getBankName(bankId);
  await page.waitForSelector(".c-currency__item");
  const text = await page.evaluate(() => {
    return document.querySelector(".c-currency__list .slick-track")
      ?.textContent;
  });
  if (text == null) {
    throw "Element doesn't exist on bkt website";
  }
  const elements = text.split(/\s/).filter((e) => e != "");
  let newElements = [];
  for (let i = 0; i < elements.length; i += 7) {
    newElements.push(elements.slice(i, i + 7));
  }
  // Elements appear multiple times
  newElements = newElements.slice(0, 7);

  const data = {
    bankId: bankId,
    name: bankName,
    data: newElements.map((e) => {
      return {
        code: e[0],
        buy: e[4],
        sell: e[6],
      };
    }),
  };
  saveInDb(data, date);
};

export default bkt;

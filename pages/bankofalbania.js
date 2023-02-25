import saveInDb from "./saveInDb.js";
import getBankName from "./getBankName.js";
const bankofalbania = async (page, date) => {
  await page.goto(
    "https://www.bankofalbania.org/Markets/Official_exchange_rate/"
  );
  const bankId = "61ec0c48001d4b23bab63db8";
  const bankName = await getBankName(bankId);
  const text = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll("#middleColumn table tbody tr"),
      (element) => element.textContent
    );
  });
  if (text.length == 0) {
    throw "Element doesn't exist on bankofalbania website";
  }
  const elements = text.map((element) => {
    return element.split(/[\n\t]/).filter((e) => e != "");
  });
  const data = {
    bankId: bankId,
    name: bankName,
    data: elements.map((e) => {
      return {
        code: e[1],
        buy: parseFloat(e[2]),
        sell: parseFloat(e[2]),
        difference: parseFloat(e[3]),
      };
    }),
  };
  saveInDb(data, date);
};

export default bankofalbania;

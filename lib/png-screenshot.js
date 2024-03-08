const puppPage = require("./pupp-page");

module.exports = async function (document) {
  const page = await puppPage();
  await page.setViewport({ width: 700, height: 700 });
  await page.setContent(document);
  const file = await page.screenshot();
  return file;
};

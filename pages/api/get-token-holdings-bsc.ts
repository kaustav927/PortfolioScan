const chromium = require("chrome-aws-lambda");
import { NextApiRequest, NextApiResponse } from "next";

async function getBrowserInstance() {
  const executablePath = await chromium.executablePath;
  //local dev environment puppeteer
  if (!executablePath) {
    // For running locally
    const puppeteer = require("puppeteer");
    return puppeteer.launch({
      args: chromium.args,
      headless: true,
      defaultViewport: {
        width: 1280,
        height: 720,
      },
      ignoreHTTPSErrors: true,
    });
  }
  //For running cloud version of puppeteer for AWS 
  return chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: {
      width: 1280,
      height: 720,
    },
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const address = req.body.address;
  //console.log(req)

  if (!address) {
    res.json({
      status: "error",
      error: "enter a valid address",
    });
    return;
  }

  let browser = null;

  try {
    //puppeteer code
    const browser = await getBrowserInstance();
    const page = await browser.newPage();
    const bscScanURL = `https://bscscan.com/tokenholdings?a=${address}&ps=100&sort=total_price_usd&order=desc&p=1`;
    await page.goto(bscScanURL);
    await page.waitForSelector("#RecordsFound > strong");
    const element = await page.$("#RecordsFound > strong");
    const numberOfTokens = await page.evaluate((el) => el.textContent, element);
    var tokenHoldingsBSC = [];
    for (let i = 2; i <= numberOfTokens; i++) {
      let contractElement = await page.waitForSelector(
        `#tb1 > tr:nth-child(${i}) > td:nth-child(2) > div > div.media-body > a.hash-tag.text-truncate.d-block.font-size-1`
      );
      var contractAddressValue = await page.evaluate(
        (el) => el.textContent,
        contractElement
      );
      let tokenNameElement = await page.waitForSelector(
        `#tb1 > tr:nth-child(${i}) > td > .media > .media-body > .font-weight-bold`
      );
      var tokenNameValue = await page.evaluate(
        (el) => el.textContent,
        tokenNameElement
      );
      let tokenSymbolElement = await page.waitForSelector(
        `.table-responsive > .table > #tb1 > tr:nth-child(${i}) > td:nth-child(3)`
      );
      var tokenSymbolValue = await page.evaluate(
        (el) => el.textContent,
        tokenSymbolElement
      );
      let tokenQuantityElement = await page.waitForSelector(
        `.table-responsive > .table > #tb1 > tr:nth-child(${i}) > td:nth-child(4)`
      );
      var tokenQuantityValue = await page.evaluate(
        (el) => el.textContent,
        tokenQuantityElement
      );
      tokenHoldingsBSC.push({
        TokenAddress: contractAddressValue,
        TokenName: tokenNameValue,
        TokenSymbol: tokenSymbolValue,
        TokenQuantity: tokenQuantityValue,
      });
    }
    res.json({
      status: "ok",
      data: tokenHoldingsBSC,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      data: error.message || "Something went wrong",
    });
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};

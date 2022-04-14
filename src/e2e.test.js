import puppeteer from "puppeteer";

describe("App.js", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 60,
    });
    page = await browser.newPage();
  }, 100000);

  it("should add student and come back to main page", async () => {
    await page.goto("http://localhost:3000/", {
      waitUntil: "networkidle2",
      timeout: 0,
    });
    await page.click('[href="/addStudent"]');
    await page.click(".MuiGrid-item .MuiButton-contained");
    await page.type('[id="name-label"]', "Behzad");
    await page.type('[id="email-label"]', "ali@gmail.com");
    await page.type('[id="classs-label"]', "BSCS");
    await page.type('[id="age-label"]', "22");
    await page.click('[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForSelector('[href="/"]');
    const text = await page.$eval('[href="/"]', (e) => e.textContent);
    expect(text).toContain("Students Data");
  }, 1000000);

  it("should update student and come back to main page", async () => {
    await page.goto("http://localhost:3000/", {
      waitUntil: "networkidle2",
      timeout: 0,
    });
    await page.click('[data-testid="1"]');
    const name = await page.$('[id="name"]');
    await name.click({ clickCount: 3 });
    await name.type("Behzad");
    const email = await page.$('[id="email"]');
    await email.click({ clickCount: 3 });
    await email.type("behzad@gmail.com");
    const classs = await page.$('[id="classs"]');
    await classs.click({ clickCount: 3 });
    await classs.type("BSCS");
    const age = await page.$('[id="age"]');
    await age.click({ clickCount: 3 });
    await age.type("20");
    await page.click('[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForSelector('[href="/"]');
    const text = await page.$eval('[href="/"]', (e) => e.textContent);
    expect(text).toContain("Students Data");
  }, 1000000);

  afterAll(() => browser.close());

  it("should check validation for name", async () => {
    await page.goto("http://localhost:3000/", {
      waitUntil: "networkidle2",
      timeout: 0,
    });
    await page.click('[href="/addStudent"]');
    await page.click(".MuiGrid-item .MuiButton-contained");
    await page.type('[id="email-label"]', "ali@gmail.com");
    await page.type('[id="classs-label"]', "BSCS");
    await page.type('[id="age-label"]', "22");
    await page.click('[type="submit"]');
    await page.waitForTimeout(1000);
    await page.waitForSelector('[href="/"]');
    const text = await page.$eval('[href="/"]', (e) => e.textContent);
    expect(text).toContain("Students Data");
  }, 1000000);

  // it("should check validation for email", async () => {
  //   await page.goto("http://localhost:3000/", {
  //     waitUntil: "networkidle2",
  //     timeout: 0,
  //   });
  //   await page.click('[href="/addStudent"]');
  //   await page.click(".MuiGrid-item .MuiButton-contained");
  //   await page.type('[id="name-label"]', "Behzad");
  //   await page.type('[id="classs-label"]', "BSCS");
  //   await page.type('[id="age-label"]', "22");
  //   await page.click('[type="submit"]');
  //   await page.waitForTimeout(1000);
  //   await page.waitForSelector('[href="/"]');
  //   const text = await page.$eval('[href="/"]', (e) => e.textContent);
  //   expect(text).toContain("Students Data");
  // }, 1000000);

  // it("should check validation for class", async () => {
  //   await page.goto("http://localhost:3000/", {
  //     waitUntil: "networkidle2",
  //     timeout: 0,
  //   });
  //   await page.click('[href="/addStudent"]');
  //   await page.click(".MuiGrid-item .MuiButton-contained");
  //   await page.type('[id="name-label"]', "Behzad");
  //   await page.type('[id="email-label"]', "ali@gmail.com");
  //   await page.type('[id="age-label"]', "22");
  //   await page.click('[type="submit"]');
  //   await page.waitForTimeout(1000);
  //   await page.waitForSelector('[href="/"]');
  //   const text = await page.$eval('[href="/"]', (e) => e.textContent);
  //   expect(text).toContain("Students Data");
  // }, 1000000);
  
  // it("should check validation for age", async () => {
  //   await page.goto("http://localhost:3000/", {
  //     waitUntil: "networkidle2",
  //     timeout: 0,
  //   });
  //   await page.click('[href="/addStudent"]');
  //   await page.click(".MuiGrid-item .MuiButton-contained");
  //   await page.type('[id="name-label"]', "Behzad");
  //   await page.type('[id="email-label"]', "ali@gmail.com");
  //   await page.type('[id="classs-label"]', "BSCS");
  //   await page.click('[type="submit"]');
  //   await page.waitForTimeout(1000);
  //   await page.waitForSelector('[href="/"]');
  //   const text = await page.$eval('[href="/"]', (e) => e.textContent);
  //   expect(text).toContain("Students Data");
  // }, 1000000);

});

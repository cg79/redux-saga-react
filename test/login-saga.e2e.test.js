import { setDefaultOptions } from 'expect-puppeteer';
import puppeteer from 'puppeteer';


setDefaultOptions({ timeout: 2000 });

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 0,
    devtools: true,
  });
});
afterAll(async () => {
  await browser.close();
});


describe('login saga effects, e2e tests', () => {

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  test('standard login flow', async () => {
    await expect(page).toClick('button', { text: 'Login' });
    await expect(page).toMatch(`status: aa`);
    await expect(page).toClick('button', { text: 'Logout' });
    await expect(page).toMatch(`status:aaa`);
  }, 5000);
 

});

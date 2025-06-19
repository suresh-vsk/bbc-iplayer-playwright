import { Page, expect } from "@playwright/test";
import Navigation from "./components/Navigation";
import Sections from "./components/Sections";
import { BasePage } from "../BasePage";

export default class HomePage extends BasePage{
  readonly navigation: Navigation;
  readonly sections: Sections;
  readonly acceptCookiesButton: any;

  constructor(page: Page) {
    super(page);
    this.navigation = new Navigation(page);
    this.sections = new Sections(page);
    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept additional cookies' });
  }

  async goto() {
    if (!process.env.BASE_URL) {
      throw new Error("BASE_URL is not defined in the environment variables.");
    }

    await this.page.goto(process.env.BASE_URL);
    await this.waitForPageLoad();
    await this.handleCookieConsent();
  }

  async handleCookieConsent(): Promise<void> {
    try {
      if (await this.acceptCookiesButton.isVisible({ timeout: 5000 })) {
        await this.acceptCookiesButton.click();
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
      console.log('No cookie consent banner found');
    }
  }

  async verifyTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }
}

import { Page } from "@playwright/test";
import Navigation from "./components/Navigation";
import Sections from "./components/Sections";
import Carousel from "./components/Carousel";

export default class HomePage {
  readonly page: Page;
  readonly navigation: Navigation;
  readonly sections: Sections;

  constructor(page: Page) {
    this.page = page;
    this.navigation = new Navigation(page);
    this.sections = new Sections(page);
  }

  async goto() {
    if (!process.env.BASE_URL) {
      throw new Error("BASE_URL is not defined in the environment variables.");
    }
    
    try {
      await this.page.goto(process.env.BASE_URL, {
        waitUntil: 'domcontentloaded',
        timeout: 60000
      });
      await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch (error) {
      console.error(`Failed to navigate to ${process.env.BASE_URL}:`, error);
      throw error;
    }
  }
}

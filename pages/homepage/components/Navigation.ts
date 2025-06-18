import { Page } from "@playwright/test";

export default class Navigation {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isVisible(): Promise<boolean> {
    return await this.page
      .locator('ul[data-bbc-container="primary-nav"]')
      .isVisible();
  }
}
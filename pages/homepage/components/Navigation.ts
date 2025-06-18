import { Page, Locator } from "@playwright/test";

export default class Navigation {
  readonly page: Page;
  readonly navigationMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigationMenu = page.locator('ul[data-bbc-container="primary-nav"]');
  }

  async getNavigationMenuCount(): Promise<number> {
    const menus = await this.navigationMenu.all();
    return menus.length;
  }

  async isVisible(): Promise<boolean> {
    return await this.navigationMenu.isVisible();
  }
}
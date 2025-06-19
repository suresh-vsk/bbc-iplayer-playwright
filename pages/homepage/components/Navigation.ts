import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../BasePage";

export default class Navigation extends BasePage {
  readonly navigationMenu: Locator;

  constructor(page: Page) {
    super(page);
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
// playbackPage.ts
import { Locator, Page, expect } from "@playwright/test";

export class PlaybackPage {
  readonly page: Page;
  readonly playbackTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.playbackTitle = page.locator(".hero-header__title");
  }

  async getPlaybackTitleText() {
    return this.playbackTitle.innerText();
  }

  async expectPlaybackTitleToBe(expectedText: string) {
    await expect(this.playbackTitle).toHaveText(expectedText);
  }
}

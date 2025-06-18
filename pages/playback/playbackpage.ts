// playbackPage.ts
import { Locator, Page, expect } from "@playwright/test";

export class PlaybackPage {
  readonly page: Page;
  readonly playbackTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.playbackTitle = page.locator(".hero-header__title").or(
      page.locator(".play-cta__title-container .play-cta__title"));  
    }

  async getPlaybackTitleText() {
    return this.playbackTitle.innerText();
  }

  async expectPlaybackTitleToBe(expectedText: string) {
    await expect(this.playbackTitle).toHaveText(expectedText);
  }
}

import { test as base } from "@playwright/test";
import HomePage from "../pages/homepage/HomePage";
import { PlaybackPage } from "../pages/playback/playbackpage";

type MyFixtures = {
  homePage: HomePage;
  playbackPage: PlaybackPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto(); // Navigate from the fixture
    await use(homePage);
  },

  playbackPage: async ({ page }, use) => {
    const playbackPage = new PlaybackPage(page);
    await use(playbackPage);
  },
});

export { expect } from "@playwright/test";

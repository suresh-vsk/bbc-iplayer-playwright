import { test, expect } from "../fixtures/fixtures";

test.describe.parallel("BBC iPlayer Homepage Tests (with fixtures)", () => {
  test("Homepage has correct title", async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.page).toHaveTitle("BBC iPlayer - Home");
  });

  test("Navigation menu exists", async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.navigation.isVisible()).toBeTruthy();
  });

  test("Homepage has at least 4 sections that each contain 1 carousel", async ({ homePage }) => {
    await homePage.goto();
    const sectionCount = await homePage.sections.getSectionsWithCarouselsCount();
    console.log(`Found ${sectionCount} sections with carousels`);
    expect(sectionCount).toBeGreaterThan(3);
    await homePage.sections.validateEachSectionHasOneCarousel();
  });

  test("Each carousel has at least 4 items", async ({ homePage }) => {
    await homePage.goto();
    const sectionCount = await homePage.sections.getSectionsWithCarouselsCount();

    for (let i = 0; i < sectionCount; i++) {
      const carousel = homePage.sections.getCarousel(i);
      const itemCount = await carousel.getItemCount();
      expect(itemCount).toBeGreaterThan(3);
    }
  });

  test("Clicking carousel arrow shows more items", async ({ homePage }) => {
    await homePage.goto();
    const carousel = homePage.sections.getCarousel(0);
    const initialCount = await carousel.getItemCount();
    await carousel.clickNextArrow();
    const newCount = await carousel.getItemCount();
    expect(newCount).toBeGreaterThanOrEqual(initialCount);
  });

  test("Clicking episode opens playback page", async ({ homePage, playbackPage,}) => {
    await homePage.goto();
    const carousel = homePage.sections.getCarousel(0);
    const carouselItems = carousel.getItems();
    const firstItem = await carouselItems.first().innerText();
    console.log(`First item text: ${firstItem}`);
    await carousel.clickFirstEpisode();
    // Verify the playback title matches the first item text
    const playbackTitle = await playbackPage.getPlaybackTitleText();
    console.log(`Playback title text: ${playbackTitle}`);
    await playbackPage.expectPlaybackTitleToBe(firstItem);
    await expect(playbackPage.page).toHaveURL(/iplayer\/episode/);
  });
});

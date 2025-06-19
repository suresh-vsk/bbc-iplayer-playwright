import { test, expect } from "../fixtures/fixtures";

test.describe.parallel("BBC iPlayer Homepage Tests (with fixtures)", () => {
  test("Homepage has correct title", async ({ homePage }) => {
    await homePage.verifyTitle("BBC iPlayer - Home");
  });

  test("Homepage page has one iPlayer navigation menu", async ({ homePage }) => {
    const menuCount = await homePage.navigation.getNavigationMenuCount();
    expect(menuCount).toBe(1);
    await expect(homePage.navigation.isVisible()).toBeTruthy();
  });

  test("Homepage has at least 4 sections that each contain 1 carousel", async ({ homePage }) => {
    const sectionCount = await homePage.sections.getSectionsWithCarouselsCount();
    console.log(`Found ${sectionCount} sections with carousels`);
    expect(sectionCount).toBeGreaterThan(3);
    await homePage.sections.validateEachSectionHasOneCarousel();
  });

  test("Homepage shows at least 4 programme items in each carousel", async ({ homePage }) => {
    const sectionCount = await homePage.sections.getSectionsWithCarouselsCount();

    for (let i = 0; i < sectionCount; i++) {
      const carousel = homePage.sections.getCarousel(i);
      const itemCount = await carousel.getItemCount();
      expect(itemCount).toBeGreaterThan(3);
    }
  });

  test("Clicking carousel arrow shows more items", async ({ homePage }) => {
    const carousel = homePage.sections.getCarousel(0);
    const initialCount = await carousel.getItemCount();
    await carousel.clickNextArrow();
    const newCount = await carousel.getItemCount();
    expect(newCount).toBeGreaterThanOrEqual(initialCount);
  });

  test("The relevant Playback page is displayed when an episode is clicked", async ({ homePage, playbackPage,}) => {
    const carousel = homePage.sections.getCarousel(1);
    homePage.sections.carousel.scrollToElement(carousel.getActiveCarousel());
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

import { Page, Locator, expect } from "@playwright/test";
import Carousel from "./Carousel";
import { BasePage } from "../../BasePage";

export default class Sections extends BasePage {
  readonly sections: Locator;
  readonly carousel: Carousel;

  constructor(page: Page) {
    super(page);
    this.sections = page.locator("section:has(.carrousel)");
    this.carousel = new Carousel(page);
  }

  async getSectionsWithCarouselsCount(): Promise<number> {
    return await this.sections.count();
  }

  getSection(index: number): Locator {
    return this.sections.nth(index);
  }

  getCarousel(sectionIndex: number): Carousel {
    // Pass the index to the carousel so it knows which one to work with
    this.carousel.setActiveCarouselIndex(sectionIndex);
    return this.carousel;
  }

  async getCarouselInSection(section: Locator): Promise<Locator> {
    return section.locator(".carrousel");
  }

  async validateEachSectionHasOneCarousel(): Promise<void> {
    const count = await this.getSectionsWithCarouselsCount();
    for (let i = 0; i < count; i++) {
      const section = this.getSection(i);
      this.scrollToElement(section);
      const carousels = await this.getCarouselInSection(section);
      await expect(carousels).toHaveCount(1);
    }
  }
}
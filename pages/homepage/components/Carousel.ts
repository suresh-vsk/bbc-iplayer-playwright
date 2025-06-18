import { Page, Locator } from "@playwright/test";

export default class Carousel {
  readonly page: Page;
  private activeIndex: number = 0;
  private readonly sectionWithCarouselSelector: string;
  private readonly carouselSelector: string;
  private readonly carouselItemSelector: string;
  private readonly nextArrowSelector: string;
  private readonly prevArrowSelector: string;

  constructor(page: Page) {
    this.page = page;
    this.sectionWithCarouselSelector = "section:has(.carrousel)";
    this.carouselSelector = ".carrousel";
    this.carouselItemSelector = "li.carrousel__item";
    this.nextArrowSelector = 'button[data-bbc-content-label="forward"]';
    this.prevArrowSelector = 'button[data-bbc-content-label="previous"]';
  }

  setActiveCarouselIndex(index: number): void {
    this.activeIndex = index;
  }

  getActiveCarousel(): Locator {
    return this.page
      .locator(this.sectionWithCarouselSelector)
      .nth(this.activeIndex)
      .locator(this.carouselSelector);
  }

  getItems(): Locator {
    return this.getActiveCarousel().locator(this.carouselItemSelector);
  }

  async getItemCount(): Promise<number> {
    return await this.getItems().count();
  }

  async clickNextArrow(): Promise<void> {
    const nextArrow = this.getActiveCarousel().locator(this.nextArrowSelector);
    await nextArrow.click();
  }

  async clickPrevArrow(): Promise<void> {
    const prevArrow = this.getActiveCarousel().locator(this.prevArrowSelector);
    await prevArrow.click();
  }

  async clickFirstEpisode(): Promise<void> {
    await this.getItems().first().click();
  }
  
  // following methods are commented out as they are not used in the current implementation

  // async clickEpisode(index: number): Promise<void> {
  //   await this.getItems().nth(index).click();
  // }

  // // Get specific carousel without setting active index
  // getCarouselAtIndex(index: number): Locator {
  //   return this.page
  //     .locator(this.sectionWithCarouselSelector)
  //     .nth(index)
  //     .locator(this.carouselSelector);
  // }

  // // Get items from specific carousel by index
  // getItemsAtIndex(carouselIndex: number): Locator {
  //   return this.getCarouselAtIndex(carouselIndex).locator(this.carouselItemSelector);
  // }
}

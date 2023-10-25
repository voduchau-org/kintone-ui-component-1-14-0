import { expect, fixture } from "@open-wc/testing";

import { BaseDateTimeCalendar } from "../index";

describe("BaseDateTimeCalendar", () => {
  describe("language", () => {
    it("should be 'en' when not assigning", async () => {
      const container = new BaseDateTimeCalendar();
      const el = await fixture(container);
      const headerCenterEl = el.querySelector(
        ".kuc-base-datetime-calendar-header__group__center",
      ) as HTMLSpanElement;
      const bodyWeekDayEl = el.querySelector(
        ".kuc-base-datetime-calendar-body__table__header",
      ) as HTMLTableSectionElement;
      const footerButtonTodayEl = el.querySelector(
        ".kuc-base-datetime-calendar-footer__group__button--today",
      ) as HTMLButtonElement;
      const footerButtonNoneEl = el.querySelector(
        ".kuc-base-datetime-calendar-footer__group__button--none",
      ) as HTMLButtonElement;

      expect(headerCenterEl.childElementCount).to.equal(2);
      expect(headerCenterEl.children[0].tagName).to.equal(
        "KUC-BASE-DATETIME-HEADER-MONTH",
      );
      expect(headerCenterEl.children[1].tagName).to.equal(
        "KUC-BASE-DATETIME-HEADER-YEAR",
      );
      expect(bodyWeekDayEl.innerText).to.equal("SUN");
      expect(footerButtonTodayEl.innerText).to.equal("Today");
      expect(footerButtonNoneEl.innerText).to.equal("None");
    });

    it("should be 'ja' when assigning 'ja' by setter", async () => {
      const container = new BaseDateTimeCalendar();
      container.language = "ja";
      const el = await fixture(container);
      const headerCenterEl = el.querySelector(
        ".kuc-base-datetime-calendar-header__group__center",
      ) as HTMLSpanElement;
      const yearEl = headerCenterEl.children[0];
      const bodyWeekDayEl = el.querySelector(
        ".kuc-base-datetime-calendar-body__table__header",
      ) as HTMLTableSectionElement;
      const footerButtonTodayEl = el.querySelector(
        ".kuc-base-datetime-calendar-footer__group__button--today",
      ) as HTMLButtonElement;
      const footerButtonNoneEl = el.querySelector(
        ".kuc-base-datetime-calendar-footer__group__button--none",
      ) as HTMLButtonElement;

      expect(headerCenterEl.childElementCount).to.equal(2);
      expect(headerCenterEl.children[0].tagName).to.equal(
        "KUC-BASE-DATETIME-HEADER-YEAR",
      );
      expect(headerCenterEl.children[1].tagName).to.equal(
        "KUC-BASE-DATETIME-HEADER-MONTH",
      );
      expect(yearEl.textContent).to.contain("年");
      expect(bodyWeekDayEl.innerText).to.equal("日");
      expect(footerButtonTodayEl.innerText).to.equal("今日");
      expect(footerButtonNoneEl.innerText).to.equal("選択を解除");
    });

    it("should be 'zh' when assigning 'zh' by setter", async () => {
      const container = new BaseDateTimeCalendar();
      container.language = "zh";
      const el = await fixture(container);
      const headerCenterEl = el.querySelector(
        ".kuc-base-datetime-calendar-header__group__center",
      ) as HTMLSpanElement;
      const yearEl = headerCenterEl.children[0];
      const bodyWeekDayEl = el.querySelector(
        ".kuc-base-datetime-calendar-body__table__header",
      ) as HTMLTableSectionElement;
      const footerButtonTodayEl = el.querySelector(
        ".kuc-base-datetime-calendar-footer__group__button--today",
      ) as HTMLButtonElement;
      const footerButtonNoneEl = el.querySelector(
        ".kuc-base-datetime-calendar-footer__group__button--none",
      ) as HTMLButtonElement;

      expect(headerCenterEl.childElementCount).to.equal(2);
      expect(headerCenterEl.children[0].tagName).to.equal(
        "KUC-BASE-DATETIME-HEADER-YEAR",
      );
      expect(headerCenterEl.children[1].tagName).to.equal(
        "KUC-BASE-DATETIME-HEADER-MONTH",
      );
      expect(yearEl.textContent).to.contain("年");
      expect(bodyWeekDayEl.innerText).to.equal("周日");
      expect(footerButtonTodayEl.innerText).to.equal("今天");
      expect(footerButtonNoneEl.innerText).to.equal("清空");
    });

    it("should be 'zh-TW' when assigning 'zh-TW' by setter", async () => {
      const container = new BaseDateTimeCalendar();
      container.language = "zh-TW";
      const el = await fixture(container);
      const headerCenterEl = el.querySelector(
        ".kuc-base-datetime-calendar-header__group__center",
      ) as HTMLSpanElement;
      const yearEl = headerCenterEl.children[0];
      const bodyWeekDayEl = el.querySelector(
        ".kuc-base-datetime-calendar-body__table__header",
      ) as HTMLTableSectionElement;
      const footerButtonTodayEl = el.querySelector(
        ".kuc-base-datetime-calendar-footer__group__button--today",
      ) as HTMLButtonElement;
      const footerButtonNoneEl = el.querySelector(
        ".kuc-base-datetime-calendar-footer__group__button--none",
      ) as HTMLButtonElement;

      expect(headerCenterEl.childElementCount).to.equal(2);
      expect(headerCenterEl.children[0].tagName).to.equal(
        "KUC-BASE-DATETIME-HEADER-YEAR",
      );
      expect(headerCenterEl.children[1].tagName).to.equal(
        "KUC-BASE-DATETIME-HEADER-MONTH",
      );
      expect(yearEl.textContent).to.contain("年");
      expect(bodyWeekDayEl.innerText).to.equal("周日");
      expect(footerButtonTodayEl.innerText).to.equal("今天");
      expect(footerButtonNoneEl.innerText).to.equal("清空");
    });
  });
});

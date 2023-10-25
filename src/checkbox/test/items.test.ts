import { expect, fixture } from "@open-wc/testing";

import { Checkbox } from "../index";

const initItems = [
  { label: "-----", value: "-----" },
  { label: "Orange", value: "orange" },
  { label: "Apple", value: "apple" },
];

const initItemsWithoutLabel = [
  { value: "-----" },
  { value: "orange" },
  { value: "apple" },
];
const initItemsWithoutValue = [{ label: "-----" }];

const replacedItems = [
  { label: "-----", value: "-----" },
  { label: "Apple", value: "apple" },
];

const dupplicatedItems = [{ value: "apple" }, { value: "apple" }];

describe("Checkbox", () => {
  describe("items", () => {
    it("should not have item when not assigned on constructor", async () => {
      const container = new Checkbox();
      const el = await fixture(container);
      const itemsEl = el.querySelectorAll(
        ".kuc-checkbox__group__select-menu__item",
      );

      expect(itemsEl.length).to.equal(0);
    });

    it("should set label the same as value when not assigned items label on constructor", async () => {
      const container = new Checkbox({ items: initItemsWithoutLabel });
      const el = await fixture(container);
      const itemsEl = el.querySelectorAll(
        ".kuc-checkbox__group__select-menu__item",
      );

      expect(itemsEl.length).to.equal(3);

      const inputEl0 = itemsEl[0].querySelector("input") as HTMLInputElement;
      expect(inputEl0.checked).to.equal(false);
      expect(inputEl0.value).to.equal(initItemsWithoutLabel[0].value);
      const labelEl0 = itemsEl[0].querySelector("label") as HTMLLabelElement;
      expect(labelEl0.innerText).to.equal(initItemsWithoutLabel[0].value);

      const inputEl1 = itemsEl[1].querySelector("input") as HTMLInputElement;
      expect(inputEl1.checked).to.equal(false);
      expect(inputEl1.value).to.equal(initItemsWithoutLabel[1].value);
      const labelEl1 = itemsEl[1].querySelector("label") as HTMLLabelElement;
      expect(labelEl1.innerText).to.equal(initItemsWithoutLabel[1].value);

      const inputEl2 = itemsEl[2].querySelector("input") as HTMLInputElement;
      expect(inputEl2.checked).to.equal(false);
      expect(inputEl2.value).to.equal(initItemsWithoutLabel[2].value);
      const labelEl2 = itemsEl[2].querySelector("label") as HTMLLabelElement;
      expect(labelEl2.innerText).to.equal(initItemsWithoutLabel[2].value);
    });

    it("should set label the same as value when not assigned items label by setter", async () => {
      const container = new Checkbox();
      container.items = initItemsWithoutLabel;
      const el = await fixture(container);
      const itemsEl = el.querySelectorAll(
        ".kuc-checkbox__group__select-menu__item",
      );

      expect(itemsEl.length).to.equal(3);

      const inputEl0 = itemsEl[0].querySelector("input") as HTMLInputElement;
      expect(inputEl0.checked).to.equal(false);
      expect(inputEl0.value).to.equal(initItemsWithoutLabel[0].value);
      const labelEl0 = itemsEl[0].querySelector("label") as HTMLLabelElement;
      expect(labelEl0.innerText).to.equal(initItemsWithoutLabel[0].value);

      const inputEl1 = itemsEl[1].querySelector("input") as HTMLInputElement;
      expect(inputEl1.checked).to.equal(false);
      expect(inputEl1.value).to.equal(initItemsWithoutLabel[1].value);
      const labelEl1 = itemsEl[1].querySelector("label") as HTMLLabelElement;
      expect(labelEl1.innerText).to.equal(initItemsWithoutLabel[1].value);

      const inputEl2 = itemsEl[2].querySelector("input") as HTMLInputElement;
      expect(inputEl2.checked).to.equal(false);
      expect(inputEl2.value).to.equal(initItemsWithoutLabel[2].value);
      const labelEl2 = itemsEl[2].querySelector("label") as HTMLLabelElement;
      expect(labelEl2.innerText).to.equal(initItemsWithoutLabel[2].value);
    });

    it("should set items when assigned items by setter", async () => {
      const container = new Checkbox({ items: initItems });
      const el = await fixture(container);
      const itemsEl = el.querySelectorAll(
        ".kuc-checkbox__group__select-menu__item",
      );

      expect(itemsEl.length).to.equal(3);

      const inputEl0 = itemsEl[0].querySelector("input") as HTMLInputElement;
      expect(inputEl0.checked).to.equal(false);
      expect(inputEl0.value).to.equal(initItems[0].value);
      const labelEl0 = itemsEl[0].querySelector("label") as HTMLLabelElement;
      expect(labelEl0.innerText).to.equal(initItems[0].label);

      const inputEl1 = itemsEl[1].querySelector("input") as HTMLInputElement;
      expect(inputEl1.checked).to.equal(false);
      expect(inputEl1.value).to.equal(initItems[1].value);
      const labelEl1 = itemsEl[1].querySelector("label") as HTMLLabelElement;
      expect(labelEl1.innerText).to.equal(initItems[1].label);

      const inputEl2 = itemsEl[2].querySelector("input") as HTMLInputElement;
      expect(inputEl2.checked).to.equal(false);
      expect(inputEl2.value).to.equal(initItems[2].value);
      const labelEl2 = itemsEl[2].querySelector("label") as HTMLLabelElement;
      expect(labelEl2.innerText).to.equal(initItems[2].label);
    });

    it("should be changed when updated items by setter", async () => {
      const container = new Checkbox({ items: initItems });
      container.items = replacedItems;

      const el = await fixture(container);
      const itemsEl = el.querySelectorAll(
        ".kuc-checkbox__group__select-menu__item",
      );

      expect(container.items).to.be.equal(replacedItems);
      expect(itemsEl.length).to.equal(2);

      const inputEl0 = itemsEl[0].querySelector("input") as HTMLInputElement;
      expect(inputEl0.checked).to.equal(false);
      expect(inputEl0.value).to.equal(replacedItems[0].value);
      const labelEl0 = itemsEl[0].querySelector("label") as HTMLLabelElement;
      expect(labelEl0.innerText).to.equal(replacedItems[0].label);

      const inputEl1 = itemsEl[1].querySelector("input") as HTMLInputElement;
      expect(inputEl1.checked).to.equal(false);
      expect(inputEl1.value).to.equal(replacedItems[1].value);
      const labelEl1 = itemsEl[1].querySelector("label") as HTMLLabelElement;
      expect(labelEl1.innerText).to.equal(replacedItems[1].label);
    });

    it("should be throw error when assigned null on constructor", (done) => {
      const handleError = (event: any) => {
        const errorMsg = event.reason.message;
        expect(errorMsg).to.equal("'items' property is not array.");
        window.removeEventListener("unhandledrejection", handleError);
        done();
      };
      window.addEventListener("unhandledrejection", handleError);

      const container = new Checkbox({ items: null });
      fixture(container);
    });

    it("should be throw error when assigned null by setter", (done) => {
      const handleError = (event: any) => {
        const errorMsg = event.reason.message;
        expect(errorMsg).to.equal("'items' property is not array.");
        window.removeEventListener("unhandledrejection", handleError);
        done();
      };
      window.addEventListener("unhandledrejection", handleError);

      const container = new Checkbox();
      container.items = null;
      fixture(container);
    });

    it('should set item value "" when assigned item value undefined on constructor', async () => {
      const container = new Checkbox({
        items: initItemsWithoutValue,
      });
      const el = await fixture(container);
      const itemsEl = el.querySelectorAll(
        ".kuc-checkbox__group__select-menu__item",
      );
      const inputEl0 = itemsEl[0].querySelector("input") as HTMLInputElement;
      expect(inputEl0.value).to.equal("");
    });

    it("should set items when assigned disabled items on constructor", async () => {
      const disabledItem = { label: "Banana", value: "banana", disabled: true };
      const container = new Checkbox({
        items: [...initItems, disabledItem],
      });
      const el = await fixture(container);
      const inputEls = el.querySelectorAll(
        ".kuc-checkbox__group__select-menu__item",
      );

      expect(inputEls.length).to.equal(4);

      const inputEl = inputEls[3].querySelector("input") as HTMLInputElement;
      expect(inputEl.checked).to.equal(false);
      expect(inputEl.value).to.equal(disabledItem.value);
      const labelEl = inputEls[3].querySelector("label") as HTMLLabelElement;
      expect(labelEl.innerText).to.equal(disabledItem.label);
      expect(inputEl.hasAttribute("disabled")).to.equal(true);
    });
  });
});

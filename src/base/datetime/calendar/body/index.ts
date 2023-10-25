import { html, PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";

import {
  createStyleOnHeader,
  CustomEventDetail,
  dispatchCustomEvent,
  KucBase,
} from "../../../kuc-base";
import {
  getDisplayingDates,
  getLocale,
  padStart,
  WeekDate,
} from "../../utils/";

import { CALENDAR_BODY_CSS } from "./style";

export class BaseDateTimeCalendarBody extends KucBase {
  @property({ type: Number }) month = 1;
  @property({ type: Number }) year = 2021;
  @property({ type: String, attribute: "lang", reflect: true }) language = "en";
  @property({ type: String, reflect: true }) value = "";

  @state() _month = 1;
  @state() _year = 2021;

  @query(
    '.kuc-base-datetime-calendar-body__table__date--selected[aria-selected="true"]',
  )
  private _selectedItem!: HTMLTableCellElement;

  @query(".kuc-base-datetime-calendar-body__table__date--selected")
  private _highlightItem!: HTMLTableCellElement;

  @query(
    '.kuc-base-datetime-calendar-body__table__date--selected[tabindex="0"]',
  )
  private _focusedItem!: HTMLTableCellElement;

  private _locale = getLocale("en");

  constructor() {
    super();
    this._handleClickDocument = this._handleClickDocument.bind(this);
    this._handleKeyDownDocument = this._handleKeyDownDocument.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      document.addEventListener("click", this._handleClickDocument);
      document.addEventListener("keydown", this._handleKeyDownDocument);
    }, 1);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this._handleClickDocument);
    document.removeEventListener("keydown", this._handleKeyDownDocument);
    super.disconnectedCallback();
  }

  update(changedProperties: PropertyValues) {
    changedProperties.forEach((_oldValue, propName) => {
      propName === "language" && (this._locale = getLocale(this.language));
    });
    if (changedProperties.has("month")) this._month = this.month;
    if (changedProperties.has("year")) this._year = this.year;
    if (changedProperties.has("value")) {
      const { month, year } = this._separateDateValue();
      this._month = parseInt(month, 10);
      this._year = parseInt(year, 10);
    }
    super.update(changedProperties);
  }

  render() {
    return html`
      <table class="kuc-base-datetime-calendar-body__table" role="grid">
        ${this._getHeaderItemsTemplate()}<!--
        -->${this._getDateItemsTemplate()}
      </table>
    `;
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has("value")) {
      this._focusDateEl();
    }
    super.update(changedProperties);
  }

  private _handleClickDocument() {
    dispatchCustomEvent(this, "kuc:calendar-body-blur", {});
  }

  private _handleKeyDownDocument(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      dispatchCustomEvent(this, "kuc:calendar-body-blur", {});
    }
  }

  private _handleClickDate(event: MouseEvent | KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    const itemEl = event.target as HTMLTableCellElement;
    itemEl.setAttribute("aria-selected", "true");
    const value = itemEl.getAttribute("data-date") || "";
    this._dispatchClickEvent(value);
  }

  private _handleKeyDownDate(event: KeyboardEvent) {
    let doPreventEvent = false;
    switch (event.key) {
      case "Up":
      case "ArrowUp": {
        doPreventEvent = true;
        this._moveToDate(-7);
        break;
      }
      case "Down":
      case "ArrowDown": {
        doPreventEvent = true;
        this._moveToDate(7);
        break;
      }
      case "Left":
      case "ArrowLeft": {
        doPreventEvent = true;
        this._moveToDate(-1);
        break;
      }
      case "Right":
      case "ArrowRight": {
        doPreventEvent = true;
        this._moveToDate(1);
        break;
      }
      case " ":
      case "Enter": {
        doPreventEvent = true;
        const value = this._getSelectedValue();
        this._dispatchClickEvent(value);
        break;
      }
      default:
        break;
    }
    if (doPreventEvent) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  private _dispatchClickEvent(value: string) {
    const detail: CustomEventDetail = { oldValue: this.value, value: value };
    dispatchCustomEvent(this, "kuc:calendar-body-click-date", detail);
    this.value = value;
  }

  private _isToday(dateParts: string[]) {
    const today = new Date();
    return (
      parseInt(dateParts[0], 10) === today.getFullYear() &&
      parseInt(dateParts[1], 10) === today.getMonth() + 1 &&
      parseInt(dateParts[2], 10) === today.getDate()
    );
  }

  private _moveToDate(days: number) {
    let value = this.value;
    const selectedValue = this._getSelectedValue();
    const { day } = this._separateDateValue(selectedValue);
    value = `${this._year}-${padStart(this._month)}-${day}`;

    const date = new Date(`${value || this._getValueItemFocused()}T00:00:00`);
    if (isNaN(date.getTime())) return;
    date.setDate(date.getDate() + days);

    const nextDate = this._getDateString(date);
    const oldValue = value;
    this.value = nextDate;

    const detail: CustomEventDetail = { oldValue: oldValue, value: nextDate };
    dispatchCustomEvent(this, "kuc:calendar-body-change-date", detail);
  }

  private _separateDateValue(value = this.value) {
    const dates = value.split("-");
    return {
      day: dates[2],
      month: dates[1],
      year: dates[0],
    };
  }

  private _getSelectedValue() {
    if (this._highlightItem) {
      return this._highlightItem.dataset.date || "";
    }
    if (this._selectedItem)
      return this._selectedItem.getAttribute("data-date") || "";

    return "";
  }

  private _getValueItemFocused() {
    if (this._focusedItem) {
      return this._focusedItem.getAttribute("data-date") || "";
    }
    return "";
  }

  private _getDateClass(dateParts: string[], isThisMonth: boolean) {
    if (isThisMonth) {
      const isToday = this._isToday(dateParts);
      if (isToday)
        return " kuc-base-datetime-calendar-body__table__date--selected--today";

      return "";
    }
    const isToday = this._isToday(dateParts);
    if (isToday)
      return " kuc-base-datetime-calendar-body__table__date--selected--today";
    return " kuc-base-datetime-calendar-body__table__date--other-month";
  }

  private _getDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = padStart(date.getMonth() + 1);
    const day = padStart(date.getDate());
    return `${year}-${month}-${day}`;
  }

  private _isSameDayOfMoment(dates: string[]) {
    const month = parseInt(dates[1], 10);
    const day = parseInt(dates[2], 10);
    const year = parseInt(dates[0], 10);
    let dateFocused = new Date().getDate();

    const currentDay = this.value.split("-")[2];
    if (!currentDay) return false;

    if (this.value) dateFocused = new Date(`${this.value}T00:00:00`).getDate();
    if (dateFocused === day && month === this._month) return true;
    const lastDayOfMonth = new Date(year, this._month, 0).getDate();
    if (
      dateFocused > lastDayOfMonth &&
      lastDayOfMonth === day &&
      month === this._month
    )
      return true;
    return false;
  }

  private _getHeaderItemsTemplate() {
    return html`
      <thead>
        <tr>
          ${this._locale.WEEK_DAYS.map((wday) => {
            return html`
              <th
                class="kuc-base-datetime-calendar-body__table__header"
                role="columnheader"
                abbr="${wday.abbr}"
              >
                ${wday.text}
              </th>
            `;
          })}
        </tr>
      </thead>
    `;
  }

  private _getDateItemsTemplate() {
    const displayingDates = getDisplayingDates(this._year, this._month - 1);
    const monthString = this._locale.MONTH_SELECT[this._month - 1];
    return html`
      <tbody>
        ${displayingDates.map((weeks) => {
          return html`
            <tr>
              ${weeks.map((weekDate: WeekDate) => {
                const dateParts = weekDate.text.split("-");
                const isSameDate = this._isSameDayOfMoment(dateParts);
                const isThisMonth = parseInt(dateParts[1], 10) === this._month;
                const isFocus =
                  (this.value === weekDate.attr || isSameDate) && isThisMonth;
                return html`
                  <td
                    role="gridcell"
                    class="kuc-base-datetime-calendar-body__table__date${isFocus
                      ? "--selected"
                      : ""}${this._getDateClass(dateParts, isThisMonth)}"
                    aria-selected="${this.value === weekDate.attr}"
                    tabindex="${isFocus ? "0" : "-1"}"
                    aria-current="${this._isToday(dateParts) ? "date" : false}"
                    aria-label="${dateParts[2]} ${monthString}"
                    data-date="${weekDate.attr}"
                    @click="${this._handleClickDate}"
                    @keydown="${this._handleKeyDownDate}"
                  >
                    ${dateParts[2] || ""}
                  </td>
                `;
              })}
            </tr>
          `;
        })}
      </tbody>
    `;
  }

  private _focusDateEl() {
    if (!this._focusedItem) return;
    this._focusedItem.focus({ preventScroll: true });
  }
}

if (!window.customElements.get("kuc-base-datetime-calendar-body")) {
  createStyleOnHeader(CALENDAR_BODY_CSS);
  window.customElements.define(
    "kuc-base-datetime-calendar-body",
    BaseDateTimeCalendarBody,
  );
}

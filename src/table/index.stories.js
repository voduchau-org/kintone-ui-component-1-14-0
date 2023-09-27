import { Checkbox } from "../checkbox";
import { DatePicker } from "../date-picker";
import { Dropdown } from "../dropdown";
import { MultiChoice } from "../multichoice";
import { RadioButton } from "../radio-button";
import { TextArea } from "../textarea";
import { TimePicker } from "../time-picker";

import { Table } from "./index.ts";

export default {
  title: "desktop/table",
  argTypes: {
    className: { name: "className" },
    id: { name: "id" },
    label: { name: "label" },
    data: { name: "data" },
    columns: { name: "columns" },
    headerVisible: { name: "headerVisible" },
    visible: { name: "visible" },
  },
  parameters: {
    actions: {
      handles: ["change"],
    },
  },
};

const renderAge = (cellData, rowData) => {
  const text = new TextArea({ value: cellData });
  text.style.cssText = `
    max-width: 350px;
  `;
  return text;
};

const renderName = (cellData, rowData, index) => {
  const dropdown = new Dropdown({
    items: [
      {
        label: "Nguyen Van A",
        value: "a",
      },
      {
        label: "Vo Duc Hau",
        value: "hau",
      },
    ],
    value: cellData,
    selectedIndex: 0,
  });
  const div = document.createElement("div");
  div.appendChild(dropdown);
  const a = new Dropdown({
    items: [
      {
        label: "Nguyen Hoang Anh",
        value: "a",
      },
      {
        label: "Vo Duc Hau",
        value: "hau",
      },
    ],
    value: cellData,
    selectedIndex: 0,
  });
  div.appendChild(a);
  return div;
};

const renderAddress = (cellData, rowData, index) => {
  const checkbox = new Checkbox({
    id: `address-${index}`,
    items: [
      {
        label: "VietNam",
        value: "vn",
      },
      {
        label: "Japan",
        value: "ja",
      },
    ],
    value: cellData,
  });
  return checkbox;
};

const renderDate = (cellData) => {
  const datePicker = new DatePicker({ value: cellData });
  return datePicker;
};

const renderTime = (cellData) => {
  const timePicker = new TimePicker({ value: cellData });
  return timePicker;
};

const renderGender = (cellData) => {
  const radioButton = new RadioButton({
    items: [
      { label: "male", value: "male" },
      { label: "female", value: "female" },
    ],
    value: cellData,
  });
  return radioButton;
};

const renderTest = (cellData) => {
  const div = document.createElement("div");
  div.style.cssText = `overflow-wrap: anywhere`;
  div.textContent = cellData;
  return div;
};

const renderMultiChoice = (cellData) => {
  const multichoice = new MultiChoice({
    items: [
      { label: "Orange", value: "orange" },
      { label: "Banana", value: "banana" },
      { label: "Tomato", value: "tomato" },
    ],
    value: cellData,
  });
  return multichoice;
};

const Template = (args) => {
  if (args.customCSS) {
    const style = document.createElement("style");
    style.id = "kuc-table-style";
    style.textContent = `
      .table-classname {
        --kuc-table-header-cell-width: 200px;
        --kuc-table-header-cell-3-width: 370px;
        --kuc-table-header-height: 50px;
        --kuc-table-header-color: #cecf1f;
        --kuc-table-header-font-size: 20px;
        --kuc-table-header-cell-background-color: #3f4b53;
      }
    `;
    document.head.appendChild(style);
  } else {
    document.getElementById("kuc-table-style")?.remove();
  }
  const table = new Table({ ...args });
  table.addEventListener("change", (event) => {
    console.log(event, "event");
  });
  return table;
};

// NOTES: Currently, storybook doesn't support the function type of args.
// https://storybook.js.org/docs/react/essentials/controls#annotation
// So please don't edit columns value on controls tab.
const columns = [
  {
    title: "Test",
    field: "test",
    requiredIcon: true,
    render: renderTest,
  },
  {
    title: "Name",
    field: "name",
    requiredIcon: true,
    render: renderName,
  },
  {
    title: "Address",
    field: "address",
    render: renderAddress,
  },
  {
    title: "Age",
    field: "age",
    render: renderAge,
  },
  {
    title: "Date",
    field: "date",
    render: renderDate,
  },
  {
    title: "Gender",
    field: "gender",
    render: renderGender,
  },
  {
    title: "Time",
    field: "time",
    render: renderTime,
  },
  {
    title: "Multichoice",
    field: "multichoice",
    render: renderMultiChoice,
  },
];

const data = [
  {
    name: "a",
    age: 32,
    date: "2021-03-31",
    time: "12:12",
    gender: "female",
    multichoice: ["banana", "tomato"],
    address: ["vn"],
    test: "Table component Table component Table component Table component Table component  SSR_3317_remove_overflow_on_Table_custom_css",
  },
  {
    name: "hau",
    age: 20,
    date: "2021-02-22",
    time: "13:13",
    gender: "male",
    multichoice: ["orange", "banana"],
    address: ["ja"],
    test: "Kintone UI Component allows you to create Kintone-like components easily. This library is useful to build Kintone customization and plug-in.",
  },
];

export const Base = Template.bind({});
Base.args = {
  customCSS: false,
  label: "Table component",
  headerVisible: true,
  visible: true,
  columns: columns,
  data: data,
  id: "table-id",
  className: "table-classname",
  actionButton: true,
};

---
id: checkbox
title: Checkbox
sidebar_label: Checkbox
---

## Overview

Checkbox は、複数選択のチェックボックスを表示します。

import { CheckboxComponent } from "@site/static/js/samples/desktop/checkbox.js"

<CheckboxComponent />

---

## Specification

### Property

使用できるプロパティの一覧です。プロパティを指定して値を更新することができます。

| Name | Type | Default | Description | Remark |
| :--- | :--- | :--- | :--- | :--- |
| className | string | "" | コンポーネントの class 名 ||
| error | string | "" | エラーに表示するテキスト | 未指定、あるいは空文字の場合、error は表示されない |
| id | string | "" | コンポーネントの id 名 ||
| itemLayout | string | "horizontal" | 選択肢の並べ方 | 以下を指定できる<br/>"horizontal" : 横並び<br/>"vertical" : 縦並び |
| label | string | "" | コンポーネントの説明ラベル | 未指定、あるいは空文字の場合、label は表示されない |
| borderVisible | boolean | true | 選択肢を囲う枠線の表示/非表示設定 ||
| disabled | boolean | false | コンポーネントの選択可/不可設定 ||
| requiredIcon | boolean | false | コンポーネントの必須アイコン表示/非表示設定 ||
| visible | boolean | true | コンポーネントの表示/非表示設定 ||
| items | Array<Item\> | [] | 表示する選択肢一覧 | items が配列以外の場合、エラーを出力する |
| Item.label | string | null | 各選択肢のテキスト | Item.label が未指定の場合、UI 上は Item.value の値が表示される |
| Item.value | string | null | 各選択肢の値 | Item.value に重複の値を指定できる |
| value *1 | Array<string\> | [] | 選択されている値 | value と selectedIndex が未指定の場合、何も選択されない<br/>重複する value を指定し、selectedIndex を指定しない場合、Item.value で最初にマッピングされた value の項目が選択され、selectedIndex にはその選択肢のインデックス番号が入る<br/>value が配列以外の場合、エラーを出力する |
| selectedIndex *1 | Array<Number\> | [] | 選択されている値のインデックス番号 | items 内に重複する Item.value がある場合、どの Item.value が選択されるか指定するためのプロパティ<br/>value が未指定で、selectedIndex に有効な値が指定されている場合、 そのインデックス番号の選択肢が選択される<br/>value に重複した Item.value が指定され、selectedIndex の値が value 内の重複した Item.value とマッピングした場合、そのインデックス番号の選択肢が選択される |

:::info
*1: value と Item.value に重複した値を指定できる。重複した値を指定する場合、value と selectedIndex プロパティを使って制御することができる。<br/>
例: `items = [{label: 'Orange', value: 'fruit'}, {label: 'Apple', value: 'fruit'}, {label: 'Carrot', value: 'vegetable'}, {label: 'Lemon', value: 'fruit'}]` を指定する

 - 以下のように value を指定、selectedIndex を未指定の場合:
   - value = ['fruit', 'vegetable']: 最初と 3番目の値が選択される。
   - value = ['meat', 'other']: 何も選択されない。

 - 以下のように value を未指定、selectedIndex を指定する場合:
   - selectedIndex = [0, 1]: 最初と 2番目の値が選択される。
   - selectedIndex = [98, 99]: 何も選択されない。

 - 以下のように value と selectedIndex を指定する場合:
   - value = ['fruit', 'vegetable'], selectedIndex = [1, 3]: 2番目と 3番目の値が選択される。
   - value = ['fruit', 'fruit', 'vegetable'], selectedIndex = [1, 3]: 2番目と 3番目と 4番目の値が選択される。
   - value = ['fruit', 'fruit'], selectedIndex = [1, 2, 3]: 最初と 2番目の値が選択される。<br/>
 ※ value と selectedIndex が同時に指定された場合、value の値が優先される。よって、上記の 1つ目と 3つ目の例において selectedIndex の 3 に当たる item は選択されない。
:::

### Event

指定できるイベントの一覧です。

| Name | Type | Description | Remark |
| :--- | :--- | :--- | :--- |
| change | function | 値が変更された時のイベントハンドラ | 引数には Event の event オブジェクトをとる<br/><br/>event.detail で以下の値を受け取ることができる<br/>event.detail.oldValue : 変更前の value の値<br/>event.detail.value : 変更後の value の値 |

### Constructor

Checkbox(options)<br/>
使用できるコンストラクタの一覧です。

#### Parameter

| Name | Type | Default | Description | Remark |
| :--- | :--- | :--- | :--- | :--- |
| options | object | {} | コンポーネントのプロパティを含むオブジェクト | |

---

## Sample Code

全てのパラメータを指定した場合のサンプルコードです。

```javascript
const space = kintone.app.record.getSpaceElement('space');
const checkbox = new Kuc.Checkbox({
  label: 'Fruit',
  requiredIcon: true,
  items: [
    {
      label: 'orange',
      value: 'Orange'
    },
    {
      label: 'apple',
      value: 'Apple'
    }
  ],
  value: ['Orange'],
  selectedIndex: [0],
  itemLayout: 'horizontal',
  error: 'Error occurred!',
  className: 'options-class',
  id: 'options-id',
  visible: true,
  disabled: false,
  borderVisible: true
});
space.appendChild(checkbox);

checkbox.addEventListener('change', event => {
  console.log(event);
});
```

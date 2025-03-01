---
id: notification
title: Notification
sidebar_label: Notification
---

## Overview

Notification は、ポップアップの通知を表示します。

import { NotificationComponent } from "@site/static/js/samples/desktop/notification.js"

<NotificationComponent />

---

## Specification

### Property

使用できるプロパティの一覧です。プロパティを指定して値を更新することができます。

| Name | Type | Default | Description | Remark |
| :--- | :--- | :--- | :--- | :--- |
| className | string | "" | コンポーネントの class 名 ||
| text | string | "" | 表示するテキスト ||
| type | string | "danger" | 背景色 | 以下を指定できる<br/>"danger" : Red(#e74c3c)<br/>"info" : Blue(#3498db)<br/>"success" : Green(#91c36c) |
| duration | number | -1 | コンポーネントを閉じるまでのミリ秒 | 単位はミリ秒<br/>0以上の数値を指定できる<br/>もし不正な値を指定した場合（0未満もしくは数値以外）、コンポーネントは開かれたまま自動的には閉じない |

### Event

指定できるイベントの一覧です。

| Name | Type | Description | Remark |
| :--- | :--- | :--- | :--- |
| close | function | コンポーネントが閉じられた時のイベントハンドラ | 引数には Event の event オブジェクトをとる |

### Constructor

Notification(options)<br/>
使用できるコンストラクタの一覧です。

#### Parameter
| Name | Type | Default | Description | Remark |
| :--- | :--- | :--- | :--- | :--- |
| options | object | {} | コンポーネントのプロパティを含むオブジェクト | |

### Method

使用できるメソッドの一覧です。

#### open()
Notification を表示する

##### Parameter
none

##### Return
none

#### close()
Notification を非表示にする

##### Parameter
none

##### Return
none

---
## Sample Code

:::tip
[導入と実装方法](../../getting-started/quick-start.md#導入と実装方法) をご確認ください。
:::

全てのパラメータを指定した場合のサンプルコードです。

```javascript
const Kuc = Kucs['1.x.x'];

const notification = new Kuc.Notification({
  text: 'Error occurred!',
  type: 'danger',
  className: 'options-class',
  duration: 2000
});

notification.addEventListener('close', event => {
  console.log(event);
});

notification.open();
notification.close();
```

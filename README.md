[![npm version](https://img.shields.io/npm/v/x-boost)](https://www.npmjs.com/package/x-boost)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# &lt;x-boost&gt;

<img src="https://rnd-pro.com/svg/x-boost/index.svg" width="200" alt="x-boost">

## Low-code approach fully compatible with the mature development practices

Simple but powerful extension set for the native HTML.

We believe that web development should be accessible for higher range of specialists, not for the experienced developers only.
We trying to extend the most simple parts of the web platform to make it able to solve more tasks.

**HTML as the low-code platform** - is the main idea of &lt;x-boost&gt; library.

## Quick start

The easiest way to try &lt;x-boost&gt; is to create a simple `html` file in your text editor and connect the &lt;x-boost&gt; base class from web:

## Browser support

&lt;x-boost&gt; is supported and tested in all major modern desktop and mobile browsers:

* Chrome
* Firefox
* Safari
* Edge
* Opera
* etc.

**If you have questions or proposals - welcome to [x-boost Discussions](https://github.com/rnd-pro/x-boost/discussions)!** ❤️

## X-IMPORT

```html
<x-import src="./document.html"></x-import>
```

## X-MD

```html
<x-md src="./doc.md"></x-md>
```

## X-JSDA

```html
<x-jsda src="./document.html.js"></x-jsda>
```

## X-LIST

```html
<x-list data-src="./data.json" template="./list-item.html"></x-list>
```

OR:

```html
<template id="item-tpl">
  <div class="list-item">
    <div>{{name}}</div>
    <div>{{age}}</div>
    <div>{{city}}</div>
  </div>
</template>

<x-list data-src="./data.json" template-id="item-tpl"></x-list>
```


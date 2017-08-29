# Validate Object Props
> A simple function to validate if nested object properties exist.

## Why

When you have to deal with big objects which have nested properties, you always have to properly check if the property exits.

So probably you will end up a code like below:

```javascript
if (me && me.x && me.x.y && me.x.y.z === 'something') {
  // hopefully come here without any exception
}
```

Otherwise you may get `Uncaught TypeError: Cannot read property 'y' of undefined` or `Uncaught TypeError: Cannot read property 'z' of null` exceptions.

## Installation

```
npm install validate-object-props --save
```

or

```
yarn add validate-object-props
```

## Usage
```javascript
import validateObjectProps from 'validate-object-props';

const me = {x: {y: {z: "I'm here"}}};

if (validateObjectProps(() => me.x.y.z)) {
  // you can safely call all properties.
  console.log("This is going to work", me.x.y.z);
}

if (validateObjectProps(() => me.a.b.c)) {
  console.log("This is not going to work since a doesn't exists");
} 
```

If you don't prefer to use ES6 for a reason, you can use the syntax below:

```javascript
var validateObjectProps = require('validate-object-props');

var me = {x: {y: {z: "I'm here"}}};

if (validateObjectProps(function() { return me.x.y.z})) {
  // you can safely call all properties.
  console.log("This is going to work", me.x.y.z);
}

if (validateObjectProps(function() { return me.a.b.c})) {
  console.log("This is not going to work since a doesn't exists");
} 
```

## How it works

Javascript objects are evaluated on runtime. So if you return your object statement in a callback function, that statement is not going to be evaluated until callback function is invoked.

So this function just wraps the callback function inside a try catch statement. If it catches the exception returns false.

TL,DR;

```javascript
exports.validateObjectProps = function(cb) {
  try {
    return cb();
  } catch (e) {
    return false;
  }
};
```

## Licence (MIT)

```
MIT License

Copyright (c) 2017 Mehmet Yatkı, mehmet@yatki.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
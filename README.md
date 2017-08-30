# Try to Validate
> A simple function to validate if nested object properties exist.

## Why

### 1. Avoid writing long if conditions for object properties
When you have to deal with big objects which have nested properties, you always have to properly check if the property exits.

So probably you will end up a code like below:

```javascript
if (me && me.x && me.x.y && me.x.y.z === 'something') {
  // hopefully come here without any exception
}
```

Otherwise you may get `Uncaught TypeError: Cannot read property 'y' of undefined` or `Uncaught TypeError: Cannot read property 'z' of null` exceptions.

### 2. Avoid passing inner object path as string

There is a few popular work arounds for this proplem actually. You can pass object and giving property path as a string or you can extend Object via prototype like here: 
See the topic: [JS object has property deep check](https://stackoverflow.com/questions/33444711/js-object-has-property-deep-check/33445095#33445095) 

However, when you pass inner object path as string you can't use your IDE's autocomplete support. 

## Installation

```
npm install try-to-validate --save
```

or

```
yarn add try-to-validate
```

## Usage
```javascript
import tryToValidate from 'try-to-validate';

const me = {x: {y: {z: "I'm here"}}};

if (tryToValidate(() => me.x.y.z)) {
  // you can safely call all properties.
  console.log("This is going to work", me.x.y.z);
}

if (tryToValidate(() => me.a.b.c)) {
  // Can't access here
} else {
  console.log("It's going to enter this block.");
  console.log("Uncaught TypeError: Cannot read property 'b' of undefined");
}
```

If you don't prefer to use ES6 for a reason, you can use the syntax below:

```javascript
var tryToValidate = require('try-to-validate');

var me = {x: {y: {z: "I'm here"}}};

if (tryToValidate(function() { return me.x.y.z})) {
  // you can safely call all properties.
  console.log("This is going to work", me.x.y.z);
}

if (tryToValidate(function() { return me.a.b.c})) {
  // Can't access here
} else {
  console.log("It's going to enter this block.");
  console.log("Uncaught TypeError: Cannot read property 'b' of undefined");
}
```

## How it works

Javascript objects are evaluated on runtime. So if you return your object statement in a callback function, that statement is not going to be evaluated until callback function is invoked.

So this function just wraps the callback function inside a try catch statement. If it catches the exception returns false.

## Performance

When it comes to performance, it's hard to say which approach is better. 

On my tests **if the object properties exist and the statement is successful** I noticed using try/catch is **faster** than spliting string to keys and checking if keys exist in the object.

But if the property doesn't exist at some point, prototype approach returns the result faster.

See the test yourself: [https://jsfiddle.net/yatki/382qoy13/2/](https://jsfiddle.net/yatki/382qoy13/2/) 

```
try/catch average on successful match: 0.0004890000000001464
prototype average on successful match: 0.0016609999999999219
try/catch average on failed match: 0.006114000000000237
prototype average on failed match: 0.0007670000000000073

try/catch average on successful match: 0.000776999999999839
prototype average on successful match: 0.0017189999999998918
try/catch average on failed match: 0.0073909999999999055
prototype average on failed match: 0.0010010000000001582

try/catch average on successful match: 0.0005130000000001587
prototype average on successful match: 0.0014160000000001446
try/catch average on failed match: 0.00665100000000009
prototype average on failed match: 0.0008019999999999186

try/catch average on successful match: 0.000561000000000081
prototype average on successful match: 0.0014359999999998764
try/catch average on failed match: 0.00575400000000011
prototype average on failed match: 0.0008070000000000391

try/catch average on successful match: 0.0008199999999998909
prototype average on successful match: 0.00160899999999981
try/catch average on failed match: 0.006409000000000162
prototype average on failed match: 0.000776000000000181
```

So both solutions have their disadvantages and advantages depending on your logic. 

Let's say, you know you'll have the properties most of the time in your response object from api. However, you want to validate if properties exist (just in case for not breaking the app), then using this function can be more useful. 

I'm currently looking for a way to improve these results. Any contribution is welcome :) 

## TL;DR

```javascript
'use strict';
module.exports = function(cb) {
  try {
    return cb();
  } catch (e) {
    return false;
  }
};
```

## Warnings 

- Be careful when you use `this` inside `arrow functions`. See: [http://es6-features.org/#Lexicalthis](http://es6-features.org/#Lexicalthis)
- Don't use **exception handling** for your custom logic unless you really know what you are doing. 
This library **doesn't intend to suppress exceptions**. 
It's just for writing shorter conditions when you need to compare objects.
 
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
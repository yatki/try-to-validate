# Try to Validate 
> A simple function to validate if nested object properties exist.

[![NPM version](https://badge.fury.io/js/try-to-validate.svg)](https://www.npmjs.com/package/try-to-validate)
[![npm](https://img.shields.io/npm/dt/try-to-validate.svg)](https://www.npmjs.com/package/try-to-validate)

## Why

### 1. Avoid writing long if conditions for object properties
When you have to deal with big objects which have nested properties, you always have to properly check if the property exits.

So instead of writing something like this:

```javascript
if (me && me.x && me.x.y && me.x.y.z === 'something') {
  // we had to do 3 property checks just to get here
  // I'm not metioning you'll have property names "longer" than 1 character.
  // So imagine how long this if statement can get sometimes.
}
```

Write something like this:

```javascript
if (tryToValidate(() =>  me.x.y.z === 'something')) {
  // do your magic here
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

## How it works

Javascript objects are evaluated on runtime. So if you return your object statement in a callback function, that statement is not going to be evaluated until callback function is invoked.

That's why you can't pass your object stament as parameter like in the example below:

```javascript
if (tryToValidate(me.x.y.z)) {
  // you can't reach here.
}
```

Because on this line: `if (tryToValidate(me.x.y.z)) {` your statement will be evaluated and `me.x.y.z` is going to cause the exception.

So, this function just wraps the callback function inside a try catch statement. If it catches the exception returns false.

## Performance

When it comes to performance, it's hard to say which approach is better. 

On my tests **if the object properties exist and the statement is successful** I noticed using try/catch can be 2x 3x times **faster** than spliting string to keys and checking if keys exist in the object.

But if the property doesn't exist at some point, prototype approach returns the result almost 7x times faster.

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

Let's say, you know you'll have the properties most of the time in your response object from api. 
However, you want to validate if properties exist (just to make sure app doesn't crash), then using this function can be more useful. 

I'm currently looking for a way to improve these results. Any contribution is welcome :) 

## Warnings 

- Be careful when you use `this` inside `arrow functions`. See: [http://es6-features.org/#Lexicalthis](http://es6-features.org/#Lexicalthis)
- Don't use **exception handling** for your custom logic unless you really know what you are doing. 
This library **doesn't intend to suppress exceptions**. 
It's just for writing shorter conditions when you need to compare objects.
 
## Contribution

As always, I'm open to any contribution and would like to hear your feedback. 

### Just an important reminder:

If you are planning to contribute to **any** open source project, 
before starting development, please **always open an issue** and **make a proposal first**. 
This will save you from working on features that are eventually going to be rejected for some reason.

## LICENCE

MIT (c) 2017 Mehmet Yatkı

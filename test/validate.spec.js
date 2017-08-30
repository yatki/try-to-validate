import test from 'ava';
import tryToValidate from '../index';

test('if properties exist, should return value', t => {
  const me = {x: {y: {z: "I'm here"}}};

  t.is(tryToValidate(() => me.x.y.z), "I'm here");
});

test('if condition match, should return true', t => {
  const me = {x: {y: {z: "I'm here"}}};

  t.is(tryToValidate(() => me.x.y.z === "I'm here"), true);
});

test('if condition match, should return bool', t => {
  const me = {x: {y: {z: "I'm here"}}};

  t.not(tryToValidate(() => me.x.y.z === "I'm here"), "I'm here");
});

test("if properties doesn't exist, should return false", t => {
  const me = {x: {y: {z: "I'm here"}}};

  t.is(tryToValidate(() => me.a.b.c), false);
});

test("if properties doesn't exist, should not return true", t => {
  const me = {x: {y: {z: "I'm here"}}};

  t.not(tryToValidate(() => me.a.b.c), true);
});
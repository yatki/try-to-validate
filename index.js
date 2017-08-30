'use strict';
module.exports = function(cb) {
  try {
    return cb();
  } catch (e) {
    return false;
  }
};
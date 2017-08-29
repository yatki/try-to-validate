exports.tryToValidate = function(cb) {
  try {
    return cb();
  } catch (e) {
    return false;
  }
};
exports.validateObjectProps = function(cb) {
  try {
    return cb();
  } catch (e) {
    return false;
  }
};
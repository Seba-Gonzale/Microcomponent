/**
 *
 * @param {*} _newSubscribers
 * @returns {[object Object], Array}
 */
function validateSubscribers(_newSubscribers) {
  //
  if (_newSubscribers instanceof Array && _newSubscribers.length !== 0) {
    return [..._newSubscribers];
    //
  } else if (
    Object.prototype.toString.call(_newSubscribers) === "[object Object]" &&
    Object.keys(_newSubscribers).length !== 0
  ) {
    return { ..._newSubscribers };
  }
}

export default validateSubscribers;

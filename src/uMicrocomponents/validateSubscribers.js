/**
 *
 * @param {*} _newGlobalData
 * @returns {[object Object], Array}
 */
function validateSubscribers(_newGlobalData) {
  //
  if (_newGlobalData instanceof Array && _newGlobalData.length !== 0) {
    // Asignamos a "aux" un objeto con solo los strings no vacíos del arreglo
    if (typeof _newGlobalData[0] === "string") {
      const aux = _newGlobalData.reduce((accumulator, element) => {
        if (typeof element === "string" && element !== "")
          accumulator[element] = undefined;
        return accumulator;
      }, {});
      // Si el objeto "aux" no está vacío, lo returna
      if (Object.keys(aux).length !== 0) return aux;
    } else {
      return _newGlobalData;
    }
    //
  } else if (
    Object.prototype.toString.call(_newGlobalData) === "[object Object]"
  ) {
    return _newGlobalData;
  }
}

export { validateSubscribers };

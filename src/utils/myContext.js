import { useState } from "react";

let list_get = {};
let list_set = { ALLWAYS: new Set() };

export default function myContext(_useState, _propertyNames) {
  // function myContext(_useState, _propertyNames) {
  //
  function initialValue(_propertyN) {
    if (_propertyN === undefined) return;
    //
    else if (_propertyN instanceof Array && _propertyN.length !== 0) {
      _propertyN.forEach((keyName) => {
        if (keyName in list_get || keyName === "") return;
        //
        else list_get = { ...list_get, [keyName]: {} };
      });
    } else if (
      _propertyN instanceof Object &&
      Object.keys(_propertyN).length !== 0
    ) {
      Object.keys(_propertyN).forEach((key) => {
        if (key in list_get) return;
        //
        else list_get = { ...list_get, [key]: _propertyN[key] };
      });
    }
  }

  function addFunctionsToRenderList(_propertyN, _useS) {
    //
    function addNonExistentFunctions(_propertyN, _useS) {
      _propertyN.forEach((keyName) => {
        //
        if (keyName === "") return;
        if (keyName in list_set) {
          if (!list_set[keyName].has(_useS.f)) {
            list_set[keyName].add(_useS.f);
          }
        } else {
          list_set = { ...list_set, [keyName]: new Set([_useS.f]) };
        }
      });
    }

    function addInAllways(_useS) {
      if (!list_set.ALLWAYS.has(_useS.f)) {
        list_set.ALLWAYS.add(_useS.f);
      }
    }

    if (_propertyN === undefined) {
      addInAllways(_useS);
    } else if (_propertyN instanceof Array && _propertyN.length !== 0) {
      addNonExistentFunctions(_propertyN, _useS);
    } else if (
      _propertyN instanceof Object &&
      Object.keys(_propertyN).length !== 0
    ) {
      addNonExistentFunctions(Object.keys(_propertyN), _useS);
    }
  }

  function set(_values) {
    if (
      _values === undefined ||
      _values instanceof Array ||
      Object.keys(_values).length === 0
    )
      return;

    let aux_functionSet = new Set();

    Object.keys(_values).forEach((key) => {
      if (key in list_get) {
        list_get[key] = _values[key];
      } else {
        list_get = { ...list_get, [key]: _values[key] };
      }

      if (key in list_set) {
        aux_functionSet = [...aux_functionSet, ...list_set[key]];
      }
    });
    aux_functionSet = [...aux_functionSet, ...list_set.ALLWAYS];
    [...aux_functionSet].forEach((f) => f({ ...list_get }));
  }

  function getSetSwitchPerProperty(_propertyN) {
    let aux_object = {};

    function findAndLoadSwitches(_proN) {
      _proN.forEach((keyName) => {
        if (keyName in list_get)
          aux_object = {
            ...aux_object,
            [keyName]: getAndSetOfAProperty(keyName),
          };
      });
    }

    if (_propertyN === undefined) return;
    else if (_propertyN instanceof Array && _propertyN.length !== 0) {
      findAndLoadSwitches(_propertyN);
    } else if (
      _propertyN instanceof Object &&
      Object.keys(_propertyN).length !== 0
    ) {
      findAndLoadSwitches(Object.keys(_propertyN));
    }
    if (Object.keys(aux_object).length !== 0) return aux_object;
  }

  function getAndSetOfAProperty(_propertyName) {
    const propertyName = _propertyName;

    function getAndSet(_newValue) {
      // console.log(propertyName);
      // console.log(list_get);
      if (_newValue === undefined) return list_get[propertyName];

      let aux_functionSet = new Set();

      if (propertyName in list_get) {
        list_get[propertyName] = _newValue;
      } else {
        list_get = { ...list_get, [propertyName]: _newValue };
      }

      if (propertyName in list_set) {
        aux_functionSet = [...aux_functionSet, ...list_set[propertyName]];
      }

      aux_functionSet = [...aux_functionSet, ...list_set.ALLWAYS];
      [...aux_functionSet].forEach((f) => f({ ...list_get }));
    }
    return getAndSet;
  }

  /*  Inicio de la ejecucion del codigo */
  let get = { ...list_get };
  if (_useState === undefined) return { get, set };

  if (_useState === useState) {
    //
    initialValue(_propertyNames);
    const useS = {};
    [useS.v, useS.f] = _useState({ ...list_get });
    addFunctionsToRenderList(_propertyNames, useS);
    get = useS.v;
    return getSetSwitchPerProperty(_propertyNames) ?? { get, set };
    //
  } else {
    //
    initialValue(_useState);
    return getSetSwitchPerProperty(_useState) ?? { get, set };
  }
}

// const [get, set] = myContext({ team: ["perro", "gato"] });
// console.log(["hola"].map((v) => false));

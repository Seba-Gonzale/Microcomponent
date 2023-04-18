import { useState } from "react";

// Aquí se guardan todos los datos inicializados y seteados
let g_dataList = {};
// Aquí se guardan las funciones retornadas por el useState() con el nombre de propiedad que recibe myContext
// para renderizar solo los componentes que esten consumiendo el valor de dicha propiedad
let g_functionList = {};
// Las funciones getAndSet que se guardan en "g_getAndSet_list" facilitan la manipulacion de los valores
// de las propiedades de "g_dataList" en el codigo donde retornan dichas funciones
let g_getAndSet_list = {};

export default function myContext(_useState, _propertyNames, _viewMode) {
  //
  function initializeValues(_validProperties, _dataList) {
    //
    return Object.keys(_validProperties).reduce((acc_dList, property) => {
      if (!(property in acc_dList))
        acc_dList = { ...acc_dList, [property]: _validProperties[property] };
      return acc_dList;
    }, _dataList);
  }

  function initializeNewSetAndGet(_validProperties, _getAndSet_list) {
    //
    return Object.keys(_validProperties).reduce((acc_getAsetList, property) => {
      if (!(property in acc_getAsetList))
        acc_getAsetList = {
          ...acc_getAsetList,
          [property]: getAndSetOfAProperty(property),
        };
      return acc_getAsetList;
    }, _getAndSet_list);
  }

  function addToRenderByProperty(_validProperties, _useS, _functionList) {
    //
    return Object.keys(_validProperties).reduce((acc_fList, property) => {
      if (property in acc_fList) {
        if (!acc_fList[property].has(_useS.f)) {
          acc_fList[property].add(_useS.f);
        }
      } else {
        acc_fList = { ...acc_fList, [property]: new Set([_useS.f]) };
      }
      return acc_fList;
    }, _functionList);
  }

  function set(_object) {
    if (
      _object === undefined ||
      _object instanceof Array ||
      Object.keys(_object).length === 0
    )
      return;

    let aux_toRender = new Set();
    let aux_dataList = { ...g_dataList };
    let aux_functionList = { ...g_functionList };
    let aux_getAndSet_list = { ...g_getAndSet_list };

    Object.keys(_object).forEach((property) => {
      if (property in aux_dataList) {
        if (aux_dataList[property] !== _object[property]) {
          aux_dataList[property] = _object[property];
          if (property in aux_functionList) {
            aux_toRender = [...aux_toRender, ...aux_functionList[property]];
          }
        }
      } else {
        aux_dataList = { ...aux_dataList, [property]: _object[property] };
        aux_getAndSet_list = {
          ...aux_getAndSet_list,
          [property]: getAndSetOfAProperty(property),
        };
        if (property in aux_functionList) {
          aux_toRender = [...aux_toRender, ...aux_functionList[property]];
        }
      }
    });
    [...aux_toRender].forEach((f) => f({ ...aux_dataList }));

    g_dataList = aux_dataList;
    g_functionList = aux_functionList;
    g_getAndSet_list = aux_getAndSet_list;

    return { ...g_dataList };
  }

  function getAndSet_initialized(_validProperties, _getAndSet_list) {
    return Object.keys(_validProperties).reduce((acc_getAsetList, property) => {
      acc_getAsetList = {
        ...acc_getAsetList,
        [property]: _getAndSet_list[property],
      };
      return acc_getAsetList;
    }, {});
  }

  function getAndSetOfAProperty(_propertyName) {
    const propertyName = _propertyName;

    function getAndSet(_newValue) {
      //
      if (_newValue === undefined) return g_dataList[propertyName];

      let aux_toRender = new Set();
      let aux_functionList = { ...g_functionList };
      let aux_dataList = { ...g_dataList };

      if (propertyName in aux_dataList) {
        if (aux_dataList[propertyName] !== _newValue) {
          aux_dataList[propertyName] = _newValue;
          if (propertyName in aux_functionList) {
            aux_toRender = [...aux_toRender, ...aux_functionList[propertyName]];
          }
        }
      } else {
        aux_dataList = { ...aux_dataList, [propertyName]: _newValue };
        if (propertyName in aux_functionList) {
          aux_toRender = [...aux_toRender, ...aux_functionList[propertyName]];
        }
      }
      [...aux_toRender].forEach((f) => f({ ...aux_dataList }));

      g_dataList = aux_dataList;
      g_functionList = aux_functionList;

      return g_dataList[propertyName];
    }
    return getAndSet;
  }

  function getValidProperties(_propertyNames) {
    //
    if (_propertyNames instanceof Array && _propertyNames.length !== 0) {
      // Asignamos a "aux" un objeto con solo los strings no vacíos del arreglo
      const aux = _propertyNames.reduce((accumulator, element) => {
        if (typeof element === "string" && element !== "")
          accumulator[element] = undefined;
        return accumulator;
      }, {});
      // Si el objeto "aux" no está vacío, lo returna
      if (Object.keys(aux).length !== 0) return aux;
      //
    } else if (
      _propertyNames instanceof Object &&
      Object.keys(_propertyNames).length !== 0
    ) {
      if ("_$_" in _propertyNames) {
        const aux_object = getValidProperties(_propertyNames._$_);
        if (aux_object !== undefined)
          return { ..._propertyNames, ...aux_object };
      }
      return _propertyNames;
    }
  }

  // * Inicio de la ejecucion del codigo *****************/

  if (_useState === undefined) return { ...g_getAndSet_list };
  if (typeof _useState === "boolean" && _useState)
    return { get: { ...g_dataList }, set };

  if (_useState === useState) {
    //
    const validProperties = getValidProperties(_propertyNames);
    const useS = {};

    if (validProperties) {
      g_dataList = initializeValues(validProperties, { ...g_dataList });
      g_getAndSet_list = initializeNewSetAndGet(validProperties, {
        ...g_getAndSet_list,
      });
      [useS.v, useS.f] = _useState({ ...g_dataList });
      g_functionList = addToRenderByProperty(validProperties, useS, {
        ...g_functionList,
      });
      return _viewMode
        ? { get: { ...g_dataList }, set }
        : getAndSet_initialized(validProperties, { ...g_getAndSet_list });
    } else {
      throw new Error("Invalid Object or Array");
    }
    //
  } else {
    //
    const validProperties = getValidProperties(_useState);

    if (validProperties) {
      g_dataList = initializeValues(validProperties, { ...g_dataList });
      g_getAndSet_list = initializeNewSetAndGet(validProperties, {
        ...g_getAndSet_list,
      });
      return typeof _propertyNames === "boolean" && _propertyNames
        ? { get: { ...g_dataList }, set }
        : getAndSet_initialized(validProperties, { ...g_getAndSet_list });
    } else {
      throw new Error("Invalid Object or Array");
    }
  }
}

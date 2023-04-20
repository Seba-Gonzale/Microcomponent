import React, { useState } from "react";

/**
 * @function createNewGlobalContext
 * @returns {function} useGlobalContext - función manejadora de datos y estados de componentes de React Js
 * */
function createNewGlobalContext() {
  // Almacena los datos pasados a la función useGlobalContext()
  let g_dataList = {};

  // Alamacena una copia de g_dataList que será publica y restablecida con los datos integros de g_dataList si ésta es modificada
  let g_publicDataList = {};

  // Almacena las funciones que retorna el paramatro _useState_function() de useGlobal()
  let g_renderList = {};

  // Almacena las funciones que cambian los datos de g_dataList y ejecutan las funciones del g_renderList
  let g_getSetValue_list = {};

  function useGlobalContext(_useState_function, _newGlobalData, _viewMode) {
    //
    function integrityOf_getSetValue_list(_dataList, g_getSetValue_list) {
      Object.keys(g_getSetValue_list).forEach((key) => {
        if (!(key in _dataList)) delete g_getSetValue_list[key];
      });
    }
    function integrityOf_g_publicDataList(_dataList, g_publicDataList) {
      Object.keys(g_publicDataList).forEach((key) => {
        if (!(key in _dataList)) delete g_publicDataList[key];
      });
    }
    //
    function initializeValues(_validProperties, _dataList, g_publicDataList) {
      //
      return Object.keys(_validProperties).reduce((acc_dList, key) => {
        //
        if (!(key in acc_dList)) {
          // se añade la nueva propiedad a acc_dList
          acc_dList = { ...acc_dList, [key]: _validProperties[key] };
          // se añade la nueva propiedad a g_publicDataList
          Object.defineProperty(g_publicDataList, key, {
            value: _validProperties[key],
            writable: false,
            configurable: true,
            enumerable: true,
          });
        }
        return acc_dList;
      }, _dataList);
    }

    function initializeNew_getSetValue(_validProperties, g_getSetValue_list) {
      //
      Object.keys(_validProperties).forEach((key) => {
        //
        if (!(key in g_getSetValue_list)) {
          // Agregamos una nueva propiedad al objeto g_getSetValue_list,
          // que no se puede modificar ni eliminar, con una f(x) como su valor
          Object.defineProperty(g_getSetValue_list, key, {
            value: create_getSetValue_function(key),
            enumerable: true,
          });
        }
      });
    }

    function addToRenderList(_validProperties, _useFunction, _renderList) {
      //
      return Object.keys(_validProperties).reduce((acc_fList, key) => {
        //
        if (key in acc_fList) {
          if (!acc_fList[key].has(_useFunction)) {
            acc_fList[key].add(_useFunction);
          }
        } else {
          acc_fList = { ...acc_fList, [key]: new Set([_useFunction]) };
        }
        return acc_fList;
      }, _renderList);
    }

    function set(_object) {
      if (_object === undefined)
        return console.log(new Error("An object was expected!"));
      else if (`${_object}` !== "[object Object]")
        return console.log(new Error("Invalid object!"));
      else if (Object.keys(_object).length === 0)
        return console.log(new Error("The object is empty!"));

      integrityOf_g_publicDataList({ ...g_dataList }, g_publicDataList);
      integrityOf_getSetValue_list(g_dataList, g_getSetValue_list);

      let aux_toRender = new Set();
      let aux_dataList = { ...g_dataList };
      let aux_renderList = { ...g_renderList };

      Object.keys(_object).forEach((key) => {
        if (key in aux_dataList) {
          if (aux_dataList[key] !== _object[key]) {
            // se añade el nuevo valor a la propiedad existente en el objeto aux_dataList
            aux_dataList[key] = _object[key];
            // se añade el nuevo valor a la propiedad inmutable existente en el objeto g_publicDataList
            Object.defineProperty(g_publicDataList, key, {
              value: _object[key],
              writable: false,
              configurable: true,
              enumerable: true,
            });
            if (key in aux_renderList) {
              aux_toRender = [...aux_toRender, ...aux_renderList[key]];
            }
          }
        } else {
          // se añade una nueva propiedad al objeto aux_dataList
          aux_dataList = { ...aux_dataList, [key]: _object[key] };
          // se añade una nueva propiedad al objeto g_publicDataList que no se puede modificar
          Object.defineProperty(g_publicDataList, key, {
            value: _object[key],
            writable: false,
            configurable: true,
            enumerable: true,
          });
          // Agregamos una nueva propiedad al objeto g_getSetValue_list que no se puede modificar ni eliminar.
          // contiene una f(x) como valor
          Object.defineProperty(g_getSetValue_list, key, {
            value: create_getSetValue_function(key),
            enumerable: true,
          });
          if (key in aux_renderList) {
            aux_toRender = [...aux_toRender, ...aux_renderList[key]];
          }
        }
      });
      [...aux_toRender].forEach((f) => f({ ...aux_dataList }));

      g_dataList = aux_dataList;
      g_renderList = aux_renderList;

      return { ...g_dataList };
    }

    function create_getSetValue_function(_key) {
      const key = _key;

      function getSetValue(_newValue) {
        integrityOf_g_publicDataList({ ...g_dataList }, g_publicDataList);
        integrityOf_getSetValue_list(g_dataList, g_getSetValue_list);
        //
        if (_newValue === undefined) return g_publicDataList[key];

        let aux_toRender = new Set();
        let aux_renderList = { ...g_renderList };
        let aux_dataList = { ...g_dataList };

        if (aux_dataList[key] !== _newValue) {
          aux_dataList[key] = _newValue;
          // se añade el nuevo valor a la propiedad inmutable existente en el objeto g_publicDataList
          Object.defineProperty(g_publicDataList, key, {
            value: _newValue,
            writable: false,
            configurable: true,
            enumerable: true,
          });
          if (key in aux_renderList) {
            aux_toRender = [...aux_toRender, ...aux_renderList[key]];
          }
        }
        // Rederiza todos los componentes que estén suscriptos a la propiedad actualizada
        [...aux_toRender].forEach((f) => f({ ...aux_dataList }));

        g_dataList = aux_dataList;
        g_renderList = aux_renderList;

        return g_dataList[key];
      }
      return getSetValue;
    }

    function getValidProperties(_newGlobalData) {
      //
      if (_newGlobalData instanceof Array && _newGlobalData.length !== 0) {
        // Asignamos a "aux" un objeto con solo los strings no vacíos del arreglo
        const aux = _newGlobalData.reduce((accumulator, element) => {
          if (typeof element === "string" && element !== "")
            accumulator[element] = () => console.warn("No hay valor");
          return accumulator;
        }, {});
        // Si el objeto "aux" no está vacío, lo returna
        if (Object.keys(aux).length !== 0) return aux;
        //
      } else if (
        _newGlobalData instanceof Object &&
        Object.keys(_newGlobalData).length !== 0
      ) {
        if ("_$_" in _newGlobalData) {
          const aux_object = getValidProperties(_newGlobalData._$_);
          if (aux_object !== undefined)
            return { ..._newGlobalData, ...aux_object };
        }
        return _newGlobalData;
      }
    }

    // * Inicio de la ejecucion del codigo *****************/
    integrityOf_g_publicDataList({ ...g_dataList }, g_publicDataList);
    integrityOf_getSetValue_list(g_dataList, g_getSetValue_list);

    if (_useState_function === undefined) return g_getSetValue_list;
    if (_useState_function === 0) return { get: g_publicDataList, set };
    // if (typeof _useState_function === "boolean" && _useState_function)
    //   return { get: { ...g_dataList }, set };

    // if (_useState_function === useState) {
    if (typeof _useState_function === "boolean" && _useState_function) {
      //
      const validProperties = getValidProperties(_newGlobalData);

      if (validProperties) {
        g_dataList = initializeValues(
          validProperties,
          { ...g_dataList },
          g_publicDataList
        );
        initializeNew_getSetValue(validProperties, g_getSetValue_list);
        const [useValue, useFunction] = useState({ ...g_dataList });
        g_renderList = addToRenderList(validProperties, useFunction, {
          ...g_renderList,
        });
        return typeof _viewMode === "boolean" && _viewMode
          ? { get: g_publicDataList, set }
          : g_getSetValue_list;
      } else {
        throw new Error("Invalid Object or Array");
      }
      //
    } else {
      const validProperties = getValidProperties(_useState_function);

      if (validProperties) {
        g_dataList = initializeValues(
          validProperties,
          { ...g_dataList },
          g_publicDataList
        );
        initializeNew_getSetValue(validProperties, g_getSetValue_list);
        return typeof _newGlobalData === "boolean" && _newGlobalData
          ? { get: g_publicDataList, set }
          : g_getSetValue_list;
      } else {
        throw new Error("invalid _newGlobalData");
      }
      //
    }
  }
  return useGlobalContext;
}

// Contexto en el que se manejaran los datos
const mainGlobalContext = createNewGlobalContext();

// Función que manejará los datos del contexto
function mainContext(_useState_function, _newGlobalData, _viewMode) {
  return mainGlobalContext(_useState_function, _newGlobalData, _viewMode);
}

export { mainContext };

// ? Se pueden crear tantos contextos como desee
// Otro contexto de ejemplo para manejar datos y estados de React Js
/* 
const ecommerceContext = createNewGlobalContext();

function useEcommerceContext(_useState_function, _newGlobalData, _viewMode) {
  return ecommerceContext(_useState_function, _newGlobalData, _viewMode);
}
export { useEcommerceContext}

*/

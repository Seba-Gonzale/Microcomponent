import React, { useState } from "react";

/**
 * @function createNewGlobalContext
 * @returns {function} useGlobal - función manejadora de datos y estados de componentes de React Js
 * */
function createNewGlobalContext() {
  //
  function update_g_publicDataList(g_publicDataList, _key, _validProperty) {
    Object.defineProperty(g_publicDataList, _key, {
      value: _validProperty,
      writable: false,
      configurable: true,
      enumerable: true,
    });
  }

  function integrityOf_getSetValue_list(_dataList, g_getSetValue_list) {
    Object.keys(g_getSetValue_list).forEach((key) => {
      if (!(key in _dataList)) delete g_getSetValue_list[key];
    });
  }

  function integrityOf_g_publicDataList(_dataList, g_publicDataList) {
    // se eliminan las propiedades de g_publicDataList que no ésten en _dataList
    Object.keys(g_publicDataList).forEach((key) => {
      if (!(key in _dataList)) delete g_publicDataList[key];
    });
    // se agregan las propiedades de _dataList que g_publicDataList no tiene
    Object.keys(_dataList).forEach((key) => {
      if (!(key in g_publicDataList))
        update_g_publicDataList(g_publicDataList, key, _dataList[key]);
    });
  }

  function create_getSetValue_function(_key) {
    const key = _key;

    function getSetValue(_newValue) {
      integrityOf_g_publicDataList({ ...g_dataList }, g_publicDataList);
      integrityOf_getSetValue_list({ ...g_dataList }, g_getSetValue_list);
      //
      if (_newValue === undefined) return g_dataList[key];

      let aux_toRender = new Set();
      let aux_renderList = { ...g_renderList };
      let aux_dataList = { ...g_dataList };

      if (aux_dataList[key] !== _newValue) {
        aux_dataList[key] = _newValue;
        // se añade el nuevo valor a la propiedad inmutable existente en el objeto g_publicDataList
        update_g_publicDataList(g_publicDataList, key, _newValue);

        if (key in aux_renderList) {
          aux_toRender = [...aux_toRender, ...aux_renderList[key]];
        }
      }
      // Rederiza todos los componentes que estén suscriptos a la propiedad actualizada
      [...aux_toRender].forEach((f) => f({ ...aux_dataList }));

      g_dataList = aux_dataList;
      g_renderList = aux_renderList;

      if (g_debug) console.log(g_dataList);
      return g_dataList[key];
    }
    return getSetValue;
  }

  function set(_object) {
    if (_object === undefined)
      return console.log(new Error("An object was expected!"));
    //
    else if (`${_object}` !== "[object Object]")
      return console.log(new Error("Invalid object!"));
    //
    else if (Object.keys(_object).length === 0)
      return console.log(new Error("The object is empty!"));

    integrityOf_g_publicDataList({ ...g_dataList }, g_publicDataList);
    integrityOf_getSetValue_list({ ...g_dataList }, g_getSetValue_list);

    let aux_toRender = new Set();
    let aux_dataList = { ...g_dataList };
    let aux_renderList = { ...g_renderList };

    Object.keys(_object).forEach((key) => {
      if (key in aux_dataList) {
        if (aux_dataList[key] !== _object[key]) {
          // se añade el nuevo valor a la propiedad existente en el objeto aux_dataList
          aux_dataList[key] = _object[key];
          // se añade el nuevo valor a la propiedad inmutable existente en el objeto g_publicDataList
          update_g_publicDataList(g_publicDataList, key, _object[key]);

          if (key in aux_renderList) {
            aux_toRender = [...aux_toRender, ...aux_renderList[key]];
          }
        }
      } else {
        // se añade una nueva propiedad al objeto aux_dataList
        aux_dataList = { ...aux_dataList, [key]: _object[key] };
        // se añade una nueva propiedad al objeto g_publicDataList que no se puede modificar
        update_g_publicDataList(g_publicDataList, key, _object[key]);

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

    if (g_debug) console.log(g_dataList);
    return g_publicDataList;
  }

  let g_debug = false;

  // Almacena los datos pasados a la función useGlobal()
  let g_dataList = {};

  // Alamacena una copia de g_dataList que será publica y restablecida con los datos integros de g_dataList si ésta es modificada
  let g_publicDataList = {};

  // Almacena las funciones que retorna useState() de useGlobal()
  let g_renderList = {};

  // Almacena las funciones que cambian los datos de g_dataList y ejecutan las funciones del g_renderList
  let g_getSetValue_list = {};
  // Agregamos las propiedades "_get_" y "_set_", de forma que no se puedan borrar, editar, ni listar en un bucle
  Object.defineProperties(g_getSetValue_list, {
    _get_: {
      value: g_publicDataList,
    },
    _set_: {
      value: set,
    },
  });

  /**
   *
   * @param { undefined|boolean|object|string[] } _subscribe
   * @param {*} _newGlobalData
   * @param {*} _viewMode
   * @returns
   */
  function context(_subscribe, _newGlobalData) {
    //

    function CreateNewStateFunction(_dataList) {
      const [newValue, newFunction] = useState();
      return newFunction;
    }

    function initializeValues(_validProperties, _dataList, g_publicDataList) {
      //
      return Object.keys(_validProperties).reduce((acc_dList, key) => {
        //
        if (!(key in acc_dList)) {
          // se añade la nueva propiedad a acc_dList
          acc_dList = { ...acc_dList, [key]: _validProperties[key] };
          // se añade la nueva propiedad a g_publicDataList
          update_g_publicDataList(g_publicDataList, key, _validProperties[key]);
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

    /**
     * @function validateProperties -  comprueba si las nuevas propiedades pueden ser procesadas por useGlobal
     * @param {*} _newGlobalData - propiedades a comprobar
     * @returns {undefined | object}
     */
    function validateProperties(_newGlobalData) {
      //
      if (_newGlobalData instanceof Array && _newGlobalData.length !== 0) {
        // Asignamos a "aux" un objeto con solo los strings no vacíos del arreglo
        const aux = _newGlobalData.reduce((accumulator, element) => {
          if (typeof element === "string" && element !== "")
            accumulator[element] = undefined;
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
          const aux_object = validateProperties(_newGlobalData._$_);
          if (aux_object !== undefined)
            return { ..._newGlobalData, ...aux_object };
        }
        return _newGlobalData;
      }
    }

    // * Inicio de la ejecucion del codigo *****************/
    // Verificamos que no se hayan agregado propiedades fuera de useGlobal() en g_publicDataList
    integrityOf_g_publicDataList({ ...g_dataList }, g_publicDataList);
    // Verificamos que no se hayan agregado propiedades fuerade useGlobal() en g_getSetValue_list
    integrityOf_getSetValue_list({ ...g_dataList }, g_getSetValue_list);

    if (_subscribe === undefined) return g_getSetValue_list;
    if (_subscribe === "debug") {
      if (g_debug === false) {
        g_debug = "true";
        console.info("---Debugging On---");
        console.log(g_dataList);
      }
      return;
    }

    if (typeof _subscribe === "boolean" && _subscribe) {
      // if (_subscribe === useState) {
      //
      const validProperties = validateProperties(_newGlobalData);

      if (validProperties) {
        g_dataList = initializeValues(
          validProperties,
          { ...g_dataList },
          g_publicDataList
        );
        initializeNew_getSetValue(validProperties, g_getSetValue_list);
        // const newStateFunction = CreateNewStateFunction()
        // const useStateValuePair = newStateFunction({ ...g_dataList });
        g_renderList = addToRenderList(
          validProperties,
          CreateNewStateFunction({ ...g_dataList }),
          {
            ...g_renderList,
          }
        );
        return g_getSetValue_list;
      } else {
        throw new Error("Invalid Object or Array");
      }
      //
    } else if (_subscribe === "new") {
      return createNewGlobalContext();
    } else {
      const validProperties = validateProperties(_subscribe);

      if (validProperties) {
        g_dataList = initializeValues(
          validProperties,
          { ...g_dataList },
          g_publicDataList
        );
        initializeNew_getSetValue(validProperties, g_getSetValue_list);
        return g_getSetValue_list;
      } else {
        throw new Error("invalid _newGlobalData");
      }
      //
    }
  }
  return context;
}

// se crea un nuevo contexto en el que se manejaran los datos
const uGlobal = createNewGlobalContext();
// Función que manejará los datos del contexto
// function uGlobal(_keepComponentUpdated, _newGlobalData, _viewMode) {
//   if (typeof _keepComponentUpdated === "boolean" && _keepComponentUpdated)
//     _keepComponentUpdated = useState;
//   return mainContext(_keepComponentUpdated, _newGlobalData, _viewMode);
// }

export default uGlobal;

/** Emjemplo de otro contexto abajo*/

// const ecommerceContext = createNewGlobalContext();
// function useEcommerceContext(_keepComponentUpdated, _newGlobalData, _viewMode) {
//   return ecommerceContext(_keepComponentUpdated, _newGlobalData, _viewMode);
// }
// export { useEcommerceContext}

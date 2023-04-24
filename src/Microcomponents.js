import { useState } from "react";
function createListOfMicrocomponents() {
  let g_dataList = {};
  let g_subscriptions = {};
  let g_renderList = {};
  function uMicrocomponents(_subscribers) {
    function validateSubscribers(_subscribers) {
      //
      if (_subscribers instanceof Array && _subscribers.length !== 0) {
        // Asignamos a "aux" un objeto con solo los strings no vacíos del arreglo
        const aux = _subscribers.reduce((accumulator, element) => {
          if (typeof element === "string" && element !== "")
            accumulator[element] = undefined;
          return accumulator;
        }, {});
        // Si el objeto "aux" no está vacío, lo returna
        if (Object.keys(aux).length !== 0) return aux;
        //
      } else if (
        _subscribers instanceof Object &&
        Object.keys(_subscribers).length !== 0
      ) {
        if ("_$_" in _subscribers) {
          const aux_object = validateSubscribers(_subscribers._$_);
          if (aux_object !== undefined)
            return { ..._subscribers, ...aux_object };
        }
        return _subscribers;
      }
    }

    function addToRenderList(_useFunction, _key) {
      g_renderList[_key].add(_useFunction);
    }

    function getValue(_key) {
      return g_dataList[_key];
    }

    function setValue(_newValue, _key) {
      if (g_dataList[_key] !== _newValue) {
        g_dataList[_key] = _newValue;
        [...g_renderList[_key]].forEach((useFunction) => {
          useFunction(true);
        });
      }
    }

    function Microcomponent({ _key }) {
      const [v, useFunction] = useState();
      if (!v) addToRenderList(useFunction, _key);
      return <>{g_dataList[_key]}</>;
    }

    function createGetAndSet(_object, _key) {
      Object.defineProperties(_object, {
        value: {
          get: () => getValue(_key),
          set: (newValue) => setValue(newValue, _key),
        },
        microComp: {
          get: () => <Microcomponent _key={_key} />,
        },
        v: {
          get: () => getValue(_key),
          set: (newValue) => setValue(newValue, _key),
        },
        mC: {
          get: () => <Microcomponent _key={_key} />,
        },
      });
    }

    function initializeValues(_dataList, _validSubscribers) {
      //
      return Object.keys(_validSubscribers).reduce((acc_dList, key) => {
        //
        if (!(key in acc_dList)) {
          if (`${_validSubscribers[key]}` === "[object Object]") {
            acc_dList[key] = createListOfMicrocomponents()({
              ..._validSubscribers[key],
            });
            Object.defineProperty(g_subscriptions, [key], {
              value: acc_dList[key],
              enumerable: true,
            });
          } else {
            acc_dList[key] = _validSubscribers[key];

            g_renderList[key] = new Set([]);

            Object.defineProperty(g_subscriptions, [key], {
              value: {},
              enumerable: true,
            });
            const newObject = g_subscriptions[key];
            createGetAndSet(newObject, key);
          }
        }
        return acc_dList;
      }, _dataList);
    }

    const validSubscribers = validateSubscribers(_subscribers);

    if (validSubscribers)
      g_dataList = initializeValues(g_dataList, validSubscribers);

    return { ...g_subscriptions };
  }
  return uMicrocomponents;
}
const uMicrocomponents = createListOfMicrocomponents();
export default uMicrocomponents;

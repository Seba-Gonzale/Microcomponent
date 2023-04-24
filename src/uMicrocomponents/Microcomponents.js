// import { useState } from "react";
import { validateSubscribers } from "./validateSubscribers";
import { addNewValues } from "./addNewValues";
import { addNewConsumableValues } from "./addNewConsumableValues";
import inicializeVariables from "./inicializeVariables";

export const _NEW_ = "N*-_#$E*-_%W";
function createListOfMicrocomponents() {
  // * Es obligatorio inicializar como objeto
  let g_dataList;
  // * Es obligatorio inicializar como objeto
  let g_publicDataList;
  // * Es obligatorio inicializar como objeto
  let g_mCRenderList = {};
  // * Es obligatorio inicializar como objeto
  // let g_renderList = {};

  function uMicrocomponents(_subscribers) {
    // if (typeof _subscribers[0] === "boolean" && !_subscribers[0]) {
    // }
    // if (typeof _subscribers[0] === "string") {
    // }

    const validSubscribers = validateSubscribers(_subscribers);

    if (validSubscribers) {
      if (g_dataList === undefined) {
        g_dataList = inicializeVariables(validSubscribers);
        g_publicDataList = inicializeVariables(validSubscribers);
      }
      addNewValues(validSubscribers, g_dataList);
      addNewConsumableValues(g_publicDataList, g_dataList, g_mCRenderList);
      return g_publicDataList;
    }
    if (_subscribers === _NEW_) {
      return createListOfMicrocomponents();
    } else {
      // ! Terminar
      g_publicDataList = {};
      g_dataList = _subscribers;
      Object.defineProperties(g_publicDataList, {
        value: {
          get: () => g_dataList,
          set: (value) => (g_dataList = value),
        },
        v: {
          get: () => g_dataList,
          set: (value) => (g_dataList = value),
        },
      });
      return g_publicDataList;
    }
  }

  return uMicrocomponents;
}
const uMicrocomponents = createListOfMicrocomponents();
export default uMicrocomponents;

// import { useState } from "react";
import { validateSubscribers } from "./validateSubscribers";
import { addNewValues } from "./addNewValues";
import { addNewConsumableValues } from "./addNewConsumableValues";

function createListOfMicrocomponents() {
  // * Es obligatorio inicializar como objeto
  let g_dataList = {};
  // * Es obligatorio inicializar como objeto
  let g_publicDataList = {};
  // * Es obligatorio inicializar como objeto
  let g_mCRenderList = {};
  // * Es obligatorio inicializar como objeto
  // let g_renderList = {};

  function uMicrocomponents(_subscribers) {
    const validSubscribers = validateSubscribers(_subscribers);

    if (validSubscribers) {
      g_dataList = addNewValues(validSubscribers, g_dataList);
      g_publicDataList = addNewConsumableValues(
        { ...g_publicDataList },
        g_dataList,
        g_mCRenderList
      );
      if (Array.isArray(g_publicDataList)) return [...g_publicDataList];
      else return { ...g_publicDataList };
    }
    if (_subscribers === "new") {
      return createListOfMicrocomponents();
    } else {
      // ! Terminar
      g_dataList = _subscribers;
      Object.defineProperties(g_publicDataList, {
        value: {
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

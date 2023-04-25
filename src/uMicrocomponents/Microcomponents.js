// import { useState } from "react";
import { validateSubscribers } from "./validateSubscribers";
import { addNewValues } from "./addNewValues";
import { addNewConsumableValues } from "./addNewConsumableValues";
import inicializeVariables from "./inicializeVariables";
import { useState } from "react";

export const _NEW_ = "N*-_#$E*-_%Wñ1+}";
function createListOfMicrocomponents() {
  let g_dataList;
  let g_publicDataList;
  // * Es obligatorio inicializar como objeto
  let g_mCRenderList = {};
  // * Es obligatorio inicializar como objeto
  let g_cRenderList = {};

  function uMicrocomponents(..._data) {
    let data = _data;
    let render = [true];

    function CreateStatusClip() {
      const [v, stateFunction] = useState();
      return stateFunction;
    }

    function wantToStayUpdated(_data, _render) {
      if (typeof _data[0] === "boolean") {
        _render[0] = _data[0];
        return _data.shift();
      }
      return _data;
    }

    function justWantASubscription(_data, g_cRenderList, ..._dataList) {
      console.log(_dataList);
      if (typeof _data[0] === "string" || typeof _data[0] === "number") {
        const validData = _data.filter(
          (value) =>
            (typeof value === "string" || typeof value === "number") &&
            value in g_dataList
        );
        if (validData.length !== 0) {
          const stateClip = CreateStatusClip();
          validData.forEach((value) => {
            g_cRenderList[value] = stateClip;
          });
          return true;
        }
      }

      return false;
    }

    if (data.length === 0) return g_publicDataList;
    if (_data[0] === _NEW_) return createListOfMicrocomponents();

    data = wantToStayUpdated(data, render);
    if (render[0]) {
      if (justWantASubscription(data, g_cRenderList, g_dataList)) {
        return g_publicDataList;
      }
    }

    const validSubscribers = validateSubscribers(_data[0]);

    if (validSubscribers) {
      if (g_dataList === undefined) {
        g_dataList = inicializeVariables(validSubscribers);
        g_publicDataList = inicializeVariables(validSubscribers);
      }
      addNewValues(validSubscribers, g_dataList);
      addNewConsumableValues(g_publicDataList, g_dataList, g_mCRenderList);
      return g_publicDataList;
    } else if (_data[0] instanceof Object) {
      // ! Terminar
      g_publicDataList = {};
      g_dataList = _data[0];
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

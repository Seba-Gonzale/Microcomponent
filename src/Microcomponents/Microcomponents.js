// import { useState } from "react";
import { validateSubscribers } from "./validateSubscribers";
import { addNewValues } from "./addNewValues";
import inicializeVariables from "./inicializeVariables";
import createProperty_v from "./createProperty_v";
import subscriptionsOnly from "./subscriptionsOnly";
import renderValues from "./renderValues";

function createListOfMicrocomponents() {
  let g_dataList;
  let g_publicDataList;
  // * Es obligatorio inicializar como objeto
  let g_mCRenderList = {};
  // * Es obligatorio inicializar como objeto
  let g_cRenderList = {};

  function uMicroC(..._data) {
    let render = true;

    function requestRendering(..._indexs) {
      renderValues(_indexs, { ...g_dataList }, g_cRenderList);
    }

    function wantToStayUpdated(_data, _render) {
      if (typeof _data[0] === "boolean" && _data[0] === false) {
        _render = _data[0];
        _data.shift();
      }
      return _render;
    }

    if (_data.length === 0) return g_publicDataList;
    if (_data[0] === _NEW_) return createListOfMicrocomponents();
    render = wantToStayUpdated(_data, render);

    const validSubscribers = validateSubscribers(_data[0]);
    if (validSubscribers) {
      //
      if (g_dataList === undefined) {
        //
        g_dataList = inicializeVariables(validSubscribers);
        g_publicDataList = inicializeVariables(validSubscribers);
        if (_data[_data.length - 1] !== false)
          Object.defineProperty(g_publicDataList, "_set_", {
            value: requestRendering,
          });
      }
      addNewValues(
        validSubscribers,
        g_dataList,
        g_publicDataList,
        g_mCRenderList
      );
      if (render) {
        subscriptionsOnly(
          Object.keys(validSubscribers),
          g_cRenderList,
          g_dataList
        );
      }
      return g_publicDataList;
    } else {
      if (_data[0] instanceof Object) {
        g_dataList = _data[0];
        g_publicDataList = {};
        createProperty_v(g_publicDataList, g_dataList);
        return g_publicDataList;
      }
    }

    if (subscriptionsOnly(_data, g_cRenderList, g_dataList)) {
      return g_publicDataList;
    }
  }

  return uMicroC;
}
const uMicroC = createListOfMicrocomponents();

export const _NEW_ = "N*-_#$E*-_%Wñ1+}";
export default uMicroC;

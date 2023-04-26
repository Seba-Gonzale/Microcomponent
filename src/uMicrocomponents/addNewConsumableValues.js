import { useState } from "react";
import uMicrocomponents, { _NEW_ } from "./Microcomponents";

function addToMicrocomponentRender(_key, g_mCRenderList, _functionSet) {
  if (_key in g_mCRenderList) {
    g_mCRenderList[_key].add(_functionSet);
  } else {
    g_mCRenderList[_key] = new Set([_functionSet]);
  }
}

function Microcomponent({ _key, g_dataList, g_mCRenderList }) {
  const [value, functionSet] = useState(g_dataList[_key]);
  addToMicrocomponentRender(_key, g_mCRenderList, functionSet);
  console.log("render");
  return <>{g_dataList[_key]}</>;
}

function setValueIntoMicrocomponents(_key, g_dataList, g_mCRenderList, _value) {
  const aux = {};
  if (g_dataList[_key] !== _value) {
    g_dataList[_key] = _value;
    setTimeout(() => [...g_mCRenderList[_key]].forEach((fx) => fx(aux)), 0);
  }
}

// TODO:
function setValue(_key, g_dataList, _value) {
  g_dataList[_key] = _value;
}

function createPropertiesWithGetAndSet(_key, g_dataList, g_mCRenderList) {
  const object = {};
  Object.defineProperties(object, {
    value: {
      get: () => g_dataList[_key],
      set: (value) => {
        setValue(_key, g_dataList, value);
      },
    },
    v: {
      get: () => g_dataList[_key],
      set: (value) => {
        setValue(_key, g_dataList, value);
      },
    },
    microComponent: {
      get: () => (
        <Microcomponent
          _key={_key}
          g_dataList={g_dataList}
          g_mCRenderList={g_mCRenderList}
        />
      ),
      set: (value) => {
        setValueIntoMicrocomponents(_key, g_dataList, g_mCRenderList, value);
      },
    },
    mC: {
      get: () => (
        <Microcomponent
          _key={_key}
          g_dataList={g_dataList}
          g_mCRenderList={g_mCRenderList}
        />
      ),
      set: (value) => {
        setValueIntoMicrocomponents(_key, g_dataList, g_mCRenderList, value);
      },
    },
  });
  return object;
}

function addNewConsumableValues(g_publicDataList, g_dataList, g_mCRenderList) {
  //
  if (!Array.isArray(g_dataList)) {
    //
    Object.keys(g_dataList).forEach((key) => {
      if (!(key in g_publicDataList)) {
        //
        if (g_dataList[key] instanceof Object) {
          const newMicroComp = uMicrocomponents(_NEW_);
          Object.defineProperty(g_publicDataList, key, {
            value: newMicroComp(false, g_dataList[key], false),
            enumerable: true,
          });
        } else {
          Object.defineProperty(g_publicDataList, key, {
            value: createPropertiesWithGetAndSet(
              key,
              g_dataList,
              g_mCRenderList
            ),
            enumerable: true,
          });
        }
      }
    });
  } else {
    if (Array.isArray(g_publicDataList)) {
      if (g_dataList.length !== g_publicDataList.length) {
        for (let i = g_publicDataList.length; i < g_dataList.length; i++) {
          if (g_dataList[i] instanceof Object) {
            const newMicroComp = uMicrocomponents(_NEW_);
            g_publicDataList[i] = newMicroComp(false, g_dataList[i], false);
          } else {
            g_publicDataList[i] = createPropertiesWithGetAndSet(
              i,
              g_dataList,
              g_mCRenderList
            );
          }
        }
      }
    } else {
      g_publicDataList = g_dataList.map((dontUseValue, i) => {
        if (g_dataList[i] instanceof Object) {
          const newMicroComp = uMicrocomponents(_NEW_);
          return newMicroComp(false, g_dataList[i], false);
        } else {
          return createPropertiesWithGetAndSet(i, g_dataList, g_mCRenderList);
        }
      });
    }
  }
}
//

export { addNewConsumableValues };

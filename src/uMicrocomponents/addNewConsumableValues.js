import { useState } from "react";
import uMicrocomponents from "./Microcomponents";

function addToMicrocomponentRender(_key, g_mCRenderList, _functionSet) {
  if (_key in g_mCRenderList) {
    g_mCRenderList[_key].add(_functionSet);
  } else {
    g_mCRenderList[_key] = new Set([_functionSet]);
  }
}

function MicroComponent({ _key, g_dataList, g_mCRenderList }) {
  const [value, functionSet] = useState(g_dataList[_key]);
  addToMicrocomponentRender(_key, g_mCRenderList, functionSet);
  return <>{value}</>;
}

function setValueIntoMicrocomponents(_key, g_dataList, g_mCRenderList, _value) {
  if (g_dataList[_key] !== _value) {
    g_dataList[_key] = _value;
    setTimeout(() => [...g_mCRenderList[_key]].forEach((fx) => fx(_value)), 0);
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
      set: (value) => setValue(_key, g_dataList, value),
    },
    v: {
      get: () => g_dataList[_key],
      set: (value) => setValue(_key, g_dataList, value),
    },
    microComponent: {
      get: () => (
        <MicroComponent
          _key={_key}
          g_dataList={g_dataList}
          g_mCRenderList={g_mCRenderList}
        />
      ),
      set: (value) =>
        setValueIntoMicrocomponents(_key, g_dataList, g_mCRenderList, value),
    },
    mC: {
      get: () => (
        <MicroComponent
          _key={_key}
          g_dataList={g_dataList}
          g_mCRenderList={g_mCRenderList}
        />
      ),
      set: (value) =>
        setValueIntoMicrocomponents(_key, g_dataList, g_mCRenderList, value),
    },
  });
  return object;
}

function addNewConsumableValues(_publicDataList, g_dataList, g_mCRenderList) {
  //
  if (!Array.isArray(g_dataList)) {
    //
    Object.keys(g_dataList).forEach((key) => {
      if (!(key in _publicDataList)) {
        //
        if (g_dataList[key] instanceof Object) {
          const newMicroComp = uMicrocomponents("new");
          Object.defineProperty(_publicDataList, key, {
            value: newMicroComp(g_dataList[key]),
            enumerable: true,
          });
        } else {
          Object.defineProperty(_publicDataList, key, {
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
    return _publicDataList;
  } else {
    if (Array.isArray(_publicDataList)) {
      if (g_dataList.length !== _publicDataList.length) {
        for (let i = _publicDataList.length; i < g_dataList.length; i++) {
          if (g_dataList[i] instanceof Object) {
            const newMicroComp = uMicrocomponents("new");
            _publicDataList[i] = newMicroComp(g_dataList[i]);
          } else {
            _publicDataList[i] = createPropertiesWithGetAndSet(
              i,
              g_dataList,
              g_mCRenderList
            );
          }
        }
      }
    } else {
      g_dataList.forEach((dontUseValue, i) => {
        if (g_dataList[i] instanceof Object) {
          const newMicroComp = uMicrocomponents("new");
          _publicDataList[i] = newMicroComp(g_dataList[i]);
        } else {
          _publicDataList[i] = createPropertiesWithGetAndSet(
            i,
            g_dataList,
            g_mCRenderList
          );
        }
      });
    }
    return _publicDataList;
  }
}
//

export { addNewConsumableValues };

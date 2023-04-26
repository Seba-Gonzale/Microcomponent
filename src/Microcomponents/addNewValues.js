import uMicroC, { _NEW_ } from "./Microcomponents";
import createProperties_v_mC from "./createProperties_v_mC";

function addToPublicDataObject(
  _key,
  g_dataList,
  g_publicDataList,
  g_mCRenderList
) {
  if (g_dataList[_key] instanceof Object) {
    const newMicroComp = uMicroC(_NEW_);
    Object.defineProperty(g_publicDataList, _key, {
      value: newMicroComp(false, g_dataList[_key], false),
      enumerable: true,
    });
  } else {
    Object.defineProperty(g_publicDataList, _key, {
      value: createProperties_v_mC(_key, g_dataList, g_mCRenderList),
      enumerable: true,
    });
  }
}

function addToPublicDataArray(
  _i,
  g_dataList,
  g_publicDataList,
  g_mCRenderList
) {
  if (g_dataList[_i] instanceof Object) {
    const newMicroComp = uMicroC(_NEW_);
    g_publicDataList[_i] = newMicroComp(false, g_dataList[_i], false);
  } else {
    g_publicDataList[_i] = createProperties_v_mC(
      _i,
      g_dataList,
      g_mCRenderList
    );
  }
}

function addNewValues(
  _validSubscribers,
  g_dataList,
  g_publicDataList,
  g_mCRenderList
) {
  //
  if (!Array.isArray(_validSubscribers)) {
    if (!Array.isArray(g_dataList)) {
      //
      Object.keys(_validSubscribers).forEach((key) => {
        if (!(key in g_dataList)) {
          // se añade la nueva propiedad a g_dataList
          Object.assign(g_dataList, { [key]: _validSubscribers[key] });
          // se añade la nueva propiedad a g_publicDataList
          addToPublicDataObject(
            key,
            g_dataList,
            g_publicDataList,
            g_mCRenderList
          );
        }
      });
    } else {
      throw new Error(
        "Microcomponent: Data object syntax does not work on a list declared as a data array"
      );
    }
  } else {
    if (Array.isArray(g_dataList)) {
      if (g_dataList.length === 0) {
        _validSubscribers.forEach((value, i) => {
          g_dataList[i] = value;
          addToPublicDataArray(i, g_dataList, g_publicDataList, g_mCRenderList);
        });
      }
    } else {
      throw new Error(
        "Microcomponent: Data array syntax does not work on a list declared as a data object"
      );
    }
  }
  //
}

export { addNewValues };

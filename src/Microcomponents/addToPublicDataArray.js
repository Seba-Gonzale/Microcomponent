import uMicroC, { NEW, _RECURSION_ } from "./uMicroC";
import createProperties_v_mC from "./createProperties_v_mC";
import createProperty_v from "./createProperty_v";

function addToPublicDataArray(
  _i,
  g_dataList,
  g_publicDataList,
  g_mCRenderList,
  _addStatus
) {
  if (g_dataList[_i] instanceof Object) {
    if (typeof _addStatus !== "boolean") {
      const newMicroComp = uMicroC(NEW);
      const [newPublicData, newData] = newMicroComp(
        null,
        g_dataList[_i],
        _RECURSION_
      );
      g_publicDataList[_i] = newPublicData;
      g_dataList[_i] = newData;
    } else {
      g_publicDataList[_i] = {};
      createProperty_v(g_publicDataList[_i], g_dataList[_i]);
    }
  } else {
    g_publicDataList[_i] = createProperties_v_mC(
      _i,
      g_dataList,
      g_mCRenderList
    );
  }
}

export default addToPublicDataArray;

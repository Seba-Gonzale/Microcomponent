function renderValues(_indices, _dataList, g_cRenderList) {
  if (typeof _indices[0] === "string" || typeof _indices[0] === "number") {
    const validData = _indices.filter(
      (value) =>
        (typeof value === "string" || typeof value === "number") &&
        value in g_cRenderList
    );
    if (validData.length !== 0) {
      let aux_array = [];
      validData.forEach((value) => {
        if (_dataList[value]) {
        }
        aux_array = [...aux_array, ...g_cRenderList[value]];
      });
      const aux_set = new Set(aux_array);
      [...aux_set].forEach((fx) => {
        fx({});
      });
      return true;
    }
  }
  return false;
}

export default renderValues;

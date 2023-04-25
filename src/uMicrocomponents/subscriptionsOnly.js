function subscriptionsOnly(_data, g_cRenderList, _dataList, CreateStatusClip) {
  if (typeof _data[0] === "string" || typeof _data[0] === "number") {
    //
    const validData = _data.filter(
      (value) =>
        (typeof value === "string" || typeof value === "number") &&
        value in _dataList
    );
    if (validData.length !== 0) {
      const stateClip = CreateStatusClip();
      validData.forEach((value) => {
        if (value in g_cRenderList) {
          g_cRenderList[value].add(stateClip);
        } else {
          g_cRenderList[value] = new Set([stateClip]);
        }
      });
      return true;
    }
  }
  return false;
}

export default subscriptionsOnly;

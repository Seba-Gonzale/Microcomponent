function addNewValues(_validSubscribers, g_dataList) {
  //
  if (!Array.isArray(_validSubscribers)) {
    if (!Array.isArray(g_dataList)) {
      //
      Object.keys(_validSubscribers).forEach((key) => {
        if (!(key in g_dataList)) {
          // se añade la nueva propiedad a g_dataList
          Object.assign(g_dataList, { [key]: _validSubscribers[key] });
          // se añade la nueva propiedad a g_publicDataList
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
        _validSubscribers.forEach((value) => g_dataList.push(value));
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

import { _RECURSION_ } from "./Microcomponents";

function checkIntegrity(_isRecursion, _originalList, _copyList) {
  if (_isRecursion !== _RECURSION_ && _originalList !== undefined) {
    Object.keys(_copyList).forEach((key) => {
      if (!(key in _originalList)) {
        delete _copyList[key];
      }
    });
  }
}

export default checkIntegrity;

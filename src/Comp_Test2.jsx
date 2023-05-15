import { uM_test2 } from "./Comp_Test3";
import uMicroC from "./Microcomponents/Microcomponents";

const { collaborators } = uM_test2();
console.log(collaborators);

export default function CompTest2() {
  const collab = uMicroC();
  return (
    <div
      style={{ width: "100px", height: "100px", backgroundColor: "orange" }}
      onClick={() => console.log(collab)}
    ></div>
  );
}

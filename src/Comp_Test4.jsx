import { uM_test3 } from "./Comp_Test3";
import uMicroC from "./Microcomponents/Microcomponents";

export default function CompTest4() {
  const test2 = uMicroC(0, 3);
  const test3 = uM_test3({ gato: "miau" });
  return (
    <>
      <h1>{test2[0].id.mC}</h1>
      <h1>{test2[3].name.mC}</h1>
      <h1>{test2[0].name.mC}</h1>
      <h1>{test3.name.otherName.mC}</h1>
      <OtherComp name={test2[0]} />
      <OtherComp name={test2[3]} />
    </>
  );
}
function OtherComp({ name }) {
  return <h3>{name.id.v}</h3>;
}

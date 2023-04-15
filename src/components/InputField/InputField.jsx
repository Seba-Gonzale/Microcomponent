import { useState } from "react";
import "./InputField.css";

export default function InputField(p_) {
  const [value, setValue] = useState("");

  return (
    <li className={"field field-" + p_.type}>
      <label htmlFor={p_.name}>{p_.label}</label>
      <input
        name={p_.name}
        type={p_.type}
        placeholder={p_.placeholder + "..."}
        required={p_.required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-input={p_.name}
      />
    </li>
  );
}

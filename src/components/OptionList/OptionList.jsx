import "./OptionList.css";

export default function OptionList(p_) {
  return (
    <li className="option-list">
      <label htmlFor={p_.name}>{p_.label}</label>
      <select
        className="notranslate"
        name={p_.name}
        required={p_.required}
        data-input={p_.name}
      >
        <option value="">Elige una opción . . .</option>

        {p_.teams.map((team, index) => (
          <option value={team.title} key={index}>
            {team.title}
          </option>
        ))}
      </select>
    </li>
  );
}

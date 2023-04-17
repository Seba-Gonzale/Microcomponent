import s_ from "@/styles/Header.module.css";

console.log(s_.header);

export default function Header() {
  return (
    <header className={s_.header}>
      <figure className={s_.logo}>
        <div className={s_.logoIcon}></div>
      </figure>
      <nav className={s_.nav}>
        <ul className={s_.itemsList}>
          <li className={s_.item}></li>
          <li className={s_.item}></li>
          <li className={s_.item}></li>
        </ul>
      </nav>
    </header>
  );
}

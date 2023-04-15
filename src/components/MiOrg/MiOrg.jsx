import "./MiOrg.css";

export default function MiOrg(p_) {
  return (
    <section className="mi-org">
      <h3 className="mi-org__title">Mi Organización</h3>
      <img src="/img/add.png" alt="agregar" onClick={p_.handleShowForm} />
    </section>
  );
}

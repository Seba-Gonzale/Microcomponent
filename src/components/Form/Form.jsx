import "./Form.css";
import InputField from "../InputField/InputField.jsx";
import OptionList from "../OptionList/OptionList";
import Button from "../Button/Button";

export default function Form(p_) {
  //
  function handleCollaboratorForm(e) {
    e.preventDefault();
    const aux = [...document.querySelectorAll("[data-input]")];
    p_.addCollaborator({
      name: aux.find((input) => input.name === "nombre").value,
      position: aux.find((input) => input.name === "puesto").value,
      photo: aux.find((input) => input.name === "foto").value,
      team: aux.find((input) => input.name === "equipos").value,
    });
  }

  function handleTeamForm(e) {
    e.preventDefault();
    const aux = [...document.querySelectorAll("[data-input]")];
    console.log(aux);
    console.log(aux.find((input) => input.name === "titulo"));
    p_.addTeam({
      title: aux.find((input) => input.name === "titulo").value,
      primaryColor: aux.find((input) => input.name === "color").value,
    });
  }

  return (
    <section className="sect-form">
      <form onSubmit={handleCollaboratorForm}>
        <h2>Rellena el formulario para crear el colaborador.</h2>

        <InputField
          label="Nombre"
          name="nombre"
          placeholder="Ingresar nombre"
          required
        />
        <InputField
          label="Puesto"
          name="puesto"
          placeholder="Ingresar puesto"
          required
        />
        <InputField
          label="Foto URL"
          name="foto"
          placeholder="Ingresar URL de la foto"
          required
        />
        <OptionList label="Equipos" name="equipos" teams={p_.teams} required />
        <Button>Crear colaborador</Button>
      </form>
      <form onSubmit={handleTeamForm}>
        <h2>Rellena el formulario para crear el equipo.</h2>

        <InputField
          label="Titulo"
          name="titulo"
          placeholder="Ingresar titulo del equipo"
          required
        />
        <InputField
          label="Color"
          name="color"
          placeholder="Ingresar el color del equipo en HEX"
          required
          type="color"
        />
        <Button>Crear equipo</Button>
      </form>
    </section>
  );
}

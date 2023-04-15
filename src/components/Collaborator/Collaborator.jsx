import "./Collaborator.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function Collaborator(p_) {
  //
  const styles = {
    backgroundImage: `linear-gradient(${p_.primaryColor} 92px, white 92px)`,
  };

  function ButtonDelete() {
    return (
      <button
        className="collaborator__delete"
        type="button"
        title="Delete"
        onClick={() => p_.delCollaborator(p_.id)}
      >
        X
      </button>
    );
  }

  return (
    <div className="collaborator" style={styles}>
      <ButtonDelete />
      <figure className="collaborator__card">
        <img
          className="collaborator__img"
          src={p_.photo}
          alt={p_.name}
          width={120}
          height={120}
        />
        <figcaption>
          <h3 className="collaborator__name">{p_.name}</h3>
          <p className="collaborator__specialty">{p_.position}</p>
          {p_.fav ? (
            <AiFillHeart
              className="collaborator__heart"
              color="lightcoral"
              onClick={() => p_.like(p_.id)}
            />
          ) : (
            <AiOutlineHeart
              className="collaborator__heart"
              onClick={() => p_.like(p_.id)}
            />
          )}
        </figcaption>
      </figure>
    </div>
  );
}

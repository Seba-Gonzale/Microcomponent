import { useState } from "react";
import Collaborator from "../Collaborator/Collaborator";
import "./Team.css";

export default function Team(p_) {
  //
  const [primaryColor, setPrimaryColor] = useState(p_.primaryColor);

  return (
    <section className="team" style={{ backgroundColor: primaryColor + "66" }}>
      <input
        className="team__color"
        type="color"
        value={primaryColor}
        onChange={(e) => setPrimaryColor(e.target.value)}
      />
      <h3
        className="team__title notranslate"
        style={{ borderBottom: `4px solid ${primaryColor}` }}
      >
        {p_.title}
      </h3>
      <ul className="team__collaborators">
        {p_.collaborators.map(
          (collab, index) =>
            collab.team === p_.title && (
              <Collaborator
                key={index}
                {...collab}
                primaryColor={primaryColor}
                delCollaborator={p_.delCollaborator}
                like={p_.like}
              />
            )
        )}
      </ul>
    </section>
  );
}

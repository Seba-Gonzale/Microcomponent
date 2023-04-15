import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__networks">
        <a href="#">
          <img src="/img/facebook.png" alt="facebook" />
        </a>
        <a href="#">
          <img src="/img/twitter.png" alt="twitter" />
        </a>
        <a href="#">
          <img src="/img/instagram.png" alt="instagram" />
        </a>
      </div>
      <div className="footer__logo">
        <img src="/img/Logo.png" alt="Logo" />
      </div>
      <a
        href="https://seba-gonzale.github.io/Portafolios/"
        target="__blank"
        className="footer__developer"
      >
        <strong>Developed by Augusto Sebastian Gonzale</strong>
      </a>
    </footer>
  );
}

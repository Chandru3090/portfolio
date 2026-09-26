import { profile } from "../../data/content";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}

export default Footer;

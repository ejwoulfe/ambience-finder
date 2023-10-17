import personSVG from "../../assets/person.svg";
import "./navigation.scss";

export default function Navigation() {
  return (
    <nav>
      <span>
        <img src={personSVG} alt="account" />
      </span>
    </nav>
  );
}

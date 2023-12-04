import magnifyGlass from "../../assets/magnify-glass.svg";
import "./search-bar.scss";
import { useNavigate } from "react-router";

export default function SearchBar(props: { setSearchActive: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.setSearchActive(true);
    const target = e.currentTarget;
    const keyword = target.searchTerm.value;
    navigate("/list/" + keyword);
  }

  return (
    <div className="search-container">
      <form method="post" onSubmit={handleSubmit} name="search">
        <input
          name="searchTerm"
          placeholder="Search with keywords separated by commas:  Snow, Lord of the Rings, Calm"></input>
        <button type="submit">
          <img src={magnifyGlass} alt="magnify glass" />
        </button>
      </form>
    </div>
  );
}

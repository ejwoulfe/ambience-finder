import PreviousVideos from "../components/previous-videos/previous-videos";
import SearchBar from "../components/search-bar/search-bar";
import headphones from "../assets//headphones.svg";
import "./home-page.scss";

export default function Home() {
  return (
    <div className="home-container">
      <span className="home__title">
        <img src={headphones} alt="headphones" />
        <h1>Ambience Finder</h1>
        <img src={headphones} alt="headphones" />
      </span>
      <SearchBar />
      <PreviousVideos />
    </div>
  );
}

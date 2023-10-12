import PreviousVideos from "../components/previous-videos/previous-videos";
import SearchBar from "../components/search-bar/search-bar";

export default function Home() {
  return (
    <div className="home-container">
      <span className="home__title">
        <h1>Ambience Finder</h1>
      </span>
      <SearchBar />
      <PreviousVideos />
    </div>
  );
}

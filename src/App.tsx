import { useState } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Home from "./containers/home/home-page";
import VideoList from "./containers/video-list/video-list";
import { YoutubeVideoObject } from "./interfaces/video.ts";
import SearchBar from "./components/search-bar/search-bar.tsx";
import PreviousVideos from "./components/previous-videos/previous-videos.tsx";
import whiteHeadphones from "./assets/white-headphones.svg";

function App() {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [videoResults, setVideoResults] = useState<Array<YoutubeVideoObject>>([]);
  return (
    <main>
      <Navigation />
      {searchActive ? (
        <span className="page__title">
          <img src={whiteHeadphones} alt="headphones" />
          <h1>Videos List</h1>
          <img src={whiteHeadphones} alt="headphones" />
        </span>
      ) : (
        <span className="page__title">
          <img src={whiteHeadphones} alt="headphones" />
          <h1>Ambience Finder</h1>
          <img src={whiteHeadphones} alt="headphones" />
        </span>
      )}
      <SearchBar setters={{ setSearchActive, setVideoResults }} />
      {searchActive ? <VideoList videos={videoResults} /> : <Home />}

      {searchActive ? null : <PreviousVideos />}
    </main>
  );
}

export default App;

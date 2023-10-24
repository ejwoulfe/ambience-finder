import { useState } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Home from "./containers/home/home-page";
import VideoList from "./containers/video-list/video-list";
import { YoutubeVideoObject } from "./interfaces/video.ts";
import SearchBar from "./components/search-bar/search-bar.tsx";
import PreviousVideos from "./components/previous-videos/previous-videos.tsx";

function App() {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [videoResults, setVideoResults] = useState<Array<YoutubeVideoObject>>([]);
  return (
    <main>
      <Navigation />
      {searchActive ? <VideoList videos={videoResults} /> : <Home />}
      <SearchBar setters={{ setSearchActive, setVideoResults }} />

      {searchActive ? null : <PreviousVideos />}
    </main>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Home from "./containers/home/home-page";
import VideoList from "./containers/video-list/video-list";
import SearchBar from "./components/search-bar/search-bar.tsx";
import whiteHeadphones from "./assets/white-headphones.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoPage from "./containers/video-page/video-page.tsx";

function App() {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [focusModeActive, setFocusModeActive] = useState<boolean>(false);

  return (
    <>
      {focusModeActive ? <div className="focus-overlay"></div> : null}
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

        <BrowserRouter>
          <SearchBar setSearchActive={setSearchActive} />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/list/:keyword" element={<VideoList />} />
            <Route path="/video/:id" element={<VideoPage focusModeData={{ focusModeActive, setFocusModeActive }} />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;

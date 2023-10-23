import { useState } from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Home from "./containers/home/home-page";
import VideoList from "./containers/video-list/video-list";

function App() {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  return (
    <main>
      <Navigation />
      {searchActive ? <VideoList setActive={setSearchActive} /> : <Home setActive={setSearchActive} />}
    </main>
  );
}

export default App;

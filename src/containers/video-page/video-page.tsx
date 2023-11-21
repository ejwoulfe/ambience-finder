import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { YoutubeVideoDetailsObject } from "../../interfaces/video-details";
import "./video-page.scss";

interface VideoPageProps {
  focusModeActive: boolean;
  setFocusModeActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VideoPage(props: { focusModeData: VideoPageProps }) {
  const location = useLocation();
  const state = location.state as YoutubeVideoDetailsObject;
  const [video, setVideo] = useState<YoutubeVideoDetailsObject>();
  const { focusModeActive, setFocusModeActive } = props.focusModeData;

  useEffect(() => {
    if (state === null || state === undefined) {
      const currentPath = location.pathname;
      const pos1 = currentPath.indexOf("/");
      const pos2 = currentPath.indexOf("/", pos1 + 1);
      const videoID = currentPath.substring(pos2 + 1, currentPath.length);
      getVideoDetails(videoID);
    } else {
      setVideo(state);
    }
  }, [location, state]);

  async function getVideoDetails(id: string) {
    const youtubeVideoDurationURL =
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=` +
      import.meta.env.VITE_YOUTUBE_API_KEY;
    const response = await fetch(youtubeVideoDurationURL);
    const videoInfo = await response.json();
    setVideo(videoInfo.items[0]);
  }

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "400",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      origin: "https://www.youtube.com",
    },
  };

  return (
    <div className="video-page-container">
      {video !== undefined ? <h3>{video?.snippet.title}</h3> : <h1>Loading</h1>}
      <YouTube videoId={video?.id} opts={opts} onReady={onPlayerReady} />
      <div className="focus-mode-container">
        {focusModeActive ? <p>Focused</p> : <p>Enable Focus Mode</p>}
        <label className="switch">
          <input
            type="checkbox"
            checked={focusModeActive}
            onChange={() => {
              setFocusModeActive(!focusModeActive);
            }}></input>
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

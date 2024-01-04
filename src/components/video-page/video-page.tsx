import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import { YoutubeVideoDetailsObject } from "../../interfaces/video-details";
import { fetchVideoWithID } from "../../helpers/fetchVideos";
import PauseSVG from "../../assets/pause.svg";
import PlaySVG from "../../assets/play.svg";
import "./video-page.scss";

interface VideoPageProps {
  focusModeActive: boolean;
  setFocusModeActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VideoPage(props: { focusModeData: VideoPageProps }) {
  const location = useLocation();
  const locationState = location.state as YoutubeVideoDetailsObject;
  const { focusModeActive, setFocusModeActive } = props.focusModeData;

  const [videoElement, setVideoElement]: YouTubePlayer = useState();
  const [video, setVideo] = useState<YoutubeVideoDetailsObject>(locationState);

  useEffect(() => {
    if (locationState === null || locationState === undefined) {
      const currentPath = location.pathname;
      const pos1 = currentPath.indexOf("/");
      const pos2 = currentPath.indexOf("/", pos1 + 1);
      const videoID = currentPath.substring(pos2 + 1, currentPath.length);
      fetchVideoWithID([videoID]).then((result) => {
        if (result.length === 0) {
          const customError = {
            code: 404,
            status: "not found",
            reason: "0 videos found",
          };
          throw new Error(customError.code + ": " + customError.reason, { cause: customError });
        } else {
          setVideo(result[0]);
        }
      });
    }
  }, [location, locationState]);

  useEffect(() => {
    console.log(video);
  }, [video]);

  const onPlayerReady = (event: YouTubePlayer) => {
    // access to player in all event handlers via event.target
    setVideoElement(event);
  };

  function togglePlayer(player: YouTubePlayer) {
    // playerStatus comes in as a number, if it is 1 it means the player is currently playing, if 2 the player is currently paused
    const playerStatus = player.data;
    if (playerStatus === 1) {
      videoElement.target.pauseVideo();
    } else {
      videoElement.target.playVideo();
    }
  }

  const opts: YouTubeProps["opts"] = {
    height: "400",
    width: "640",
    playerVars: {
      autoplay: 0,
      origin: "https://www.youtube.com",
    },
  };

  return (
    <>
      {video !== undefined ? (
        <>
          <h3>{video?.snippet.title}</h3>
          <YouTube
            videoId={video?.id}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={(event) => setVideoElement(event)}
          />
          {focusModeActive ? (
            <button className="focus-mode__button" onClick={() => togglePlayer(videoElement)}>
              {videoElement.data !== undefined && videoElement.data === 1 ? (
                <img src={PauseSVG} alt="pause" />
              ) : (
                <img src={PlaySVG} alt="play" />
              )}
            </button>
          ) : null}
          <div className="focus-mode__container">
            {focusModeActive ? <p>Focused</p> : <p>Enable Focus Mode</p>}
            <label className="switch">
              <input
                type="checkbox"
                tabIndex={0}
                checked={focusModeActive}
                onChange={() => {
                  setFocusModeActive(!focusModeActive);
                }}></input>
              <span className="slider round"></span>
            </label>
          </div>
        </>
      ) : (
        <h1>Loading Video</h1>
      )}
    </>
  );
}

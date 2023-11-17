import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { YoutubeVideoDetailsObject } from "../../interfaces/video-details";

export default function VideoPage() {
  const location = useLocation();
  const state = location.state as YoutubeVideoDetailsObject;
  const [video, setVideo] = useState<YoutubeVideoDetailsObject>();

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

  useEffect(() => {
    console.log(video);
  }, [video]);

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
      autoplay: 1,
    },
  };

  return (
    <div className="video-page-container">
      {video !== undefined ? <h3>{video?.snippet.title}</h3> : <h1>Loading</h1>}
      <YouTube videoId={video?.id} opts={opts} onReady={onPlayerReady} />
    </div>
  );
}

import { useEffect, useState } from "react";

import { YoutubeVideoObject } from "../../interfaces/video";

interface VideoListProps {
  videos: Array<YoutubeVideoObject>;
}

export default function VideoList(videosList: VideoListProps) {
  const [videoDurations, setVideoDurations] = useState<Array<string>>([]);
  useEffect(() => {
    if (videosList.videos.length > 0) {
      gatherVideoDurations(createVideoIdsArray(videosList.videos));
    }
  }, [videosList]);

  function videoRows(videosList: Array<YoutubeVideoObject>, durations: Array<string>) {
    return videosList.map((video, index) => {
      const videoSnippet = video.snippet;
      return (
        <li key={"video-" + index}>
          <h5>{videoSnippet.title}</h5>
        </li>
      );
    });
  }
  function createVideoIdsArray(videosList: Array<YoutubeVideoObject>) {
    const videoIds = videosList.map((video) => {
      return video.id.videoId;
    });
    return videoIds;
  }

  async function gatherVideoDurations(videoIdsArray: Array<string>) {
    const ids = videoIdsArray.join("%2C");

    const youtubeVideoDurationURL =
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${ids}&key=` +
      import.meta.env.VITE_YOUTUBE_API_KEY;
    const response = await fetch(youtubeVideoDurationURL);
    const videoObjects = await response.json();
    console.log(
      setVideoDurations(
        videoObjects.items.map((video) => {
          return video.contentDetails.duration;
        })
      )
    );
    // setVideoDurations(videoObjects.items.contentDetails.duration);
  }

  return (
    <div className="videos-container">
      {videosList.videos.length > 0 ? <ul className="videos__list">{}</ul> : <h1>Loading</h1>}
    </div>
  );
}

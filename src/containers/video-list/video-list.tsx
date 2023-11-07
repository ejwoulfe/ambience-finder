import { useEffect, useState } from "react";

import { YoutubeVideoObject } from "../../interfaces/video";
import { YoutubeVideoDetailsObject } from "../../interfaces/video-details";
import { parse } from "tinyduration";
import { formatDuration } from "../../helpers/format-duration";

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

      const parsedDuration = parse(durations[index]);

      return (
        <li key={"video-" + index}>
          <h5>{videoSnippet.title}</h5>
          <h6>{formatDuration(parsedDuration)}</h6>
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

    setVideoDurations(
      videoObjects.items.map((video: YoutubeVideoDetailsObject) => {
        return video.contentDetails.duration;
      })
    );
  }

  return (
    <div className="videos-container">
      {videosList.videos.length > 0 && videoDurations.length > 0 ? (
        <ul className="videos__list">{videoRows(videosList.videos, videoDurations)}</ul>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

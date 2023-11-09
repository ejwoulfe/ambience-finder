import { useEffect, useState } from "react";

import { YoutubeVideoObject } from "../../interfaces/video";
import { YoutubeVideoDetailsObject } from "../../interfaces/video-details";
import "./video-list.scss";
import { VideoRow } from "../../components/video-row/video-row";

interface VideoListProps {
  videos: Array<YoutubeVideoObject>;
}

export default function VideoList(videosList: VideoListProps) {
  const [videoDurations, setVideoDurations] = useState<Array<string>>([]);
  const [videoDetailsObjects, setVideoDetailsObjects] = useState<Array<YoutubeVideoDetailsObject>>([]);

  useEffect(() => {
    if (videosList.videos.length > 0) {
      gatherVideoDurations(createVideoIdsArray(videosList.videos));
    }
  }, [videosList]);

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
    setVideoDetailsObjects(videoObjects.items);

    setVideoDurations(
      videoObjects.items.map((video: YoutubeVideoDetailsObject) => {
        return video.contentDetails.duration;
      })
    );
  }

  return (
    <div className="videos-container">
      {videoDetailsObjects.length > 0 && videoDurations.length > 0 ? (
        <ul className="videos__list">
          {videoDetailsObjects.map((video, index) => {
            const duration = videoDurations[index];
            const props = { video, duration, index };
            return <VideoRow {...props} />;
          })}
        </ul>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

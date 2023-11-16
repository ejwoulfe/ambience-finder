import { useEffect, useState } from "react";

import { YoutubeVideoObject } from "../../interfaces/video";
import { YoutubeVideoDetailsObject } from "../../interfaces/video-details";
import "./video-list.scss";
import { VideoRow } from "../../components/video-row/video-row";
import { useParams } from "react-router";

export default function VideoList() {
  const [videoDurations, setVideoDurations] = useState<Array<string>>([]);
  const [videoDetailsObjects, setVideoDetailsObjects] = useState<Array<YoutubeVideoDetailsObject>>([]);
  const { keyword } = useParams();
  const [videosList, setVideosList] = useState<Array<YoutubeVideoObject>>();

  useEffect(() => {
    async function fetchVideos(keyword: string) {
      const encodedString = encodeURI(keyword + " ambience");
      const youtubeURL =
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=50&order=relevance&q=${encodedString}&type=video&videoDuration=any&videoEmbeddable=true&videoLicense=any&videoType=videoTypeUnspecified&key=` +
        import.meta.env.VITE_YOUTUBE_API_KEY;

      const response = await fetch(youtubeURL);
      const results = await response.json();

      setVideosList(results.items);
    }

    if (keyword !== undefined) {
      fetchVideos(keyword);
    }
  }, [keyword]);

  useEffect(() => {
    if (videosList !== undefined && videosList.length > 0) {
      gatherVideoDurations(createVideoIdsArray(videosList));
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
            return <VideoRow key={"video-row-" + index} {...props} />;
          })}
        </ul>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

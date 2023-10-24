import { useEffect } from "react";

import { YoutubeVideoObject } from "../../interfaces/video";

interface VideoListProps {
  videos: Array<YoutubeVideoObject>;
}

export default function VideoList(videosList: VideoListProps) {
  useEffect(() => {
    console.log(videosList.videos);
  }, [videosList]);
  return (
    <div className="video-list-container">
      <h1>Videos List</h1>
    </div>
  );
}

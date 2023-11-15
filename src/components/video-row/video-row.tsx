import { YoutubeVideoDetailsObject } from "../../interfaces/video-details";
import { formatDuration } from "../../helpers/format-duration";
import { parse } from "tinyduration";
import "./video-row.scss";

interface VideoRowProps {
  video: YoutubeVideoDetailsObject;
  duration: string;
  index: number;
}
export function VideoRow(props: VideoRowProps) {
  const { video, duration, index } = props;

  const videoSnippet = video.snippet;
  const parsedDuration = parse(duration);

  function truncateDescription(description: string, maxLength: number) {
    const cutDescription = description;
    if (cutDescription.length > maxLength) {
      return cutDescription.substring(0, maxLength - 3) + "...";
    }
    return cutDescription;
  }

  return (
    <li key={"video-" + index} className="video-row">
      <div className="video-row__thumbnail">
        <img src={video.snippet.thumbnails.medium.url} alt="thumbnail" />
        <p className="thumbnail__duration">{formatDuration(parsedDuration)}</p>
      </div>
      <div className="video-row__details">
        <h3>{videoSnippet.title}</h3>
        <p>{video.snippet.channelTitle}</p>
        <p>{parseInt(video.statistics.viewCount).toLocaleString()} views</p>
        <p>{truncateDescription(videoSnippet.description, 100)}</p>
      </div>
    </li>
  );
}

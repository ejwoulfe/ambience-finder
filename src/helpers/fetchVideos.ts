import { YoutubeVideoObject } from "../interfaces/video";
import { YoutubeVideoDetailsObject } from "../interfaces/video-details";

// Since the list returned from keyword search doesn't contain some video details we need, we have to make a separate API call to retrieve that data. First API call is used to gather the videoIDs, then with the videoIDs we make a different API call to retrieve a video object with more details and set the state.
// export async function fetchVideos(
//   keyword: string,
//   setVideos: React.Dispatch<React.SetStateAction<Array<YoutubeVideoDetailsObject>>>
// ) {
//   const encodedString = encodeURI(keyword + " ambience");
//   const youtubeURL =
//     `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=50&order=relevance&q=${encodedString}&type=video&videoDuration=any&videoEmbeddable=true&videoLicense=any&videoType=videoTypeUnspecified&key=` +
//     import.meta.env.VITE_YOUTUBE_API_KEY;

//   try {
//     const response = await fetch(youtubeURL);

//     const results = await response.json();
//     const videos = await fetchVideoWithID(results.items.map((video: YoutubeVideoObject) => video.id.videoId));
//     setVideos(videos);
//   } catch (err: unknown) {
//     throw new Error("Retrieving videos list failed.", { cause: err });
//   }
// }
export async function fetchVideosWithKeyword(keyword: string) {
  const encodedString = encodeURI(keyword + " ambience");
  const youtubeURL =
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=50&order=relevance&q=${encodedString}&type=video&videoDuration=any&videoEmbeddable=true&videoLicense=any&videoType=videoTypeUnspecified&ke=` +
    import.meta.env.VITE_YOUTUBE_API_KEY;

  try {
    const response = await fetch(youtubeURL);
    if (!response.ok) {
      const test = await fetch(response.url);
      const result = await test.json();
      console.log(result.error);
      const customError = {
        code: result.error.code,
        status: result.error.status,
        reason: result.error.errors[0].reason,
      };
      throw new Error(customError.toString());
    }
    const results = await response.json();
    return await fetchVideoWithID(results.items.map((video: YoutubeVideoObject) => video.id.videoId));
  } catch (err) {
    throw new Error("Error in retrieving videos:", { cause: err });
  }
}

async function fetchVideoWithID(videoIdsArray: Array<string>) {
  const ids = videoIdsArray.join("%2C");

  const youtubeVideoDurationURL =
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${ids}&key=` +
    import.meta.env.VITE_YOUTUBE_API_KEY;
  const response = await fetch(youtubeVideoDurationURL);
  const videoObjects = await response.json();
  return videoObjects.items;
}

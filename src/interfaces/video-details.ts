import { SnippetObject } from "./snippet";

export interface YoutubeVideoDetailsObject {
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    projection: string;
    contentRating: object;
  };
  etag: string;
  id: string;
  kind: string;
  snippet: SnippetObject;
  statistics: { viewCount: string; likeCount: string; favoriteCount: string; commentCount: string };
}

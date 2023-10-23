import YoutubeVideoObject from "./video";

export interface SearchResultsObject {
  etag: string;
  items: Array<YoutubeVideoObject>;
  kind: string;
  nextPageToken: string;
  pageInfo: { resultsPerPage: number; totalResults: number };
  regionCode: string;
}

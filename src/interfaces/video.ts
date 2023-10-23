import { SnippetObject } from "./snippet";

export interface YoutubeVideoObject {
  etag: string;
  id: { kind: string; videoId: string };
  kind: string;
  snippet: SnippetObject;
}

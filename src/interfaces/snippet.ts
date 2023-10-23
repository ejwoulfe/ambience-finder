interface ThumbnailObject {
  height: number;
  url: string;
  width: number;
}

export interface SnippetObject {
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishTime: string;
  publishedAt: string;
  thumbnails: { default: ThumbnailObject; high: ThumbnailObject; medium: ThumbnailObject };
  title: string;
}

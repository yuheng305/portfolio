// YouTube Data API v3 with an API key (public data, near real time).
// channels.list: viewCount is exact; subscriberCount is rounded to 3 significant figures
// (exact while the channel is under 1,000 subscribers). Likes/comments are summed per video.
import { fetchJSON, collectPages, sum } from "./http.js";

const API = "https://www.googleapis.com/youtube/v3";
const { YOUTUBE_API_KEY: key, YOUTUBE_CHANNEL_ID: channelId } = process.env;

export const youtubeConfigured = Boolean(key && channelId);

const api = (path, params) => fetchJSON(`${API}/${path}?${new URLSearchParams({ ...params, key })}`);

export async function getYouTubeStats() {
  const { items = [] } = await api("channels", { part: "statistics,contentDetails", id: channelId });
  const channel = items[0];
  if (!channel) throw new Error("YouTube channel not found");

  const uploads = channel.contentDetails.relatedPlaylists.uploads;
  const videoIds = await collectPages(async (pageToken) => {
    const page = await api("playlistItems", {
      part: "contentDetails",
      playlistId: uploads,
      maxResults: "50",
      ...(pageToken && { pageToken }),
    });
    return { items: page.items.map((i) => i.contentDetails.videoId), next: page.nextPageToken };
  });

  const videos = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    const page = await api("videos", { part: "statistics", id: videoIds.slice(i, i + 50).join(",") });
    videos.push(...page.items);
  }

  const { statistics } = channel;
  return {
    followers: Number(statistics.subscriberCount),
    views: Number(statistics.viewCount),
    engagements: sum(videos, (v) => v.statistics.likeCount) + sum(videos, (v) => v.statistics.commentCount),
    videos: Number(statistics.videoCount),
  };
}

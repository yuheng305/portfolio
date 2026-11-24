// YouTube Data API v3 with an API key (public data, near real time).
// channels.list: viewCount is exact; subscriberCount is rounded to 3 significant figures
// (exact while the channel is under 1,000 subscribers). Likes/comments are summed per video,
// and each upload is also returned as an item for the dashboard's video table.
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
  const uploadsList = await collectPages(async (pageToken) => {
    const page = await api("playlistItems", {
      part: "snippet,contentDetails",
      playlistId: uploads,
      maxResults: "50",
      ...(pageToken && { pageToken }),
    });
    return {
      items: page.items.map((i) => ({ id: i.contentDetails.videoId, title: i.snippet.title, date: i.contentDetails.videoPublishedAt || i.snippet.publishedAt })),
      next: page.nextPageToken,
    };
  });

  const videos = [];
  for (let i = 0; i < uploadsList.length; i += 50) {
    const ids = uploadsList.slice(i, i + 50).map((u) => u.id);
    const page = await api("videos", { part: "statistics", id: ids.join(",") });
    videos.push(...page.items);
  }

  const statsById = new Map(videos.map((v) => [v.id, v.statistics]));
  const videoItems = uploadsList
    // Scheduled (not yet public) uploads have no statistics.
    .filter((u) => statsById.has(u.id) && new Date(u.date) <= new Date())
    .map((u) => {
      const s = statsById.get(u.id);
      return {
        id: u.id,
        title: u.title,
        date: u.date,
        url: `https://www.youtube.com/shorts/${u.id}`,
        views: Number(s.viewCount) || 0,
        engagements: (Number(s.likeCount) || 0) + (Number(s.commentCount) || 0),
      };
    });

  const { statistics } = channel;
  return {
    followers: Number(statistics.subscriberCount),
    views: Number(statistics.viewCount),
    engagements: sum(videos, (v) => v.statistics.likeCount) + sum(videos, (v) => v.statistics.commentCount),
    videos: Number(statistics.videoCount),
    uploads90d: videoItems.filter((v) => Date.now() - new Date(v.date) <= 90 * 86_400_000).length,
    items: videoItems,
  };
}

// Facebook Graph API with a Page access token (pages_read_engagement only).
// Reads live node fields rather than Page Insights, which Meta refreshes only every 24h.
// The Page publishes videos, so views and engagement (likes + comments) come from
// /{page}/videos; /posts would additionally require pages_read_user_content.
import { fetchJSON, collectPages, sum } from "./http.js";

const {
  FACEBOOK_PAGE_ID: pageId,
  FACEBOOK_ACCESS_TOKEN: accessToken,
  FACEBOOK_GRAPH_VERSION: version = "v27.0",
} = process.env;

export const facebookConfigured = Boolean(pageId && accessToken);

const graph = (path, params = {}) =>
  fetchJSON(`https://graph.facebook.com/${version}/${path}?${new URLSearchParams({ ...params, access_token: accessToken })}`);

export async function getFacebookStats() {
  const [pageInfo, videos] = await Promise.all([
    graph(pageId, { fields: "followers_count" }),
    collectPages(async (after) => {
      const page = await graph(`${pageId}/videos`, {
        fields: "title,description,created_time,permalink_url,views,likes.summary(total_count).limit(0),comments.summary(total_count).limit(0)",
        limit: "100",
        ...(after && { after }),
      });
      return { items: page.data || [], next: page.paging?.next ? page.paging.cursors?.after : null };
    }),
  ]);

  return {
    followers: pageInfo.followers_count,
    views: sum(videos, (v) => v.views),
    engagements: sum(videos, (v) => v.likes?.summary?.total_count) + sum(videos, (v) => v.comments?.summary?.total_count),
    videos: videos.length,
    items: videos.map((v) => ({
      id: v.id,
      title: v.title || v.description || "",
      date: v.created_time,
      url: v.permalink_url ? `https://www.facebook.com${v.permalink_url}` : undefined,
      views: v.views || 0,
      engagements: (v.likes?.summary?.total_count || 0) + (v.comments?.summary?.total_count || 0),
    })),
  };
}

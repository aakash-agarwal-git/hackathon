const { google } = require("googleapis");

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

async function searchYouTube(query) {
  try {
    const response = await youtube.search.list({
      part: "snippet",
      q: query,
      maxResults: 20,
    });

    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      thumbnails: item.snippet.thumbnails,
    }));

    console.log(videos);
    return videos;
  } catch (err) {
    console.error("Error making YouTube API request:", err);
    throw err;
  }
}

module.exports = {
  searchYouTube,
};

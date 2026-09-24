// These videos are added the first time the project is opened.
var sampleVideos = [
  {
    id: 1,
    title: "Big Buck Bunny",
    description: "A funny animated short film about a friendly rabbit.",
    category: "Animation",
    thumbnail: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "09:56",
    views: 1250,
    likes: 86
  },
  {
    id: 2,
    title: "For Bigger Blazes",
    description: "A short sample video for testing the video player.",
    category: "Travel",
    thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "00:15",
    views: 840,
    likes: 41
  },
  {
    id: 3,
    title: "Elephants Dream",
    description: "An imaginative open movie with creative visuals and sound.",
    category: "Drama",
    thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "10:53",
    views: 620,
    likes: 32
  }
];

function getVideos() {
  var savedVideos = localStorage.getItem("streamVideos");

  if (savedVideos === null) {
    localStorage.setItem("streamVideos", JSON.stringify(sampleVideos));
    return sampleVideos;
  }

  return JSON.parse(savedVideos);
}

function saveVideos(videos) {
  localStorage.setItem("streamVideos", JSON.stringify(videos));
}

function findVideo(videoId) {
  var videos = getVideos();

  for (var i = 0; i < videos.length; i++) {
    if (String(videos[i].id) === String(videoId)) {
      return videos[i];
    }
  }

  return null;
}

function getWatchlist() {
  var user = getCurrentUser();

  if (user === null) {
    return [];
  }

  var savedList = localStorage.getItem("watchlist_" + user.email);

  if (savedList === null) {
    return [];
  }

  return JSON.parse(savedList);
}

function saveWatchlist(list) {
  var user = getCurrentUser();

  if (user !== null) {
    localStorage.setItem("watchlist_" + user.email, JSON.stringify(list));
  }
}

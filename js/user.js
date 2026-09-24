function createVideoCard(video) {
  var watchlist = getWatchlist();
  var isSaved = watchlist.indexOf(video.id) !== -1;
  var saveText = isSaved ? "Remove" : "Add to Watchlist";

  return `
    <article class="video-card">
      <img src="${video.thumbnail}" alt="${video.title} thumbnail">
      <div class="video-card-content">
        <h3>${video.title}</h3>
        <p class="video-meta">
          ${video.category} | ${video.duration} | ${video.views} views
        </p>
        <p>${video.description}</p>
        <div class="card-actions">
          <a class="small-button primary" href="watch.html?id=${video.id}">
            Watch
          </a>
          <button class="small-button" onclick="likeVideo(${video.id})">
            Like (${video.likes})
          </button>
          <button class="small-button" onclick="changeWatchlist(${video.id})">
            ${saveText}
          </button>
        </div>
      </div>
    </article>
  `;
}

function showVideoCards(videos, elementId) {
  var container = document.getElementById(elementId);

  if (container === null) {
    return;
  }

  if (videos.length === 0) {
    container.innerHTML = "<p>No videos found.</p>";
    return;
  }

  var cards = "";

  for (var i = 0; i < videos.length; i++) {
    cards = cards + createVideoCard(videos[i]);
  }

  container.innerHTML = cards;
}

function likeVideo(videoId) {
  var videos = getVideos();

  for (var i = 0; i < videos.length; i++) {
    if (videos[i].id === videoId) {
      videos[i].likes = videos[i].likes + 1;
      break;
    }
  }

  saveVideos(videos);
  showVideoCards(videos, "videoList");
  renderWatchlist();
}

function changeWatchlist(videoId) {
  var watchlist = getWatchlist();
  var videoPosition = watchlist.indexOf(videoId);

  if (videoPosition === -1) {
    watchlist.push(videoId);
  } else {
    watchlist.splice(videoPosition, 1);
  }

  saveWatchlist(watchlist);
  showVideoCards(getVideos(), "videoList");
  renderWatchlist();
}

function renderWatchlist() {
  var savedIds = getWatchlist();
  var savedVideos = [];

  for (var i = 0; i < savedIds.length; i++) {
    var video = findVideo(savedIds[i]);

    if (video !== null) {
      savedVideos.push(video);
    }
  }

  showVideoCards(savedVideos, "watchlist");

  if (savedVideos.length === 0) {
    showMessage("watchlistMessage", "Your watchlist is empty.");
  }
}

function renderProfile() {
  var user = getCurrentUser();
  var card = document.getElementById("profileCard");

  if (card !== null && user !== null) {
    card.innerHTML = `
      <h1>My Profile</h1>
      <div class="profile-row">
        <strong>Name</strong><br>${user.name}
      </div>
      <div class="profile-row">
        <strong>Email</strong><br>${user.email}
      </div>
      <div class="profile-row">
        <strong>Account type</strong><br>Standard user
      </div>
    `;
  }
}

function getVideoIdFromAddress() {
  var query = window.location.search;
  var parts = query.split("=");

  if (parts.length < 2) {
    return null;
  }

  return parts[1];
}

function renderWatchPage() {
  var videoId = getVideoIdFromAddress();
  var video = findVideo(videoId);
  var content = document.getElementById("watchContent");

  if (video === null) {
    content.innerHTML =
      "<p class='message'>Video not found. <a href='home.html'>Return home</a></p>";
    return;
  }

  var videos = getVideos();

  for (var i = 0; i < videos.length; i++) {
    if (videos[i].id === video.id) {
      videos[i].views = videos[i].views + 1;
      video.views = videos[i].views;
      break;
    }
  }

  saveVideos(videos);

  content.innerHTML = `
    <video controls poster="${video.thumbnail}" src="${video.url}"></video>
    <h1>${video.title}</h1>
    <p class="video-meta">
      ${video.category} | ${video.duration} | ${video.views} views
    </p>
    <p>${video.description}</p>
    <button class="button primary" onclick="likeVideo(${video.id})">
      Like (${video.likes})
    </button>
    <button class="button outline" onclick="changeWatchlist(${video.id})">
      Add/Remove Watchlist
    </button>
  `;
}

function setupHome() {
  if (!requireUser()) {
    return;
  }

  var searchInput = document.getElementById("searchInput");
  var categoryButtons = document.getElementById("categoryButtons");
  var selectedCategory = "All";
  var videos = getVideos();
  var categories = ["All"];

  for (var i = 0; i < videos.length; i++) {
    if (categories.indexOf(videos[i].category) === -1) {
      categories.push(videos[i].category);
    }
  }

  for (i = 0; i < categories.length; i++) {
    var button = document.createElement("button");
    button.textContent = categories[i];

    if (categories[i] === "All") {
      button.className = "selected";
    }

    button.addEventListener("click", function () {
      selectedCategory = this.textContent;
      selectCategoryButton(this);
      filterVideos();
    });

    categoryButtons.appendChild(button);
  }

  searchInput.addEventListener("input", filterVideos);
  filterVideos();

  function filterVideos() {
    var searchText = searchInput.value.toLowerCase();
    var allVideos = getVideos();
    var matchingVideos = [];

    for (var j = 0; j < allVideos.length; j++) {
      var titleMatches =
        allVideos[j].title.toLowerCase().indexOf(searchText) !== -1;
      var categoryMatches =
        allVideos[j].category.toLowerCase().indexOf(searchText) !== -1;
      var correctCategory =
        selectedCategory === "All" ||
        allVideos[j].category === selectedCategory;

      if (correctCategory && (titleMatches || categoryMatches)) {
        matchingVideos.push(allVideos[j]);
      }
    }

    showVideoCards(matchingVideos, "videoList");
  }
}

function selectCategoryButton(selectedButton) {
  var buttons = document.getElementById("categoryButtons").children;

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("selected");
  }

  selectedButton.classList.add("selected");
}

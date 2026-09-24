function setupAdmin() {
  if (!requireAdmin()) {
    return;
  }

  showAdminDashboard();

  document
    .getElementById("videoForm")
    .addEventListener("submit", saveAdminVideo);

  document
    .getElementById("cancelEdit")
    .addEventListener("click", clearVideoForm);
}

function showAdminDashboard() {
  var videos = getVideos();
  var users = getUsers();
  var totalLikes = 0;
  var totalViews = 0;

  for (var i = 0; i < videos.length; i++) {
    totalLikes = totalLikes + Number(videos[i].likes);
    totalViews = totalViews + Number(videos[i].views);
  }

  document.getElementById("stats").innerHTML = `
    <div class="stat"><span>Total Users</span><strong>${users.length}</strong></div>
    <div class="stat"><span>Total Videos</span><strong>${videos.length}</strong></div>
    <div class="stat"><span>Total Likes</span><strong>${totalLikes}</strong></div>
    <div class="stat"><span>Total Views</span><strong>${totalViews}</strong></div>
  `;

  showAdminVideos(videos);
  showRegisteredUsers(users);
}

function showAdminVideos(videos) {
  var container = document.getElementById("adminVideos");
  var html = "";

  for (var i = 0; i < videos.length; i++) {
    html = html + `
      <div class="admin-video">
        <img src="${videos[i].thumbnail}" alt="">
        <div class="admin-video-info">
          <strong>${videos[i].title}</strong><br>
          <small>${videos[i].category} | ${videos[i].views} views</small>
        </div>
        <button class="small-button" onclick="editVideo(${videos[i].id})">
          Edit
        </button>
        <button class="small-button danger" onclick="deleteVideo(${videos[i].id})">
          Delete
        </button>
      </div>
    `;
  }

  if (html === "") {
    html = "<p>No videos yet.</p>";
  }

  container.innerHTML = html;
}

function showRegisteredUsers(users) {
  var container = document.getElementById("usersList");
  var html = "";

  for (var i = 0; i < users.length; i++) {
    html = html + `
      <div class="user-row">
        <strong>${users[i].name}</strong> - ${users[i].email}
      </div>
    `;
  }

  if (html === "") {
    html = "<p>No users registered yet.</p>";
  }

  container.innerHTML = html;
}

function saveAdminVideo(event) {
  event.preventDefault();

  var id = document.getElementById("videoId").value;
  var videos = getVideos();
  var newVideo = {
    id: id === "" ? Date.now() : Number(id),
    title: document.getElementById("videoTitle").value,
    description: document.getElementById("videoDescription").value,
    category: document.getElementById("videoCategory").value,
    thumbnail: document.getElementById("videoThumbnail").value,
    url: document.getElementById("videoUrl").value,
    duration: document.getElementById("videoDuration").value,
    views: 0,
    likes: 0
  };

  if (id === "") {
    videos.push(newVideo);
  } else {
    for (var i = 0; i < videos.length; i++) {
      if (videos[i].id === Number(id)) {
        newVideo.views = videos[i].views;
        newVideo.likes = videos[i].likes;
        videos[i] = newVideo;
      }
    }
  }

  saveVideos(videos);
  clearVideoForm();
  showAdminDashboard();
  showMessage("adminVideoMessage", "Video saved successfully.");
}

function editVideo(videoId) {
  var video = findVideo(videoId);

  if (video === null) {
    return;
  }

  document.getElementById("videoId").value = video.id;
  document.getElementById("videoTitle").value = video.title;
  document.getElementById("videoDescription").value = video.description;
  document.getElementById("videoCategory").value = video.category;
  document.getElementById("videoThumbnail").value = video.thumbnail;
  document.getElementById("videoUrl").value = video.url;
  document.getElementById("videoDuration").value = video.duration;
  document.getElementById("formTitle").textContent = "Edit Video";
  document.getElementById("cancelEdit").classList.remove("hidden");
}

function clearVideoForm() {
  document.getElementById("videoForm").reset();
  document.getElementById("videoId").value = "";
  document.getElementById("formTitle").textContent = "Add Video";
  document.getElementById("cancelEdit").classList.add("hidden");
}

function deleteVideo(videoId) {
  var shouldDelete = confirm("Delete this video?");

  if (!shouldDelete) {
    return;
  }

  var videos = getVideos();
  var remainingVideos = [];

  for (var i = 0; i < videos.length; i++) {
    if (videos[i].id !== videoId) {
      remainingVideos.push(videos[i]);
    }
  }

  saveVideos(remainingVideos);
  showAdminDashboard();
}

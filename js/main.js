// This file connects each page to the correct functions.
document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("loginForm");
  var signupForm = document.getElementById("signupForm");
  var adminLoginForm = document.getElementById("adminLoginForm");
  var logoutButton = document.getElementById("logoutButton");
  var adminLogoutButton = document.getElementById("adminLogout");

  if (loginForm !== null) {
    loginForm.addEventListener("submit", loginUser);
  }

  if (signupForm !== null) {
    signupForm.addEventListener("submit", signupUser);
  }

  if (adminLoginForm !== null) {
    adminLoginForm.addEventListener("submit", loginAdmin);
  }

  if (logoutButton !== null) {
    logoutButton.addEventListener("click", logoutUser);
  }

  if (adminLogoutButton !== null) {
    adminLogoutButton.addEventListener("click", logoutAdmin);
  }

  if (document.getElementById("videoList") !== null) {
    setupHome();
  }

  if (document.getElementById("watchlist") !== null && requireUser()) {
    renderWatchlist();
  }

  if (document.getElementById("profileCard") !== null && requireUser()) {
    renderProfile();
  }

  if (document.getElementById("watchContent") !== null && requireUser()) {
    renderWatchPage();
  }

  if (document.getElementById("videoForm") !== null) {
    setupAdmin();
  }
});

function signupUser(event) {
  event.preventDefault();

  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim().toLowerCase();
  var password = document.getElementById("password").value;
  var users = getUsers();

  if (name === "" || email === "" || password === "") {
    showMessage("message", "Please fill every field.");
    return;
  }

  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      showMessage("message", "This email is already registered.");
      return;
    }
  }

  users.push({
    name: name,
    email: email,
    password: password
  });

  saveUsers(users);
  window.location.href = "login.html";
}

function loginUser(event) {
  event.preventDefault();

  var email = document.getElementById("email").value.trim().toLowerCase();
  var password = document.getElementById("password").value;
  var users = getUsers();

  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      localStorage.setItem("streamCurrentUser", JSON.stringify(users[i]));
      window.location.href = "home.html";
      return;
    }
  }

  showMessage("message", "Wrong email or password.");
}

function loginAdmin(event) {
  event.preventDefault();

  var email = document.getElementById("adminEmail").value.trim();
  var password = document.getElementById("adminPassword").value;

  if (email === defaultAdmin.email && password === defaultAdmin.password) {
    localStorage.setItem("streamAdmin", "true");
    window.location.href = "admin-dashboard.html";
  } else {
    showMessage("adminMessage", "Wrong admin email or password.");
  }
}

// The default admin account is only for this classroom demonstration.
var defaultAdmin = {
  email: "admin@gmail.com",
  password: "admin123"
};

function getUsers() {
  var savedUsers = localStorage.getItem("streamUsers");

  if (savedUsers === null) {
    return [];
  }

  return JSON.parse(savedUsers);
}

function saveUsers(users) {
  localStorage.setItem("streamUsers", JSON.stringify(users));
}

function getCurrentUser() {
  var savedUser = localStorage.getItem("streamCurrentUser");

  if (savedUser === null) {
    return null;
  }

  return JSON.parse(savedUser);
}

function requireUser() {
  if (getCurrentUser() === null) {
    window.location.href = "login.html";
    return false;
  }

  return true;
}

function requireAdmin() {
  if (localStorage.getItem("streamAdmin") !== "true") {
    window.location.href = "admin-login.html";
    return false;
  }

  return true;
}

function logoutUser() {
  localStorage.removeItem("streamCurrentUser");
  window.location.href = "index.html";
}

function logoutAdmin() {
  localStorage.removeItem("streamAdmin");
  window.location.href = "index.html";
}

function showMessage(elementId, message) {
  var element = document.getElementById(elementId);

  if (element !== null) {
    element.textContent = message;
  }
}

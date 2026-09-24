# Video Streaming Platform

## Problem Statement
People need a simple place to browse and watch videos, while an administrator needs basic tools to manage videos and view platform activity.

## Objective
StreamBox demonstrates a small video streaming business system for an SDC college project. It has separate user and admin modules and works without a server.

## Modules
- **User Module:** signup, login, browse/search, watch, like, watchlist, profile and logout.
- **Admin Module:** login, dashboard statistics, add/edit/delete videos, view registered users and logout.

## Technologies Used
HTML5, CSS3 (Flexbox and Grid), vanilla JavaScript and browser Local Storage. No framework, backend, database or API is required.

## Features
Responsive dark interface, sample videos, search by title/category, video playback, personal watchlists, likes, authentication messages, and admin CRUD operations.

## Local Storage
The first visit saves sample videos in `streamVideos`. New users are saved in `streamUsers`; the signed-in user is saved in `streamCurrentUser`; each user's watchlist uses a key such as `watchlist_user@example.com`. Admin login uses the `streamAdmin` flag.

## How to Run
1. Download or clone this project.
2. Open the project folder.
3. Double-click `index.html`. A browser and internet connection are needed for the sample remote thumbnails/videos.
4. Create a user account, then log in. For admin features use the credentials below.

**Admin email:** `admin@gmail.com`  
**Admin password:** `admin123`

## Future Scope
A real project could add a secure backend, hashed passwords, a database, video upload storage, comments, ratings, pagination, and an API.

## Viva Checklist
This project demonstrates a problem statement, business system, admin/user modules, HTML, CSS, JavaScript, signup, login, Local Storage, JavaScript navigation, CSS Grid/Flexbox and working CRUD-style functionality.

# Laravel React RealTime Chat App 💬

Full Featured Chat Web App with User-to-User and User to Group Real Time chatting, Profile Picture Uploading and Notifications.
Built with React, Redux, Laravel, PMySQL and powered by WebSockets. You have to host in your Local Machine

<img width="450px;" src="(https://github.com/user-attachments/assets/b9190638-c227-48f2-8a3e-c9433f0453bc"/>
![Screenshot 2024-12-30 012720](https://github.com/user-attachments/assets/b9190638-c227-48f2-8a3e-c9433f0453bc)
## ⭐ Features

- Public chatting with all user in site.
- Create your own Chat Rooms/Channels and make them Public or Private( needing your permission or invitation to join )
- User To User Private Messaging

## ✅ Requirements


- PHP 7.2
- Composer
- NPM
- React
- SQLlite

A Mysql service needs to be running with user, password, database name, port and hostname supplied in .env

Following are the default values provided in `.env.example`, either setup your pgsql instance with these values, or change them with your own accordingly
```
    DB_CONNECTION=sqlite
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=laravel
    DB_USERNAME=root
    DB_PASSWORD=
```

## 🚀 Quick Start

Clone the repository

```
    git clone https://github.com/shawn-dsilva/laravel-react-realtime-chat
```

Install dependencies 

```
    composer update && npm install
```

Create .env file from local development template .env

```
    cp .env.example .env
```

Run the Local Development Init script 

```
    php artisan migrate
```
``` 
     npm run dev
```

Run the app

```
    php artisan serve
```

## 📘 Changelog


For Changelog, TODOS and Error Notes about this project, see `TODOS.md` within this repository.


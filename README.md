# Note It Down
![HTML](https://img.shields.io/badge/-HTML-gray?style=flat&logo=html5)
![CSS](https://img.shields.io/badge/-CSS-1fb30e?style=flat&logo=css3)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat&logo=typescript)
![Python](https://img.shields.io/badge/-Python-black?style=flat&logo=python)
![React](https://img.shields.io/badge/-React-black?style=flat&logo=react)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-566be8?style=flat&logo=tailwindcss)
![Zustand](https://img.shields.io/badge/-Zustand-566be8?style=flat&logo=zustand)
![React-Query](https://img.shields.io/badge/-React%20Query-f2cbde?style=flat&logo=reactquery)
![Django](https://img.shields.io/badge/-Django-9ef0b4?style=flat&logo=django&logoColor=darkgreen)
![DjangoRestFramework](https://img.shields.io/badge/-Django%20Rest%20Framework-9ef0b4?style=flat)
![SQLite](https://img.shields.io/badge/-SQLite-white?style=flat&logo=sqlite&logoColor=blue)
![Postman](https://img.shields.io/badge/-Postman-black?style=flat&logo=postman&logoColor=orange)

# Table of contents
1. [Description](#description)
2. [Demo](#demo)
3. [Screenshots](#screenshots)
4. [Architecture Overview](#architecture-overview)
5. [API Documentation](#api-documentation)
6. [Installation and Usage](#installation-usage)

## Description <a name="description"></a>
It is a full-stack note-taking web application built with React on the frontend and Django/Django-Rest-Framework on the backend.

<ins>Features</ins>:
- Light/dark mode (depending on your device settings)
- JWT authentication
- For users:
  - Users can Signup/Login/Logout
  - Currently loggedin user info is displayed on the home page
  - Users can update their email & password
  - Users can delete their account
- For notes:
  - Users can create a note
  - Users can set priority of a note
  - Users can view all notes at once or filter notes by priority (high/medium/low)
  - Users can view a specific note
  - Users can download/export a note as a pdf
  - Users can update/edit a note
  - Users can delete a note
  - A rich text editor is provided for taking down notes

## Demo <a name="demo"></a>
Check the video demo at [Note It Down Demo](https://youtu.be/ME37aFqTa20)

## Screenshots <a name="screenshots"></a>
![](readme-res//Screenshots.png)

## Architecture Overview <a name="architecture-overview"></a>
![](readme-res//NoteItDown%20Architecture.png)
> **<ins>Note to self</ins>:** _This section is meant to give an overview of how the frontend & backend are structured and how they communicate with each other. If refactoring or adding new features alter the architecture, change the pictures too via [draw.io](https://draw.io/) using the file `NoteItDown Architecture.drawio` in `readme-res` folder._

## API Documentation <a name="api-documentation"></a>
View the api endpoints at [Note It Down Api Docs](https://documenter.getpostman.com/view/25138891/2s8Z73xqLn). I used postman for documenting the api endpoints.

## Installation and Usage <a name="installation-usage"></a>
#### <ins>**General**</ins>
- Built on `OS: Windows 10` using `VSCode`
- Requirements:
  - `node >= 16.14.0`
  - `npm >= 8.3.1`
  - `python >= 3.8`
  - `pip >= 21.3.1`
- `git clone https://github.com/AI-14/note-it-down.git` - clones the repository
- `cd note-it-down`
> NOTE: First run backend server (it will run on `http://127.0.0.1:8000`), then run frontend app (it will run on `http://127.0.0.1:3000`)

#### <ins>**For frontend folder**</ins> 
- `cd frontend`
- `npm install` or `npm i` - installs all packages
- `npm install --save-dev` - installs devDependencies 
- `npm start` - starts the app

#### <ins>**For backend folder**</ins>
- `cd backend`
- `py -m venv yourVenvName` - creates a virtual environment
- `yourVenvName\Scripts\activate.bat` - activates the virtual environment
- `pip install -r requirements.txt` - installs all modules
- `python manage.py makemigrations` & `python manage.py migrate` - migrates all the tables to db
- `python manage.py createsuperuser` - creates a superuser
- `python manage.py runserver` - runs the server

#### <ins>**If using Makefile**</ins>
You need to have `make` installed in your machine
- `make build-backend` - builds the backend
- `make build-frontend` - builds the frontend
- `make run-backend` - runs the backend
- `make run-frontend` - runs the frontend (make sure you open another cmd to run this command)
> NOTE: use `make help` to see all the commands

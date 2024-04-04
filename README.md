# README

## Introduction

This is a simple program that allows people to share their favorite YouTube videos with others. You can create an
account and share videos with everyone. If you’re logged in, you’ll receive notifications when others share videos, and
those videos will appear on your feed.

## Prerequisites

This project has been configured with Docker, allowing you to quickly utilize it along with the necessary tools:

- Git: https://git-scm.com/downloads
- Docker: https://docs.docker.com/engine/install/
- Docker Compose: https://docs.docker.com/compose/install/
- Node.js >= 19.0.0: https://nodejs.org/en/download/
- Yarn : https://classic.yarnpkg.com/en/docs/install/

The following tools will assist you during the development process:
- Ruby 3.3.0: https://www.ruby-lang.org/en/downloads/
- Rails > 7.1.0: https://rubyonrails.org/


## Installation & Configuration

1. Clone the repository and go to the project directory:
   ```git clone https://github.com/dinhvantai/ruby-react-demo.git && cd ruby-react-demo```
2. Create master.key file for Rails application:
   ```echo "f72fe965af0635e1a88ad50bc3920fc8" > backend/config/master.key```
3. Create env for React application:
   ```cp frontend/.env.local.example frontend/.env.local```
4. Build the Docker containers:
   ```docker compose build``` or ```docker-compose build```
5. Run the Docker containers:
   ```docker compose up -d``` or ```docker-compose up -d```
6. Install and run frontend:
   ```cd frontend && yarn && yarn dev```

## Database Setup

All necessary tables have been generated during the Docker execution process.

## Running the Application

- Go to explore browser and open the following URL:
  ```http://localhost:8000```

- Run the following command to execute test cases:
  ```docker exec -it api ./bin/rails test```

## Docker Deployment
Can use cloud services like AWS, Azure, or GCP to deploy applications. For example, when using GCP:
- Create a Cloud SQL instance for the database.
- Create a Redis instance for the real-time and caching system.
- Create a docker file for frontend and backend.
- Push the docker image to the GCP container registry.
- Create a network for the frontend and backend services.
- Create a network for the backend with the redis and the database.
- Create a Cloud Run service for the frontend and backend based on the docker image.
- Create a Cloud Load Balancer to route the traffic to the frontend and backend services.

## Usage

- Create a account or login:
  You need to enter the correct email and password, then click the `Login/Register` button. If that email does not exist
  yet, you’ll be created an account. If it has already been created, you’ll log in by entering the correct password you
  set previously.
- Logout:
  You can log out by clicking the `Logout` button.
- Share a video:
  You need to logged in to share a video.
  You can share a video by clicking the `Share a video` button. You need to enter the title, the Youtube URL and can
  input the description for the video. Then click the `Share` button.
- Notification when others share videos:
  If you’re logged in, you’ll receive notifications when others share videos.
  You can open other tab on browser and login with another account to share a video. You will see the notification on
  the first tab.

## Troubleshooting

- You may encounter CORS when calling a websocket from a different domain, and you need to configure it to allow this.
- Similarly, you may be blocked by CORS when calling an API from a different domain.
 
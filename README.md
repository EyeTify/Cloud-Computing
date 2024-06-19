# EyeTify - Cloud Computing ☁️

## 📑 Introduction

EyeTify is an innovative application aimed at detecting early eye diseases using image processing and machine learning. This repository contains the cloud computing components of the EyeTify project, including APIs for authentication, news fetching, and machine learning model integration.

## 📚 Related Project Repositories
|   Learning Paths      |                           Link                                  |
| :-------------------: | :-------------------------------------------------------:       |
| 🤖 Machine Learning   | [ML Repository](https://github.com/EyeTify/Machine-Learning)    |
| 📱 Mobile Development | [MD Repository](https://github.com/EyeTify/Mobile-Development) |

## 🔎 Features

- **Authentication**: Secure user authentication using Firebase.
- **News Fetching**: Fetch and display news articles from external providers.
- **Machine Learning**: Analyze uploaded images for eye disease detection using a machine learning model.

## 🔗 APIs

### Authentication API

- **Endpoint**: `https://asia-southeast2-eyetifycapstone.cloudfunctions.net/app/api`
- **Methods**:
  - `POST /register`: Register a new user.
  - `POST /login`: Authenticate an existing user.
  - `POST /reset-password`: Change user password.
  - `POST /logout`: Logging out user account

### News Fetching API

- **Base URL**: `https://articles-features-api-kodyfcb2bq-et.a.run.app`
- **Methods**:
  - `GET /health-news`: Fetch the latest news articles.
  - `GET /search-articles`: Search for news articles based on keywords.

### Machine Learning API

- **Endpoint**: `https://ml-model-api-kodyfcb2bq-et.a.run.app/api/upload-analyze`
- **Methods**:
  - `POST /image`: Analyze the uploaded image for eye disease detection.

## 🔧 Architecture

![EyeTify Architecture 5](https://github.com/EyeTify/Cloud-Computing/assets/154324482/07a0e7e7-997c-447d-946c-1d3938fa7c52)

### Interaction between components:

1. **Clients**
   - Users of the EyeTify application on mobile devices perform actions, such as logging in or uploading images.

2. **Backend Services**
   - **Firebase Authentication**: Manage user authentication. When a user signs in, Firebase Authentication verifies their credentials.
   - **Cloud Run Backend API**: Once the user is authenticated, Cloud Run handles API requests from the client application. For example, when a user uploads an image for analysis.
   - **Cloud Storage**: Cloud Run uploads images sent by users to Cloud Storage for storage and stores ML Models.
   - **Firestore Database**: Cloud Run can also store and retrieve related data from the Firestore Database, such as image analysis results that have been processed by machine learning models.

3. **CI/CD using Cloud Build**
   - **GitHub Repository**: Developers manage project source code in the GitHub Repository. Every time there is a code change (commit/push), it will trigger the CI/CD process.
   - **Cloud Trigger**: Cloud Trigger monitors changes in the GitHub Repository and triggers Cloud Build to start the build process.
   - **Docker Images**: Cloud Build takes source code, builds a Docker image, and uploads it to Google Container Registry.
   - **Container Registry**: Saves a Docker image ready to deploy to Cloud Run.

4. **Access Control and Billing**
   - **Cloud IAM**: Manage user identities and access to secure access to cloud resources.
   - **Cloud Billing**: Manage and monitor costs for using Google Cloud services.

We follows a microservices architecture, where each API is deployed independently to ensure modularity and scalability.

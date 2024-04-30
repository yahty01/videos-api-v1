https://videos-api-v1.vercel.app/

# Videos API Documentation

## Overview
This API provides endpoints for managing video data, including capabilities to retrieve, create, update, and delete video records.

## Base URL
`/videos`

## Routes

### GET /videos
- **Description:** Retrieves a list of all videos.
- **Response:**
    - **Status:** 200 OK
    - **Content:** Array of `Video` objects.

### GET /videos/:id
- **Description:** Retrieves a video by its unique ID.
- **Parameters:**
    - `id` (integer): The ID of the video.
- **Response:**
    - **Status:** 200 OK - Returns the requested video.
    - **Status:** 404 Not Found - If no video is found with the given ID.

### POST /videos
- **Description:** Adds a new video to the database.
- **Body:**
    - `title` (string, required): The title of the video, max length 40 characters.
    - `author` (string, required): The author of the video, max length 20 characters.
    - `canBeDownloaded` (boolean, optional): Indicates if the video can be downloaded.
    - `minAgeRestriction` (integer, optional): Minimum age required to view the video.
    - `availableResolutions` (array of strings, optional): Resolutions in which the video is available.
- **Response:**
    - **Status:** 201 Created - Returns the newly created video.
    - **Status:** 400 Bad Request - If validation fails with an array of error messages.

### PUT /videos/:id
- **Description:** Updates an existing video by its ID.
- **Parameters:**
    - `id` (integer): The ID of the video.
- **Body:**
    - `title` (string, optional): The new title of the video.
    - `author` (string, optional): The new author of the video.
    - `canBeDownloaded` (boolean, optional): New downloadable status.
    - `minAgeRestriction` (integer, optional): New minimum age restriction.
    - `availableResolutions` (array of strings, optional): New resolutions available.
- **Response:**
    - **Status:** 204 No Content - Returns updated video.
    - **Status:** 404 Not Found - If no video is found with the given ID.
    - **Status:** 400 Bad Request - If validation fails.

### DELETE /videos/:id
- **Description:** Deletes a video by its ID.
- **Parameters:**
    - `id` (integer): The ID of the video.
- **Response:**
    - **Status:** 204 No Content - Successfully deleted.
    - **Status:** 404 Not Found - If no video is found with the given ID.

## Data Types

### Video
- `id` (integer): Unique identifier for the video.
- `title` (string): Title of the video.
- `author` (string): Author of the video.
- `canBeDownloaded` (boolean): Indicates if the video can be downloaded.
- `minAgeRestriction` (integer, nullable): Minimum age required to view the video.
- `createdAt` (string, ISO 8601 date): Creation date of the video.
- `publicationDate` (string, ISO 8601 date): Date when the video was published.
- `availableResolutions` (array of `Resolutions`, nullable): Resolutions in which the video is available.

## Error Handling
Errors return a JSON object with a list of messages detailing the issue. Example:
```json
{
  "errorsMessages": [
    {
      "message": "title is required",
      "field": "title"
    }
  ]
}

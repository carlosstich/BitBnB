# BitBnB

# Database Schema

# API Documentation

Get User
Retrieves information about a user.

Require Authentication: true


Request

Method: GET
URL: ?
Body: none
Successful Response

Status Code: 200

Headers:
Content-Type: application/json
Body:

json
Copy code
{
  "id": 1,
  "name": "Carlos Stich",
  "email": "carlosjstich@gmail.com"
}
Error Response: User not found

Status Code: 404

Headers:

Content-Type: application/json
Body:

json
Copy code
{
  "message": "User not found",
  "statusCode": 404
}

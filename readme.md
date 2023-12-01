# Hello-Pas

Project with basic routes:
* Express
* Joi
* Sequelize
* mySql
* Cors
* Jsonwebtoken
* Multer
* Midtrans
* Redis

### DOTENV CONFIGURATION
```
JWT_SECRET_KEY = "rahasia"
SERVER_KEY_MIDTRANS = 'SB-Mid-server-4-lfGto43qBv8JfHyBuIc2Uc'
```
---

## URL
_Server_

```
http://localhost:3300/api
```
---


## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


## RESTful endpoints


### GET /reviews/getReviews/:doctorId

> Get all reviews by doctor id

_Request Params_

```
/<doctor_id>/

```

_Request Header_
```
Authentication: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 8,
        "userId": 2,
        "doctorId": 2,
        "comment": "yahahaha",
        "createdAt": "2023-11-29T14:02:20.000Z",
        "updatedAt": "2023-11-29T14:02:20.000Z",
        "User": {
            "id": 2,
            "username": "taufiqo",
            "email": "taufiqo@gmail.com",
            "password": "$2a$10$t0rjM2x8yU58aTzW4KgkxOW1j6sgiJfPxZ/aKkXjO9e2lz6.Cj3ke",
            "phoneNumber": "0819876543210",
            "image": "public\\assets\\a07d787b28d058e571d1efbb175cb3e5.jpg",
            "createdAt": "2023-11-29T01:16:13.000Z",
            "updatedAt": "2023-11-30T02:09:56.000Z"
        },
        "Doctor": {
            "id": 2,
            "username": "Ki hajar dewantara",
            "email": "hajar@gmail.com",
            "password": "$2a$10$d0gkc7wwJpytqqXzCw2GEeQBbyvNAUqEHk55btw8moydnMk9ync8O",
            "phoneNumber": "0189876543210",
            "image": "https://www.tagar.id/Asset/uploads2019/1571735426986-dokter.jpg",
            "price": 70000,
            "yearExperience": 2,
            "practiceAt": "jl.casablanca RT 01 RW 02",
            "createdAt": "2023-11-29T01:16:13.000Z",
            "updatedAt": "2023-11-29T01:16:13.000Z"
        }
    }
]
```
_Response (401 - Error Forbidden)_
```
{
    "message": "Authentication failed, you need token"
}
```

---

### POST /reviews/addReview/:doctorId

> Add reviews by doctor id

_Request Params_

```
/<doctor_id>/

```

_Request Header_
```
Authentication: Bearer <jwt.token>
```

_Request Body_
```
{
  "comment" : "<comment>",
}
```

_Response (201)_
```
{
    "message": "sukses",
    "theReview": {
        "comment": "good job"
    }
}
```
_Response (401 - Error Forbidden)_
```
{
    "message": "Authentication failed, you need token"
}
```
_Response (400 - Error Forbidden)_
```
{
    "message": "Token is invalid"
}
```
```
{
    "status": "Validation Failed",
    "message": "\"comment\" is not allowed to be empty"
}
```

---

### DELETE /reviews/deleteReview/:reviewId

> Delete reviews by  reviewId

_Request Params_

```
/<review_id>/

```

_Request Header_
```
Authorization: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "sukses delete",
    "dataReview": {
        "id": 24,
        "userId": 1,
        "doctorId": 1,
        "comment": "naahhhhh",
        "createdAt": "2023-11-28T03:15:21.000Z",
        "updatedAt": "2023-11-28T03:15:21.000Z"
    }
}
```
_Response (400 - Error Forbidden)_
```
{
    "message": "Token is invalid"
}
```
```
{
    "status": "Validation Failed",
    "message": "\"comment\" is not allowed to be empty"
}
```

_Response (401 - Error Forbidden)_
```
{
    "message": "Authentication failed, you need token"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "review not found"
}
```
---

### POST /appointments/midtransToken/:appointmenId

> Create Token midtrans for payment by appointmentId

_Request Params_

```
/<appointment_id>/

```

_Request Header_
```
Authentication: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (201)_
```
{
    "token": "d18d7c1b-5125-4685-8fd4-d23affa72cd3",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/d18d7c1b-5125-4685-8fd4-d23affa72cd3"
}
```

_Response (400 - Error Forbidden)_
```
{
    "message": "Token is invalid"
}
```

_Response (401 - Error Forbidden)_
```
{
    {
    "message": "Authentication failed, you need token"
}
}
```
_Response (404 - Error Not Found)_
```
{
    "message": "Appointment Not Found"
}
```

---
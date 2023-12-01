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
    {
    "message": "Authentication failed, you need token"
}
}
```

---
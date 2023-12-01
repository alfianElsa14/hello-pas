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


### GET /users

> Get all users

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 1,
        "username": "alfian",
        "email": "alfian@gmail.com",
        "password": "$2a$10$ovSht3NEdqF0J4HfvbmmMukhKMqetn3zwXCl/6u9/xichYfD2ODzW",
        "image": "http://localhost:3300/public\\assets\\profile-picture-icon-27.jpg",
        "role": "admin",
        "createdAt": "2023-11-22T01:55:01.000Z",
        "updatedAt": "2023-11-24T04:21:56.000Z"
    },
    {
        "id": 2,
        "username": "kuya",
        "email": "kuya@gmail.com",
        "password": "$2a$10$bBSxBnzaTLPIBA0cJRGvYuR31vq/OOddakCiVUDGrEjUaY1ME5DhW",
        "image": "http://localhost:3300/public\\assets\\pngtree-muslim-boy-profile-photo-png-image_8973295.png",
        "role": "user",
        "createdAt": "2023-11-22T01:55:01.000Z",
        "updatedAt": "2023-11-24T05:56:01.000Z"
    },
]
```

---
# Hello-Pas

Project with basic routes:

- Express
- Joi
- Sequelize
- mySql
- Cors
- Jsonwebtoken
- Multer
- Midtrans
- Redis

### DOTENV CONFIGURATION

```
SECRET_KEY = "rahasia"
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

_Response (401 - Authentication)_

```
{
    "message": "Authentication failed, you need token"
}
```

_Response (401)_

```
{
    "message": "Token is invalid",
}
```

_Response (404)_

```
{
    "message": "API not found",
}
```

---

## RESTful endpoints

### GET /users/allUsers

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
        "username": "daniel",
        "email": "daniel@gmail.com",
        "phoneNumber": "0817627777",
        "image": "public\\assets\\download7.jpeg"
    },
    {
        "id": 2,
        "username": "taufiqo",
        "email": "taufiqo@gmail.com",
        "phoneNumber": "0819876543210",
        "image": "public\\assets\\download8.jpeg"
    }
]
```

---

### POST /users/register

> REGISTER USER

_Request Header_

```
not needed
```

_Request Body_

```
{
    "username": "Pasien Baru",
    "email": "pasien@gmail.com",
    "password": "123456",
    "phoneNumber": "081987654322"
}
```

_Response (201)_

```
{
    "data": {
        "id": 6,
        "username": "Pasien Baru",
        "email": "pasien@gmail.com",
        "password": "$2a$10$g7u.9UASLkJfMj9mZ/L/3ud.XC0uIaD5lP63ZeIZhnSZy5tDKzZqa",
        "phoneNumber": "081987654322",
        "updatedAt": "2023-12-01T04:07:09.008Z",
        "createdAt": "2023-12-01T04:07:09.008Z"
    },
    "message": "User created successfully"
}
```

_Response (400)_

```
{
    "message": "Phone number already exists"
}
```

_Response (400)_

```
{
    "message": "Email has already exists"
}
```

_Response (400)_ All field is required

```
{
    "status": "Validation Failed",
    "message": "\"phoneNumber\" is not allowed to be empty"
}
```

---

### POST /users/login

> LOGIN USER

_Request Header_

```
not needed
```

_Request Body_

```
{
    "email": "taufiqo@gmail.com",
    "password": "1234567"
}
```

_Response (200)_

```
{
    "token": <jwt.token>,
    "message": "Login successful",
    "data": {
        "id": 2,
        "username": "taufiqo",
        "email": "taufiqo@gmail.com",
        "phoneNumber": "0819876543210",
        "image": "public\\assets\\download8.jpeg"
    }
}
```

_Response (404)_

```
{
    "status": "Error",
    "message": "User tidak ditemukan"
}
```

_Response (401)_

```
{
    "message": "Invalid password"
}
```

_Response (400)_ All field is required

```
{
    "status": "Validation Failed",
    "message": "\"password\" is not allowed to be empty"
}
```

_Response (401)_

```
{
    "message": "Account locked, try again later."
}
```

---

### GET /users

> PROFILE USER

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
{
    "id": 1,
    "username": "daniel",
    "email": "daniel@gmail.com",
    "phoneNumber": "0817627777",
    "image": "public\\assets\\download7.jpeg",
    "role": "user"
}
```

---

### PUT /users/changePassword

> CHANGE PASSWORD USER

_Request Header_

```
Authentication: Bearer <jwt.token>
```

_Request Body_

```
{
    "oldPassword": "123456",
    "newPassword": "1234567"
}
```

_Response (200)_

```
{
    "message": "Change password successfully"
}
```

_Response (401)_

```
{
    "message": "Invalid old password"
}
```

---

### PUT /users/editUser

> EDIT PROFILE USER

_Request Header_

```
Authentication: Bearer <jwt.token>
```

_Request Body_

```
{
    "username": "taufiqo updated",
    "phoneNumber": "08123921390",
    "image": "gambar.jpeg"
}
```

_Response (200)_

```
{
    "message": "success",
    "result": [
        1
    ]
}
```

---

### GET /doctors/allDoctors

> Get all doctors

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
{
    "message": "caching redis",
    "data": [
        {
            "id": 1,
            "username": "Sugiono",
            "email": "sugiono@gmail.com",
            "phoneNumber": "0811234567890",
            "image": "public\\assets\\download1.jpeg",
            "price": 50000,
            "yearExperience": 3,
            "practiceAt": "jl.lurah RT 02 RW 03"
        },
        {
            "id": 2,
            "username": "Ki hajar dewantara",
            "email": "hajar@gmail.com",
            "phoneNumber": "0189876543210",
            "image": "public\\assets\\download2.jpeg",
            "price": 70000,
            "yearExperience": 2,
            "practiceAt": "jl.casablanca RT 01 RW 02"
        }
    ]
}
```

---

### GET /doctors/:doctorId

> Get doctors by id

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
{
    "id": 1,
    "username": "Sugiono",
    "email": "sugiono@gmail.com",
    "phoneNumber": "0811234567890",
    "image": "public\\assets\\download1.jpeg",
    "price": 50000,
    "yearExperience": 3,
    "practiceAt": "jl.lurah RT 02 RW 03"
}
```

_Response (404)_

```
{
    "status": "Error",
    "message": "Doctor tidak ditemukan"
}

```

---

### GET /doctors

> Get profile doctor by token

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
{
    "id": 3,
    "username": "Jugo",
    "email": "jugo@gmail.com",
    "phoneNumber": "0819876543210",
    "image": "public\\assets\\download3.jpeg",
    "price": 100000,
    "yearExperience": 3,
    "practiceAt": "Jl. H.Keman RT 02 RW 03",
    "Reviews": [
        {
            "comment": "Mantap pak konsultasi penyakitnya",
            "User": {
                "username": "taufiqo updated",
                "image": "public\\assets\\1701411662119.jpg"
            }
        }
    ],
    "role": "doctor"
}
```

_Response (404)_

```
{
    "status": "Error",
    "message": "Doctor tidak ditemukan"
}

```

---

### POST /doctors/register

> Register Doctor

_Request Header_

```
not needed
```

_Request Body_

```
{
    "id": 8,
    "username": "Mulyono Saik",
    "email": "mulyono@gmail.com",
    "password": "123456",
    "phoneNumber": "0128831723",
    "yearExperience": "4",
    "practiceAt": "Jl. hj sueab gang bakti no.90",
    "price": "45000",
    "image": "doctor.png",
}
```

_Response (200)_

```
{
    "data": {
        "id": 8,
        "username": "Mulyono Saik",
        "email": "mulyono@gmail.com",
        "password": "$2a$10$8FP/ex1/G5Xc.Hr1d/c4hOhHWeuWAuxausO6pGoLTlxtj1skVAPy.",
        "phoneNumber": "0128831723",
        "yearExperience": "4",
        "practiceAt": "Jl. hj sueab gang bakti no.90",
        "price": "45000",
        "image": "public\\assets\\1701413365229.png",
        "updatedAt": "2023-12-01T06:49:25.248Z",
        "createdAt": "2023-12-01T06:49:25.248Z"
    },
    "message": "Doctor created successfully"
}
```

_Response (400)_

```
{
    "message": "Phone number already exists"
}
```

_Response (400)_

```
{
    "message": "Email has already exists"
}
```

_Response (404)_ All field is required

```
{
    "status": "Validation Failed",
    "message": "\"email\" is not allowed to be empty"
}

```

---

### POST /doctors/login

> Login Doctor

_Request Header_

```
not needed
```

_Request Body_

```
{
    "email": "jugo@gmail.com",
    "password": "1234567"
}
```

_Response (200)_

```
{
    "token": <jwt.token>,
    "message": "Login successful",
    "data": {
        "id": 3,
        "username": "Jugo",
        "email": "jugo@gmail.com",
        "phoneNumber": "0819876543210",
        "image": "public\\assets\\download3.jpeg",
        "price": 100000,
        "yearExperience": 3,
        "practiceAt": "Jl. H.Keman RT 02 RW 03"
    }
}
```

_Response (400)_

```
{
    "message": "Phone number already exists"
}
```

_Response (400)_

```
{
    "message": "Email has already exists"
}
```

_Response (404)_ All field is required

```
{
    "status": "Validation Failed",
    "message": "\"email\" is not allowed to be empty"
}

```

---

### PUT /doctors/changePassword

> CHANGE PASSWORD DOCTOR

_Request Header_

```
Authentication: Bearer <jwt.token>
```

_Request Body_

```
{
    "oldPassword": "123456",
    "newPassword": "1234567"
}
```

_Response (200)_

```
{
    "message": "Change password successfully"
}
```

_Response (401)_

```
{
    "message": "Invalid old password"
}
```

---

### PUT /users/editDoctor

> EDIT PROFILE USER

_Request Header_

```
Authentication: Bearer <jwt.token>
```

_Request Body_

```
{
    "username": "judo updated",
    "phoneNumber": "08123921390",
    "practiceAt": "Jl. kota kasablanka no.21"
    "price": 90000,
    "image": "gambar_updated.jpeg"
}
```

_Response (200)_

```
{
    "message": "success",
    "result": [
        1
    ]
}
```

---

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

> Delete reviews by reviewId

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

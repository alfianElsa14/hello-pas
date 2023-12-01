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

## DOTENV CONFIGURATION

### BACKEND

```
SECRET_KEY = "rahasia"
```

### FRONTEND

```
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

_Response (401 - Invalid Token)_

```
{
  "message": "Token is invalid",
}
```

_Response (404 - API Not Found)_

```
{
  "message": "API not found",
}
```

---

## RESTful endpoints

### User

#### GET /users

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

#### GET /users/allUsers

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

#### POST /users/register

> Register User

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

_Response (400 - Phone Number Exist)_

```
{
  "message": "Phone number already exists"
}
```

_Response (400 - Email Exist)_

```
{
  "message": "Email has already exists"
}
```

_Response (400 - All Field is Required)_

```
{
  "status": "Validation Failed",
  "message": "\"phoneNumber\" is not allowed to be empty"
}
```

---

#### POST /users/login

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

_Response (404 - User Not Found)_

```
{
  "status": "Error",
  "message": "User tidak ditemukan"
}
```

_Response (401 - Invalid Password)_

```
{
  "message": "Invalid password"
}
```

_Response (400 - All Field is Required)_

```
{
  "status": "Validation Failed",
  "message": "\"password\" is not allowed to be empty"
}
```

_Response (401 - Login Keeps Failing)_

```
{
  "message": "Account locked, try again later."
}
```

---

#### PUT /users/changePassword

> Change user password

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

#### PUT /users/editUser

> Edit user profile

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

### Doctor

#### GET /doctors/allDoctors

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

#### GET /doctors/:doctorId

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

#### GET /doctors

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

#### POST /doctors/register

> Register doctor

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

_Response (400 - Phone Number Exist)_

```
{
  "message": "Phone number already exists"
}
```

_Response (400 - Email Exist)_

```
{
  "message": "Email has already exists"
}
```

_Response (404 - All Field is Required)_

```
{
  "status": "Validation Failed",
  "message": "\"email\" is not allowed to be empty"
}

```

---

#### POST /doctors/login

> Login doctor

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

_Response (404)_ All field is required

```
{
  "status": "Validation Failed",
  "message": "\"email\" is not allowed to be empty"
}

```

---

#### PUT /doctors/changePassword

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

#### PUT /doctors/editDoctor

> Edit doctor profile

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

### Review

#### GET /reviews/getReviews/:doctorId

> Get all reviews by doctor id

_Request Params_

```
/<doctor_id>

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
/<doctor_id>

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

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"comment\" is not allowed to be empty"
}
```

---

#### DELETE /reviews/deleteReview/:reviewId

> Delete reviews by reviewId (can be done by its author)

_Request Params_

```
/<review_id>
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

_Response (400 - Validation Error)_

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

### Appointment

#### GET /appointments/user/:userId

> Get appointments for user (can be requested by its user or admin only)

_Request Params_
```
/<userId>
```

_Request Headers_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": [
    {
      "id": <appointmentId>,
      "userId": <userId>,
      "doctorId": <doctorId>,
      "status": <status>,
      "complaint": <complaint>,
      "startTime": <startTime>,
      "endTime": <endTime>,
      "createdAt": <createdAt>,
      "updatedAt": <updatedAt>,
      "User": {
        "id": <userId>,
        "username": <username>,
        "email": <email>,
        "phoneNumber": <phoneNumber>,
        "image": <image>,
        "createdAt": <createdAt>,
        "updatedAt": <updatedAt>
      },
      "Doctor": {
        "id": <doctorId>,
        "username": <username>,
        "email": <email>,
        "phoneNumber": <phoneNumber>,
        "image": <image>,
        "price": <price>,
        "yearExperience": <yearExperience>,
        "practiceAt": <practiceAt>,
        "createdAt": <createdAt>,
        "updatedAt": <updatedAt>
      }
    },
    ...<sameObject>
  ],
  "status": "Success"
}
```

_Response (400 - Not Authorized Users)_
```
{
  "message": "Not Authorized"
}
```

_Response (404 - User Not Found)_
```
{
  "message": "User Not Found"
}
```

---

#### GET /appointments/doctor/:doctorId

> Get appointments for doctor (can be requested by its doctor or admin only)

_Request Params_
```
/<doctorId>
```

_Request Headers_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": [
    {
      "id": <appointmentId>,
      "userId": <userId>,
      "doctorId": <doctorId>,
      "status": <status>,
      "complaint": <complaint>,
      "startTime": <startTime>,
      "endTime": <endTime>,
      "createdAt": <createdAt>,
      "updatedAt": <updatedAt>,
      "User": {
        "id": <userId>,
        "username": <username>,
        "email": <email>,
        "phoneNumber": <phoneNumber>,
        "image": <image>,
        "createdAt": <createdAt>,
        "updatedAt": <updatedAt>
      },
      "Doctor": {
        "id": <doctorId>,
        "username": <username>,
        "email": <email>,
        "phoneNumber": <phoneNumber>,
        "image": <image>,
        "price": <price>,
        "yearExperience": <yearExperience>,
        "practiceAt": <practiceAt>,
        "createdAt": <createdAt>,
        "updatedAt": <updatedAt>
      }
    },
    ...<sameObject>
  ],
  "status": "Success"
}
```

_Response (400 - Not Authorized Users)_
```
{
  "message": "Not Authorized"
}
```

_Response (404 - Doctor Not Found)_
```
{
  "message": "Doctor Not Found"
}
```

---

#### GET /appointments/available/:doctorId

> Get available appointments between user and doctor for the next 2 weeks within work hours (8 AM - 8 PM) (can be requested by user only)

_Request Params_
```
/<doctorId>
```

_Request Headers_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": [
    {
      "startTime": "2023-11-29T01:00:00.000Z",
      "endTime": "2023-11-29T02:00:00.000Z"
    },
    ...<sameObject>
  ]
}
```

_Response (404)
```
{
  "message": "Doctor Not Found"
}
```

---

#### POST /appointments

> Create appointment (can be requested by user only)

_Request Headers_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
{
  doctorId: <doctorId>,
  complaint: <complaint>,
  startTime: <startTime>,  // need to be at least 12 hours from now
  endTime: <endTime>,
}
```

_Response (201)_
```
{
  "data": {
    "id": <appointmentId>,
    "userId": <userId>,
    "doctorId": <doctorId>,
    "complaint": <complaint>,
    "startTime": <startTime>,
    "endTime": <endTime>,
    "updatedAt": <updatedAt>,
    "createdAt": <createdAt>,
    "status": "pending"
  },
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"startTime\" must be at least 12 hours ahead of the current time"
}
```

_Response (404 - Doctor Not Found)_
```
{
  "message": "Doctor Not Found"
}
```

_Response (400 - Schedule Conflict On User)_
```
{
  "message": "There is a schedule conflic on user!" 
}
```

_Response (400 - Schedule Conflict On Doctor)_
```
{
  "message": "There is a schedule conflic on doctor! Maybe refresh will help." 
}
```

---

#### POST /appointments/midtransToken/:appointmenId

> Create Token midtrans for payment by appointmentId

_Request Params_
```
/<appointmentId>
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

_Response (404 - Error Not Found)_
```
{
  "message": "Appointment Not Found"
}
```

---

#### PUT /appointments/accept/:appointmentId

> Accept an appointment (can be done by doctor only)

_Request Params_
```
/<appointmentId>
```

_Request Header_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": {
    "id": <appointmentId>,
    "userId": <userId>,
    "doctorId": <doctorId>,
    "status": <status>,
    "complaint": <complaint>,
    "startTime": <startTime>,
    "endTime": <endTime>,
    "createdAt": <createdAt>,
    "updatedAt": <updatedAt>,
    "User": {
      "id": <userId>,
      "username": <username>,
      "email": <email>,
      "phoneNumber": <phoneNumber>,
      "image": <image>,
      "createdAt": <createdAt>,
      "updatedAt": <updatedAt>
    },
    "Doctor": {
      "id": <doctorId>,
      "username": <username>,
      "email": <email>,
      "phoneNumber": <phoneNumber>,
      "image": <image>,
      "price": <price>,
      "yearExperience": <yearExperience>,
      "practiceAt": <practiceAt>,
      "createdAt": <createdAt>,
      "updatedAt": <updatedAt>
    }
  },
  "status": "Success"
}
```

_Response (404 - Appointment Not Found)_
```
{
  "message": "Appointment Not Found"
}
```

_Response (400 - Appointment Not In Status Pending)_
```
{
  "message": "Appointment is in status: <status>"
}
```

_Response (400 - Not Authorized)_
```
{
  "message": "Not Authorized"
}
```

---

#### PUT /appointments/pay/:appointmentId

> Pay an appointment

_Request Params_
```
/<appointmentId>
```

_Request Header_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": {
    "id": <appointmentId>,
    "userId": <userId>,
    "doctorId": <doctorId>,
    "status": <status>,
    "complaint": <complaint>,
    "startTime": <startTime>,
    "endTime": <endTime>,
    "createdAt": <createdAt>,
    "updatedAt": <updatedAt>,
    "User": {
      "id": <userId>,
      "username": <username>,
      "email": <email>,
      "phoneNumber": <phoneNumber>,
      "image": <image>,
      "createdAt": <createdAt>,
      "updatedAt": <updatedAt>
    },
    "Doctor": {
      "id": <doctorId>,
      "username": <username>,
      "email": <email>,
      "phoneNumber": <phoneNumber>,
      "image": <image>,
      "price": <price>,
      "yearExperience": <yearExperience>,
      "practiceAt": <practiceAt>,
      "createdAt": <createdAt>,
      "updatedAt": <updatedAt>
    }
  },
  "status": "Success"
}
```

_Response (404 - Appointment Not Found)_
```
{
  "message": "Appointment Not Found"
}
```

_Response (400 - Appointment Not In Status Pending)_
```
{
  "message": "Appointment is in status: <status>"
}
```

_Response (400 - Appointment Has Passed)_
```
{
  "message": "Appointment Has Passed"
}
```

---

#### DELETE /appointments/:appointmentId

> Deny or delete an appointment (can be done by its doctor only)

_Request Params_
```
/<appointmentId>
```

_Request Header_
```
{
  "authorization": "Bearer <token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "message": "Success delete appointmentId: <appointmentId>",
  "status": "Success"
}
```

_Response (404 - Appointment Not Found)_
```
{
  "message": "Appointment Not Found"
}
```

_Response (400 - Not Authorized)_
```
{
  "message": "Not Authorized"
}
```

---
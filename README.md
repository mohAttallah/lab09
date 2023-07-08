# Lab 09
## Access Control
Authors: Sham Al-Jalam

## URLs

* deployed application : []()

* Github actions: []()

*  pull request: []()

### Setup:
.env requirements:

`PORT`

`DATABASE_URI`

`SECRET`

### Running the app:
* npm start

* Endpoint: /

    * Returns Object
    ```Js
    {
        "message": "Welcome to the online store"
    }
    ```

* Endpoint: /signup

    * Returns Object
    ```Js
    {
        "user": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlteW0iLCJpYXQiOjE2ODg1NzM1MzR9.tl7wH0nWe1Wqm1WOcbbMrQrijRSc9qJ8manJg6fj3TY",
            "capabilities": [
                "read"
            ],
            "id": 1,
            "username": "sham",
            "password": "$2b$10$Wx0kn4fWK0J88iOeAog/nOuQ.//h1Gz5Cu9QfqsDkeAXcBZxBRXvS",
            "role": "regular",
            "updatedAt": "2023-07-05T16:12:14.304Z",
            "createdAt": "2023-07-05T16:12:14.304Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlteW0iLCJpYXQiOjE2ODg1NzM1MzR9.tl7wH0nWe1Wqm1WOcbbMrQrijRSc9qJ8manJg6fj3TY"
    }
    ```
* Endpoint: /signin

    * Returns Object
    ```Js
        {
        "user": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlteW0iLCJpYXQiOjE2ODg1NzM1MzR9.tl7wH0nWe1Wqm1WOcbbMrQrijRSc9qJ8manJg6fj3TY",
            "capabilities": [
                "read"
            ],
            "id": 1,
            "username": "sham",
            "password": "$2b$10$Wx0kn4fWK0J88iOeAog/nOuQ.//h1Gz5Cu9QfqsDkeAXcBZxBRXvS",
            "role": "regular",
            "updatedAt": "2023-07-05T16:12:14.304Z",
            "createdAt": "2023-07-05T16:12:14.304Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlteW0iLCJpYXQiOjE2ODg1NzM1MzR9.tl7wH0nWe1Wqm1WOcbbMrQrijRSc9qJ8manJg6fj3TY"
    }
    ```

* Endpoint: /users (require Auth)

    * Returns Object
    ```Js
    [
        "sham",
        "Leon",
        "Lara"
    ]
    ```
* Endpoint: /secret (require Auth)

    * Returns Object
    ```Js
    {
        "message": "Welcome to the secret area"
    }
    ```

* Endpoint: /api/v1/:model:
    users can do CRUD operation on the follwoing models, but there are rules and limitations:

    -clothes

    -foods

    for example: if we want to add food, the enpoint will be: /api/v1/food 

    * Returns Object
    ```Js
    {
        "id": 1,
        "name": "Mango",
        "calories": 3000,
        "type": 'fruit',
        "userId": 1,
        "updatedAt": "2023-07-05T16:14:35.988Z",
        "createdAt": "2023-07-05T16:14:35.988Z"
    }
    ```

    * Endpoint: /api/v2/:model:
    Only authorized users can do CRUD operation on the follwoing models, but there are rules and limitations:

    -clothes

    -foods

    for example: if we want to add a clothes, the enpoint will be: /api/v1/clothes

    * Returns Object
    ```Js
    {
        "id": 1,
        "name": "switcher",
        "color": "black",
        "size": "XL",
        "userId": 1,
        "updatedAt": "2023-07-05T16:15:58.396Z",
        "createdAt": "2023-07-05T16:15:58.396Z"
    }
    ```

### Test:
* Unit Test: npm test

![Test](./images/tests.png)

### UML
![WML](./images/auth-api%20UML.png)

### WRRC
![WRRC](./images//lab09WRRC.jpg)
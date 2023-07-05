# lab09# Lab 09
## Auth Module Final Project
Authors: Sham Al-Jalam, Mohammed Attallah

## Description

It's an online store that provides four categories of products: food, clothing, user items, and electricians. Users can sign up on the store, choose products from these categories, and later check their choices.

## URLs

* deployed application : [https://onlinestore-uyis.onrender.com](https://onlinestore-uyis.onrender.com)

* Github actions: [https://github.com/ShamAhmad2022/basic-auth/actions](https://github.com/ShamAhmad2022/basic-auth/actions)

*  pull request: [https://github.com/ShamAhmad2022/basic-auth/pull/1](https://github.com/ShamAhmad2022/basic-auth/pull/1)

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
            "username": "ymym",
            "password": "$2b$10$Wx0kn4fWK0J88iOeAog/nOuQ.//h1Gz5Cu9QfqsDkeAXcBZxBRXvS",
            "age": 22,
            "email": "somethb",
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
            "username": "ymym",
            "password": "$2b$10$Wx0kn4fWK0J88iOeAog/nOuQ.//h1Gz5Cu9QfqsDkeAXcBZxBRXvS",
            "age": 22,
            "email": "somethb",
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
    "Lara",
    "Hasaan",
    "Ahmad"
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

    -books

    -electronics

    for example: if we want to add a book, the enpoint will be: /api/v1/books 

    * Returns Object
    ```Js
    {
        "id": 1,
        "title": "books1",
        "author": "ahmad",
        "type": "novel",
        "userId": 1,
        "updatedAt": "2023-07-05T16:14:35.988Z",
        "createdAt": "2023-07-05T16:14:35.988Z"
    }
    ```

    * Endpoint: /api/v2/:model:
    Only authorized users can do CRUD operation on the follwoing models, but there are rules and limitations:

    -clothes

    -foods

    -books

    -electronics

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


    * Endpoint: /:model/userOrder/:id:
    this enpoint will return a jason with the user information, along wih the products he orders based on these model that should be passed in the URL:

    -clothes

    -foods

    -books

    -electronics

    for example: if we want to see a certain user by their id along with the food they ordered: /api/v1/clothes

    * Returns Object
    ```Js
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InlteW0iLCJpYXQiOjE2ODg1NzQ2NTd9.RpgkK8dTKjYFx5evjDg3U_ONCmSfLPDyy3UepGnVsYY",
        "capabilities": [
            "read"
        ],
        "id": 1,
        "username": "ymym",
        "password": "$2b$10$Wx0kn4fWK0J88iOeAog/nOuQ.//h1Gz5Cu9QfqsDkeAXcBZxBRXvS",
        "role": "regular",
        "age": 22,
        "email": "somethb",
        "createdAt": "2023-07-05T16:12:14.304Z",
        "updatedAt": "2023-07-05T16:12:14.304Z",
        "food": [
            {
                "id": 1,
                "name": "Mansaf",
                "calories": 1000,
                "type": "protein",
                "userId": 1,
                "createdAt": "2023-07-05T16:19:32.991Z",
                "updatedAt": "2023-07-05T16:19:32.991Z"
            }
        ]
    }
    ```

### Test:
* Unit Test: npm test
![Test](./images//lab09tests.png)

### UML
![WML](./images//lab09UML.jpg)

### WRRC
![WRRC](./images//lab09WRRC.jpg)
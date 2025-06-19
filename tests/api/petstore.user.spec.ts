import { test, expect } from '@playwright/test';

test.describe('Info about pet', () => {
    let baseUrl = 'https://petstore.swagger.io/v2';

    test("Log user into the system", async ({request}) => {

        const response = await request.get(baseUrl+"/user/login", {
            params: {
                username: "test",
                password: "test",
            }
        });
        expect(response.status()).toBe(200);
    });

    test("Log user out of the system", async ({request}) => {

        const response = await request.get(baseUrl+"/user/logout");
        expect(response.status()).toBe(200);
    });

    test("Create new user", async ({request}) => {
        const response = await request.post(baseUrl+"/user", {
            data: {
                "id": 0,
                "username": "string",
                "firstName": "string",
                "lastName": "string",
                "email": "string",
                "password": "string",
                "phone": "string",
                "userStatus": 0
            }
        });
        expect(response.status()).toBe(200);
    });

    test("Get by correct username", async ({request}) => {
        const userName = "user1";
        const response = await request.get(baseUrl+"/user/"+userName);
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.name).toBe(userName);
    });

    test("Get by incorrect username", async ({request}) => {
        const userName = "uhgjn";
        const response = await request.get(baseUrl+"/user"+userName);

        expect(response.status()).toBe(404);
    });

    test("Update user", async ({request}) => {
        const userName = "user2";
        const updatedInfo = {
            "id": 8,
            "username": "Mari4ka",
            "firstName": "Mary",
            "lastName": "Tru",
            "email": "gfhryr@gmail.com",
            "password": "test34454",
            "phone": "76076456789",
            "userStatus": 1
        }
        const response = await request.put(baseUrl+"/user/"+userName,{
            data: {updatedInfo},
        });
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.message).toBeTruthy();
    });

    test("Delete existing user" , async ({request}) => {
        const userName = "user1";
        const response = await request.delete(baseUrl+"/user/"+userName);
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.message).toBe(userName);
    });

    test("Delete non-existing user" , async ({request}) => {
        const userName = "usuygj";
        const response = await request.delete(baseUrl+"/user/"+userName);

        expect(response.status()).toBe(404);
    });

    const listOfUsers = [
        {
            id: 23,
            username: "user23",
            firstName: "Stas23",
            lastName: "Kek",
            email: "Kek23@test.com",
            password: "stas23",
            phone: "+4467859500",
            userStatus: 1
        },
        {
            id: 67,
            username: "Archiebald",
            firstName: "Archie",
            lastName: "Tru",
            email: "archie@gmail.com",
            password: "tru67",
            phone: "+47990505949",
            userStatus: 2
        }
    ];

    test("Create users with list", async ({request}) => {

        const response = await request.post(baseUrl+"/user/createWithList", {
            data: listOfUsers,
        });
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.message).toBe("ok");
    });

    test("Create users with array", async ({request}) => {

        const response = await request.post(baseUrl+"/user/createWithArray", {
            data: listOfUsers,
        });
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.message).toBe("ok");
    });
});
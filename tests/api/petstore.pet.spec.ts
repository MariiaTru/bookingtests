import { test, expect } from '@playwright/test';

test.describe('Info about pet', () => {
    let baseUrl = 'https://petstore.swagger.io/v2';
    test("Create new pet", async ({request}) => {
        const newPet = {
            id: 7,
            category: {
                id: 6,
                name: "dog"
            },
            name: "Thor",
            photoUrls: [],
            tags: [
                {
                    id: 4,
                    name: "small dog"
                }
            ],
            status: "available"
        };
        const response = await request.post(baseUrl+"/pet", {
            data: newPet
        });
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.name).toBe(newPet.name);
        expect(body.status).toBe(newPet.status);
    });

    test("Update existing pet", async ({request}) => {
        const newPet = {
            id: 7,
            category: {
                id: 6,
                name: "dog"
            },
            name: "Pushok",
            photoUrls: [],
            tags: [
                {
                    id: 4,
                    name: "small dog"
                }
            ],
            status: "pending"
        };
        const response = await request.put(baseUrl+"/pet", {
            data: newPet
        });
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.name).toBe(newPet.name);
        expect(body.status).toBe(newPet.status);
        expect(body.id).toBe(newPet.id);
    });

    test("Find pet by status", async ({request}) => {
        const petStatus = "pending";
        const response = await request.get(baseUrl+"/pet/findByStatus", {
            params: {
                status: petStatus
            }
        });
        const body = await response.json();

        expect(response.status()).toBe(200);
        body.forEach((pet: any) => {
            expect(pet.status).toBe(petStatus);
        });
    });

    test("Find pet by ID", async ({request}) => {
        const petId = 7;
        const response = await request.get(baseUrl+"/pet/"+petId);
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.id).toBe(petId);
    });

    test("Find pet by wrong ID", async ({request}) => {
        const petId = 778889;
        const response = await request.get(baseUrl+"/pet/"+petId);

        expect(response.status()).toBe(404);
    });

    test("Delete pet by ID", async ({request}) => {
        const petId = 7;
        const response = await request.delete(baseUrl+"/pet/"+petId);
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.message).toBe(petId.toString());
    });

    test("Delete pet by wrong ID", async ({request}) => {
        const petId = 78678;
        const response = await request.delete(baseUrl+"/pet/"+petId);

        expect(response.status()).toBe(404);
    });

    test("Updates a pet by ID", async ({request}) => {
        const petStatus = "pending";
        const byStatus = await request.get(`${baseUrl}/pet/findByStatus`, {
            params: {
                status: petStatus,
            }
        });
        const byStatusBody = await byStatus.json();
        let petId: number = 0;
        for(let element of byStatusBody) {
            if(element.id > 0 && element.id < 10000) {
                petId = element.id;
                break;
            }
        }

        const response = await request.post(baseUrl+"/pet/"+petId,{
            form: {
                name: "Kot",
                status: "sold"

            }
        });
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.message).toBe(petId.toString());
    });

    test("Upload pet picture", async ({request}) => {
        const petId = 4;
        const response = await request.post(baseUrl+"/pet/"+petId+"/uploadImage",{
            multipart:{
                additionalMetadata:"metadata",
                file: "cat.png"
            }
        });
        expect(response.status()).toBe(200);
    });
});
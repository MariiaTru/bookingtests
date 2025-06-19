import { test, expect } from '@playwright/test';

test.describe('Access To Pet Store Orders', () => {
    let baseUrl='https://petstore.swagger.io/v2';
    test("Check Inventoty", async ({request}) => {
        const response = await request.get(baseUrl+"/store/inventory");
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.available).toBeTruthy();
        expect(body["not available"]).toBeTruthy();

    });

    test("Placing New Order", async ({request}) => {
        const response = await request.post(baseUrl+"/store/order", {
            data:{
                "id": 7,
                "petId": 5,
                "quantity": 3,
                "shipDate": "2025-06-09T17:17:33.625Z",
                "status": "pending",
                "complete": false
            }
        });
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.petId).toBe(5);
        expect(body.status).toBe("pending");
    });

    test("Search Order by Id", async ({request}) => {
        const orderId = 2;
        const response = await request.get(baseUrl+"/store/order/"+orderId);
        const body = await response.json();

        expect(response.status()).toBe(200);
        expect(body.id).toBe(orderId);
    });

    test("Delete Order by Id", async ({request}) => {
        const orderId = 9;
        const response = await request.delete(baseUrl+"/store/order/"+orderId);

        expect(response.status()).toBe(200);
    });

    //negative scenarios

    test("Search Order by Wrong Id", async ({request}) => {
        const orderId = 999666;
        const response = await request.get(baseUrl+"/store/order/"+orderId);

        expect(response.status()).toBe(404);
    });

    test("Delete Order by Wrong Id", async ({request}) => {
        const orderId = 969696;
        const response = await request.delete(baseUrl+"/store/order/"+orderId);

        expect(response.status()).toBe(404);
    });
})
import { test, expect, request } from '@playwright/test';

test.describe('CREATE Booking', () => {
    //a

    test('[TC1] +POST CreateBooking', async ({ request }) => {
        let response;
        let body;

        await test.step(`Perform POST request to /booking`, async () => {
            response = await request.post(`${process.env.BASE_URL}/booking`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    firstname: 'Jim',
                    lastname: 'Brown',
                    totalprice: 111,
                    depositpaid: true,
                    bookingdates: {
                        checkin: '2018-01-01',
                        checkout: '2019-01-01',
                    },
                    additionalneeds: 'Breakfast'
                },
            });
        });

        await test.step(`Transform the response into JSON`, async () => {
            body = await response.json();
        });

        await test.step(`[ASSERTION] Verify response status is code 200`, async () => {
            expect(response.status()).toBe(200);
        });


    });


});

test.describe('DELETE Booking', () => {
    //a
});

test.describe('GET Booking', () => {
    //a
});

test.describe('GET Booking IDs', () => {
    //a
});

test.describe('PATCH Booking', () => {
    //a
});

test.describe('PUT Booking', () => {
    //a
});
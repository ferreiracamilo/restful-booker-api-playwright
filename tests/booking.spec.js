import { test, expect, request } from '@playwright/test';

import invalidAdditionalNeeds from '../resources/data/createbooking/negative/byAdditionalNeeds.json'
import invalidCheckins from '../resources/data/createbooking/negative/byCheckin.json'
import invalidCheckouts from '../resources/data/createbooking/negative/byCheckout.json'
import invalidDepositPaid from '../resources/data/createbooking/negative/byDepositPaid.json'
import invalidFirstNames from '../resources/data/createbooking/negative/byFirstName.json'
import invalidLastNames from '../resources/data/createbooking/negative/byLastName.json'
import invalidTotalPrices from '../resources/data/createbooking/negative/byTotalPrice.json'

test.describe('CREATE Booking', () => {

    test('[TC1] +POST CreateBooking', async ({ request }) => {
        let postResponse;
        let postBody;

        await test.step(`Perform POST request to /booking`, async () => {
            postResponse = await request.post(`${process.env.BASE_URL}/booking`, {
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
            postBody = await postResponse.json();
        });

        await test.step(`[ASSERTION] Verify response status is code 200`, async () => {
            expect(postResponse.status()).toBe(200);
        });

        await test.step(`Verify expected property is present and its data type`, async () => {
                expect(postBody).toHaveProperty('bookingid');
                expect(typeof postBody.bookingid).toBe('number');
        });

        /* ## DELETE NEW BOOKING CREATED ## */
        let tokenResponse;
        await test.step(`Generate token`, async () => {
            tokenResponse = await request.post(`${process.env.BASE_URL}/auth`, {
                headers: { 'Content-Type': 'application/json' },
                data: {
                    username: 'admin',
                    password: 'password123'
                }
            });
        });

        let deleteResponse;
        await test.step(`Perform deletion of new booking created under ${postBody.bookingid} ID`, async () => {
                deleteResponse = await request.get(`${process.env.BASE_URL}/booking/${postBody.bookingid}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': `token=${tokenResponse.token}`
                    }
                });
        });
    //END TEST
    });

    invalidFirstNames.forEach((data, index) => {
        test(`[TC4.FN.${index + 1}] - POST CreateBooking with invalid firstname: "${data.firstname}"`, async ({ request }) => {
            let response;
            await test.step(`Perform POST request to /booking with firstname as "${data.firstname}"`, async () => {
                response = await request.post(`${process.env.BASE_URL}/booking`, {
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        firstname: data.firstname,
                        lastname: data.lastname,
                        totalprice: data.totalprice,
                        depositpaid: data.depositpaid,
                        bookingdates: {
                            checkin: data.checkin,
                            checkout: data.checkout,
                        },
                        additionalneeds: data.additionalneeds
                    }
                });
            });

            await test.step(`[ASSERTION] Verify response status is code 400`, async () => {
                expect(response.status()).toBe(400);
            });
        });
    });

    invalidLastNames.forEach((data, index) => {
        test(`[TC5.FN.${index + 1}] - POST CreateBooking with invalid lastname: "${data.lastname}"`, async ({ request }) => {
            let response;
            await test.step(`Perform POST request to /booking with lastname as "${data.lastname}"`, async () => {
                response = await request.post(`${process.env.BASE_URL}/booking`, {
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        firstname: data.firstname,
                        lastname: data.lastname,
                        totalprice: data.totalprice,
                        depositpaid: data.depositpaid,
                        bookingdates: {
                            checkin: data.checkin,
                            checkout: data.checkout,
                        },
                        additionalneeds: data.additionalneeds
                    }
                });
            });

            await test.step(`[ASSERTION] Verify response status is code 400`, async () => {
                expect(response.status()).toBe(400);
            });
        });
    });

//END DESCRIBE
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
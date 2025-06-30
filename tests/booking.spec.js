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
                    username: process.env.AUTH_USERNAME,
                    password: process.env.AUTH_PASSWORD
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
    //END TEST
    });

    invalidLastNames.forEach((data, index) => {
        test(`[TC5.LN.${index + 1}] - POST CreateBooking with invalid lastname: "${data.lastname}"`, async ({ request }) => {
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
    //END TEST
    });

    invalidTotalPrices.forEach((data, index) => {
        test(`[TC6.TP.${index + 1}] - POST CreateBooking with invalid totalprice: "${data.totalprice}"`, async ({ request }) => {
            let response;
            await test.step(`Perform POST request to /booking with totalprice as "${data.totalprice}"`, async () => {
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
    //END TEST
    });

    invalidDepositPaid.forEach((data, index) => {
        test(`[TC7.DP.${index + 1}] - POST CreateBooking with invalid depositpaid: "${data.depositpaid}"`, async ({ request }) => {
            let response;
            await test.step(`Perform POST request to /booking with depositpaid as "${data.depositpaid}"`, async () => {
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
    //END TEST
    });

    invalidCheckins.forEach((data, index) => {
        test(`[TC8.CI.${index + 1}] - POST CreateBooking with invalid checkin: "${data.checkin}"`, async ({ request }) => {
            let response;
            await test.step(`Perform POST request to /booking with checkin as "${data.checkin}"`, async () => {
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
    //END TEST
    });

    invalidCheckouts.forEach((data, index) => {
        test(`[TC9.CO.${index + 1}] - POST CreateBooking with invalid checkout: "${data.checkout}"`, async ({ request }) => {
            let response;
            await test.step(`Perform POST request to /booking with checkout as "${data.checkout}"`, async () => {
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
    //END TEST
    });

    invalidAdditionalNeeds.forEach((data, index) => {
        test(`[TC10.AN.${index + 1}] - POST CreateBooking with invalid additionalneeds: "${data.additionalneeds}"`, async ({ request }) => {
            let response;
            await test.step(`Perform POST request to /booking with additionalneeds as "${data.additionalneeds}"`, async () => {
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
    //END TEST
    });

//END DESCRIBE
});

test.describe('DELETE Booking', () => {

    test(`[TC13] DeleteBooking With Fixed Token`, async ({ request }) => {
        let tokenResponse;
        await test.step(`Generate token`, async () => {
            tokenResponse = await request.post(`${process.env.BASE_URL}/auth`, {
                headers: { 'Content-Type': 'application/json' },
                data: {
                    username: process.env.AUTH_USERNAME,
                    password: process.env.AUTH_PASSWORD
                }
            });
        });

        let deleteResponse;
        await test.step(`Perform DELETE request to /booking for record matching id 1`, async () => {
            deleteResponse = await request.delete(`${process.env.BASE_URL}/booking/1`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `token=${tokenResponse.token}`
                },
            });
        });

        await test.step(`[ASSERTION] Verify response status is code 200`, async () => {
            expect(deleteResponse.status()).toBe(200);
        });
    //END TEST
    });

//END DESCRIBE
});

test.describe('GET Booking', () => {
    test(`[TC14] Get Booking by ID`, async ({ request }) => {

        let response;
        await test.step(`Perform GET request to /booking by id equal to 3657`, async () => {
            response = await request.get(`${process.env.BASE_URL}/booking/3657`);
        });

        let body;
        await test.step(`Transform the response into JSON`, async () => {
            body = await response.json();
        });

        await test.step(`[ASSERTION] Verify response status is code 200`, async () => {
            expect(response.status()).toBe(200);
        });

        const expectedProperties = [
            'firstname', 'lastname', 'totalprice', 'depositpaid',
            'bookingdates', 'additionalneeds'
        ];

        for (const prop of expectedProperties) {
                await test.step(`Verify property ${prop} is present/included within response body(json)`, async () => {
                expect(body).toHaveProperty(prop);
                });
        }

        const expectedSubProperties = [
            'checkin', 'checkout'
        ];

        for (const subProp of expectedSubProperties) {
                await test.step(`Verify subproperty ${subProp} is present/included within response body(json)`, async () => {
                expect(body.bookingdates).toHaveProperty(subProp);
                });
        }
    //END TEST
    });
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
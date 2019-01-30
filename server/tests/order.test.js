const request = require('supertest');
const app = require('../app');
const mongoose = require("mongoose");

const Order = require('../models/order');

let testOrderId = '';
let token = '';
let sampleItemId = '5c51626fd2a9ca51155d3759';

beforeAll((done) => {
    request(app)
        .post('/users/login')
        .send({
            username: 'nethmi',
            password: 'nethmi123'
        })
        .end((err, response) => {
            token = response.body.token;
            done();
        });
});

describe('Test get all orders without authentication', () => {
    test('It should return 401 as status code', () => {
        return request(app)
            .get("/orders")
            .then(response => {
                expect(response.statusCode).toBe(401);
            })
    });
});

describe('Test get all orders end point', () => {
    test('It should return 200 as status code', () => {
        return request(app)
            .get("/orders")
            .set({'Authorization': token})
            .then(response => {
                expect(response.statusCode).toBe(200);
            })
    });
});

describe('Test add order end point', () => {
    test('It should return status code 200', () => {
        return request(app)
            .post('/orders')
            .set({'Authorization': token})
            .send({status: "open"})
            .then(response => {
                testOrderId = response.body._id;
                expect(response.statusCode).toBe(200);
            })
    });
});

describe('Test get order end point', () => {
    test('It should return order data as body', () => {
        return request(app)
            .get(`/orders/${testOrderId}`)
            .set({'Authorization': token})
            .then(response => {
                expect(response.body).toBeTruthy();
                expect(response.statusCode).toBe(200);
            })
    });
});

describe('Test change order status', () => {
    test('It should return order data as body', () => {
        return request(app)
            .put(`/orders/${testOrderId}`)
            .set({'Authorization': token})
            .then(response => {
                expect(response.body).toBeTruthy();
                expect(response.statusCode).toBe(200);
                expect(response.body.status).toEqual("closed");
            })
    });
});

describe('Test add new item to order', () => {
    test('It should return order data as body', () => {
        return request(app)
            .put(`/orders/add-item/${testOrderId}`)
            .set({'Authorization': token})
            .send({
                itemID: sampleItemId,
                quantity: 2
            })
            .then(response => {
                expect(response.body).toBeTruthy();
                expect(response.statusCode).toBe(200);
            })
    });
});

describe('Test add existing item to order', () => {
    test('It should return order data as body', () => {
        return request(app)
            .put(`/orders/add-item/${testOrderId}`)
            .set({'Authorization': token})
            .send({
                itemID: sampleItemId,
                quantity: 6
            })
            .then(response => {
                expect(response.body).toBeTruthy();
                expect(response.statusCode).toBe(200);
            })
    });
});

describe('Test add new item to order with non exiting order id', () => {
    test('It should return 404 as status code', () => {
        return request(app)
            .put(`/orders/add-item/${new mongoose.Types.ObjectId()}`)
            .set({'Authorization': token})
            .send({
                itemID: sampleItemId,
                quantity: 2
            })
            .then(response => {
                expect(response.body).toEqual("Order Not Found");
                expect(response.statusCode).toBe(404);
            })
    });
});

describe('Test add new item to order with non exiting item id', () => {
    test('It should return 404 as status code', () => {
        return request(app)
            .put(`/orders/add-item/${testOrderId}`)
            .set({'Authorization': token})
            .send({
                itemID: new mongoose.Types.ObjectId(),
                quantity: 2
            })
            .then(response => {
                expect(response.body).toEqual("Item Not Found");
                expect(response.statusCode).toBe(404);
            })
    });
});

describe('Test delete item from an order', () => {
    test('It should return 200 as status code', () => {
        return request(app)
            .delete(`/orders/remove-item/${testOrderId}/${sampleItemId}`)
            .set({'Authorization': token})
            .then(response => {
                expect(response.statusCode).toBe(200);
            })
    });
});

describe('Test delete item from an order with non existing item id', () => {
    test('It should return 404 as status code', () => {
        return request(app)
            .delete(`/orders/remove-item/${testOrderId}/testID`)
            .set({'Authorization': token})
            .then(response => {
                expect(response.statusCode).toBe(404);
                expect(response.body).toEqual("Item does not exist");
            })
    });
});

afterAll(() => {
    Order.remove({ _id: testOrderId })
        .exec()
        .then(result => {
            console.log(JSON.stringify(result))
        })
        .catch(err => {
            console.log(JSON.stringify(err))
        });

});
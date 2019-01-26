const request = require('supertest');
const app = require('../server');
const mongoose = require("mongoose");

const Item = require('../models/item');


let testItemId = '';
let token = '';

beforeAll((done) => {
    request(app)
        .post('/users/login')
        .send({
            username: 'nethmi',
            password: 'nethmi123',
        })
        .end((err, response) => {
            token = response.body.token;
            const item = new Item({
                _id: new mongoose.Types.ObjectId(),
                name: 'itemtest',
                price: 20,
                img: 'test'
            });
            item.save()
                .then(result => {
                    testItemId = result._id;
                    done();
                })
                .catch(err => {
                    //done();
                    console.log('error')
                });

        });

});

describe('Test get all items end point', () => {
    test('It should return 200 as status code', () => {
        return request(app)
            .get("/items")
            .then(response => {
                expect(response.statusCode).toBe(200)
            })
    });
});

describe('Test get all items end point', () => {
    test('It should return items data as body', () => {
        return request(app)
            .get("/items")
            .then(response => {
                expect(response.body).toBeTruthy();
            })
    });
});

describe('Test get item end point', () => {
    test('It should return item data as body', () => {
        return request(app)
            .get(`/items/${testItemId}`)
            .then(response => {
                expect(response.body).toBeTruthy();
            })
    });
});

describe('Test get item end point with incorrect item id', () => {
    test('It should return status code 404', () => {
        return request(app)
            .get(`/items/123`)
            .then(response => {
                expect(response.statusCode).toBe(404)
            })
    });
});

afterAll(() => {
    Item.remove({ _id: testItemId })
        .exec()
        .then(result => {
            console.log(JSON.stringify(result))
        })
        .catch(err => {
            console.log(JSON.stringify(err))
        });

});
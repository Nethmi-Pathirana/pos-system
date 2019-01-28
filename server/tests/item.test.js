const request = require('supertest');
const app = require('../app');
const mongoose = require("mongoose");

const Item = require('../models/item');

let testItemId = '';
let token = '';

beforeAll((done) => {
    request(app)
        .post('/users/login')
        .send({
            username: 'nethmi',
            password: 'nethmi123'
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
                    done();
                });
        });
});

describe('Test get all items without authentication', () => {
    test('It should return 401 as status code', () => {
        return request(app)
            .get("/items")
            .then(response => {
                expect(response.statusCode).toBe(401)
            })
    });
});

describe('Test get all items with incorrect token', () => {
    test('It should return 403 as status code', () => {
        return request(app)
            .get("/items")
            .set({'Authorization': 'testtoken'})
            .then(response => {
                expect(response.statusCode).toBe(403)
            })
    });
});

describe('Test get all items end point', () => {
    test('It should return 200 as status code', () => {
        return request(app)
            .get("/items")
            .set({'Authorization': token})
            .then(response => {
                expect(response.statusCode).toBe(200)
            })
    });
});

describe('Test get all items end point', () => {
    test('It should return items data as body', () => {
        return request(app)
            .get("/items")
            .set({'Authorization': token})
            .then(response => {
                expect(response.body).toBeTruthy();
            })
    });
});

describe('Test get item end point', () => {
    test('It should return item data as body', () => {
        return request(app)
            .get(`/items/${testItemId}`)
            .set({'Authorization': token})
            .then(response => {
                expect(response.body).toBeTruthy();
            })
    });
});

describe('Test get item end point with incorrect item id', () => {
    test('It should return status code 404', () => {
        return request(app)
            .get('/items/123')
            .set({'Authorization': token})
            .then(response => {
                expect(response.statusCode).toBe(404);
            })
    });
});

let testItem2;
describe('Test add item end point', () => {
    test('It should return status code 200', () => {
        return request(app)
            .post('/items')
            .set({'Authorization': token})
            .send({
                name: 'itemtest',
                price: 20,
                img: 'test'
            })
            .then(response => {
                testItem2 = response.body._id;
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeTruthy();
            })
    });
});

describe('Test delete item end point', () => {
    test('It should return 200 as status code', () => {
        return request(app)
            .delete(`/items/${testItemId}`)
            .set({'Authorization': token})
            .then(response => {
                expect(response.statusCode).toBe(200);
            })
    });
});

describe('Test delete item end point', () => {
    test('It should return an item as data', () => {
        return request(app)
            .delete(`/items/${testItemId}`)
            .set({'Authorization': token})
            .then(response => {
                expect(response.body).toBeTruthy();
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
    Item.remove({ _id: testItem2 })
        .exec()
        .then(result => {
            console.log(JSON.stringify(result))
        })
        .catch(err => {
            console.log(JSON.stringify(err))
        });

});
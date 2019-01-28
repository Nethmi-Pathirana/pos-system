const request = require('supertest');
const app = require('../app');

const User = require('../models/user');

let testUserId = '';

describe('Test register user end point', () => {
    test('It should return status code 200', () => {
        return request(app)
            .post('/users/register')
            .send({
                username: 'nethmiTest1',
                password: 'nethmitest@123',
            })
            .then(response => {
                testUserId = response.body._id;
                expect(response.statusCode).toBe(200);
            })
    });
});

describe('Test register user end point with already exiting username', () => {
    test('It should return status code 400', () => {
        return request(app)
            .post('/users/register')
            .send({
                username: 'nethmi',
                password: 'nethmitest@123',
            })
            .then(response => {
                expect(response.statusCode).toBe(400);
            })
    });
});

describe('Test login user end point', () => {
    test('It should return status code 200', () => {
        return request(app)
            .post('/users/login')
            .send({
                username: 'nethmi',
                password: 'nethmi123',
            })
            .then(response => {
                expect(response.statusCode).toBe(200);
            })
    });
});

describe('Test login user end point with non existing username', () => {
    test('It should return status code 404', () => {
        return request(app)
            .post('/users/login')
            .send({
                username: 'NotInDb',
                password: 'nethmi123',
            })
            .then(response => {
                expect(response.statusCode).toBe(404);
            })
    });
});

describe('Test login user end point with incorrect password', () => {
    test('It should return status code 401', () => {
        return request(app)
            .post('/users/login')
            .send({
                username: 'nethmi',
                password: 'WrongPassword',
            })
            .then(response => {
                expect(response.statusCode).toBe(401);
            })
    });
});

describe('Test login user end point with incorrect password', () => {
    test('It should return body Password incorrect', () => {
        return request(app)
            .post('/users/login')
            .send({
                username: 'nethmi',
                password: 'WrongPassword',
            })
            .then(response => {
                expect(response.body).toBe('Password incorrect');
            })
    });
});

describe('Test logout user end point', () => {
    test('It should return status code 200', () => {
        return request(app)
            .get('/users/logout')
            .then(response => {
                expect(response.statusCode).toBe(200);
            })
    });
});

afterAll(() => {
    User.remove({ _id: testUserId })
        .exec()
        .then(result => {
            console.log(JSON.stringify(result))
        })
        .catch(err => {
            console.log(JSON.stringify(err))
        });

});



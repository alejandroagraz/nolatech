require('dotenv').config();
const axios = require('axios');
const {response} = require("express");
const uri = process.env.URI_SERVER


describe('Auth Controller', () => {
    test('The register user', async () => {
        const res = await axios.post(`${uri}/auth/register`, {
            firstname: "Admin",
            lastname: "Goat",
            dni: 88776655,
            email: "admin10@gmail.com",
            username: "admin10",
            password: "Passw*123"
        });

        expect(res.status).toBe(201)
        expect(res.data).toEqual({
            status: 'success',
            message: 'User registered successfully.',
            data: res.data.data
        })

    });

    test('The register route without sending parameters lastname', async () => {
        try {
            await axios.post(`${uri}/auth/register`, {
                firstname: "Admin",
                dni: 88776655,
                email: "admin@gmail.com",
                username: "user-admin",
                password: "Passw*123",
            })
        } catch (err) {
            const message = err.response.data.errors[0].msg;

            expect(err.response.data).toBeTruthy()
            expect(err.response.status).toBe(400);
            expect(message).toEqual('lastname does not Empty')
            expect(err.message).toEqual(
                'Request failed with status code 400'
            )
        }
    });

    test('The registration route by sending an already registered email', async () => {
        const parameters = {
            firstname: "Admin",
            lastname: "Goat",
            dni: 99775533,
            email: "admin10@gmail.com",
            username: "admin-goat",
            password: "Passw*123"
        }
        try {
            await axios.post(`${uri}/auth/register`, parameters);
        } catch (err) {
            expect(err.response.status).toBe(400)
            expect(err.response.data).toEqual(
                {
                    status: 'error',
                    message: `E11000 duplicate key error collection: nolatech.users index: email_1 dup key: { email: \"${parameters.email}\" }`
                }
            )
        }
    });

    test('The login route without sending the username', async () => {
        try {
            await axios.post(`${uri}/auth/login`, {
                password: 'Jane123'
            })

        } catch (err) {
            const message = err.response.data.errors[0].msg;

            expect(err.response.data).toBeTruthy()
            expect(err.response.status).toBe(400);
            expect(message).toEqual('this username is required')
            expect(err.message).toEqual(
                'Request failed with status code 400'
            )
        }
    });

    test('The login route without sending the password', async () => {
        try {
            await axios.post(`${uri}/auth/login`, {
                username: 'admin'
            })

        } catch (err) {
            const message = err.response.data.errors[0].msg;

            expect(err.response.data).toBeTruthy()
            expect(err.response.status).toBe(400);
            expect(message).toEqual('this password is required')
            expect(err.message).toEqual(
                'Request failed with status code 400'
            )
        }
    });

    test('The login path with the correct user', async () => {
        const res = await axios.post(`${uri}/auth/login`, {
            username: 'admin',
            password: 'Passw*123'
        })

        expect(res.status).toBe(200)
        expect(res.data).toEqual({
            status: 'success',
            data: {
                access_token: res.data.data.access_token,
            }
        })
    });

    test('The login path with the wrong user', async () => {
        try {
            await axios.post(`${uri}/auth/login`, {
                username: 'john@email.com',
                password: 'john123'
            })

        } catch (err) {
            expect(err.response.status).toBe(404)
            expect(err.response.data).toEqual(
                {
                    status: 'error',
                    message: "User not found"
                }
            )
        }
    });

    test('The login path with the wrong password', async () => {
        try {
            await axios.post(`${uri}/auth/login`, {
                username: 'admin',
                password: 'john123'
            })

        } catch (err) {
            expect(err.response.status).toBe(401)
            expect(err.response.data).toEqual(
                {
                    status: 'error',
                    message: "Username or password is incorrect"
                }
            )
        }
    });

})

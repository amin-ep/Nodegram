import request from 'supertest';
import app from '../app.js';

import {
  clearData,
  connect,
  disconnect,
} from '../helpers/mongo.memory.test.helper.js';
import { config } from 'dotenv';

import User from '../models/User.js';
import nodemailer from 'nodemailer';
import sendEmail from '../emails/email.js';

config({ path: './config.env' });
jest.mock('nodemailer');
describe('Authentication', () => {
  const createVerifiedUser = async body => {
    const user = await User.create(body);
    user.verified = true;
    await user.save({ validateBeforeSave: false });
    return user;
  };

  const createUnverifiedUser = async body => {
    const user = await User.create(body);
    user.generateEmailVerification();
    await user.save({ validateBeforeSave: false });
    return user;
  };

  const createUnActiveUser = async body => {
    const user = await User.create(body);
    user.active = false;
    await user.save({ validateBeforeSave: false });
    return user;
  };

  beforeAll(connect);
  afterAll(disconnect);
  afterEach(clearData);

  describe('Signup', () => {
    it('should return 400 if email is invalid', async () => {
      const userObj = {
        username: 'username',
        email: 'test@',
        password: 'somePassword',
      };
      await User.create(userObj);

      const res = await request(app).post('/api/v1/users/signup').send(userObj);
      expect(res.statusCode).toBe(400);
    });

    it('should return 201 and send email if everything is ok', async () => {
      const userObj = {
        username: 'username1',
        email: 'test@gmail.com',
        password: 'password',
      };

      const sendEmailMock = jest
        .fn()
        .mockResolvedValue({ accepted: [userObj].email });

      nodemailer.createTransport.mockReturnValue({
        sendMail: sendEmailMock,
      });

      const html = `
      <p>To confirm your email address please click <a href="#">something</a></p>
     `;

      const options = {
        email: userObj.email,
        subject: 'key',
        message: 'This is a test mail',
        html: html,
      };

      await sendEmail(options);

      const res = await request(app).post('/api/v1/users/signup').send(userObj);
      expect(res.statusCode).toBe(201);

      // expect(sendEmailMock).toHaveBeenCalledWith({
      //   from: 'Nodegram <amincode24@gmail.com>',
      //   to: options.email,
      //   subject: options.subject,
      //   text: options.message,
      //   html: options.html,
      // });
    });
  });

  describe('Login', () => {
    it('should return 400 if the input data is invalid', async () => {
      const userObj = {
        username: 'us',
        email: 'test@',
      };

      const res = await request(app).post('/api/v1/users/login').send(userObj);
      expect(res.statusCode).toBe(400);
    });

    it('should return 200 if everything is ok', async () => {
      const userObj = {
        username: 'username',
        email: 'test@gmail.com',
        password: 'password',
      };
      await createVerifiedUser(userObj);

      delete userObj.username;
      const res = await request(app).post('/api/v1/users/login').send(userObj);
      expect(res.statusCode).toBe(200);
    });

    it('should return 404 if user does not exists', async () => {
      const userObj = {
        email: 'test@gmail.com',
        password: 'password',
      };

      const res = await request(app).post('/api/v1/login').send(userObj);
      expect(res.statusCode).toBe(404);
    });

    it.only('should return 404 if password is invalid', async () => {
      const userObj = {
        username: 'username',
        email: 'test@gmail.com',
        password: 'password',
      };
      await createVerifiedUser(userObj);

      const res = await request(app)
        .post('/api/v1/users/login')
        .send({ email: userObj.email, password: 'wrongPass' });
      expect(res.statusCode).toBe(404);
    });
  });
});

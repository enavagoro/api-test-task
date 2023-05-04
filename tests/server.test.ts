import request from 'supertest';
import { Server } from '../src/server';
import mongoose from 'mongoose';


describe('Server', () => {
  let app = new Server().app;
  let tempTask: any;

  beforeAll(async () => {
    await mongoose.connection.close();
    await mongoose.connect('mongodb://localhost:27017/my-test-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as mongoose.ConnectOptions);
  });
  
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should return 200 and "Hola" message on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hola' });
  });

  describe('Task methods',()=>{
    it('should return 200 and return an array with empty tasks GET /', async () => {
      const response = await request(app).get('/task/');
      expect(response.status).toBe(200);
      expect(response.body.length).toEqual([].length);
    });

    it('should return 201 and add a new task in the database POST /', async () => {
      const task = {
        name:"hacer esto",
        isCompleted: false,
        status:true
    }

      const response = await request(app).post('/task/').send(task);
      const responseBody = response.body;
      delete responseBody._id
      delete responseBody.__v

      const parsedTask = JSON.stringify(task)
      const parsedReponseBody = JSON.stringify(responseBody);
      expect(response.status).toBe(201);
      expect(parsedTask).toEqual(parsedReponseBody);
    });

    it('should return 200 and return an array with one task GET /', async () => {
      const response = await request(app).get('/task/');
      const expectedResponse = [
        {
          name: 'hacer esto',
          isCompleted: false,
          status: true,
        }
      ]
      tempTask = response.body[0];
      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(expectedResponse.length);
      expect(tempTask.name).toEqual(expectedResponse[0].name);
      expect(tempTask.isCompleted).toEqual(expectedResponse[0].isCompleted);
      expect(tempTask.status).toEqual(expectedResponse[0].status);

    });
    
    it('should return 200 and a task with new data  PATCH/', async () => {
      const tempTaskId = tempTask._id;
      const newBody = {
        name: 'hacer esto otro',
        isCompleted: false,
        status: true,
      }
      const response = await request(app).patch(`/task/${tempTaskId}`).send(newBody);
      const responseBody = response.body;

      expect(response.status).toBe(200);
      expect(newBody.name).toEqual(responseBody.name);
    });

    it('should return 200 and a task with new complete task PATCH/', async () => {
      const tempTaskId = tempTask._id;
      const expectedBody = {
        name: 'hacer esto otro',
        isCompleted: true,
        status: true,
      }
      const response = await request(app).post(`/task/completeTask/${tempTaskId}`).send();
      const responseBody = response.body;

      expect(response.status).toBe(200);
      expect(responseBody.isCompleted).toEqual(expectedBody.isCompleted);
    });

    it('should return 200 and delete a task delete/', async () => {
      const tempTaskId = tempTask._id;
      const newBody = {
        name: 'hacer esto otro',
        isCompleted: false,
        status: true,
      }
      const response = await request(app).delete(`/task/${tempTaskId}`);
      const responseBody = response.body;

      expect(response.status).toBe(200);
      expect(newBody.name).toEqual(responseBody.name);

      const responseGet = await request(app).get('/task/');
      expect(responseGet.status).toBe(200);
      expect(responseGet.body.length).toEqual([].length);
    });
  })
});

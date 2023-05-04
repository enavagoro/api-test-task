"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../src/server");
const mongoose_1 = __importDefault(require("mongoose"));
describe('Server', () => {
    let app = new server_1.Server().app;
    let tempTask;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
        yield mongoose_1.default.connect('mongodb://localhost:27017/my-test-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.dropDatabase();
        yield mongoose_1.default.connection.close();
    }));
    it('should return 200 and "Hola" message on GET /', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Hola' });
    }));
    describe('Task methods', () => {
        it('should return 200 and return an array with empty tasks GET /', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/task/');
            expect(response.status).toBe(200);
            expect(response.body.length).toEqual([].length);
        }));
        it('should return 201 and add a new task in the database POST /', () => __awaiter(void 0, void 0, void 0, function* () {
            const task = {
                name: "hacer esto",
                isCompleted: false,
                status: true
            };
            const response = yield (0, supertest_1.default)(app).post('/task/').send(task);
            const responseBody = response.body;
            delete responseBody._id;
            delete responseBody.__v;
            const parsedTask = JSON.stringify(task);
            const parsedReponseBody = JSON.stringify(responseBody);
            expect(response.status).toBe(201);
            expect(parsedTask).toEqual(parsedReponseBody);
        }));
        it('should return 200 and return an array with one task GET /', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get('/task/');
            const expectedResponse = [
                {
                    name: 'hacer esto',
                    isCompleted: false,
                    status: true,
                }
            ];
            tempTask = response.body[0];
            expect(response.status).toBe(200);
            expect(response.body.length).toEqual(expectedResponse.length);
            expect(tempTask.name).toEqual(expectedResponse[0].name);
            expect(tempTask.isCompleted).toEqual(expectedResponse[0].isCompleted);
            expect(tempTask.status).toEqual(expectedResponse[0].status);
        }));
        it('should return 200 and a task with new data  PATCH/', () => __awaiter(void 0, void 0, void 0, function* () {
            const tempTaskId = tempTask._id;
            const newBody = {
                name: 'hacer esto otro',
                isCompleted: false,
                status: true,
            };
            const response = yield (0, supertest_1.default)(app).patch(`/task/${tempTaskId}`).send(newBody);
            const responseBody = response.body;
            expect(response.status).toBe(200);
            expect(newBody.name).toEqual(responseBody.name);
        }));
        it('should return 200 and a task with new complete task PATCH/', () => __awaiter(void 0, void 0, void 0, function* () {
            const tempTaskId = tempTask._id;
            const expectedBody = {
                name: 'hacer esto otro',
                isCompleted: true,
                status: true,
            };
            const response = yield (0, supertest_1.default)(app).post(`/task/completeTask/${tempTaskId}`).send();
            const responseBody = response.body;
            expect(response.status).toBe(200);
            expect(responseBody.isCompleted).toEqual(expectedBody.isCompleted);
        }));
        it('should return 200 and delete a task delete/', () => __awaiter(void 0, void 0, void 0, function* () {
            const tempTaskId = tempTask._id;
            const newBody = {
                name: 'hacer esto otro',
                isCompleted: false,
                status: true,
            };
            const response = yield (0, supertest_1.default)(app).delete(`/task/${tempTaskId}`);
            const responseBody = response.body;
            expect(response.status).toBe(200);
            expect(newBody.name).toEqual(responseBody.name);
            const responseGet = yield (0, supertest_1.default)(app).get('/task/');
            expect(responseGet.status).toBe(200);
            expect(responseGet.body.length).toEqual([].length);
        }));
    });
});

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
exports.getById = exports.deleteTask = exports.update = exports.completeTask = exports.insert = exports.list = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield task_model_1.default.list();
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send('Error on list');
    }
});
exports.list = list;
const insert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskData = req.body;
        const response = yield task_model_1.default.insert(taskData);
        res.status(201).send(response);
    }
    catch (error) {
        res.status(500).send('Error on update insert task');
    }
});
exports.insert = insert;
const completeTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const taskBody = { isCompleted: true };
        const response = yield task_model_1.default.updateCompletedStatus(taskId, taskBody);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send('Error on update task');
    }
});
exports.completeTask = completeTask;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const taskDataToUpdate = req.body;
        const response = yield task_model_1.default.update(taskId, taskDataToUpdate);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send('Error on update task');
    }
});
exports.update = update;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const response = yield task_model_1.default.delete(taskId);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send('Error on delete task');
    }
});
exports.deleteTask = deleteTask;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const response = yield task_model_1.default.getById(taskId);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send('Error on get task by id');
    }
});
exports.getById = getById;

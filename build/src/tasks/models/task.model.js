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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class TaskModel {
    constructor() {
        this.defineMongooseSchema();
        this.createMongooseModel();
    }
    defineMongooseSchema() {
        this.taskSchema = new mongoose_1.Schema({
            name: { type: String, required: true },
            isCompleted: { type: Boolean, required: true },
            status: { type: Boolean },
        });
        this.taskSchema.index({ creatorId: 1 });
    }
    createMongooseModel() {
        this.TaskModel = (0, mongoose_1.model)('Task', this.taskSchema);
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.TaskModel.find({});
            return tasks;
        });
    }
    insert(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = new this.TaskModel(taskData);
            const savedTask = yield newTask.save();
            return savedTask;
        });
    }
    updateCompletedStatus(id, taskBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedTask = yield this.TaskModel.findByIdAndUpdate(id, taskBody, { new: true });
            return updatedTask;
        });
    }
    update(id, dataToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedTask = yield this.TaskModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
            return updatedTask;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedTask = yield this.TaskModel.findByIdAndDelete(id);
            return deletedTask;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.TaskModel.findById(id);
            return task;
        });
    }
}
const taskModel = new TaskModel();
exports.default = taskModel;

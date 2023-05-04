"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
class TaskRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/', task_controller_1.list);
        this.router.post('/', task_controller_1.insert);
        this.router.post('/completeTask/:id', task_controller_1.completeTask);
        this.router.patch('/:id', task_controller_1.update);
        this.router.delete('/:id', task_controller_1.deleteTask);
        this.router.get('/:id', task_controller_1.getById);
    }
}
const taskRoutes = new TaskRoutes();
exports.default = taskRoutes.router;

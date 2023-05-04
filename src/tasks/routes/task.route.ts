import { Router } from 'express';
import { list, insert, update, deleteTask, getById, completeTask } from '../controllers/task.controller';

class TaskRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/', list);
        this.router.post('/', insert);
        this.router.post('/completeTask/:id', completeTask);
        this.router.patch('/:id', update);
        this.router.delete('/:id', deleteTask);
        this.router.get('/:id', getById);
    }
}

const taskRoutes = new TaskRoutes();
export default taskRoutes.router;
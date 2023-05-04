import { Schema, model } from 'mongoose';
import { ITask } from '../../shared/types/types';

class TaskModel {
  taskSchema: Schema<ITask> | undefined;
  TaskModel: any;

  constructor() {
    this.defineMongooseSchema();
    this.createMongooseModel();
  }

  private defineMongooseSchema(){
    this.taskSchema = new Schema<ITask>({
      name: { type: String, required: true },
      isCompleted: {type: Boolean, required: true},
      status: {type: Boolean},
    });
    this.taskSchema.index({ creatorId: 1 });
  }

  private createMongooseModel(){
    this.TaskModel = model<ITask>('Task', this.taskSchema);
    
  }

  public async list() {
    const tasks = await this.TaskModel.find({});
    return tasks;
  }

  public async insert(taskData: ITask) {
    const newTask = new this.TaskModel(taskData);
    const savedTask = await newTask.save();
    return savedTask;
  }

  public async updateCompletedStatus(id: string, taskBody: Pick<ITask, "isCompleted">) {
    const updatedTask = await this.TaskModel.findByIdAndUpdate(id, taskBody, { new: true });
    return updatedTask;
  }

  public async update(id: string, dataToUpdate: ITask) {
    const updatedTask = await this.TaskModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
    return updatedTask;
  }

  public async delete(id: string) {
    const deletedTask = await this.TaskModel.findByIdAndDelete(id);
    return deletedTask;
  }

  public async getById(id: string) {
    const task = await this.TaskModel.findById(id);
    return task;
  }
}

const taskModel = new TaskModel();
export default taskModel;
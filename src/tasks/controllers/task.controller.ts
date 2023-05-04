import { Request, Response, NextFunction } from "express";
import TaskModel from "../models/task.model";

export const list = async (req: Request, res: Response) => {
  try {
    const response = await TaskModel.list();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send('Error on list');
  }
}

export const insert = async (req: Request, res: Response) => {
  try {
    const taskData = req.body;
    const response = await TaskModel.insert(taskData);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send('Error on update insert task');
  }
}

export const completeTask = async (req: Request, res: Response) => {
  try {
    const taskId: string = req.params.id;
    const taskBody = {isCompleted: true}
    const response = await TaskModel.updateCompletedStatus(taskId, taskBody);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send('Error on update task');
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const taskId: string = req.params.id;
    const taskDataToUpdate = req.body;
    const response = await TaskModel.update(taskId, taskDataToUpdate);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send('Error on update task');
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId: string = req.params.id;
    const response = await TaskModel.delete(taskId);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send('Error on delete task');
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const taskId: string = req.params.id;
    const response = await TaskModel.getById(taskId);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send('Error on get task by id');
  }
}
import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task';
import { GroupModel } from '../models/group';

@Injectable()
export class TasksService {
  private _tasks: TaskModel[] = [];
  private _groups: GroupModel[] = [];

  constructor() {}

  addTask(task: TaskModel) {
    this._tasks.push(task);
  }

  removeTask(task: TaskModel) {
    this._tasks = this._tasks.filter((val) => val != task);
  }

  getAllTasks(): TaskModel[] {
    return this._tasks;
  }

  addGroup(group: GroupModel) {
    this._groups.push(group);
  }

  removeGroup(group: GroupModel) {
    this._groups = this._groups.filter((val) => val != group);
  }

  getAllGroups(): GroupModel[] {
    return this._groups;
  }
}

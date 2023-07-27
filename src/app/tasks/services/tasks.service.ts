import { Injectable } from '@angular/core';
import { Priority, TaskModel } from '../models/task';
import { GroupModel } from '../models/group';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TasksService {
  private _tasks$: BehaviorSubject<TaskModel[]> = new BehaviorSubject<
    TaskModel[]
  >([
    {
      id: 1,
      title: 'test',
      description: 'this is description',
      priority: 0,
      deliveryDate: new Date(),
      group: {
        id: 1,
        title: 'sdjsak',
      },
    },
    {
      id: 2,
      title: 'test1',
      description: '',
      priority: 0,
      deliveryDate: new Date(),
      group: {
        id: 1,
        title: 'sdjsak',
      },
    },
    {
      id: 3,
      title: 'hello',
      description: '',
      priority: 0,
      deliveryDate: new Date(),
      group: {
        id: 1,
        title: 'sdjsak',
      },
    },
  ]);

  private _groups: GroupModel[] = [
    {
      id: 1,
      title: 'sdjsak',
    },
  ];

  constructor() {}

  addTask(task: TaskModel) {
    const currentTasks = this._tasks$.value;
    this._tasks$.next([...currentTasks, task]);
  }

  removeTask(...tasks: TaskModel[]) {
    const currenTasks = this._tasks$.value;
    const newTasks = currenTasks.filter(
      (val) => !this._ifTaskExistsInArr(val, tasks)
    );
    this._tasks$.next(newTasks);
  }

  getTask(id: number): TaskModel {
    return this._tasks$.value.filter((task) => task.id == id)[0];
  }

  getAllTasks(): Observable<TaskModel[]> {
    return this._tasks$.asObservable();
  }

  PriorityToText(priority: any): string {
    if (priority == Priority.LOW) return 'low';
    if (priority == Priority.MEDIUM) return 'medium';
    if (priority == Priority.URGENT) return 'urgent';
    return 'Unknown';
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

  // check if a given task exists in tasks array
  private _ifTaskExistsInArr(target: TaskModel, tasks: TaskModel[]) {
    return tasks.findIndex((task) => target.id == task.id) != -1;
  }
}

import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task';
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
      description: '',
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

  getAllTasks(): Observable<TaskModel[]> {
    return this._tasks$.asObservable();
  }

  getTasksLength(): number {
    return this._tasks$.value.length;
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

  private _ifTaskExistsInArr(target: TaskModel, tasks: TaskModel[]) {
    return tasks.findIndex((task) => target.id == task.id) != -1;
  }
}

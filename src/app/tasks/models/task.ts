import { GroupModel } from './group';

export enum Priority {
  LOW,
  MEDIUM,
  URGENT,
}

export class TaskModel {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  deliveryDate: Date;
  group: GroupModel;

  constructor(
    title: string,
    priority: Priority,
    deliveryDate: Date,
    group: GroupModel,
    description?: string
  ) {
    this.id = Math.floor(Math.random() * 1000);
    this.title = title;
    this.priority = priority;
    this.deliveryDate = deliveryDate;
    this.group = group;
    this.description = description;
  }
}

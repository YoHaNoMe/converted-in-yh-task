export enum Priority {
  LOW,
  MEDIUM,
  URGENT,
}

export interface TaskModel {
  title: string;
  description?: string;
  priority: Priority;
  deliveryDate: Date;
  group: string;
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Priority, TaskModel } from '../../models/task';
import { TasksService } from '../../services/tasks.service';
import { GroupModel } from '../../models/group';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  priorityEnum = Priority;

  taskFormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority: [this.priorityEnum.LOW, Validators.required],
    deliveryDate: [new Date(), Validators.required],
    group: ['', Validators.required],
  });

  groups: GroupModel[] = [];
  addGroup: (name: string) => GroupModel;

  minDeliveryDate = new Date();

  constructor(private fb: FormBuilder, private tasksService: TasksService) {
    this.addGroup = this._addGroup.bind(this);
  }

  ngOnInit() {
    this.groups = this.tasksService.getAllGroups();
  }

  _addGroup(name: string): GroupModel {
    const id = this.tasksService.getAllGroups().length + 1;
    const groupObj = new GroupModel(id, name);
    this.tasksService.addGroup(groupObj);
    return groupObj;
  }

  createTask() {
    if (!this.taskFormGroup.valid) {
      this.taskFormGroup.markAllAsTouched();
      return;
    }
    const task = this.taskFormGroup.value as TaskModel;
    this.tasksService.addTask(task);
  }

  /**
   * Getters for form controls
   */
  // get all form controls from taskFormGroup
  get f() {
    return this.taskFormGroup.controls;
  }

  get title() {
    return this.f.title;
  }

  get description() {
    return this.f.description;
  }

  get priority() {
    return this.f.priority;
  }

  get deliveryDate() {
    return this.f.deliveryDate;
  }

  get group() {
    return this.f.group;
  }
}

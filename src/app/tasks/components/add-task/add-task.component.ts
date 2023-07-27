import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Priority, TaskModel } from '../../models/task';
import { TasksService } from '../../services/tasks.service';
import { GroupModel } from '../../models/group';
import { Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private route: Router
  ) {
    // add the context of this component by binding it to addGroup
    // that's because addGroup is being called by ng-select, so we don't have a context for this component 
    // and we want to access tasksService inside addGroup
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

    // the form is valid
    const taskObj = new TaskModel(
      this.taskFormGroup.value.title ?? '',
      this.taskFormGroup.value.priority ?? this.priorityEnum.LOW,
      this.taskFormGroup.value.deliveryDate ?? new Date(),
      this.extractGroupModel(this.taskFormGroup.value.group),
      this.taskFormGroup.value.description ?? ''
    );

    this.tasksService.addTask(taskObj);

    // reset the form
    this.taskFormGroup.reset();
    this.deliveryDate.setValue(new Date());
    this.priority.setValue(this.priorityEnum.LOW);
  }

  extractGroupModel(group: any) {
    return new GroupModel(group[0].id, group[0].title);
  }

  goBackToList() {
    this.route.navigate(['/tasks']);
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

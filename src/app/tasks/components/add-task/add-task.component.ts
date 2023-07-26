import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Priority } from '../../models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  priorityEnum = Priority;

  taskFormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority: [this.priorityEnum.LOW, Validators.required],
    deliveryDate: ['', Validators.required],
    group: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  createTask() {
    console.log(this.taskFormGroup.value);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { GroupModel } from '../../models/group';
import { Priority, TaskModel } from '../../models/task';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit, OnDestroy {
  PriorityEnum = Priority;
  minDeliveryDate = new Date();
  groups: GroupModel[] = this.tasksService.getAllGroups();
  tasks: TaskModel[] = [];
  filteredData: TaskModel[] = [];
  selectedTasks: TaskModel[] = [];
  isAllSelected: boolean = false;
  private _subscriptions$: Subscription[] = [];

  /**
   * begin:: filtration form controls
   */
  taskTitleFc: FormControl = new FormControl('');
  deliveryDateFc: FormControl = new FormControl('');
  groupFc: FormControl = new FormControl('');
  /**
   * end:: filtration form controls
   */

  constructor(public tasksService: TasksService, private router: Router) {}

  ngOnInit(): void {
    // fetch the tasks, and sort them by priority
    this._subscriptions$.push(
      this.tasksService.getAllTasks().subscribe((tasks) => {
        this.tasks = tasks;
        this.filteredData = this.tasks;
        this.filteredData = this.sortTasks(this.filteredData);
      })
    );
  }

  deleteTask() {
    this.tasksService.removeTask(...this.selectedTasks);
    this.selectedTasks = [];
  }

  selectAll(isAllSelected: boolean) {
    this.isAllSelected = isAllSelected;

    if (isAllSelected) {
      this.selectedTasks = this.tasks;
    } else this.selectedTasks = [];
  }

  isTaskSelected(task: TaskModel): boolean {
    return (
      this.selectedTasks.findIndex(
        (selectedTask) => selectedTask.id == task.id
      ) != -1
    );
  }

  onTaskSelectChange($event: any, task: TaskModel) {
    if ($event.checked) {
      this.selectedTasks.push(task);
    } else {
      this.selectedTasks = this.selectedTasks.filter(
        (sTask) => sTask.id != task.id
      );
    }

    // mark 'select all' checkbox as selected or unselcted
    if (this.selectedTasks.length < this.tasks.length) {
      this.isAllSelected = false;
    } else {
      this.isAllSelected = true;
    }
  }

  async onSearchBtnClicked() {
    let filteredData = [];
    filteredData.push(
      ...this.tasks
        .filter(
          (val) =>
            !this.taskTitleFc.value ||
            val.title.includes(this.taskTitleFc.value)
        )
        .filter(
          (val) =>
            !this.deliveryDateFc.value ||
            (val.deliveryDate.getDay() == this.deliveryDateFc.value.getDay() &&
              val.deliveryDate.getMonth() ==
                this.deliveryDateFc.value.getMonth() &&
              val.deliveryDate.getFullYear() ==
                this.deliveryDateFc.value.getFullYear())
        )
        .filter(
          (val) =>
            this.groupFc.value.length == 0 ||
            this.groupFc.value.findIndex(
              (group: GroupModel) => group.id == val.group.id
            ) != -1
        )
    );
    // get only the unique values
    filteredData = Array.from(new Set(filteredData));

    // check if there is a filtration, then show the filtered data only
    // else reset the data to the default
    if (filteredData) this.filteredData = filteredData;
    else this.filteredData = this.tasks;
  }

  sortTasks(tasks: TaskModel[]): TaskModel[] {
    // Urgent -> Medium -> Low
    return tasks.sort((a, b) => b.priority - a.priority);
  }

  goToAddTask() {
    this.router.navigate(['/tasks/add']);
  }

  ngOnDestroy() {
    this._subscriptions$.forEach((sub) => sub.unsubscribe());
  }
}

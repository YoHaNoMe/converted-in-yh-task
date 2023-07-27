import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from '../../models/task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  task: TaskModel | undefined;
  private _subscriptions$: Subscription[] = [];

  constructor(
    public tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._subscriptions$.push(
      this.route.paramMap.subscribe((params) => {
        this.getTaskWithId(params.get('id') ?? '');
      })
    );
  }

  getTaskWithId(id: string) {
    this.task = this.tasksService.getTask(Number(id));
  }

  goBackToList() {
    this.router.navigate(['/tasks']);
  }

  ngOnDestroy(): void {
    this._subscriptions$.forEach((sub) => sub.unsubscribe());
  }
}

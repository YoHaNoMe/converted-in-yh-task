import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from '../../models/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  task: TaskModel | undefined;

  constructor(
    public tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.getTaskWithId(params.get('id') ?? '');
    });
  }

  getTaskWithId(id: string) {
    this.task = this.tasksService.getTask(Number(id));
    console.log(this.task);
  }

  goBackToList() {
    this.router.navigate(['/tasks']);
  }
}

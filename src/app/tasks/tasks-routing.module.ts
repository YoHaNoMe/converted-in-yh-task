import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

const routes: Routes = [
  {
    path: '',
    component: ListTasksComponent,
  },
  {
    path: 'add',
    component: AddTaskComponent,
  },
  {
    path: ':id',
    component: TaskDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./tasks/tasks-list.component').then(m => m.TasksListComponent)
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./tasks/task-form.component').then(m => m.TaskFormComponent)
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./tasks/task-form.component').then(m => m.TaskFormComponent)
      }
    ]
  }
];

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLink],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  form = this.fb.group({
    titulo: ['', [Validators.required, Validators.maxLength(150)]],
    descricao: ['', Validators.maxLength(2000)],
    status: ['PENDENTE', Validators.required]
  });

  id?: number;

  statuses = [
    { value: 'PENDENTE', label: 'Pendente' },
    { value: 'EM_ANDAMENTO', label: 'Em andamento' },
    { value: 'CONCLUIDA', label: 'Concluída' }
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.taskService.get(this.id).subscribe(task => {
        this.form.patchValue(task);
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.value as Pick<Task, 'titulo' | 'descricao' | 'status'>;
    const request = this.id
      ? this.taskService.update(this.id, value)
      : this.taskService.create(value);
    request.subscribe({
      next: () => {
        this.snackBar.open('Tarefa salva com sucesso', 'Fechar', {
          duration: 3000
        });
        this.router.navigate(['/tasks']);
      },
      error: error => {
        const validationErrors = error.error?.errors as
          | Record<string, string | string[]>
          | undefined;
        if (validationErrors) {
          Object.keys(validationErrors).forEach(field => {
            const control = this.form.get(field);
            if (control) {
              const serverError = validationErrors[field];
              control.setErrors({
                serverError: Array.isArray(serverError)
                  ? serverError.join(', ')
                  : serverError
              });
            }
          });
        }
      }
    });
  }
}


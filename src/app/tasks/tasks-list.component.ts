import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { StatusLabelPipe } from '../pipes/status-label.pipe';
import { DateTimePipe } from '../pipes/date-time.pipe';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    RouterLink,
    StatusLabelPipe,
    DateTimePipe
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit {
  displayedColumns = [
    'titulo',
    'status',
    'dataAtualizacao',
    'usuarioAtualizacao',
    'actions'
  ];
  tasks: Task[] = [];
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  sortActive = 'dataAtualizacao';
  sortDirection: SortDirection = 'desc';

  statuses = [
    { value: '', label: 'Todos' },
    { value: 'PENDENTE', label: 'Pendente' },
    { value: 'EM_ANDAMENTO', label: 'Em andamento' },
    { value: 'CONCLUIDA', label: 'Concluída' }
  ];

  filters = new FormGroup({
    titulo: new FormControl(''),
    status: new FormControl('')
  });

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.pageIndex = +(params.get('page') || 0);
      this.pageSize = +(params.get('size') || 10);

      const sort = params.get('sort');
      if (sort) {
        const [active, direction] = sort.split(',');
        this.sortActive = active;
        this.sortDirection = direction as SortDirection;
      }

      this.filters.patchValue(
        {
          status: params.get('status') || '',
          titulo: params.get('titulo') || ''
        },
        { emitEvent: false }
      );

      this.load();
    });
  }

  load() {
    const sort = this.sortDirection
      ? `${this.sortActive},${this.sortDirection}`
      : undefined;
    const { status, titulo } = this.filters.value;
    this.taskService
      .list({
        page: this.pageIndex,
        size: this.pageSize,
        sort,
        status: status || undefined,
        titulo: titulo || undefined
      })
      .subscribe(page => {
        this.tasks = page.content;
        this.totalElements = page.totalElements;
      });
  }

  applyFilters() {
    this.pageIndex = 0;
    this.updateQueryParams();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateQueryParams();
  }

  onSortChange(sort: Sort) {
    this.sortActive = sort.active;
    this.sortDirection = sort.direction as SortDirection;
    this.updateQueryParams();
  }

  updateQueryParams() {
    const sort = this.sortDirection
      ? `${this.sortActive},${this.sortDirection}`
      : undefined;
    const { status, titulo } = this.filters.value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.pageIndex,
        size: this.pageSize,
        sort,
        status: status || undefined,
        titulo: titulo || undefined
      }
    });
  }

  delete(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir tarefa',
        message: 'Deseja excluir esta tarefa?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.delete(task.id).subscribe(() => this.load());
      }
    });
  }

  statusColor(status: string): string {
    switch (status) {
      case 'CONCLUIDA':
        return 'primary';
      case 'EM_ANDAMENTO':
        return 'accent';
      case 'PENDENTE':
        return 'warn';
      default:
        return '';
    }
  }
}


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksListComponent } from './tasks-list.component';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const taskServiceStub = {
  list: () => of({ content: [], totalElements: 0 })
};

const activatedRouteStub = {
  queryParamMap: of(convertToParamMap({}))
};

const dialogStub = {
  open: () => ({ afterClosed: () => of(false) })
};

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksListComponent, RouterTestingModule, NoopAnimationsModule],
      providers: [
        { provide: TaskService, useValue: taskServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: MatDialog, useValue: dialogStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should define displayed columns', () => {
    expect(component.displayedColumns).toEqual([
      'titulo',
      'status',
      'dataAtualizacao',
      'usuarioAtualizacao',
      'actions'
    ]);
  });
});

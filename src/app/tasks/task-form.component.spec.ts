import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', ['create', 'update', 'get']);
    taskServiceSpy.create.and.returnValue(of({} as any));

    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, RouterTestingModule, NoopAnimationsModule],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({}) } } },
        { provide: MatSnackBar, useValue: { open: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be invalid when required fields are empty', () => {
    component.form.setValue({ titulo: '', descricao: '', status: '' });
    component.submit();
    expect(component.form.invalid).toBeTrue();
    expect(component.form.get('titulo')?.hasError('required')).toBeTrue();
    expect(component.form.get('status')?.hasError('required')).toBeTrue();
  });

  it('should be valid with required fields filled', () => {
    component.form.setValue({ titulo: 'Teste', descricao: '', status: 'PENDENTE' });
    expect(component.form.valid).toBeTrue();
  });
});

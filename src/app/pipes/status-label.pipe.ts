import { Pipe, PipeTransform } from '@angular/core';

const LABELS: Record<string, string> = {
  PENDENTE: 'Pendente',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Concluída'
};

@Pipe({
  name: 'statusLabel',
  standalone: true
})
export class StatusLabelPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    return LABELS[value] ?? value;
  }
}


import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateTime',
  standalone: true
})
export class DateTimePipe implements PipeTransform {
  transform(
    value: string | Date | null | undefined,
    format = 'dd/MM/yyyy HH:mm',
    locale = 'pt-BR'
  ): string {
    if (!value) {
      return '';
    }
    return formatDate(value, format, locale);
  }
}


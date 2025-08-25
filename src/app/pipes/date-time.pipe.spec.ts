import { DateTimePipe } from './date-time.pipe';
import '@angular/common/locales/global/pt';

describe('DateTimePipe', () => {
  const pipe = new DateTimePipe();

  it('should format ISO date string', () => {
    const formatted = pipe.transform('2024-01-01T00:00:00Z');
    expect(formatted).not.toBe('');
  });

  it('should return empty string for null', () => {
    expect(pipe.transform(null)).toBe('');
  });
});


import { StatusLabelPipe } from './status-label.pipe';

describe('StatusLabelPipe', () => {
  const pipe = new StatusLabelPipe();

  it('should transform status to friendly label', () => {
    expect(pipe.transform('PENDENTE')).toBe('Pendente');
    expect(pipe.transform('EM_ANDAMENTO')).toBe('Em andamento');
    expect(pipe.transform('CONCLUIDA')).toBe('Concluída');
  });

  it('should return empty string for null', () => {
    expect(pipe.transform(null)).toBe('');
  });
});


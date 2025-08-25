export interface Task {
  id: number;
  titulo: string;
  descricao?: string;
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';
  dataCriacao: string;
  dataAtualizacao: string;
  usuarioAtualizacao: string;
}


# Task Manager Web

Aplicação Angular para gerenciamento de tarefas.

## Como rodar

```bash
npm i
ng serve
```

A aplicação ficará disponível em `http://localhost:4200`.

## Configurar `apiBaseUrl`

O endereço da API é definido em `src/environments/environment.ts`:

```ts
export const environment = {
  apiBaseUrl: 'http://localhost:8080/api'
};
```

Altere o valor de `apiBaseUrl` conforme o ambiente do backend.

## Mapa de telas

- **/tasks** – listagem de tarefas com filtros, ordenação e paginação.
- **/tasks/new** – criação de nova tarefa.
- **/tasks/:id/edit** – edição de tarefa existente.

## Docker

Para construir e servir a aplicação via Nginx:

```bash
docker build -t task-manager-web .
docker run -p 8080:80 task-manager-web
```

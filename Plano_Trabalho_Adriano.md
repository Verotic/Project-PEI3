# Plano de Trabalho - Adriano (Eventos e API de Mapas)

Olá Adriano. Neste projeto, ficas responsável pela base da plataforma: a Gestão de Eventos e a sua localização no mapa. Como é exigida a modularização e o uso da IndexedDB, tens aqui uma excelente oportunidade para criar Classes bem estruturadas para gerir estes dados.

## 1. Responsabilidades
*   **CRUD de Eventos:** Criar os formulários e a lógica para adicionar, visualizar, editar e remover eventos (título, descrição, data, hora, local) utilizando a IndexedDB para a persistência de dados.
*   **API de Mapas:** Integrar uma API (como o Leaflet/OpenStreetMap ou Google Maps) para mostrar um mapa interativo com a localização do evento criado.

## 2. Modularização e Estrutura
Deves organizar o teu código nos seguintes ficheiros:
*   `js/modules/EventManager.js` (Lógica do formulário, operações CRUD e listagem no DOM)
*   `js/services/MapService.js` (Lógica de comunicação com a API de Mapas)

## 3. Exemplo de Implementação (POO)

```javascript
export class EventManager {
  constructor(dbInstance) {
    this.db = dbInstance;
    this.form = document.getElementById('event-form');
    this.list = document.getElementById('events-list');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleAddEvent(e));
    }
    this.renderEvents();
  }

  async handleAddEvent(e) {
    e.preventDefault();
    // Lógica para recolher dados do formulário e guardar na IndexedDB
    // Após guardar, chamar this.renderEvents() para atualizar a lista no ecrã
  }
}
```

## Resumo da Checklist - Adriano:
- [ ] Criar a interface HTML (formulários e área de listagem) para os Eventos.
- [ ] Implementar as operações de CRUD na IndexedDB.
- [ ] Integrar a API de Mapas no detalhe de cada evento.
- [ ] Usar comentários JSDoc nos teus métodos.

import { EventManager } from './EventManager.js';

export class HomepageEvents {
  constructor(dbName, version) {
    this.eventManager = new EventManager(dbName, version);
    this.init();
  }

  async init() {
    const grid = document.getElementById('eventsGrid');
    if (!grid) return;

    try {
      const events = await this.eventManager.readEvents();
      this.renderEvents(events, grid);
    } catch (error) {
      console.error('Erro ao carregar eventos para a homepage:', error);
      grid.innerHTML = '<p>Erro ao carregar os eventos.</p>';
    }
  }

  renderEvents(events, grid) {
    if (!events || events.length === 0) {
      grid.innerHTML = '<p>Não há eventos agendados de momento.</p>';
      return;
    }

    grid.innerHTML = ''; // Limpa antes de preencher

    events.forEach(event => {
      const article = document.createElement('article');
      article.className = 'news-card'; // Reuse the news-card style for now, or create event-card
      
      // Usa o Picsum com um seed baseado no ID do evento para a imagem ser sempre a mesma para aquele evento específico
      const imageUrl = `https://picsum.photos/seed/${event.id}/400/250`;

      article.innerHTML = `
        <div class="news-thumb">
          <img src="${imageUrl}" alt="${event.name}" loading="lazy">
        </div>
        <div class="news-body">
          <p class="news-date">
            <span class="material-symbols-outlined" aria-hidden="true" style="font-size: 16px; vertical-align: middle;">calendar_month</span>
            ${event.date} às ${event.hour}
          </p>
          <h3>${event.name}</h3>
          <p>${event.description}</p>
          <p style="font-size: 0.85rem; color: #666; margin-top: 10px;">
            <span class="material-symbols-outlined" aria-hidden="true" style="font-size: 16px; vertical-align: middle;">location_on</span>
            ${event.local}
          </p>
        </div>
      `;
      
      grid.appendChild(article);
    });
  }
}

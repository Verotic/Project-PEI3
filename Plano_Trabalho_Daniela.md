# Plano de Trabalho - Daniela (Newsletter, UI/UX e API Meteorológica)

Olá Daniela. O teu foco será a Interação com o Utilizador, a captura de contactos (Newsletter) e a previsão do tempo para os eventos criados pelo Adriano. A tua parte é fundamental para a avaliação de Experiência do Utilizador e Design (10% da nota).

## 1. Responsabilidades
*   **Newsletter com Persistência:** Criar o formulário de subscrição (nome e e-mail), validá-lo de forma robusta e guardar os dados localmente na IndexedDB, dando sempre feedback visual (sucesso/erro).
*   **API Meteorológica:** Consumir uma API (ex: OpenWeatherMap) que receba a data e o local de um evento e devolva as condições climáticas esperadas para as exibir no ecrã.
*   **UI/UX e Acessibilidade:** Garantir que os novos formulários e listagens seguem o design original, são responsivos e acessíveis (ex: navegação por teclado).

## 2. Modularização e Estrutura
Deves organizar o teu código nos seguintes ficheiros:
*   `js/modules/NewsletterManager.js` (Validação de formulários e gravação na DB)
*   `js/services/WeatherService.js` (Comunicação com a API do tempo)

## 3. Exemplo de Implementação (POO)

```javascript
export class NewsletterManager {
  constructor(dbInstance) {
    this.db = dbInstance;
    this.form = document.getElementById('newsletter-form');
    this.feedback = document.getElementById('form-feedback');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubscribe(e));
    }
  }

  showFeedback(message, isError = false) {
    this.feedback.textContent = message;
    this.feedback.className = isError ? 'error-msg' : 'success-msg';
  }
}
```

## Resumo da Checklist - Daniela:
- [ ] Criar o formulário da Newsletter com validações e feedback visual.
- [ ] Guardar os subscritores na IndexedDB.
- [ ] Integrar a API Meteorológica para apresentar o clima nos eventos.
- [ ] Testar a responsividade e acessibilidade global das novas funcionalidades.

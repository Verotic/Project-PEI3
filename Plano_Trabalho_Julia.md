# Plano de Trabalho - Julia (Core DB, API de Notícias e Integração)

Olá Julia. Ficas com a responsabilidade da Arquitetura Base de dados, do consumo de Notícias e da Documentação. Serás tu a criar a base que une o trabalho de toda a equipa.

## 1. Responsabilidades
*   **Core IndexedDB:** Criar a classe principal que abre a ligação à base de dados e cria as Object Stores (tabelas) necessárias para os Eventos e para a Newsletter. O Adriano e a Daniela vão precisar da tua classe para conseguirem guardar os dados deles.
*   **API de Notícias/RSS:** Consumir um feed de notícias de saúde ou do CACA através de uma API ou RSS feed público e apresentar a lista dinâmica no ecrã.
*   **Integração e Documentação:** Inicializar todas as classes da equipa no `main.js` e redigir o `README.md` de forma detalhada (este ficheiro vale 10% da nota do projeto).

## 2. Modularização e Estrutura
Deves organizar o teu código nos seguintes ficheiros:
*   `js/core/Database.js` (Gestão global e conexão da IndexedDB)
*   `js/services/NewsService.js` (Consumo do RSS/API de notícias)
*   `README.md` (Documentação do projeto)

## 3. Exemplo de Integração (`main.js`)

```javascript
import { Database } from './core/Database.js';
import { EventManager } from './modules/EventManager.js';
import { NewsletterManager } from './modules/NewsletterManager.js';
import { NewsService } from './services/NewsService.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Inicializar a Base de Dados (Trabalho da Julia)
  const db = new Database('CACADatabase', 1);
  await db.connect(); // Método que cria as stores de eventos e newsletter

  // 2. Inicializar Módulos injetando a DB (Trabalho do Adriano e Daniela)
  new EventManager(db);
  new NewsletterManager(db);
  
  // 3. Inicializar APIs (Trabalho da Julia)
  const news = new NewsService('.news-container');
  news.fetchLatestNews();
});
```

## Resumo da Checklist - Julia:
- [ ] Criar a classe `Database` responsável por criar as tabelas da IndexedDB.
- [ ] Integrar a API de Notícias ou RSS Feed na página.
- [ ] Juntar o código de todos no ficheiro `main.js`.
- [ ] Escrever o `README.md` com instruções, explicação da arquitetura da DB e detalhes das APIs.

***

**Nota de trabalho em equipa:** Ao trabalharem com esta estrutura de ficheiros separados (`EventManager.js`, `NewsletterManager.js`, `Database.js`), reduzem as probabilidades de conflitos quando fizerem os commits e push para o repositório.

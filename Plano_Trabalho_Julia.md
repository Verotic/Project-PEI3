# Plano de Trabalho - Julia (Core DB, API de Notícias e Integração)

Olá Julia. Ficas com a responsabilidade da Arquitetura Base de dados, do consumo de Notícias e da Documentação. Serás tu a criar a base que une o trabalho de toda a equipa.

## 1. Responsabilidades
*   **Core IndexedDB e Estrutura Inicial:** Criar a classe principal (`Database.js`) que abre a ligação à base de dados e cria as Object Stores. A Julia também implementou a base dos módulos `EventManager.js` e `NewsletterManager.js` com a persistência de dados, adiantando trabalho para a equipa.
*   **API de Notícias/RSS:** Consumir um feed de notícias de saúde ou do CACA através de uma API ou RSS feed público e apresentar a lista dinâmica no ecrã.
*   **Integração e Documentação:** Inicializar classes principais no `main.js` e redigir o `README.md` de forma detalhada (este ficheiro vale 10% da nota do projeto).

## 2. Modularização e Estrutura
O teu código está/estará organizado nos seguintes ficheiros:
*   `js/core/Database.js` (Gestão global e conexão da IndexedDB)
*   `js/modules/EventManager.js` e `js/modules/NewsletterManager.js` (Base da persistência)
*   `js/services/NewsService.js` (Consumo do RSS/API de notícias)
*   `README.md` (Documentação do projeto)

## Resumo da Checklist - Julia:
- [x] Criar a classe `Database` responsável por criar as tabelas da IndexedDB.
- [x] Criar a base da persistência para o `EventManager` e `NewsletterManager`.
- [ ] Integrar a API de Notícias ou RSS Feed na página.
- [ ] Juntar o código de todos no ficheiro `main.js` e verificar conflitos.
- [ ] Escrever o `README.md` com instruções, explicação da arquitetura da DB e detalhes das APIs.
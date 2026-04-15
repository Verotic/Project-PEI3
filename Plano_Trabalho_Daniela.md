# Plano de Trabalho - Daniela (Newsletter UI/UX e API Meteorológica)

Olá Daniela. O teu foco foi ajustado para a Interação com o Utilizador, UI/UX da captura de contactos (Newsletter) e a previsão do tempo para os eventos. A tua parte é fundamental para a avaliação de Experiência do Utilizador e Design (10% da nota).

## 1. Responsabilidades (Atualizadas)
*   **Newsletter (UI/UX e Validação):** Implementar as validações e o feedback visual da subscrição da Newsletter (com CSS, estilos e GSAP se necessário) garantindo robustez na interface e mensagens de sucesso/erro. (A persistência na DB foi implementada pela Julia/Adriano).
*   **API Meteorológica:** Consumir uma API (ex: OpenWeatherMap) que receba a data e o local de um evento e devolva as condições climáticas esperadas para as exibir no ecrã.
*   **UI/UX e Acessibilidade:** Garantir que os novos formulários e listagens seguem o design original, são responsivos e acessíveis (ex: navegação por teclado, "aria-labels").

## 2. Modularização e Estrutura
O teu código está organizado nos seguintes ficheiros:
*   `js/services/WeatherService.js` (Comunicação com a API do tempo)
*   Estilos e lógica visual da Newsletter (`styles/footer.css`, e integração no `NewsletterManager.js`)

## Resumo da Checklist - Daniela:
- [x] Criar a classe `WeatherService` para obter coordenadas (Nominatim/OpenStreetMap) e previsão meteorológica (OpenWeatherMap).
- [x] Melhorar o formulário da Newsletter (UI) no footer com validações visuais e feedback.
- [ ] Testar a responsividade e acessibilidade global das novas funcionalidades (WCAG, navegação por teclado).
- [ ] Implementar animações ou Skeleton Screens no carregamento de dados (ex: enquanto a meteorologia carrega).

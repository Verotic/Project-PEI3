# Plano de Trabalho - Adriano (Eventos e API de Mapas)

Olá Adriano. Neste projeto, ficas responsável pela base da plataforma: a Gestão de Eventos e a sua localização no mapa. Como é exigida a modularização e o uso da IndexedDB, tens aqui uma excelente oportunidade para criar Classes bem estruturadas para gerir estes dados.

## 1. Responsabilidades
*   **CRUD de Eventos:** Criar os formulários e a lógica para adicionar, visualizar, editar e remover eventos (título, descrição, data, hora, local) utilizando a IndexedDB para a persistência de dados.
*   **API de Mapas:** Integrar uma API (como o Leaflet/OpenStreetMap ou Google Maps) para mostrar um mapa interativo com a localização do evento criado.

## 2. Modularização e Estrutura
O teu código está organizado nos seguintes ficheiros:
*   `js/modules/EventManager.js` (Lógica do formulário, operações CRUD e listagem no DOM)
*   `js/services/MapService.js` (Lógica de comunicação com a API de Mapas Leaflet)
*   `js/admin-eventos.js` e `admin-eventos.html` (Interface e controlador da página de gestão)

## Resumo da Checklist - Adriano:
- [x] Criar a interface HTML (formulários e área de listagem) para os Eventos (`admin-eventos.html`).
- [x] Implementar as operações de CRUD na IndexedDB (`EventManager.js`).
- [x] Integrar a API de Mapas no detalhe de cada evento (`MapService.js` com OpenStreetMap/Leaflet).
- [x] Implementar Reverse Geocoding: permitir selecionar local no mapa e extrair morada para o formulário.
- [x] Usar comentários JSDoc nos teus métodos.
- [x] Separar secções de Notícias e Eventos na Homepage e adicionar imagens dinâmicas e aleatórias (`picsum.photos`) aos Eventos.
import { HeroCarousel } from './modules/HeroCarousel.js';
import { ScrollManager } from './modules/ScrollManager.js';
import { TiltEffect } from './modules/TiltEffect.js';
import { ContactForm } from './modules/ContactForm.js';
import { AnimationManager } from './modules/Animations.js';
import { ChartManager } from './modules/ChartManager.js';
import { Database } from './core/Database.js';

/**
 * Main application file.
 * Responsible for initializing all modules.
 */
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Application started successfully (Modularized).');

  // 1. Inicializa a Base de Dados (Julia)
  const db = new Database('CACADatabase', 1);
  // O construtor já chama init() que cria/abre a base de dados

  // 2. Initialize Scroll to Top Button (Adriano)
  new ScrollManager('scrollTopBtn');

  // 3. Initialize 3D Tilt Effect on Cards (Adriano)
  new TiltEffect('.area-card');

  // 4. Initialize Hero Carousel (Adriano)
  new HeroCarousel('.hero-carousel', [
    'assets/images/caca-1',
    'assets/images/caca-2'
  ]);

  // 5. Initialize Contact Form (Iulia)
  new ContactForm('#contactForm');

  // 6. Initialize Animations (David)
  // Small delay to ensure DOM is ready and layout stabilized
  setTimeout(() => {
    new AnimationManager();
    new ChartManager('investmentChart'); // Initialize Chart with optimization
  }, 100);
})

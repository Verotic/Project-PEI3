/**
 * Class responsible for the 3D effect on cards when hovering.
 */
export class TiltEffect {
  /**
   * Initializes the effect.
   * @param {string} cardSelector - CSS selector for the cards to animate.
   */
  constructor(cardSelector) {
    this.cards = document.querySelectorAll(cardSelector);
    
    if (this.cards.length === 0) {
      console.warn(`No cards found with selector "${cardSelector}".`);
      return;
    }

    this.init();
  }

  /**
   * Adds event listeners to each card.
   */
  init() {
    this.cards.forEach(card => {
      // When mouse moves over the card
      card.addEventListener('mousemove', (e) => this.handleMove(e, card));
      
      // When mouse leaves the card (reset)
      card.addEventListener('mouseleave', () => this.handleLeave(card));
    });
  }

  /**
   * Calculates and applies 3D rotation based on mouse position.
   * @param {MouseEvent} e - The mouse event.
   * @param {HTMLElement} card - The card element.
   */
  handleMove(e, card) {
    const rect = card.getBoundingClientRect();
    
    // Mouse position relative to the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Card center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 10 degrees)
    // If mouse is above center (y < centerY), rotate upwards (negative X)
    const rotateX = ((y - centerY) / centerY) * -10; 
    // If mouse is to the right of center (x > centerX), rotate right (positive Y)
    const rotateY = ((x - centerX) / centerX) * 10;

    // Apply transformation
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  }

  /**
   * Removes rotation when mouse leaves.
   * @param {HTMLElement} card - The card element.
   */
  handleLeave(card) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }
}

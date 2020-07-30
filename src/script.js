const { sampleSize, difference } = require('lodash-es');

const magic = {
  steps: document.querySelectorAll('.js-step'),
  nextButtons: document.querySelectorAll('.js-next'),
  countdownElement: document.getElementById('js-countdown'),
  currentStep: 0,
  init() {
    this.nextButtons.forEach((nextButton) => {
      nextButton.addEventListener('click', this.nextStep.bind(this));
    });
    this.show(this.steps[0]);
    this.shuffleCards();
  },
  shuffleCards() {
    const allCards = [
      'JC',
      'JD',
      'JH',
      'JS',
      'KC',
      'KD',
      'KH',
      'KS',
      'QC',
      'QD',
      'QH',
      'QS',
    ];

    const mindPile = sampleSize(allCards, 6);
    const magicPile = sampleSize(difference(allCards, mindPile), 5);
    const piles = { mind: mindPile, magic: magicPile };

    const cards = document.querySelectorAll('.js-card');

    cards.forEach((card) => {
      const pile = card.getAttribute('data-pile');
      const value = piles[pile].pop();
      card.setAttribute('src', `./assets/cards/${value}.png`);
    });
  },
  hide(element) {
    element.classList.add('hidden');
    element.classList.remove('block');
  },
  show(element) {
    element.classList.add('block');
    element.classList.remove('hidden');

    const countdownValue = element.getAttribute('data-countdown');
    if (countdownValue) {
      this.countdown(countdownValue);
    }
  },
  nextStep() {
    this.hide(this.steps[this.currentStep]);

    this.currentStep++;

    const currentStep = this.steps[this.currentStep];
    this.show(currentStep);
  },
  countdown(max) {
    const waitFor = 4000;
    let value = max;
    const startCountdown = () => {
      this.countdownElement.innerHTML = value;
      this.show(this.countdownElement);

      const interval = window.setInterval(() => {
        value--;
        if (!value) {
          window.clearInterval(interval);
          this.countdownElement.innerHTML = '';
          this.hide(this.countdownElement);
          this.nextStep();
          return;
        }
        this.countdownElement.innerHTML = value;
      }, 1200);
    };

    window.setTimeout(startCountdown, waitFor);
  },
};

document.addEventListener('DOMContentLoaded', magic.init.bind(magic));

// Lazy loading of images when in viewport
const lazyload = require('norska/frontend/lazyload');
lazyload.init();

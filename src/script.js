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

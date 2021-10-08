
class CountdownTimer {
  constructor({ selector, targetDate}) {
    this.selector = document.querySelector(selector)
    this.targetDate = targetDate
    this.initID = null
    this.deltaTime = 0

    this.animationTime = document.querySelector('.timer')
    this.days = this.selector.querySelector('[data-value="days"]'),
    this.hours = this.selector.querySelector('[data-value="hours"]'),
    this.mins = this.selector.querySelector('[data-value="mins"]'),
    this.seconds = this.selector.querySelector('[data-value="secs"]')
  }
  start() {
      this.initID = setInterval(() => {
      let currentTime = Date.now()
      this.deltaTime = this.targetDate - currentTime
        const time = this.getTimeComponents(this.deltaTime);
        this.insertValues(time)
        this.animateDate(time)
      }, 1000)
  }
  stop() {
    clearInterval(this.initID)
  }
   getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, '0')
  }
  insertValues({ days, hours, mins, secs }) {
    this.days.textContent = days;
    this.hours.textContent = hours;
    this.mins.textContent = mins;
    this.seconds.textContent = secs;
  }
  animateDate({ secs }) {
    if (secs === '00') {
      this.animationTime.classList.add('animate__animated', 'animate__flipInX')
    } else if (!(secs === '00')) {
      this.animationTime.classList.remove('animate__animated', 'animate__fflipInX')
    }
  }
}

const myTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Nov 21, 2021'),
});
myTimer.start()

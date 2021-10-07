
import refs from './refs/refs.js'
const animationTime = document.querySelector('.timer')


class CountdownTimer {
  constructor({ selector, targetDate}) {
    this.selector = selector
    this.targetDate = targetDate
    this.initID = null
    this.deltaTime = 0
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
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.seconds.textContent = secs;
  }
  animateDate({ secs }) {
    if (secs === '00') {
      animationTime.classList.add('animate__animated', 'animate__flipInX')
    } else if (!(secs === '00')) {
      animationTime.classList.remove('animate__animated', 'animate__fflipInX')
    }
  }
}

const myTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Nov 21, 2021'),
});
myTimer.start()

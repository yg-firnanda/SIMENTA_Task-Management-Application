const moment = require('moment');

const taskTime = task => {
    const now = moment();
    const minutesInDay = 1440;
    const minutesInHour = 60;

    const deadline = moment(task.deadline);
    const timeLeft = deadline.diff(now, 'minutes');
    // Not Late Taskl
    const taskTimeLeft = () => {
        let timeLeftText = deadline.fromNow(true)
            .replace('days', 'hari')
            .replace('hours', 'jam')
            .replace('minutes', 'menit')
            .replace('seconds', 'detik')
            .replace('a day', '1 hari')
            .replace('an hour', '1 jam');
            return task.timeLeft = `${timeLeftText} tersisa`
    }
    // Late Task 
    const timeLate = (time) => {
        const taskLate = moment.duration(timeLeft, time).humanize(false)
            .replace('days', 'hari')
            .replace('hours', 'jam')
            .replace('minutes', 'menit')
            .replace('seconds', 'detik')
            .replace('a day', '1 hari')
            .replace('an hour', '1 jam');
            return task.timeLeft = `<span class="text-danger">Terlambat ${taskLate}</span>`;
    }
    
    if(timeLeft > 0) {
        if (timeLeft > minutesInDay || timeLeft > minutesInHour) {
            return task.timeLeft = taskTimeLeft();
        } else {
            return task.timeLeft = taskTimeLeft();
        }
    } else {
        if(timeLeft < 0) {
            return timeLate('minutes');
        } else if(timeLeft < 60) {
            return timeLate('hours');
        } else {
            return timeLate('days');
        }
    }
}

module.exports = taskTime;
export function getElapsedTime(date: Date | undefined) {
    return date
        ? new Date().getTime() - date.getTime()
        : 0;
}


export function msToTime(milliseconds: number) {
    if (milliseconds <= 0) {
        return "00:00:00";
    }
    let hours = Math.floor(milliseconds / 1000 / 60 / 60);
    let minutes = Math.floor(milliseconds / 1000 / 60) % 60;
    let seconds = Math.floor(milliseconds / 1000) % 60;
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    function padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }
}

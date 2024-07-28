export const getWeekRange = (schedule: string) => {
    const nameOfdayWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const scheduleArr = schedule.split(';');

    if (scheduleArr.length === 1) {
        return [['', schedule]];
    }

    const result = [];

    let startIndex = 0;
    let startValue = scheduleArr[0];

    for (let i = 0; i <= 6; i++) {
        const nextValue = scheduleArr[i + 1];

        if (startValue === nextValue) {
            continue;
        } else {
            let range = [];

            if (i - startIndex === 0) {
                range = [`${nameOfdayWeek[startIndex]}`, startValue.split('/').join('-')];
            } else {
                range = [`${nameOfdayWeek[startIndex]}-${nameOfdayWeek[i]}`, startValue.split('/').join('-')];
            }

            startIndex = i + 1;
            startValue = scheduleArr[i + 1];

            result.push(range);
        }
    }

    return result;
}
export const formatTime = (time: string, format: 'as-number' | 'as-text' = 'as-text') => {

    const timeArray = time.split('/');

    if (timeArray.length > 2) return;

    if (format === 'as-number') {
        return {
            hours: +timeArray[0],
            minutes: +timeArray[1]
        }
    } else if (format === 'as-text') {
        return {
            hours: timeArray[0],
            minutes: timeArray[1]
        }
    }
}

export const formatDate = (time: string, format: 'as-number' | 'as-text' = 'as-text') => {

    const dateArray = time.split('/');

    let dateObject = {
        dayIndex: format === 'as-number' ? 0 : '',
        day: format === 'as-number' ? 0 : '',
        month: format === 'as-number' ? 0 : '',
        year: format === 'as-number' ? 0 : '',
    }
    // if (dateArray.length > 4) return;

    if (format === 'as-number') {
        dateObject = {
            dayIndex: +dateArray[0],
            day: +dateArray[1],
            month: +dateArray[2],
            year: +dateArray[3],
        }
    } else if (format === 'as-text') {
        dateObject = {
            dayIndex: dateArray[0],
            day: dateArray[1][0] === '0' ? dateArray[1][1] : dateArray[1],
            month: dateArray[2][0] === '0' ? dateArray[2][1] : dateArray[2],
            year: dateArray[3],
        }
    }

    return dateObject
}

export const isType = (category) => {
    return category.parentId === 'dGVybTo5';
}

export const isLocation = (category) => {
    return category.parentId === 'dGVybToy';
}
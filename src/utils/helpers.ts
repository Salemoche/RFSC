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

export const isType = (category) => {
    return category.parentId === 'dGVybTo5';
}

export const isLocation = (category) => {
    return category.parentId === 'dGVybToy';
}
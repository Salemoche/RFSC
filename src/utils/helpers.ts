import { defaultStyles } from '../styles/default.styles';

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

export const getCategories = (post) => {


    const locations: string[] = [];
    const locationTitles: string[] = [];
    const types: string[] = [];
    const typeTitles: string[] = [];

    post.categories.edges.forEach(node => {
        const category = node.node;
        if ( isType(category)) {
            types.push(category?.slug);
            typeTitles.push(category?.name);
        } else if ( isLocation(category)) {
            locations.push(category?.slug);
            locationTitles.push(category?.name);
        }
    });

    return {
        locations,
        locationTitles,
        types,
        typeTitles,
    }
}


export const getTypography = (props) => {
    const options = { 
        styles: defaultStyles, 
        size: 'fontMedium',
        fontSize: defaultStyles.typography.fontMedium.large.fontSize,
        lineHeight: defaultStyles.typography.fontMedium.large.lineHeight,
        letterSpacing: defaultStyles.typography.fontMedium.large.letterSpacing,
        ...props
    }

    
    const { typography } = options.styles;

    const styles = `
        font-size: ${ typography[options.size].large.fontSize };
        line-height: ${ typography[options.size].large.lineHeight };
        letter-spacing: ${ typography[options.size].large.letterSpacing };

        @media screen and ( max-width: ${ options.styles.breakpoints.large }px ) {
            font-size: ${ typography[options.size].large.fontSize };
            line-height: ${ typography[options.size].large.lineHeight };
            letter-spacing: ${ typography[options.size].large.letterSpacing };
        }

        @media screen and ( max-width: ${ options.styles.breakpoints.medium }px ) {
            font-size: ${ typography[options.size]?.medium?.fontSize || typography[options.size].small.fontSize };
            line-height: ${ typography[options.size]?.medium?.lineHeight || typography[options.size].small.lineHeight };
            letter-spacing: ${ typography[options.size]?.medium?.letterSpacing || typography[options.size].small.letterSpacing };
        }

        @media screen and ( max-width: ${ options.styles.breakpoints.small }px ) {
            font-size: ${ typography[options.size].small.fontSize };
            line-height: ${ typography[options.size].small.lineHeight };
            letter-spacing: ${ typography[options.size].small.letterSpacing };
        }
    `

    return styles
}

export const compareArrays = (array1, array2) => {
    return {
        intersections: array1.filter(e => array2.indexOf(e) !== -1),
        intersects: array1.filter(e => array2.indexOf(e) !== -1).length > 0,
    };
}
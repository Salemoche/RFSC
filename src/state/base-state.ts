import { defaultStyles } from '../styles/default.styles';

export const baseState = {
    base: {
        contentLoaded: false,
        sizes: {
            headerHeight: 50,
            footerHeight: 50,
        },
        locationCount: 0,
        typeCount: 0,
        styles: defaultStyles,
        showDetail: false,
        currentDetail: '',
    },
    calendar: {
        scrollDistance: 0,
        currentDay: 1,
        currentItem: 1,
    },
    content: {
        days: {},
        types: {},
        locations: {},
        events: {},
    },
    sound: {
        isPlaying: false
    },

}
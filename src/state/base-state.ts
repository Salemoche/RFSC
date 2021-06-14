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
        icons: {
            iconLogo: { sourceUrl: ''},
            iconPlay: { sourceUrl: ''},
            iconPause: { sourceUrl: ''},
            iconOnAir: { sourceUrl: ''},
        },
        headerFooterClass: 'default',
        showEventDetail: false,
        currentEventDetail: '',
        showRadioDetail: false,
        currentRadioDetail: '',
        showTattooDetail: false,
        currentTattooDetail: '',
    },
    calendar: {
        scrollDist: 0, //-450,
        scrollDir: 'forward',
        currentDay: 1,
        currentItem: 1,
        filters: []
    },
    content: {
        days: {},
        types: {},
        locations: {},
        events: {},
        infos: {},
    },
    sound: {
        isPlaying: false,
        onAir: true,
    },
    filters: {
        location: [],
        type: [],
        week: [],
        day: [],
    }

}
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
        showTattooDetail: false,
        showRadioDetail: false,
        currentEventDetail: {
            id: ''
        },
        currentDetailParameters: {
            day: 1,
            week: 1,
            month: 7,
            types: [],
            locations: []
        }
        // currentRadioDetail: {
        //     id: ''
        // },
        // currentTattooDetail: {
        //     id: ''
        // },
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
        stream: '',
    },
    filters: {
        location: [],
        type: [],
        week: [],
        day: [],
    }

}
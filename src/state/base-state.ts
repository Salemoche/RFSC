import { defaultStyles } from '../styles/default.styles';

export const baseState = {
    base: {
        contentFetched: false,
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
        currentEventDetail: {
            id: ''
        },
        showTattooDetail: false,
        currentTattooDetail: {
            id: ''
        },
        showRadioDetail: false,
        currentRadioDetail: {
            id: ''
        },
        currentDetailParameters: {
            day: 1,
            week: 1,
            month: 7,
            types: [],
            locations: []
        },
        backgrounds: {
            gray: {}
        },
        device: {
            client: {
                name: '',
            }
        }
        // currentRadioDetail: {
        //     id: ''
        // },
        // currentTattooDetail: {
        //     id: ''
        // },
    },
    calendar: {
        scrollDist: -350, // 0,
        scrollDir: 'forward',
        hasScrolled: false,
        currentDay: 1,
        currentItem: 1,
        filters: [],
        events: [],
        eventPositions: [],
        calendarHeight: 0,
    },
    content: {
        days: {},
        types: {},
        locations: {},
        events: {},
        infos: {},
        tattoo: {}
    },
    sound: {
        isPlaying: false,
        onAir: false,
        stream: '',
    },
    filters: {
        location: [],
        type: [],
        week: [],
        day: [],
    }

}
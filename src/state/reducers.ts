import actions from './actions';

export const reducer = ( state, action ) => {
    
    if (
        // action.type !== actions.SET_CALENDAR &&
        action.type !== actions.SET_ACTIVE_CALENDAR 
        // && action.type !== actions.SET_CALENDAR_EVENT_POSITIONS 
    ) {
        console.log('updated', action.type, action.payload);
    }

    switch ( action.type ) {
        case actions.SET_BASE:
            return { 
                ...state, 
                base: {
                    ...state.base,
                    ...action.payload
                }
            }
        case actions.SET_ACTIVE_CALENDAR:
            return { 
                ...state, 
                base: {
                    ...state.base,
                    ...action.payload
                }
            }
        case actions.SET_SOUND:
            return { 
                ...state, 
                sound: {
                    ...state.sound,
                    ...action.payload
                }
            }
        case actions.CONTENT_LOADED:
            return { 
                ...state, 
                base: {
                    ...state.base,
                    contentFetched: action.payload
                }
            }
        case actions.SET_CONTENT:
            return { 
                ...state, 
                content: {
                    ...state.content,
                    ...action.payload
                }
            }
        case actions.SET_DAYS:
            return { 
                ...state, 
                content: {
                    ...state.content,
                    days: action.payload
                }
            }
        case actions.SET_EVENTS:
            return { 
                ...state, 
                content: {
                    ...state.content,
                    events: action.payload
                }
            }
        case actions.SET_TYPES:
            return { 
                ...state, 
                content: {
                    ...state.content,
                    types: action.payload
                }
            }
        case actions.SET_LOCATIONS:
            return { 
                ...state, 
                content: {
                    ...state.content,
                    locations: action.payload
                }
            }
        case actions.TOGGLE_PLAY:
            return { 
                ...state, 
                sound: {
                    ...state.sound,
                    isPlaying: !state.sound.isPlaying
                }
            }
        case actions.SET_SIZES:
            return { 
                ...state, 
                base: {
                    ...state.base,
                    sizes: {
                        ...state.base.sizes,
                        ...action.payload
                    }
                }
            }
        case actions.SET_CALENDAR:
            return { 
                ...state, 
                calendar: {
                    ...state.calendar,
                    ...action.payload
                }
            }
        case actions.SET_CALENDAR_EVENT_POSITIONS:
            return { 
                ...state, 
                calendar: {
                    ...state.calendar,
                    eventPositions: [
                        ...state.calendar.eventPositions,
                        ...action.payload
                    ]
                }
            }
        case actions.SET_FILTERS:
            // console.log(setFilters(state, action.payload).filters, state.filters);
            return setFilters(state, action.payload);
        case actions.RESET_FILTERS:
            return { 
                ...state, 
                filters: {
                    location: [],
                    type: [],
                    week: [],
                    day: [],
                }
            }
        default:
            return state
    }
}

const setFilters = (state, payload) => {
    const { type } = payload;
    const bufferState = state;
    let currentFilter = state.filters[type]
    // [action.payload.type]: [...state.filters[action.payload.type], action.payload.id]
    // console.log(currentFilter);

    if (currentFilter.includes(payload.id)) {
        // console.log('includes the id', payload.id)
        currentFilter = currentFilter.filter(element => {
            // console.log('filtering')
            return element !== payload.id;
        })
    } else {

        currentFilter.push(payload.id)
    }

    // console.log({
    //         ...state.filters,
    //         [type]: currentFilter
    // });

    return { 
        ...state, 
        filters: {
            ...state.filters,
            [type]: currentFilter
        }
    }
}
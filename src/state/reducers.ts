import actions from './actions';

export const reducer = ( state, action ) => {
    
    console.log('updated', action.type, action.payload);

    switch ( action.type ) {
        case actions.CONTENT_LOADED:
            return { 
                ...state, 
                base: {
                    ...state.base,
                    contentLoaded: action.payload
                }
            }
        case actions.SET_CONTENT:
            return { 
                ...state, 
                content: {
                    ...state.content,
                    events: action.payload.events,
                    types: action.payload.types,
                    locations: action.payload.locations,
                    days: action.payload.days
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
        default:
            return state
    }
}
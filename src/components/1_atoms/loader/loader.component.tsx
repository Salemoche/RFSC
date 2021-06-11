import React, { useEffect } from 'react';
import actions from '../../../state/actions';
import { useBaseState } from '../../../state/provider';
import { WP_QUERY } from '../../../utils/queries';
import { isType, isLocation } from '../../../utils/helpers';

function LoaderComponent() {

    // const baseState = useBaseState().state;
    const updateBaseState = useBaseState().dispatchBase;

    useEffect(() => {
        
        fetchEvents();

    }, [])

    // useEffect(() => {
    //     console.log(baseState);
    // }, [baseState])

    const fetchURL = 'https://backend.summer-camp.space/graphql';

    const fetchEvents = async () => {
                
        const fetchEvent = await fetch(fetchURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(WP_QUERY),
        })

        const { data } = await fetchEvent.json()
        updateBaseState({ type: actions.SET_DAYS, payload: data.pageBy.days.days})  
        updateBaseState({ type: actions.SET_EVENTS, payload: data.events.nodes})  
        updateBaseState({ type: actions.SET_TYPES, payload: data.categories.edges.filter((edge) => {
            return isType(edge.node)
        })})  
        updateBaseState({ type: actions.SET_LOCATIONS, payload: data.categories.edges.filter((edge) => {
            return isLocation(edge.node)
        })})


        updateBaseState({ type: actions.CONTENT_LOADED, payload: true});
    }
    return (
        <div>
            
        </div>
    )
}

export default LoaderComponent

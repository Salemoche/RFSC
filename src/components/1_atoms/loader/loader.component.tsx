import React, { useEffect } from 'react';
import actions from '../../../state/actions';
import { useBaseState } from '../../../state/provider';
import { WP_QUERY, WP_TEST_QUERY } from '../../../utils/queries';
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
        console.log(data)
        updateBaseState({ type: actions.SET_BASE, payload: { 
            icons: {
                logo: data.siteSettings.siteSettings.logo,
                iconOnAir: data.siteSettings.siteSettings.iconOnAir,
                iconPlay: data.siteSettings.siteSettings.iconPlay 
            }
        }})  
        updateBaseState({ type: actions.SET_CONTENT, payload: {
            days: data.pages.nodes.filter((node) => {
                return node.pageId == 21
            })[0].days.days,
            events: data.events.nodes,
            types: data.categories.edges.filter((edge) => {
                return isType(edge.node)
            }),
            locations: data.categories.edges.filter((edge) => {
                return isLocation(edge.node)
            }),
            space: data.pages.nodes.filter((node) => {
                return node.pageId == 67
            })[0].space,
            radio: data.pages.nodes.filter((node) => {
                return node.pageId == 74
            })[0].radio
            // space: data.pageBy.
        }})  
        // updateBaseState({ type: actions.SET_DAYS, payload: data.pageBy.days.days})  
        // updateBaseState({ type: actions.SET_EVENTS, payload: data.events.nodes})  
        // updateBaseState({ type: actions.SET_TYPES, payload: data.categories.edges.filter((edge) => {
        //     return isType(edge.node)
        // })})  
        // updateBaseState({ type: actions.SET_LOCATIONS, payload: data.categories.edges.filter((edge) => {
        //     return isLocation(edge.node)
        // })})
        // updateBaseState({ type: actions.SET_LOCATIONS, payload: data.categories.edges.filter((edge) => {
        //     return isLocation(edge.node)
        // })})


        updateBaseState({ type: actions.CONTENT_LOADED, payload: true});
    }
    return (
        <div>
            
        </div>
    )
}

export default LoaderComponent

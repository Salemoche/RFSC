import React, { useEffect } from 'react';
import actions from '../../../state/actions';
import { useBaseState } from '../../../state/provider';
import { WP_QUERY } from '../../../utils/queries';
import { isType, isLocation } from '../../../utils/helpers';
import DeviceDetector from "device-detector-js";

function LoaderComponent() {

    // const baseState = useBaseState().state;
    const updateBaseState = useBaseState().dispatchBase;

    useEffect(() => {
        
        fetchEvents();
        getDevice();
        
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
        console.log('=============================== data ===============================')
        console.log(data)
        console.log('=============================== data ===============================')
        updateBaseState({ type: actions.SET_BASE, payload: { 
            icons: {
                iconLogo: data.siteSettings.siteSettings.logo,
                iconOnAir: data.siteSettings.siteSettings.iconOnAir,
                iconPlay: data.siteSettings.siteSettings.iconPlay,
                iconPause: data.siteSettings.siteSettings.iconPause 
            },
            backgrounds: {
                gray: data.siteSettings.siteSettings.backgroundGray
            }
        }})  
        updateBaseState({ type: actions.SET_SOUND, payload: { 
            stream: data.siteSettings.siteSettings.stream
        }})  
        updateBaseState({ type: actions.SET_CALENDAR, payload: { 
            scrollText: data.pages.nodes.filter((node) => {
                return node.pageId === 21
            })[0].days.scrollText
        }})  
        updateBaseState({ type: actions.SET_CONTENT, payload: {
            days: data.pages.nodes.filter((node) => {
                return node.pageId === 21
            })[0].days.days,
            events: data.events.nodes,
            types: data.categories.edges.filter((edge) => {
                return isType(edge.node)
            }),
            locations: data.categories.edges.filter((edge) => {
                return isLocation(edge.node)
            }),
            space: data.pages.nodes.filter((node) => {
                return node.pageId === 67
            })[0].space,
            radio: {
                ...data.pages.nodes.filter((node) => {
                    return node.pageId === 74
                })[0].radio,
                ...data.pages.nodes.filter((node) => {
                    return node.pageId === 74
                })[0].program
            },
            infos: data.pages.nodes.filter((node) => {
                return node.pageId === 84
            })[0].infos,
            tattoo: data.pages.nodes.filter((node) => {
                return node.pageId === 104
            })[0].program
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

    const getDevice = () => {

        const deviceDetector = new DeviceDetector();
        const userAgent = window.navigator.userAgent;
        const device = deviceDetector.parse(userAgent);


        updateBaseState({ type: actions.SET_BASE, payload: { device }})  
    }

    return (
        <div>
            
        </div>
    )
}

export default LoaderComponent

import React, { useEffect } from 'react';
import actions from '../../../state/actions';
import { useBaseState } from '../../../state/provider';
import { WP_QUERY } from '../../../utils/queries';
import { isType, isLocation } from '../../../utils/helpers';
import DeviceDetector from "device-detector-js";
import { useState } from 'react';

function LoaderComponent() {

    const baseState = useBaseState().state;
    const updateBaseState = useBaseState().dispatchBase;
    const [contentLoaded, setContentLoaded] = useState(false)

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
        console.log('=============================== data ===============================')
        console.log(data)
        console.log('=============================== data ===============================')
        updateBaseState({ type: actions.SET_BASE, payload: { 
            icons: {
                iconLogo: data.siteSettings.siteSettings.logo,
                iconOnAir: data.siteSettings.siteSettings.iconOnAir,
                iconPlay: data.siteSettings.siteSettings.iconPlay,
                iconPlayFooter: data.siteSettings.siteSettings.iconPlayFooter,
                iconPause: data.siteSettings.siteSettings.iconPause 
            },
            backgrounds: {
                gray: {
                    video: data.siteSettings.siteSettings.backgroundGray,
                    placeholderMobile: data.siteSettings.siteSettings.backgroundGrayPlaceholderMobile,
                    placeholder: data.siteSettings.siteSettings.backgroundGrayPlaceholder
                }
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
            space: {
                ...data.pages.nodes.filter((node) => {
                    return node.pageId === 67
                })[0].space,
                banners: data.pages.nodes.filter((node) => {
                    return node.pageId === 67
                })[0].banners,
            },
            radio: {
                ...data.pages.nodes.filter((node) => {
                    return node.pageId === 74
                })[0].radio,
                ...data.pages.nodes.filter((node) => {
                    return node.pageId === 74
                })[0].program,
                banners: data.pages.nodes.filter((node) => {
                    return node.pageId === 74
                })[0].banners,
            },
            infos: {
                ...data.pages.nodes.filter((node) => {
                    return node.pageId === 84
                })[0].infos,
                banners: data.pages.nodes.filter((node) => {
                    return node.pageId === 84
                })[0].banners,
            },
            tattoo: data.pages.nodes.filter((node) => {
                return node.pageId === 104
            })[0].program
            // space: data.pageBy.
        }})  
        
        updateBaseState({ type: actions.CONTENT_FETCHED, payload: true});
        // if (!contentLoaded) {
        //     console.log('testing')
        //     // setContentLoaded(true);

        //     // updateBaseState({ type: actions.SET_BASE, payload: {showEventDetail: true}});
        // }
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
    }

    return (
        <div>
            
        </div>
    )
}

export default LoaderComponent

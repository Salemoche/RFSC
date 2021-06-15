import React, { useEffect, useRef, useState } from 'react'
import { CalendarListItemStyles } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';
import actions from '../../../state/actions';
import { formatTime, isLocation } from '../../../utils/helpers';
import ImageContainerComponent from '../image-container/image-container.component';

function CalendarListItemComponent({ 
    post, 
    date, 
    scrollDist, 
    containerHeight, 
    activeThreshold, 
    viewPortShift, 
    far, 
    day,
    week, 
    month, 
    locations, 
    types, 
}) {

    const elementRef = useRef<HTMLElement>();
    const [active, setActive] = useState(false);
    const [behindViewport, setBehindViewport] = useState(false);
    const [visible, setVisible] = useState(false)
    const [rendered, setRendered] = useState(false)
    const [distanceFromViewport, setDistanceFromViewport] = useState({ toBack: 0, toFront: 0})
    // const [active, setActive] = useState(false);
    const [offsetTop, setOffsetTop] = useState(0)
    const styles = useBaseState().state.base.styles;
    const updateBaseState = useBaseState().dispatchBase


    useEffect(() => {
        if (typeof elementRef.current?.offsetTop === 'number') {
            setOffsetTop(elementRef.current?.offsetTop);
        }
        setBehindViewport(false);

    }, [])

    useEffect(() => {
        if ( // is scrolled in focus arrea
            containerHeight - scrollDist + viewPortShift > offsetTop - activeThreshold / 2 
            && containerHeight - scrollDist + viewPortShift < offsetTop + activeThreshold / 2
        ) {
            setActive(true);
            setCurrentDetail();

        } else {
            setActive(false);
        }
        
        if ( // is scrolled in front of focus arrea
            containerHeight - scrollDist + viewPortShift > offsetTop - activeThreshold / 2 
        ) {
            setBehindViewport(false);
        } else {
            setBehindViewport(true);
        }
        
        if ( // is scrolled out of render distance
            containerHeight - scrollDist + viewPortShift > offsetTop + far
        ) {
            setVisible(false);

            if (containerHeight - scrollDist + viewPortShift > offsetTop + far + 100) {
                setRendered(false);
            }
            
        } else {
            setVisible(true);
            setRendered(true);
        }

        setDistanceFromViewport({
            toBack: Math.floor(containerHeight - scrollDist - offsetTop - (- viewPortShift + activeThreshold / 2)),
            toFront: 0
        })

    }, [scrollDist])

    const handleClick = (e) => {
            
        setCurrentDetail(true);
    }

    const setCurrentDetail = (show = false) => {
            
        updateBaseState({ type: actions.SET_ACTIVE_CALENDAR, payload: { 
            showEventDetail: show, 
            currentEventDetail: { 
                id: getPost().post.id,
            },
            currentDetailParameters: { 
                id: getPost().post.id,
                day,
                week,
                month,
                types: [],
                locations: []
            }
        }});
    }

    /**
    *========================================
    *	
    *	Return Post as Object and it's front/back content
    *	
    *========================================
    */
    

    const getPost = (): {post, content} => {

        let postObject = {
            type: '',
            events: [],
            id: '',
            front: {
                icon: '',
                extra: ''
            }
        }

        let content = { 
            front: <div></div>,
            back: <div></div>
        }

        switch (post.fieldGroupName) {
            case 'Page_Days_days_Posts_EventLayout':
                postObject = {
                    type: 'event',
                    events: post.events,
                    id: post.events[0]?.id,
                    front: {
                        icon: '',
                        extra: post.extra
                    }
                }
                content = {
                    front: 
                    <div className={`rfsc-list-item__side rfsc-list-item__side-front ${postObject.type}`}>
                        <div className="rfsc-list-item__header">
                            <div className="rfsc-list-item__header__date">{ date.day }.{ date.month }</div>
                            <div className="rfsc-list-item__header__category">{ date.day }.{ date.month }</div>
                            <div className="rfsc-list-item__header__week">W{week}</div></div>
                            <div className="rfsc-list-item__content">
                            {post.events.map( (event, i) => (
                                <div key={event.slug} className="rfsc-list-item__content__item">
                                    <div className="rfsc-list-item__content__item__time">
                                        <span>{formatTime(event.event_content.fromTime)?.hours}.{formatTime(event.event_content.fromTime)?.minutes}</span> – 
                                        <span> {formatTime(event.event_content.toTime)?.hours}.{formatTime(event.event_content.toTime)?.minutes}</span> H
                                    </div>
                                    <h1 className="rfsc-list-item__content__item__title">{event.title}</h1>
                                    <div className="rfsc-list-item__content__item__location">
                                        {event.categories.nodes.filter(category => {
                                            return isLocation(category)
                                        }).map(location =>(
                                            <span>{location.name}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            </div>
                    </div>,
                    back: <div className="rfsc-list-item__side rfsc-list-item__side-back"></div>
                }
                break;
            case 'Page_Days_days_Posts_TattooLayout':
                postObject = {
                    type: 'tattoo',
                    events: [],
                    id: post.id,
                    front: {
                        icon: post.icon.sourceUrl,
                        extra: post.extra
                    }
                }
                content = {
                    front: 
                        <div className={`rfsc-list-item__side rfsc-list-item__side-front ${postObject.type}`}>
                            <div className="rfsc-list-item__header">
                                <div className="rfsc-list-item__header__date">{ date.day }.{ date.month }</div>
                                <div className="rfsc-list-item__header__category">{ date.day }.{ date.month }</div>
                                <div className="rfsc-list-item__header__week">W{week}</div>
                            </div>
                            <div className="rfsc-list-item__content">
                                <ImageContainerComponent src={post.icon.sourceUrl} alt={post.icon.altText || 'icon' } className="rfsc-list-item__content__icon"/>
                                <div className="rfsc-list-item__content__extra">
                                    {post.extra}
                                </div>
                            </div>
                        </div>,
                    back: <div className="rfsc-list-item__side rfsc-list-item__side-back"></div>
                }
                break;
            case 'Page_Days_days_Posts_RadioLayout':
                postObject = {
                    type: 'radio',
                    id: post.id,
                    events: [],
                    front: {
                        icon: post.icon.sourceUrl,
                        extra: post.extra
                    }
                }
                content = {
                    front: 
                        <div className={`rfsc-list-item__side rfsc-list-item__side-front ${postObject.type}`}>
                            <div className="rfsc-list-item__header">
                                <div className="rfsc-list-item__header__date">{ date.day }.{ date.month }</div>
                                <div className="rfsc-list-item__header__category">{ date.day }.{ date.month }</div>
                                <div className="rfsc-list-item__header__week">W{week}</div>
                            </div>
                            <div className="rfsc-list-item__content">
                                <ImageContainerComponent src={post.icon.sourceUrl} alt={post.icon.altText || 'icon' } className="rfsc-list-item__content__icon"/>
                                <div className="rfsc-list-item__content__extra">
                                    {post.extra}
                                </div>
                            </div>
                        </div>,
                    back: <div className="rfsc-list-item__side rfsc-list-item__side-back"></div>
                }
                break;
            case 'Page_Days_days_Posts_SpaceLayout':
                postObject = {
                    type: 'space',
                    id: post.id,
                    events: [],
                    front: {
                        icon: post.icon.sourceUrl,
                        extra: post.extra
                    }
                }
                content = {
                    front: 
                        <div className={`rfsc-list-item__side rfsc-list-item__side-front ${postObject.type}`}>
                            <div className="rfsc-list-item__header">
                                <div className="rfsc-list-item__header__date">{ date.day }.{ date.month }</div>
                                <div className="rfsc-list-item__header__category">{ date.day }.{ date.month }</div>
                                <div className="rfsc-list-item__header__week">W{week}</div>
                            </div>
                            <div className="rfsc-list-item__content">
                                <ImageContainerComponent src={post.icon.sourceUrl} alt={post.icon.altText || 'icon' } className="rfsc-list-item__content__icon"/>
                                <div className="rfsc-list-item__content__extra">
                                    {post.extra}
                                </div>
                            </div>
                        </div>,
                    back: <div className="rfsc-list-item__side rfsc-list-item__side-back"></div>
                }
                break;
        }

        return { post: postObject, content }
    }

    return (
        <CalendarListItemStyles 
            ref={ elementRef } 
            className={` rfsc-calendar__list__item  rfsc-list-item  rfsc-list-item-${getPost().post.type} ${active ? 'active' : 'inactive'}  ${visible ? 'visible' : 'invisible'}  ${rendered ? 'rendered' : 'not-rendered'}  ${behindViewport ? 'behind-viewport' : 'in-front-of-viewport'}
            `}
            scrollDist={scrollDist}
            offsetTop={offsetTop}
            styles={styles}
            onClick={handleClick}
            data-id={getPost().post.id}
        >
            {getPost().content.front}
            {getPost().content.back}
            {/* {locations.map(location => (
                <h1 style={{zIndex: 100, width: '100%', height: '100%', border: '3px solid red'}}>{location}</h1>
            ))} */}
            {/* <h1 style={{fontSize: '100px', position: 'absolute', zIndex: 3}}>{distanceFromViewport}</h1> */}
        </CalendarListItemStyles>
    )
}

export default CalendarListItemComponent

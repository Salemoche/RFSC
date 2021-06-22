import React, { useEffect, useRef, useState } from 'react'
import { CalendarListItemStyles } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';
import actions from '../../../state/actions';
import { formatTime, isLocation, getCategories } from '../../../utils/helpers';
import ImageContainerComponent from '../image-container/image-container.component';
import { useHistory } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

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
    filters, 
}) {

    const elementRef = useRef<HTMLElement>();
    const [active, setActive] = useState(false);
    const [behindViewport, setBehindViewport] = useState(false);
    const [visible, setVisible] = useState(false)
    const [rendered, setRendered] = useState(false)
    const [distanceFromViewport, setDistanceFromViewport] = useState({ toBack: 0, toFront: 0})
    // const [active, setActive] = useState(false);
    const [offsetTop, setOffsetTop] = useState(0)
    const base = useBaseState().state.base;
    const styles = useBaseState().state.base.styles;
    const hasScrolled = useBaseState().state.calendar.hasScrolled;
    const history = useHistory();
    const updateBaseState = useBaseState().dispatchBase;
    const [isRotatedOut, setIsRotatedOut] = useState(false)
    const rotateOut = useSpring({
        rotateY: isRotatedOut ? '90deg' : '0deg',
        scale: isRotatedOut ? '1.5' : '1',
        config: {
            duration: 100
        }
    })
    const rotateIn = useSpring({
        rotateY: isRotatedOut ? '90deg' : '0deg',
        scale: isRotatedOut ? '1.5' : '1',
        delay: 100,
        config: {
            duration: 100
        }
    })


    useEffect(() => {
        setBehindViewport(false);
    }, [])

    useEffect(() => {

        if ( !base.showEventDetail && !base.showRadioDetail && !base.showTattooDetail  ) {
            setIsRotatedOut(false);
        }

        setTimeout(() => {
            // set positions

            if (typeof elementRef.current?.offsetTop === 'number') {
                setOffsetTop(elementRef.current?.offsetTop);


                const id = getPost().post.id;
                if (id) {
                    updateBaseState({type: actions.SET_CALENDAR_EVENT_POSITIONS, payload: [{ id, position: elementRef.current?.offsetTop, day, week}]})
                }
            }
        }, 300);

    }, [base.showEventDetail, base.showRadioDetail, base.showTattooDetail ])

    useEffect(() => {

        if ( // is scrolled in focus arrea
            containerHeight - scrollDist + viewPortShift > offsetTop - activeThreshold / 2 
            && containerHeight - scrollDist + viewPortShift < offsetTop + activeThreshold / 2
        ) {
            setActive(true);
            setCurrentDetail({ showEventDetail: false, showTattooDetail: false, showRadioDetail: false });

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

        // console.log('from item:', scrollDist, containerHeight)

    }, [scrollDist, containerHeight])

    const handleClick = (e, type) => {
        // console.log(e.target, type);
        let detail = 'showEventDetail';

        if (active) setIsRotatedOut(is => !is);

        if ( e.target.closest('[class*=inactive]' ) || e.target.closest('[class*=behind-viewport]' )) return

        switch (type) {
            case 'event':
                setCurrentDetail({ showEventDetail: true, showTattooDetail: false, showRadioDetail: false });
                break;
            case 'radio':
                setCurrentDetail({ showEventDetail: false, showTattooDetail: false, showRadioDetail: true });
                break;
            case 'tattoo':
                setCurrentDetail({ showEventDetail: false, showTattooDetail: true, showRadioDetail: false });
                break;
            case 'space':
                history.push('/space');
                // console.log('redirect');
                break;
            default:
                break;
        }
            
    }

    const setCurrentDetail = (showDetails = { showEventDetail: false, showTattooDetail: false, showRadioDetail: false }) => {
        
        let categories: {
            locations: string[],
            locationTitles: string[],
            types: string[],
            typeTitles: string[],
        }

        switch (post.fieldGroupName) {
            case 'Page_Days_days_Posts_EventLayout':
                categories = getCategories(post.events[0])
                break;
            case 'Page_Days_days_Posts_RadioLayout':
                categories = {
                    locations: ['radio-box'],
                    locationTitles: ['Radio-Box'],
                    types: ['radio'],
                    typeTitles: ['Radio'],
                }
                break;
            case 'Page_Days_days_Posts_TattooLayout':
                categories = {
                    locations: ['foyer'],
                    locationTitles: ['Foyer'],
                    types: ['tattoo'],
                    typeTitles: ['Tattoo'],
                }
                break;
        
            default:
                categories = {
                    locations: [],
                    locationTitles: [],
                    types: [],
                    typeTitles: [],
                }
                break;
        }

        updateBaseState({ type: actions.SET_ACTIVE_CALENDAR, payload: { 
            ...showDetails, 
            currentEventDetail: { 
                id: getPost().post.id,
            },
            currentDetailParameters: { 
                id: getPost().post.id,
                day,
                week,
                month,
                types: categories.types,
                locations: categories.locations
                // types: [],
                // locations: []
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
            },
            filteredOut: false,
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
                    },
                    filteredOut: post.events[0]?.filteredOut
                }
                content = {
                    front: 
                    <animated.div className={`rfsc-list-item__side rfsc-list-item__side-front ${postObject.type}`} style={rotateOut}>
                        <div className="rfsc-list-item__header">
                            <div className="rfsc-list-item__header__date">{ date.day }.{ date.month }.</div>
                            <div className="rfsc-list-item__header__category">{ filters.typeTitles?.length > 1 ? 'VARIOUS' : filters.typeTitles }</div>
                            <div className="rfsc-list-item__header__week">W{week}</div></div>
                            <div className="rfsc-list-item__content">
                            {post.events.map( (event, i) => (
                                <div key={event.slug} className="rfsc-list-item__content__item">
                                    <div className="rfsc-list-item__content__item__time">
                                        <span>{formatTime(event.event_content.fromTime)?.hours}.{formatTime(event.event_content.fromTime)?.minutes}</span>–
                                        <span>{formatTime(event.event_content.toTime)?.hours}.{formatTime(event.event_content.toTime)?.minutes}</span> H
                                    </div>
                                    <h1 className="rfsc-list-item__content__item__title">{event.title}</h1>
                                    <div className="rfsc-list-item__content__item__location">
                                        {event.categories.nodes.filter(category => {
                                            return isLocation(category)
                                        }).map((location, i) =>(
                                            <span key={i}>{location.name}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            </div>
                    </animated.div>,
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
                    },
                    filteredOut: post.filteredOut
                }
                content = {
                    front: 
                        <animated.div className={`rfsc-list-item__side rfsc-list-item__side-front ${postObject.type}`} style={rotateOut}>
                            <div className="rfsc-list-item__header">
                                <div className="rfsc-list-item__header__date">{ date.day }.{ date.month }.</div>
                                <div className="rfsc-list-item__header__category">Tattoo</div>
                                <div className="rfsc-list-item__header__week">W{week}</div>
                            </div>
                            <div className="rfsc-list-item__content">
                                <ImageContainerComponent src={post.icon.sourceUrl} alt={post.icon.altText || 'icon' } className="rfsc-list-item__content__icon"/>
                            </div>
                            <div className="rfsc-list-item__extra">
                                {post.extra}
                            </div>
                        </animated.div>,
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
                    },
                    filteredOut: post.filteredOut
                }
                content = {
                    front: 
                        <animated.div className={`rfsc-list-item__side rfsc-list-item__side-front ${postObject.type}`} style={rotateOut}>
                            <div className="rfsc-list-item__header">
                                <div className="rfsc-list-item__header__date">{ date.day }.{ date.month }.</div>
                                <div className="rfsc-list-item__header__category">Radio</div>
                                <div className="rfsc-list-item__header__week">W{week}</div>
                            </div>
                            <div className="rfsc-list-item__content">
                                <ImageContainerComponent src={post.icon.sourceUrl} alt={post.icon.altText || 'icon' } className="rfsc-list-item__content__icon"/>
                            </div>
                            <div className="rfsc-list-item__extra">
                                {post.extra}
                            </div>
                        </animated.div>,
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
                    },
                    filteredOut: post.filteredOut
                }
                content = {
                    front: 
                        <animated.div className={`rfsc-list-item__side rfsc-list-item__side-front ${postObject.type}`} style={rotateOut}>
                            {/* <div className="rfsc-list-item__header">
                                <div className="rfsc-list-item__header__date">{ date.day }.{ date.month }.</div>
                                <div className="rfsc-list-item__header__category">VARIOUS</div>
                                <div className="rfsc-list-item__header__week">W{week}</div>
                            </div> */}
                            <div className="rfsc-list-item__content">
                                <ImageContainerComponent src={post.icon.sourceUrl} alt={post.icon.altText || 'icon' } className="rfsc-list-item__content__icon"/>
                            </div>
                            <div className="rfsc-list-item__extra">
                                {post.extra}
                            </div>
                        </animated.div>,
                    back: <div className="rfsc-list-item__side rfsc-list-item__side-back"></div>
                }
                break;
        }

        return { post: postObject, content }
    }

    return (
        <CalendarListItemStyles 
            ref={ elementRef } 
            className={` rfsc-calendar__list__item  rfsc-list-item  rfsc-list-item-${getPost().post.type} ${active ? 'active' : 'inactive'} ${visible ? 'visible' : 'invisible'} ${rendered ? 'rendered' : 'not-rendered'} ${behindViewport ? 'behind-viewport' : 'in-front-of-viewport'} ${hasScrolled ? '' : 'initial'} ${getPost().post.filteredOut ? 'filtered-out' : 'filtered-in'}
            `}
            scrollDist={scrollDist}
            offsetTop={offsetTop}
            styles={styles}
            onClick={(e) => handleClick(e, getPost().post.type)}
            data-id={getPost().post.id}
        >
            {getPost().content.front}
            {getPost().content.back}
            {/* {filters.locations.map(location => (
                <h1 style={{zIndex: 100, width: '100%', height: '100%', border: '3px solid red'}}>{location}</h1>
            ))} */}
            {/* <h1 style={{fontSize: '100px', position: 'absolute', zIndex: 3}}>{distanceFromViewport}</h1> */}
        </CalendarListItemStyles>
    )
}

export default CalendarListItemComponent

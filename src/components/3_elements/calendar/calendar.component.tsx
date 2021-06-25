// Base
import React, { useState } from 'react';

// Components
// import CalendarTypesComponent from '../../2_molecules/calendar-types/calendar-types.component';
// import CalendarLocationsComponent from '../../2_molecules/calendar-locations/calendar-locations.component';
import CalendarListComponent from '../../2_molecules/calendar-list/calendar-list.component';
import CalendarGraphicComponent from '../../2_molecules/calendar-graphic/calendar-graphic.component';
import CalendarDetailsComponent from '../calendar-details/calendar-details.component';

// Utils
import { useBaseState } from '../../../state/provider';

// Styles
// import './calendar.styles.scss';
import { CalendarStyles } from '../../../styles/calendar.styles';
import actions from '../../../state/actions';
import { useEffect } from 'react';
import { compareArrays } from '../../../utils/helpers';
import { useSpring, animated, useTransition } from 'react-spring';

function CalendarComponent() {

    // const content = useBaseState().state.content;
    const base = useBaseState().state.base;
    const filters = useBaseState().state.filters;
    const updateBase = useBaseState().dispatchBase;
    const days = useBaseState().state.content.days;
    // const [ scrollDist, setScrollDist ] = useState(0);
    let scrollDist = useBaseState().state.calendar.scrollDist;
    const dampener = 2;
    const [hasFilters, setHasFilters] = useState(false);
    const [scrollDeltaY, setScrollDeltaY] = useState(0)
    const [scrollStartY, setScrollStartY] = useState(0)
    const [filteredDays, setFilteredDays] = useState([])
    // const [isRotatedIn, setIsRotatedIn] = useState(false)
    const rotationStyles = {
        from: {opacity: 0, rotateY: '-90deg'},
        enter: {opacity: 0.25, rotateY: '0deg', width: '300px', height: '300px', position: 'fixed', left: '50%', top: '50%', zIndex: '100000', background: 'green'},
        leave: {opacity: 0, rotateY: '90deg'},
    };

    const AnimatedCalendarDetailsComponent = animated(CalendarDetailsComponent);
    
    const rotateEventDetailIn = useTransition( base.showEventDetail, rotationStyles);
    const rotateRadioDetailIn = useTransition( base.showRadioDetail, rotationStyles);
    const rotateTattooDetailIn = useTransition( base.showTattooDetail, rotationStyles);

    const handleScroll = (e) => {
        // setScrollDist(state => state += e.deltaY * dampener );

        if (
            e.target.classList.value.includes('rfsc-calendar__detail') ||
            e.target.classList.value.includes('rfsc-event-detail') ||
            e.target.closest('[class*=rfsc-calendar__detail]')
        ) return
        
        scrollDist += Math.floor(e.deltaY * dampener);
        setScrollDist(scrollDist, e.deltaY, dampener, true);

    } 

    const handleTouch = (e, type) => {

        if (
            e.target.classList.value.includes('rfsc-calendar__detail') ||
            e.target.classList.value.includes('rfsc-event-detail') ||
            e.target.closest('[class*=rfsc-calendar__detail]')
        ) return

        if (type == 'start') {
            setScrollStartY(e.touches[0].clientY)
        } else if (type == 'move') {
            setScrollDeltaY(e.touches[0].clientY - scrollStartY);
            // console.log(scroll);
            setScrollDist(scrollDist, scrollDeltaY, - (dampener * 0.5));
            // setScrollStartY(e.touches[0].clientY)
        }

    }

    const setScrollDist = (scrollDist, deltaY, dampener, mobile = false) => {
        
        scrollDist += Math.floor(deltaY * dampener);
        let scrollDir = '';
        // console.log(scrollDist, deltaY);
        
        
        if (deltaY > 0) {
            scrollDir = mobile ? 'forward' : 'backwards';
            // updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist, scrollDir: 'forward' } });
        } else {
            scrollDir = mobile ? 'backwards' : 'forward';
            // updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist, scrollDir: 'backwards' } });
        }
        // updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist, scrollDir} });

        updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist, hasScrolled: true, scrollDir } });
    }

    // useEffect(() => {

    //     filterDays();
    // })

    useEffect(() => {

        filterDays();

        return () => {
            // updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist: 0 } });
            updateBase({ type: actions.SET_BASE, payload: { headerFooterClass: 'default', showEventDetail: false, } });
        }
    }, [])

    useEffect(() => {
        setHasFilters(filters && (filters.location.length !== 0 || filters.day.length !== 0 || filters.type.length !== 0 || filters.week.length !== 0));

        filterDays();
        // console.log(filters, hasFilters)
    }, [filters])

    const filterDays = () => {
        // const bufferFilteredDays = days.map(day => {
        //     return ({
        //         ...day,
        //         posts: 
        //             day.posts?.map(post => {                        
        //                 switch (post.fieldGroupName) {
        //                     case 'Page_Days_days_Posts_EventLayout':

        //                         const filteredEvents = 
        //                             // post.events?.filter(event => {

        //                             //     let categories: String[] = [];

        //                             //     event.categories.nodes.forEach(element => {
        //                             //         categories.push(element.slug);
        //                             //     });

        //                             //     return (
        //                             //         compareArrays(filters.location, categories).intersects ||
        //                             //         compareArrays(filters.type, categories).intersects ||
        //                             //         (filters.location.length === 0 && filters.type.length === 0)
        //                             //     );
        //                             // })

        //                             post.events?.map(event => {

        //                                 let categories: String[] = [];

        //                                 event.categories.nodes.forEach(element => {
        //                                     categories.push(element.slug);
        //                                 });

        //                                 const isFilteredIn = (
        //                                     compareArrays(filters.location, categories).intersects ||
        //                                     compareArrays(filters.type, categories).intersects ||
        //                                     (filters.location.length === 0 && filters.type.length === 0)
        //                                 )

        //                                 return {
        //                                     ...event,
        //                                     isFilteredIn,
        //                                     isFilteredOut: !isFilteredIn
        //                                 }
        //                             })
                                
        //                         return ({
        //                                 ...post,
        //                                 events: filteredEvents?.length > 0 ? filteredEvents : []
        //                             })
        //                         break;
                        
        //                     default:
        //                         return (
        //                             post
        //                         )
        //                         break;
        //                 }
        //             })
        //         }
        //     )
        // })
        // // console.log(days)
        // console.log(bufferFilteredDays)
        setFilteredDays(days);
    }

    const resetFilters = () => {
        updateBase({ type: actions.RESET_FILTERS });
    } 

    // const showDetails = () => {
    //     if ( base.showEventDetail ) {
    //         // return <CalendarDetailsComponent type={'event'}/>
    //         console.log('rotate in event')
    //         return rotateEventDetailIn((transitionStyles, item) => 
    //             item ?
    //                 <AnimatedCalendarDetailsComponent type={'event'} style={transitionStyles}/>
    //             :
    //             ''
    //         )
    //     } else if ( base.showRadioDetail ) {
    //         // return <CalendarDetailsComponent type={'radio'}/>
    //         console.log('rotate in radio')
    //         return rotateRadioDetailIn((transitionStyles, item) => 
    //             item ?
    //                 <AnimatedCalendarDetailsComponent type={'radio'} style={transitionStyles}/>
    //             :
    //             ''
    //         )
    //     } else if ( base.showTattooDetail ) {
    //         // return <CalendarDetailsComponent type={'tattoo'}/>
    //         console.log('rotate in tattoo')
    //         return rotateTattooDetailIn((transitionStyles, item) => 
    //             item ?
    //                 <React.Fragment>
    //                     <AnimatedCalendarDetailsComponent type={'tattoo'} style={transitionStyles}/>
    //                     {/* <animated.div style={transitionStyles} className='hansfickdi'></animated.div>  */}
    //                 </React.Fragment>
    //             :
    //             ''
    //         )
    //     } else {
    //         return ''
    //     }
    // }

    const closeDetails = (e) => {

        e.stopPropagation();
        const { showEventDetail, showRadioDetail, showTattooDetail } = base;


        if ( (showEventDetail || showRadioDetail || showTattooDetail) && !e.target.closest('[class*=rfsc-calendar__details]')) {
            updateBase({ type: actions.SET_BASE, payload: { showEventDetail: false, showRadioDetail: false, showTattooDetail: false } });
        }
    }

    return (
        <CalendarStyles onWheel={handleScroll} onTouchStart={(e) => {handleTouch(e, 'start')}} onTouchMove={(e) => {handleTouch(e, 'move')}} className="rfsc-calendar" styles={base.styles} onClick={closeDetails}>
            { base.contentFetched ? 
                <React.Fragment>
                    {/* { showDetails() } */}
                    {/* <CalendarLocationsComponent locations={content.locations}/> */}
                    {/* <CalendarTypesComponent types={content.types}/> */}
                    <CalendarDetailsComponent type={'event'}/>
                    <CalendarDetailsComponent type={'radio'}/>
                    <CalendarDetailsComponent type={'tattoo'}/>
                    { filteredDays.length > 0 ?
                        <CalendarListComponent days={filteredDays}/>
                    :
                        ''
                    }
                    <CalendarGraphicComponent/>
                    { hasFilters ?
                        <div className="rfsc-filter-reset" onClick={resetFilters}>
                            {/* { filters.location.map((location, i) => (
                                <span key={'location-' + i}>{location}, </span>
                            ))}
                            { filters.type.map((type, i) => (
                                <span key={'type-' + i}>{type}, </span>
                            ))} */}
                            Clear Filters
                        </div>
                    :
                        ''
                    }
                </React.Fragment>
            : 
                ''
            }
        </CalendarStyles>
    )
}

export default CalendarComponent

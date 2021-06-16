import React, { useRef, useEffect, useState } from 'react'
import CalendarListItemComponent from '../../1_atoms/calendar-list-item/calendar-list-item.component'
import { CalendarListStyles } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';
import actions from '../../../state/actions';
import { formatDate, isLocation, isType } from '../../../utils/helpers';
import ImageContainerComponent from '../../1_atoms/image-container/image-container.component';
interface CalendarListComponentProps {
    // scrollDist: Number
}

const CalendarListComponent: React.FC<CalendarListComponentProps> = () => {

    const base = useBaseState().state.base;
    const styles = useBaseState().state.base.styles;
    const days = useBaseState().state.content.days;
    const filters = useBaseState().state.filters;
    let { scrollDist, scrollDir } = useBaseState().state.calendar;
    const updateBase = useBaseState().dispatchBase;

    const [offsetHeight, setOffsetHeight] = useState(0)
    const elementRef = useRef<HTMLElement>();

    const activeThreshold = 500; // area that is in focus
    const viewPortShift = -500; // shift the viewport in the z-axis
    const far = 2000; // until where are the tiles visible in the z-axis


    useEffect(() => {
        if (typeof elementRef.current?.offsetHeight === 'number') {
            setOffsetHeight(elementRef.current?.offsetHeight);
        }

        // updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist, scrollDir: 'forward' } });


    }, [])

    useEffect(() => {
        console.log('the filters are', filters)
    }, [filters])

    useEffect(() => {
        
        // restart scroll in either direction 

        if (scrollDir === 'forward' && scrollDist > offsetHeight) {
            console.log('we are over');
            updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist: - far } });
        } else if (scrollDir === 'backwards' && scrollDist < - far ) {
            console.log('we are under');
            updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist: offsetHeight + viewPortShift } });
        }
    }, [scrollDist])

    // const getFilters = (post) => {
    // }

    const getFilters = (post) => {
        const locations: string[] = [];
        const locationTitles: string[] = [];
        const types: string[] = [];
        const typeTitles: string[] = [];

        switch (post.fieldGroupName) {
            case 'Page_Days_days_Posts_EventLayout':
                post.events.forEach(event => {
                    event.categories.edges.forEach(node => {
                        const category = node.node;
                        if ( isType(category)) {
                            types.push(category?.slug);
                            typeTitles.push(category?.name);
                        } else if ( isLocation(category)) {
                            locations.push(category?.slug);
                            locationTitles.push(category?.name);
                        }
                    });
                });
                // console.log(locations, types);
                // console.log('the filters', filters.location);
                break;
            case 'Page_Days_days_Posts_TattooLayout':
                break;
            case 'Page_Days_days_Posts_RadioLayout':
                break;
            case 'Page_Days_days_Posts_SpaceLayout':
                break;
        }

        // console.log(types, typeTitles);

        return {
            locations,
            locationTitles,
            types,
            typeTitles,
        }
    }

    return (
        <CalendarListStyles  ref={ elementRef }
            className="rfsc-calendar__list" 
            styles={styles} 
            scrollDist={scrollDist} 
        >
            <div className="rfsc-calendar__list-container">
                {days.slice(0).reverse().map((day) => (
                    <div 
                        key={`rfsc-calendar__list__day-${day.index}`}
                        id={`rfsc-calendar__list__day-${day.index}`} 
                        className="rfsc-calendar__list__day"
                        data-week={day.week}
                    >
                        {day.posts?.slice(0).reverse().map((post, i) => {
                            
                            const hasLocationFilter = filters.location.filter(value => {
                                return getFilters(post).locations.includes(value)
                            });
                            
                            const hasTypeFilter = filters.type.filter(value => {
                                return getFilters(post).types.includes(value)
                            });

                            const hasNoFilters = filters.location && filters.types ? filters.location?.length === 0 && filters.types?.length === 0 ? true : false : true;
                            if (
                                hasLocationFilter.length !== 0 || 
                                hasTypeFilter.length !== 0 || 
                                hasNoFilters
                            ) {
                                return (
                                    <CalendarListItemComponent
                                        key={i}
                                        date={formatDate(day.date)}
                                        day={day.index}
                                        week={day.week}
                                        month={7}
                                        in-project={`${day.index}-${post.i}`}
                                        post={post}
                                        scrollDist={+scrollDist}
                                        containerHeight={offsetHeight}
                                        activeThreshold={activeThreshold}
                                        viewPortShift={viewPortShift}
                                        far={far}
                                        filters={getFilters(post)}
                                    />
                                )
                            }
                        })}
                    </div>
                ))}
                <div className="rfsc-calendar__list__title">
                    <ImageContainerComponent src={base.icons.iconLogo ? base.icons.iconLogo.sourceUrl : ''} alt="rfsc-logo" hasLoader={false}/>
                </div>
            </div>
        </CalendarListStyles>
    )
}

export default CalendarListComponent

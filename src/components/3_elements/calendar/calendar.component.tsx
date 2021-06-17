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

function CalendarComponent() {

    // const content = useBaseState().state.content;
    const base = useBaseState().state.base;
    const filters = useBaseState().state.filters;
    const updateBase = useBaseState().dispatchBase;
    // const [ scrollDist, setScrollDist ] = useState(0);
    let scrollDist = useBaseState().state.calendar.scrollDist;
    const dampener = 2;
    const [hasFilters, setHasFilters] = useState(false);

    const handleScroll = (e) => {
        // setScrollDist(state => state += e.deltaY * dampener );

        if (
            e.target.classList.value.includes('rfsc-calendar__detail') ||
            e.target.classList.value.includes('rfsc-event-detail') ||
            e.target.closest('[class*=rfsc-calendar__detail]')
        ) return

        scrollDist += Math.floor(e.deltaY * dampener);
        
        // console.log(scrollDist);
        
        if (e.deltaY > 0) {
            updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist, scrollDir: 'forward' } });
        } else {
            updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist, scrollDir: 'backwards' } });
        }

        updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist, hasScrolled: true } });
    } 

    useEffect(() => {
        return () => {
            // updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist: 0 } });
            updateBase({ type: actions.SET_BASE, payload: { headerFooterClass: 'default', showEventDetail: false, } });
        }
    }, [])

    useEffect(() => {
        setHasFilters(filters && (filters.location.length !== 0 || filters.day.length !== 0 || filters.type.length !== 0 || filters.week.length !== 0));
        console.log(filters, hasFilters)
    }, [filters])

    const resetFilters = () => {
        updateBase({ type: actions.RESET_FILTERS });
    } 

    const showDetails = () => {
        if ( base.showEventDetail ) {
            return <CalendarDetailsComponent type={'event'}/>
        } else if ( base.showRadioDetail ) {
            return <CalendarDetailsComponent type={'radio'}/>
        } else if ( base.showTattooDetail ) {
            return <CalendarDetailsComponent type={'tattoo'}/>
        } else {
            return ''
        }
    }

    const closeDetails = (e) => {

        e.stopPropagation();
        const { showEventDetail, showRadioDetail, showTattooDetail } = base;

        console.log(e.target);

        if ( (showEventDetail || showRadioDetail || showTattooDetail) && !e.target.closest('[class*=rfsc-calendar__details]')) {
            updateBase({ type: actions.SET_BASE, payload: { showEventDetail: false, showRadioDetail: false, showTattooDetail: false } });
        }
    }

    return (
        <CalendarStyles onWheel={handleScroll} className="rfsc-calendar" styles={base.styles} onClick={closeDetails}>
            { base.contentFetched ? 
                <React.Fragment>
                    { showDetails() }
                    {/* <CalendarLocationsComponent locations={content.locations}/> */}
                    {/* <CalendarTypesComponent types={content.types}/> */}
                    <CalendarListComponent/>
                    <CalendarGraphicComponent/>
                    { hasFilters ?
                        <div className="rfsc-filter-reset" onClick={resetFilters}>
                            { filters.location.map(location => (
                                <span>{location}, </span>
                            ))}
                            { filters.type.map(type => (
                                <span>{type}, </span>
                            ))}
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

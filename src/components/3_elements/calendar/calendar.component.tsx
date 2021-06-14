// Base
import React, { useState } from 'react';

// Components
// import CalendarTypesComponent from '../../2_molecules/calendar-types/calendar-types.component';
// import CalendarLocationsComponent from '../../2_molecules/calendar-locations/calendar-locations.component';
import CalendarListComponent from '../../2_molecules/calendar-list/calendar-list.component';
import CalendarGraphicComponent from '../../2_molecules/calendar-graphic/calendar-graphic.component';
import CalendarDetailsComponent from '../../2_molecules/calendar-details/calendar-details.component';

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
    const dampener = 0.8;
    const [hasFilters, setHasFilters] = useState(false);

    const handleScroll = (e) => {
        // setScrollDist(state => state += e.deltaY * dampener );

        if (
            e.target.classList.value.includes('rfsc-calendar__detail') ||
            e.target.classList.value.includes('rfsc-event-detail') ||
            e.target.closest('[class*=rfsc-calendar__detail]')
        ) return

        scrollDist += Math.floor(e.deltaY * dampener);
        
        console.log(e.deltaY);
        
        if (e.deltaY > 0) {
            updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist, scrollDir: 'forward' } });
        } else {
            updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist, scrollDir: 'backwards' } });
        }
    } 

    const resetFilters = () => {
        updateBase({ type: actions.RESET_FILTERS });
    } 

    useEffect(() => {
        return () => {
            updateBase({ type: actions.SET_BASE, payload: { headerFooterClass: 'default' } });
        }
    }, [])

    useEffect(() => {
        setHasFilters(filters && (filters.location.length !== 0 || filters.day.length !== 0 || filters.type.length !== 0 || filters.week.length !== 0));
        console.log(filters, hasFilters)
    }, [filters])

    return (
        <CalendarStyles onWheel={handleScroll} className="rfsc-calendar" styles={base.styles}>
            { base.contentLoaded ? 
                <React.Fragment>
                    { base.showEventDetail ? 
                        <CalendarDetailsComponent/>
                    :
                        ''
                    }
                    {/* <CalendarLocationsComponent locations={content.locations}/> */}
                    {/* <CalendarTypesComponent types={content.types}/> */}
                    <CalendarListComponent/>
                    <CalendarGraphicComponent/>
                    { hasFilters ?
                        <div className="rfsc-filter-reset" onClick={resetFilters}>
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

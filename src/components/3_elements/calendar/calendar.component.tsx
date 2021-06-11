// Base
import React, { useState } from 'react';

// Components
import CalendarTypesComponent from '../../2_molecules/calendar-types/calendar-types.component';
import CalendarLocationsComponent from '../../2_molecules/calendar-locations/calendar-locations.component';

// Utils
import { useBaseState } from '../../../state/provider';

// Styles
// import './calendar.styles.scss';
import { CalendarStyles } from '../../../styles/calendar.styles';
import CalendarListComponent from '../../2_molecules/calendar-list/calendar-list.component';
import CalendarGraphicComponent from '../../2_molecules/calendar-graphic/calendar-graphic.component';
import actions from '../../../state/actions';

function CalendarComponent() {

    const content = useBaseState().state.content;
    const base = useBaseState().state.base;
    const updateCalendar = useBaseState().dispatchBase;
    // const [ scrollDist, setScrollDist ] = useState(0);
    let scrollDist = useBaseState().state.calendar.scrollDist;
    const dampener = 0.5;

    const handleScroll = (e) => {
        // setScrollDist(state => state += e.deltaY * dampener );

        scrollDist += e.deltaY * dampener;
        
        if (e.deltaY > 0) {
            updateCalendar({ type: actions.SET_CALENDAR, payload: { scrollDist, scrollDir: 'forward' } });
        } else {
            updateCalendar({ type: actions.SET_CALENDAR, payload: { scrollDist, scrollDir: 'backwards' } });
        }
    } 

    return (
        <CalendarStyles onWheel={handleScroll} className="rfsc-calendar">
            { base.contentLoaded ? 
                <React.Fragment>
                    {/* <CalendarDetailsComponent events={content.events}/> */}
                    {/* <CalendarLocationsComponent locations={content.locations}/> */}
                    {/* <CalendarTypesComponent types={content.types}/> */}
                    <CalendarListComponent/>
                    <CalendarGraphicComponent/>
                </React.Fragment>
            : 
                ''
            }
        </CalendarStyles>
    )
}

export default CalendarComponent

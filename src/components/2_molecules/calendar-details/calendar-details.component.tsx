import React from 'react'
import CalendarDetailComponent from '../calendar-detail/calendar-detail.component';
import { CalendarDetails } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';

function CalendarDetailsComponent({ events }) {

    const styles = useBaseState().state.base.styles;

    return (
        <CalendarDetails className="rfsc-calendar__details" styles={styles}>
            {events.map((event) => (
                <CalendarDetailComponent key={event.title} event={event}/>
            ))}
        </CalendarDetails>
    )
}

export default CalendarDetailsComponent

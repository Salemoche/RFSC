import React from 'react';
import { CalendarLocationsStyles, CalendarCircleItemStyles } from '../../../styles/calendar.styles';
// import './calendar-locations.styles.scss';
import { useBaseState } from '../../../state/provider';

function CalendarLocationsComponent({ locations }) {

    const styles = useBaseState().state.base.styles;

    return (
        <CalendarLocationsStyles className="rfsc-calendar__locations" styles={styles}>
            {locations.map((location, index) => (
                <CalendarCircleItemStyles 
                    key={location.node.id} 
                    index={index} 
                    locations={locations}
                >
                    {location.node.name}
                </CalendarCircleItemStyles>
            ))}
        </CalendarLocationsStyles>
    )
}

export default CalendarLocationsComponent

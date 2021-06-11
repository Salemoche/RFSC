import React from 'react'
// import './calendar-types.styles.scss';
import { CalendarCircleItemStyles, CalendarTypesStyles } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';

function CalendarTypesComponent({ types }) {

    const styles = useBaseState().state.base.styles;

    return (
        <CalendarTypesStyles className="rfsc-calendar__types" styles={styles}>
            {types.map((type, index) => (
                <CalendarCircleItemStyles 
                    key={type.node.id} 
                    index={index} 
                    types={types}
                >
                    <div className="rfsc-calendar__item__label">{type.node.name}</div>
                </CalendarCircleItemStyles>
            ))}
        </CalendarTypesStyles>
    )
}

export default CalendarTypesComponent

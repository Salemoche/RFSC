import React from 'react'
import { formatTime, isType, isLocation } from '../../../utils/helpers';

function CalendarDetailComponent({ event: { title, id, event_content: { date, eventText, fromTime, toTime, week }, categories: { edges: categories } } }) {

    const formatedToTime = formatTime(toTime)!;
    const formatedFromTime = formatTime(fromTime)!;
    const type = categories.filter((category) => {
        return isType(category.node) }
    )[0].node
    const location = categories.filter((category) => {
        return isLocation(category.node) }
    )[0].node

    return (
        <div className="rfsc-calendar__details__detail rfsc-event-detail" data-id={id}>
            <h1>{ title }</h1>
            <h2>{ date }</h2>
            <h2>{ eventText }</h2>
            <h2>{ `${formatedFromTime.hours}:${formatedFromTime.minutes}` } - { `${formatedToTime.hours}:${formatedToTime.minutes}` }</h2>
            <h2>W{ week }</h2>
            <h3>{ type.name }</h3>
            <h3>{ location.name }</h3>
        </div>
    )
}

export default CalendarDetailComponent

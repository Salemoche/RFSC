import React, { useEffect, useRef, useState } from 'react'
import { formatTime } from '../../../utils/helpers';
import { CalendarListItemStyles } from '../../../styles/calendar.styles';

function CalendarListItemComponent({ post, scrollDist, containerHeight }) {

    const elementRef = useRef<HTMLElement>();
    const [active, setActive] = useState(false);
    const [behindViewport, setBehindViewport] = useState(false);
    // const [active, setActive] = useState(false);
    const [offsetTop, setOffsetTop] = useState(0)

    const activeThreshold = 100;
    const viewPortShift = -300;

    useEffect(() => {
        if (typeof elementRef.current?.offsetTop == 'number') {
            setOffsetTop(elementRef.current?.offsetTop);
        }
    }, [])

    useEffect(() => {
        if ( // is scrolled in focus arrea
            containerHeight - scrollDist + viewPortShift > offsetTop - activeThreshold / 2 
            && containerHeight - scrollDist + viewPortShift < offsetTop + activeThreshold / 2
        ) {
            setActive(true);
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
    }, [scrollDist])

    return (
        <CalendarListItemStyles 
            ref={ elementRef } 
            className={`rfsc-calendar__list__item rfsc-list-item ${active ? 'active' : 'inactive'} ${behindViewport ? 'behind-viewport' : 'in-front-of-viewport'}`}
            scrollDist={scrollDist}
            offsetTop={offsetTop}
        >
            <h1>{ post.testText }</h1>
        </CalendarListItemStyles>
    )
}

export default CalendarListItemComponent

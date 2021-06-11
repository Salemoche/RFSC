import React, { useRef, useEffect, useState } from 'react'
import CalendarListItemComponent from '../../1_atoms/calendar-list-item/calendar-list-item.component'
import { CalendarListStyles } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';

interface CalendarListComponentProps {
    scrollDist: Number
}

const CalendarListComponent: React.FC<CalendarListComponentProps> = ( { scrollDist }) => {

    const styles = useBaseState().state.base.styles;
    const days = useBaseState().state.content.days;
    const [offsetHeight, setOffsetHeight] = useState(0)
    const elementRef = useRef<HTMLElement>();

    const dampener = 0.1;

    useEffect(() => {
        if (typeof elementRef.current?.offsetHeight == 'number') {
            setOffsetHeight(elementRef.current?.offsetHeight);
        }
    }, [])

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
                        {day.posts?.slice(0).reverse().map((post, i) => (
                            <CalendarListItemComponent
                                key={post.testText}
                                data-week={day.week}
                                in-project={`${day.index}-${post.i}`}
                                post={post}
                                scrollDist={+scrollDist * dampener}
                                containerHeight={offsetHeight}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </CalendarListStyles>
    )
}

export default CalendarListComponent

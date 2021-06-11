import React, { useRef, useEffect, useState } from 'react'
import CalendarListItemComponent from '../../1_atoms/calendar-list-item/calendar-list-item.component'
import { CalendarListStyles } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';
import actions from '../../../state/actions';

interface CalendarListComponentProps {
    // scrollDist: Number
}

const CalendarListComponent: React.FC<CalendarListComponentProps> = () => {

    const styles = useBaseState().state.base.styles;
    const days = useBaseState().state.content.days;
    let { scrollDist, scrollDir } = useBaseState().state.calendar;
    const updateCalendar = useBaseState().dispatchBase;

    const [offsetHeight, setOffsetHeight] = useState(0)
    const elementRef = useRef<HTMLElement>();

    const activeThreshold = 500; // area that is in focus
    const viewPortShift = -500; // shift the viewport in the z-axis
    const far = 2000; // until where are the tiles visible in the z-axis


    useEffect(() => {
        if (typeof elementRef.current?.offsetHeight == 'number') {
            setOffsetHeight(elementRef.current?.offsetHeight);
        }
    }, [])

    useEffect(() => {
        
        // restart scroll in either direction 

        if (scrollDir == 'forward' && scrollDist > offsetHeight) {
            console.log('we are over');
            updateCalendar({ type: actions.SET_CALENDAR, payload: { scrollDist: - far } });
        } else if (scrollDir == 'backwards' && scrollDist < - far ) {
            console.log('we are under');
            updateCalendar({ type: actions.SET_CALENDAR, payload: { scrollDist: offsetHeight + viewPortShift } });
        }
    }, [scrollDist])

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
                                key={i}
                                date={'4.12'}
                                week={day.week}
                                in-project={`${day.index}-${post.i}`}
                                post={post}
                                scrollDist={+scrollDist}
                                containerHeight={offsetHeight}
                                activeThreshold={activeThreshold}
                                viewPortShift={viewPortShift}
                                far={far}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </CalendarListStyles>
    )
}

export default CalendarListComponent

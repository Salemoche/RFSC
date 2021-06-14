import React, { useEffect, useRef } from 'react'
import CalendarDetailComponent from '../calendar-detail/calendar-detail.component';
import { CalendarEventDetailsStyles } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';

function CalendarDetailsComponent() {

    const elementRef = useRef<HTMLElement>();
    const styles = useBaseState().state.base.styles;    
    const content = useBaseState().state.content;
    const currentEventDetail = useBaseState().state.base.currentEventDetail

    useEffect(() => {

        if (elementRef && elementRef.current && document.querySelector(`[data-id='${currentEventDetail}']`)) {
            // Scroll to current Element on load
            let currentEventDetailElement = document.querySelector(`[data-id='${currentEventDetail}']`) as HTMLElement;
            elementRef.current.scrollTop = currentEventDetailElement?.offsetTop || 0;
            console.log(currentEventDetail, document.querySelector(`[data-id='${currentEventDetail}']`));
        }
        
        return () => {
            
        }
    }, [elementRef])

    const handleScroll = (e) => {

        console.log(e.target.scrollTop)

    }
    // const updateCalendar = useBaseState().dispatchBase;

    return (
        <CalendarEventDetailsStyles ref={elementRef} scroll={ handleScroll } className="rfsc-calendar__details" styles={styles}>
            {content.days.map((day) => (
                day.posts.map((post, i) => (
                    <CalendarDetailComponent key={i} post={post}/>
                ))
            ))}
        </CalendarEventDetailsStyles>
    )
}

export default CalendarDetailsComponent

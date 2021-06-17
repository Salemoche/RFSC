import React, { useEffect, useRef } from 'react'
import CalendarEventDetailComponent from '../../2_molecules/calendar-event-detail/calendar-event-detail.component';
import { CalendarEventDetailsStyles, CalendarEventDetailStyles } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';
import CalendarDetailComponent from '../../2_molecules/calendar-detail/calendar-detail.component';
import { formatDate } from '../../../utils/helpers';

function CalendarEventDetailsComponent({ type }) {

    const elementRef = useRef<HTMLElement>();
    const styles = useBaseState().state.base.styles;    
    const content = useBaseState().state.content;
    const currentEventDetail = useBaseState().state.base.currentEventDetail

    useEffect(() => {

        if (elementRef && elementRef.current && document.querySelector(`[data-id='${currentEventDetail.id}']`)) {
            // Scroll to current Element on load
            let currentEventDetailElement = document.querySelector(`[data-id='${currentEventDetail.id}']`) as HTMLElement;
            elementRef.current.scrollTop = currentEventDetailElement?.offsetTop || 0;
            // console.log(currentEventDetail.id, document.querySelector(`[data-id='${currentEventDetail.id}']`));
        }
        
        return () => {
            
        }
    }, [elementRef])

    const handleScroll = (e) => {

        console.log(e.target.scrollTop)

    }
    // const updateCalendar = useBaseState().dispatchBase;
    const getContent = () => {
        if ( type === 'event' ) {
            return content.days.map((day) => (
                day.posts.map((post, i) => (
                    <CalendarEventDetailComponent key={i} post={post} type={type}/>
                ))
            ))
        } else if ( type === 'radio' || type === 'tattoo' ) {

            console.log(content[type])
            return content[type].programDays.map((day) => {
                return (
                    <CalendarEventDetailStyles 
                        className={`rfsc-calendar__details__detail rfsc-${type}-detail rfsc-${type}`} 
                        data-id={ day.id } 
                        styles={ styles }
                        type={ type }
                        key={ day.id }
                    >
                        <div className={`rfsc-${type}-detail__header rfsc-detail-header`}>
                            <div className={`rfsc-${type}-detail__header__date rfsc-detail-header__item`}>
                                { formatDate(day.date)?.day }
                                .
                                { formatDate(day.date)?.month }.
                            </div>
                            <div className={`rfsc-${type}-detail__header__host rfsc-detail-header__item`}>
                                { day.host }
                            </div>
                            <div className={`rfsc-${type}-detail__header__type rfsc-detail-header__item`}>
                                { day.type || type }
                            </div>
                        </div>
    
                    {day.program.map((item, i) => {
                        return <CalendarDetailComponent key={i} post={item} type={type}/>
                    })}
                    </CalendarEventDetailStyles>
                )
            })
        }
    }

    return (
        <CalendarEventDetailsStyles 
            ref={elementRef}
            scroll={ handleScroll } 
            className={`rfsc-calendar__details ${type}`}
            styles={styles} 
            type={type}
        >
            { getContent() }
        </CalendarEventDetailsStyles>
    )
}

export default CalendarEventDetailsComponent

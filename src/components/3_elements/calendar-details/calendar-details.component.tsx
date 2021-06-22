import React, { useEffect, useRef, useState } from 'react'
import CalendarEventDetailComponent from '../../2_molecules/calendar-event-detail/calendar-event-detail.component';
import { CalendarEventDetailsStyles, CalendarDetailStyles } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';
import CalendarDetailComponent from '../../2_molecules/calendar-detail/calendar-detail.component';
import { formatDate } from '../../../utils/helpers';
import { useSpring, animated, useTransition } from 'react-spring';

function CalendarEventDetailsComponent({ type }) {

    const elementRef = useRef<HTMLElement>();
    const base = useBaseState().state.base;    
    const styles = useBaseState().state.base.styles;    
    const content = useBaseState().state.content;
    const currentDetail = useBaseState().state.base.currentDetailParameters
    const [isRotatedIn, setIsRotatedIn] = useState(false)
    const [browser, setBrowser] = useState('')
    // const rotateIn = useSpring({
    //     opacity: isRotatedIn ? 1 : 0,
    //     rotateY: isRotatedIn ? '0deg' : '90deg',
    //     x: '-50%',
    //     y: '-50%',
    //     delay: 200,
    //     // reset: true,
    //     // reverse: flip,
    //     // // config: config.molasses,
    //     // onRest: () => set(!flip),
    // })
    const animationChecker = type === 'event' ? base.showEventDetail : type === 'radio' ? base.showRadioDetail : base.showTattooDetail
    const rotateIn = useTransition( animationChecker, {
        from: {scale: '0.25', x: '-50%', y: '-50%', [browser === 'Firefox' ? 'rotateX' : 'rotateY']: '90deg', pointerEvents: 'all'},
        enter: {scale: '1', x: '-50%', y: '-50%', [browser === 'Firefox' ? 'rotateX' : 'rotateY']: '0deg', pointerEvents: 'all'},
        leave: {scale: '0.25', x: '-50%', y: '-50%', [browser === 'Firefox' ? 'rotateX' : 'rotateY']: browser === 'Firefox' ? '90deg' : '-90deg', pointerEvents: 'all'},
        delay: 100,
        config: {
            duration: 100
        }
    })



    useEffect(() => {
        // setIsRotatedIn(true);
        setBrowser(base.device.client.name);

        return () => {
            // setIsRotatedIn(false);
        }
    }, [])

    useEffect(() => {

        if (elementRef && elementRef.current ) {

            let currentDetailElement: HTMLElement = document.createElement("null");

            if (document.querySelector(`[data-id='${currentDetail.id}']`)) {
                // Scroll to current Element on load
                currentDetailElement = document.querySelector(`[data-id='${currentDetail.id}']`) as HTMLElement;
                // console.log(currentDetail.id, document.querySelector(`[data-id='${currentDetail.id}']`));
            } else if (document.querySelector(`[data-id='${currentDetail.day}']`)) {
                console.log(document.querySelector(`[data-id='${currentDetail.id}']`));
                currentDetailElement = document.querySelector(`[data-id='${currentDetail.day}']`) as HTMLElement;
            }

            elementRef.current.scrollTop = currentDetailElement?.offsetTop - 16 || 0;
        }
        
        return () => {
            
        }
    }, [elementRef])

    const handleScroll = (e) => {

        console.log('scrolling');
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

            console.log(content[type], content[type].programDays)

            return content[type]?.programDays?.map((day) => {
                return (
                    <CalendarDetailStyles 
                        className={`rfsc-calendar__details__detail rfsc-${type}-detail rfsc-${type}`} 
                        data-id={ day.dayIndex } 
                        styles={ styles }
                        type={ type }
                        key={ day.dayIndex }
                    >
                        <div data-id={'hoi'} className={`rfsc-${type}-detail__header rfsc-detail-header`}>
                            <div className={`rfsc-${type}-detail__header__date rfsc-detail-header__item`}>
                                { formatDate(day.date)?.day }
                                .
                                { formatDate(day.date)?.month }.
                            </div>
                            {day.hostLink ?
                                <a href={ day.hostLink } className={`rfsc-${type}-detail__header__host rfsc-detail-header__item`}>{ day.host }</a>
                            :
                                <div className={`rfsc-${type}-detail__header__host rfsc-detail-header__item`}>{ day.host }</div>
                            }
                            <div className={`rfsc-${type}-detail__header__type rfsc-detail-header__item`}>
                                { day.type || type }
                            </div>
                        </div>
                        {day.programText ?
                            <div className={`rfsc-${type}-detail__text`}>{ day.programText }</div>
                        :
                            ''
                        }
    
                    {day?.program?.map((item, i) => {
                        return <CalendarDetailComponent key={i} post={item} type={type}/>
                    })}
                    </CalendarDetailStyles>
                )
            })
        }
    }

    return (
        rotateIn((style, item) => 
        item && 
        <CalendarEventDetailsStyles 
            ref={elementRef}
            // scroll={ handleScroll } 
            className={`rfsc-calendar__details ${type}`}
            styles={styles} 
            type={type}
            style={style}
        >
            { getContent() }
        </CalendarEventDetailsStyles>
        )
    )
}

export default CalendarEventDetailsComponent

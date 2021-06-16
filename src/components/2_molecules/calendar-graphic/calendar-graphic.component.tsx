/**
*========================================
*	
*	RememberRemember
*	
*========================================

    1. add onClick function to all elements


*/


import React, { useState, useEffect } from 'react'
import { CalendarGraphic } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';
import actions from '../../../state/actions';
import { formatDate } from '../../../utils/helpers';

function CalendarGraphicComponent() {

    const styles = useBaseState().state.base.styles;
    const currentDetail = useBaseState().state.base.currentDetailParameters;
    const filters = useBaseState().state.filters;
    const updateBaseState = useBaseState().dispatchBase;
    const days = useBaseState().state.content.days;
    const eventPositions = useBaseState().state.calendar.eventPositions 
    const updateBase = useBaseState().dispatchBase;

    const [rotations, setRotations] = useState({
        current: 0,
        types: {
            diskurs: 24,
            tattoo: 341,
            workshop: 299,
            konzert: 246,
            seeufer: 200,
            aktion: 159,
            kunst: 115,
            club: 66
        },
        locations: {
            foyer: 0,
            'radio-box': 304,
            innenhof: 240,
            seeufer: 180,
            clubraum: 126,
            shedhalle: 55
        }}
    )

    useEffect(() => {
        populateEvents();

        return () => {
            
        }
    }, [])

    const handleClick = (e) => {
        e.stopPropagation();

        let type = '';
        let id = '';
        let eventId = '';

        if (e.target.id.includes('event')) {
            type = 'event';
            id = e.target.id;
            eventId = e.target.getAttribute('data-event-id');

            // scroll to event
            
            if (eventId) {
                updateBase({ type: actions.SET_CALENDAR, payload: { scrollDist: eventPositions[eventId], hasScrolled: true } });
            }
            return
        } else if (e.target.id.includes('week')) {
            type = 'week';
            id = e.target.id;
        } else if (e.target.id.includes('day')) {
            type = 'day';
            id = e.target.id;
        } else if (e.target.closest('#Orte')) {
            type = 'location';
            id = e.target.parentNode.id.split('location-')[1];
        } else if (e.target.closest('#Veranstaltungsart')) {
            type = 'type';
            id = e.target.parentNode.id.split('type-')[1];
        }

        updateBaseState({ type: actions.SET_FILTERS, payload: { type, id } });

    }

    const populateEvents = () => {
        let graphicEvents: object[] = [];

        days.forEach((singleDay, i) => {
            singleDay.posts.forEach((post, j) => {
                const { events } = post;
                if (events?.length > 0) {
                    const event1 = events[0];
                    const event1Text = document.createElement('text');
                    event1Text.innerHTML = event1.title;
                    const event1Id = events[0].id || '';
                    const event2 = events[1] || null;

                    const { day, month } = formatDate(event1.event_content.date);
                    const { week } = singleDay
                    
                    graphicEvents.push({
                        1: event1,
                        2: event2
                    });

                    console.log(month, week, day, event1.title)

                    const event1Node = document.querySelector(`#m${month}-w${week}-d${day}-event-1`);

                    event1Node?.append(event1Text.cloneNode(true));
                    event1Node?.setAttribute('data-event-id', event1Id);
                    // document.querySelector(`#m${month}-w${week}-d${day}-event-1`)?.setAttribute('d', '');

                    if (event2) {
                        const event2Text = document.createElement('text');
                        event2Text.innerHTML = event2.title;
                        const event2Id = events[1].id || '';

                        const event2Node = document.querySelector(`#m${month}-w${week}-d${day}-event-2`)
                        event2Node?.append(event2Text.cloneNode(true));
                        event2Node?.setAttribute('data-event-id', event2Id);
                        // document.querySelector(`#m${month}-w${week}-d${day}-event-2`)?.setAttribute('d', '');
                    }
                }
            });
        });
        console.log(graphicEvents);
        updateBaseState({ type: actions.SET_CALENDAR, payload: { events: graphicEvents }})
    }

    const toggleActive = () => {

    }

    const checkActive = () => {
        // return true
    }

    return (
        <CalendarGraphic className="rfsc-calendar__graphic" styles={styles} currentDetail={currentDetail} filters={filters}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
             viewBox="0 0 1920 1080">
            <g onClick={handleClick} id="Monate">
                <g onClick={handleClick} id="m7-juli">
                    <text transform="matrix(1 0 0 1 937.3201 71.9394)"><tspan x="0" y="0" className="st0 st1 st2">JU</tspan><tspan x="26" y="0" className="st0 st1 st2">L</tspan><tspan x="37.9" y="0" className="st0 st1 st2">I</tspan></text>
                </g>
                <g onClick={handleClick} id="m8-august">
                    <text transform="matrix(1 0 0 1 915.7678 1020.2764)"><tspan x="0" y="0" className="st0 st1 st2">A</tspan><tspan x="13.9" y="0" className="st0 st1 st2">UGU</tspan><tspan x="59.8" y="0" className="st0 st1 st2">S</tspan><tspan x="73.2" y="0" className="st0 st1 st2">T</tspan></text>
                </g>
            </g>
            <g onClick={handleClick} id="Tage">
                <path onClick={handleClick} id="m7-w1-d2-day" className="st0" d="M772.1,102.5V90h-4.8v-2.2h12.2V90h-4.8v12.5H772.1z M790.6,100.3v2.2h-10.3
                    c0.2-3.6,2-5.4,4.4-6.9c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7
                    c2.8,0,4.6,1.6,4.6,4.4c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H790.6z"/>
                <path onClick={handleClick} id="m7-w1-d3-day" className="st0" d="M707.2,133.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H707.2z M726,128.8c0,3-2.2,4.6-5.2,4.6
                    c-3.4,0-5.1-2-5.2-4.8l2.6-0.4c0,1.9,0.9,3.1,2.6,3.1c1.6,0,2.6-0.8,2.6-2.4c0-1.7-1.3-2.3-2.5-2.3h-1.4v-2.2h1.1
                    c1,0,2.2-0.5,2.2-2c0-1.3-0.7-2.1-2.1-2.1c-1.9,0-2.3,1.6-2.3,2.8l-2.7-0.4c0.1-2.8,2.1-4.5,5-4.5c2.6,0,4.7,1.4,4.7,4.1
                    c0,1.3-0.7,2.4-1.9,3C725.2,125.7,726,127.2,726,128.8z"/>
                <path onClick={handleClick} id="m7-w1-d4-day" className="st0" d="M662.6,163.7v-12.5h-4.8V149h12.2v2.2h-4.8v12.5H662.6z M680,158.5v2.1h-1.9v3h-2.4v-3h-6.4
                    v-2.4l6.4-9.3h2.5v9.6H680z M675.7,158.5v-3.5c0-0.6,0-1.7,0-2.7c-0.5,0.9-1.2,1.9-1.5,2.3l-1.3,1.9c-0.4,0.5-0.9,1.3-1.4,2
                    c0.7,0,1.5,0,1.9,0H675.7z"/>
                <path onClick={handleClick} id="m7-w1-d5-day" className="st0" d="M623.7,194.3v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H623.7z M642.4,189.5c0,2.8-1.8,5-5.3,5
                    c-2.9,0-5-1.7-5-4.7l2.5-0.4c0,1.9,1,3,2.5,3c1.8,0,2.7-1.1,2.7-3c0-1.8-1.1-2.7-2.7-2.7c-1.1,0-1.9,0.4-2.4,1.1l-2.3-0.4l1.1-8
                    h8.1v2.2h-6l-0.5,3.8c0.6-0.6,1.5-1,2.6-1C640.1,184.6,642.4,186.1,642.4,189.5z"/>
                <path onClick={handleClick} id="m7-w2-d6-day" className="st0" d="M593,224.9v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H593z M611.8,220.1c0,2.4-1.4,5-5.2,5
                    c-4.4,0-5.4-3.8-5.4-7.2c0-4.8,1.5-8,5.7-8c2.8,0,4.2,1.7,4.5,3.9l-2.5,0.4c-0.1-1.1-0.6-2.2-2.1-2.2c-2.5,0-3.1,2.6-3.1,5.3
                    c0.7-1.3,2-2,3.5-2C610,215.3,611.8,217.3,611.8,220.1z M609.3,220.1c0-1.7-0.8-2.7-2.5-2.7c-1.7,0-2.6,1.2-2.6,2.8
                    c0,1.4,0.7,2.8,2.5,2.8C608.5,223,609.3,222.1,609.3,220.1z"/>
                <path onClick={handleClick} id="m7-w2-d7-day" className="st0" d="M570.4,255.5V243h-4.8v-2.2h12.2v2.2H573v12.5H570.4z M578.7,240.7h9.7v2.2
                    c-3.2,3-5.1,7.7-5.3,12.6h-2.7c0.3-4.6,2-9.2,5.3-12.6h-7.1V240.7z"/>
                <path onClick={handleClick} id="m7-w2-d8-day" className="st0" d="M546.1,286.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H546.1z M565.2,281.8c0,3-2.3,4.5-5.3,4.5
                    c-3.3,0-5.3-1.7-5.3-4.5c0-2,0.8-3.2,2.5-3.8c-1.2-0.5-2-1.5-2-3.1c0-2.1,1.4-3.9,4.8-3.9c3.3,0,4.7,1.8,4.7,3.9
                    c0,1.5-0.8,2.5-2,3.1C564.4,278.5,565.2,279.8,565.2,281.8z M562.6,281.7c0-1.5-1-2.5-2.7-2.5c-1.6,0-2.7,0.9-2.7,2.5
                    c0,1.6,1,2.6,2.7,2.6S562.6,283.3,562.6,281.7z M557.7,275.2c0,1.2,0.7,2.1,2.2,2.1c1.4,0,2.2-0.8,2.2-2.1c0-1.3-0.7-2.1-2.2-2.1
                    C558.4,273.1,557.7,273.9,557.7,275.2z"/>
                <path onClick={handleClick} id="m7-w2-d9-day" className="st0" d="M528.3,316.7v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H528.3z M547.3,308.9c0,4.7-1.4,8-5.6,8
                    c-2.8,0-4.3-1.7-4.6-4l2.4-0.4c0.1,1.2,0.7,2.3,2.2,2.3c2,0,3-1.8,3-5.2c-0.7,1.2-1.9,2-3.4,2c-2.8,0-4.6-2.1-4.6-4.9
                    c0-2.3,1.4-5.1,5.2-5.1C546.3,301.7,547.3,305.6,547.3,308.9z M544.5,306.6c0-1.5-0.7-2.8-2.5-2.8s-2.7,1-2.7,3
                    c0,1.7,0.8,2.7,2.5,2.7C543.6,309.5,544.5,308.3,544.5,306.6z"/>
                <path onClick={handleClick} id="m7-w2-d10-day" className="st0" d="M504.6,347.3v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H504.6z M518.9,332.5v14.8h-2.5v-10.7
                    c-0.7,0.7-1.8,0.9-3,0.9c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H518.9z M521.4,339.9c0-4.5,1.8-7.6,5.6-7.6s5.6,3.2,5.6,7.6
                    c0,4.5-1.8,7.6-5.6,7.6C523.3,347.5,521.4,344.9,521.4,339.9z M528.9,344.6c0.7-0.9,0.9-2.5,0.9-4.7c0-3.6-0.5-5.5-2.8-5.5
                    c-1,0-1.7,0.4-2.1,1.1c-0.5,0.9-0.7,2.4-0.7,4.4c0,3.7,0.5,5.5,2.8,5.5C527.9,345.4,528.5,345.1,528.9,344.6z"/>
                <path onClick={handleClick} id="m7-w2-d11-day" className="st0" d="M495.7,377.8v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H495.7z M509.9,363.1v14.8h-2.5v-10.7
                    c-0.7,0.7-1.8,0.9-3,0.9c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H509.9z M518.1,363.1v14.8h-2.5v-10.7c-0.7,0.7-1.8,0.9-3,0.9
                    c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H518.1z"/>
                <path onClick={handleClick} id="m7-w2-d12-day" className="st0" d="M482.2,408.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H482.2z M496.4,393.7v14.8h-2.5v-10.7
                    c-0.7,0.7-1.8,0.9-3,0.9c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H496.4z M508.9,406.2v2.2h-10.3c0.2-3.6,2-5.4,4.4-6.9
                    c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7c2.8,0,4.6,1.6,4.6,4.4
                    c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H508.9z"/>
                <path onClick={handleClick} id="m7-w2-d13-day" className="st0" d="M474.6,439v-12.5h-4.8v-2.2H482v2.2h-4.8V439H474.6z M488.8,424.3V439h-2.5v-10.7
                    c-0.7,0.7-1.8,0.9-3,0.9c-0.2,0-0.4,0-0.6,0V427c2.4,0,3.7-0.8,4-2.7H488.8z M501.5,434.7c0,3-2.2,4.6-5.2,4.6
                    c-3.4,0-5.1-2-5.2-4.8l2.6-0.4c0,1.9,0.9,3.1,2.6,3.1c1.6,0,2.6-0.8,2.6-2.4c0-1.7-1.3-2.3-2.5-2.3H495v-2.2h1.1c1,0,2.2-0.5,2.2-2
                    c0-1.3-0.7-2.1-2.1-2.1c-1.9,0-2.3,1.6-2.3,2.8l-2.7-0.4c0.1-2.8,2.1-4.5,5-4.5c2.6,0,4.7,1.4,4.7,4.1c0,1.3-0.7,2.4-1.9,3
                    C500.7,431.6,501.5,433.1,501.5,434.7z"/>
                <path onClick={handleClick} id="m7-w3-d14-day" className="st0" d="M468.5,469.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H468.5z M482.7,454.9v14.8h-2.5v-10.7
                    c-0.7,0.7-1.8,0.9-3,0.9c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H482.7z M495.6,464.4v2.1h-1.9v3h-2.4v-3h-6.4v-2.4l6.4-9.3
                    h2.5v9.6H495.6z M491.2,464.4V461c0-0.6,0-1.7,0-2.7c-0.5,0.9-1.2,1.9-1.5,2.3l-1.3,1.9c-0.4,0.5-0.9,1.3-1.4,2c0.7,0,1.5,0,1.9,0
                    H491.2z"/>
                <path onClick={handleClick} id="m7-w3-d15-day" className="st0" d="M465,500.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H465z M479.2,485.5v14.8h-2.5v-10.7
                    c-0.7,0.7-1.8,0.9-3,0.9c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H479.2z M492,495.4c0,2.8-1.8,5-5.3,5c-2.9,0-5-1.7-5-4.7
                    l2.5-0.4c0,1.9,1,3,2.5,3c1.8,0,2.7-1.1,2.7-3c0-1.8-1.1-2.7-2.7-2.7c-1.1,0-1.9,0.4-2.4,1.1l-2.3-0.4l1.1-8h8.1v2.2h-6l-0.5,3.8
                    c0.6-0.6,1.5-1,2.6-1C489.7,490.5,492,492,492,495.4z"/>
                <path onClick={handleClick} id="m7-w3-d16-day" className="st0" d="M462.7,530.8v-12.5h-4.8V516h12.2v2.2h-4.8v12.5H462.7z M476.9,516v14.8h-2.5v-10.7
                    c-0.7,0.7-1.8,0.9-3,0.9c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H476.9z M490,526.1c0,2.4-1.4,5-5.2,5c-4.4,0-5.4-3.8-5.4-7.2
                    c0-4.8,1.5-8,5.7-8c2.8,0,4.2,1.7,4.5,3.9l-2.5,0.4c-0.1-1.1-0.6-2.2-2.1-2.2c-2.5,0-3.1,2.6-3.1,5.3c0.7-1.3,2-2,3.5-2
                    C488.2,521.2,490,523.2,490,526.1z M487.4,526c0-1.7-0.8-2.7-2.5-2.7c-1.7,0-2.6,1.2-2.6,2.8c0,1.4,0.7,2.8,2.5,2.8
                    C486.6,528.9,487.4,528,487.4,526z"/>
                <path onClick={handleClick} id="m7-w3-d17-day" className="st0" d="M464.4,561.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H464.4z M478.7,546.6v14.8h-2.5v-10.7
                    c-0.7,0.7-1.8,0.9-3,0.9c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H478.7z M480.7,546.6h9.7v2.2c-3.2,3-5.1,7.7-5.3,12.6h-2.7
                    c0.3-4.6,2-9.2,5.3-12.6h-7.1V546.6z"/>
                <path onClick={handleClick} id="m7-w3-d18-day" className="st0" d="M464.5,592v-12.5h-4.8v-2.2h12.2v2.2h-4.8V592H464.5z M478.7,577.2V592h-2.5v-10.7
                    c-0.7,0.7-1.8,0.9-3,0.9c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H478.7z M491.8,587.7c0,3-2.3,4.5-5.3,4.5
                    c-3.3,0-5.3-1.7-5.3-4.5c0-2,0.8-3.2,2.5-3.8c-1.2-0.5-2-1.5-2-3.1c0-2.1,1.4-3.9,4.8-3.9c3.3,0,4.7,1.8,4.7,3.9
                    c0,1.5-0.8,2.5-2,3.1C491.1,584.4,491.8,585.7,491.8,587.7z M489.2,587.6c0-1.5-1-2.5-2.7-2.5c-1.6,0-2.7,0.9-2.7,2.5
                    c0,1.6,1,2.6,2.7,2.6S489.2,589.2,489.2,587.6z M484.3,581.1c0,1.2,0.7,2.1,2.2,2.1c1.4,0,2.2-0.8,2.2-2.1c0-1.3-0.7-2.1-2.2-2.1
                    C485,579,484.3,579.8,484.3,581.1z"/>
                <path onClick={handleClick} id="m7-w3-d19-day" className="st0" d="M468,622.6V610h-4.8v-2.2h12.2v2.2h-4.8v12.5H468z M482.2,607.8v14.8h-2.5v-10.7
                    c-0.7,0.7-1.8,0.9-3,0.9c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H482.2z M495.3,614.8c0,4.7-1.4,8-5.6,8c-2.8,0-4.3-1.7-4.6-4
                    l2.4-0.4c0.1,1.2,0.7,2.3,2.2,2.3c2,0,3-1.8,3-5.2c-0.7,1.2-1.9,2-3.4,2c-2.8,0-4.6-2.1-4.6-4.9c0-2.3,1.4-5.1,5.2-5.1
                    C494.3,607.6,495.3,611.5,495.3,614.8z M492.5,612.5c0-1.5-0.7-2.8-2.5-2.8s-2.7,1-2.7,3c0,1.7,0.8,2.7,2.5,2.7
                    C491.5,615.4,492.5,614.2,492.5,612.5z"/>
                <path onClick={handleClick} id="m7-w3-d20-day" className="st0" d="M469.7,653.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H469.7z M488.2,651v2.2h-10.3
                    c0.2-3.6,2-5.4,4.4-6.9c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7
                    c2.8,0,4.6,1.6,4.6,4.4c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H488.2z M490.1,645.8c0-4.5,1.8-7.6,5.6-7.6s5.6,3.2,5.6,7.6
                    c0,4.5-1.8,7.6-5.6,7.6C492,653.4,490.1,650.8,490.1,645.8z M497.6,650.5c0.7-0.9,0.9-2.5,0.9-4.7c0-3.6-0.5-5.5-2.8-5.5
                    c-1,0-1.7,0.4-2.1,1.1c-0.5,0.9-0.7,2.4-0.7,4.4c0,3.7,0.5,5.5,2.8,5.5C496.5,651.3,497.2,651,497.6,650.5z"/>
                <path onClick={handleClick} id="m7-w4-d21-day" className="st0" d="M482,683.7v-12.5h-4.8V669h12.2v2.2h-4.8v12.5H482z M500.5,681.6v2.2h-10.3
                    c0.2-3.6,2-5.4,4.4-6.9c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7
                    c2.8,0,4.6,1.6,4.6,4.4c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H500.5z M508,669v14.8h-2.5V673c-0.7,0.7-1.8,0.9-3,0.9
                    c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H508z"/>
                <path onClick={handleClick} id="m7-w4-d22-day" className="st0" d="M488,714.3v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H488z M506.5,712.1v2.2h-10.3
                    c0.2-3.6,2-5.4,4.4-6.9c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7
                    c2.8,0,4.6,1.6,4.6,4.4c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H506.5z M518.3,712.1v2.2H508c0.2-3.6,2-5.4,4.4-6.9
                    c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7c2.8,0,4.6,1.6,4.6,4.4
                    c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H518.3z"/>
                <path onClick={handleClick} id="m7-w4-d23-day" className="st0" d="M500.6,744.9v-12.5h-4.8v-2.2H508v2.2h-4.8v12.5H500.6z M519.1,742.7v2.2h-10.3
                    c0.2-3.6,2-5.4,4.4-6.9c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7
                    c2.8,0,4.6,1.6,4.6,4.4c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H519.1z M531.2,740.6c0,3-2.2,4.6-5.2,4.6c-3.4,0-5.1-2-5.2-4.8
                    l2.6-0.4c0,1.9,0.9,3.1,2.6,3.1c1.6,0,2.6-0.8,2.6-2.4c0-1.7-1.3-2.3-2.5-2.3h-1.4v-2.2h1.1c1,0,2.2-0.5,2.2-2
                    c0-1.3-0.7-2.1-2.1-2.1c-1.9,0-2.3,1.6-2.3,2.8l-2.7-0.4c0.1-2.8,2.1-4.5,5-4.5c2.6,0,4.7,1.4,4.7,4.1c0,1.3-0.7,2.4-1.9,3
                    C530.3,737.5,531.2,739,531.2,740.6z"/>
                <path onClick={handleClick} id="m7-w4-d24-day" className="st0" d="M515.9,775.5V763h-4.8v-2.2h12.2v2.2h-4.8v12.5H515.9z M534.4,773.3v2.2h-10.3
                    c0.2-3.6,2-5.4,4.4-6.9c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7
                    c2.8,0,4.6,1.6,4.6,4.4c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H534.4z M546.6,770.4v2.1h-1.9v3h-2.4v-3h-6.4v-2.4l6.4-9.3h2.5
                    v9.6H546.6z M542.2,770.4v-3.5c0-0.6,0-1.7,0-2.7c-0.5,0.9-1.2,1.9-1.5,2.3l-1.3,1.9c-0.4,0.5-0.9,1.3-1.4,2c0.7,0,1.5,0,1.9,0
                    H542.2z"/>
                <path onClick={handleClick} id="m7-w4-d25-day" className="st0" d="M534.1,806.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H534.1z M552.6,803.9v2.2h-10.3
                    c0.2-3.6,2-5.4,4.4-6.9c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7
                    c2.8,0,4.6,1.6,4.6,4.4c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H552.6z M564.7,801.3c0,2.8-1.8,5-5.3,5c-2.9,0-5-1.7-5-4.7
                    l2.5-0.4c0,1.9,1,3,2.5,3c1.8,0,2.7-1.1,2.7-3c0-1.8-1.1-2.7-2.7-2.7c-1.1,0-1.9,0.4-2.4,1.1l-2.3-0.4l1.1-8h8.1v2.2h-6l-0.5,3.8
                    c0.6-0.6,1.5-1,2.6-1C562.4,796.4,564.7,797.9,564.7,801.3z"/>
                <path onClick={handleClick} id="m7-w4-d26-day" className="st0" d="M555.5,836.7v-12.5h-4.8v-2.2H563v2.2h-4.8v12.5H555.5z M574.1,834.5v2.2h-10.3
                    c0.2-3.6,2-5.4,4.4-6.9c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7
                    c2.8,0,4.6,1.6,4.6,4.4c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H574.1z M586.5,832c0,2.4-1.4,5-5.2,5c-4.4,0-5.4-3.8-5.4-7.2
                    c0-4.8,1.5-8,5.7-8c2.8,0,4.2,1.7,4.5,3.9l-2.5,0.4c-0.1-1.1-0.6-2.2-2.1-2.2c-2.5,0-3.1,2.6-3.1,5.3c0.7-1.3,2-2,3.5-2
                    C584.7,827.1,586.5,829.1,586.5,832z M583.9,831.9c0-1.7-0.8-2.7-2.5-2.7c-1.7,0-2.6,1.2-2.6,2.8c0,1.4,0.7,2.8,2.5,2.8
                    C583.1,834.8,583.9,833.9,583.9,831.9z"/>
                <path onClick={handleClick} id="m7-w4-d27-day" className="st0" d="M582.5,867.3v-12.5h-4.8v-2.2H590v2.2h-4.8v12.5H582.5z M601,865.1v2.2h-10.3
                    c0.2-3.6,2-5.4,4.4-6.9c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7
                    c2.8,0,4.6,1.6,4.6,4.4c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H601z M602.4,852.5h9.7v2.2c-3.2,3-5.1,7.7-5.3,12.6h-2.7
                    c0.3-4.6,2-9.2,5.3-12.6h-7.1V852.5z"/>
                <path onClick={handleClick} id="m7-w5-d28-day" className="st0" d="M611.9,897.9v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H611.9z M630.4,895.7v2.2h-10.3
                    c0.2-3.6,2-5.4,4.4-6.9c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7
                    c2.8,0,4.6,1.6,4.6,4.4c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H630.4z M642.9,893.6c0,3-2.3,4.5-5.3,4.5
                    c-3.3,0-5.3-1.7-5.3-4.5c0-2,0.8-3.2,2.5-3.8c-1.2-0.5-2-1.5-2-3.1c0-2.1,1.4-3.9,4.8-3.9c3.3,0,4.7,1.8,4.7,3.9
                    c0,1.5-0.8,2.5-2,3.1C642.1,890.4,642.9,891.6,642.9,893.6z M640.3,893.5c0-1.5-1-2.5-2.7-2.5c-1.6,0-2.7,0.9-2.7,2.5
                    c0,1.6,1,2.6,2.7,2.6S640.3,895.1,640.3,893.5z M635.4,887c0,1.2,0.7,2.1,2.2,2.1c1.4,0,2.2-0.8,2.2-2.1c0-1.3-0.7-2.1-2.2-2.1
                    C636.1,884.9,635.4,885.7,635.4,887z"/>
                <path onClick={handleClick} id="m7-w5-d29-day" className="st0" d="M649.1,928.5v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H649.1z M667.6,926.3v2.2h-10.3
                    c0.2-3.6,2-5.4,4.4-6.9c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7
                    c2.8,0,4.6,1.6,4.6,4.4c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H667.6z M680,920.7c0,4.7-1.4,8-5.6,8c-2.8,0-4.3-1.7-4.6-4
                    l2.4-0.4c0.1,1.2,0.7,2.3,2.2,2.3c2,0,3-1.8,3-5.2c-0.7,1.2-1.9,2-3.4,2c-2.8,0-4.6-2.1-4.6-4.9c0-2.3,1.4-5.1,5.2-5.1
                    C679,913.5,680,917.4,680,920.7z M677.2,918.4c0-1.5-0.7-2.8-2.5-2.8s-2.7,1-2.7,3c0,1.7,0.8,2.7,2.5,2.7
                    C676.2,921.3,677.2,920.1,677.2,918.4z"/>
                <path onClick={handleClick} id="m7-w5-d30-day" className="st0" d="M694.9,959.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H694.9z M713.7,954.8c0,3-2.2,4.6-5.2,4.6
                    c-3.4,0-5.1-2-5.2-4.8l2.6-0.4c0,1.9,0.9,3.1,2.6,3.1c1.6,0,2.6-0.8,2.6-2.4c0-1.7-1.3-2.3-2.5-2.3h-1.4v-2.2h1.1
                    c1,0,2.2-0.5,2.2-2c0-1.3-0.7-2.1-2.1-2.1c-1.9,0-2.3,1.6-2.3,2.8l-2.7-0.4c0.1-2.8,2.1-4.5,5-4.5c2.6,0,4.7,1.4,4.7,4.1
                    c0,1.3-0.7,2.4-1.9,3C712.8,951.7,713.7,953.1,713.7,954.8z M715.5,951.7c0-4.5,1.8-7.6,5.6-7.6c3.8,0,5.6,3.2,5.6,7.6
                    c0,4.5-1.8,7.6-5.6,7.6C717.4,959.3,715.5,956.7,715.5,951.7z M723,956.4c0.7-0.9,0.9-2.5,0.9-4.7c0-3.6-0.5-5.5-2.8-5.5
                    c-1,0-1.7,0.4-2.1,1.1c-0.5,0.9-0.7,2.4-0.7,4.4c0,3.7,0.5,5.5,2.8,5.5C721.9,957.2,722.5,956.9,723,956.4z"/>
                <path onClick={handleClick} id="m7-w5-d31-day" className="st0" d="M761.9,989.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H761.9z M780.7,985.3c0,3-2.2,4.6-5.2,4.6
                    c-3.4,0-5.1-2-5.2-4.8l2.6-0.4c0,1.9,0.9,3.1,2.6,3.1c1.6,0,2.6-0.8,2.6-2.4c0-1.7-1.3-2.3-2.5-2.3h-1.4v-2.2h1.1
                    c1,0,2.2-0.5,2.2-2c0-1.3-0.7-2.1-2.1-2.1c-1.9,0-2.3,1.6-2.3,2.8l-2.7-0.4c0.1-2.8,2.1-4.5,5-4.5c2.6,0,4.7,1.4,4.7,4.1
                    c0,1.3-0.7,2.4-1.9,3C779.9,982.3,780.7,983.7,780.7,985.3z M788.2,974.9v14.8h-2.5v-10.7c-0.7,0.7-1.8,0.9-3,0.9
                    c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H788.2z"/>
                <path onClick={handleClick} id="m8-w5-d1-day" className="st0" d="M876.6,1020.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H876.6z M890.9,1005.5v14.8h-2.5v-10.7
                    c-0.7,0.7-1.8,0.9-3,0.9c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H890.9z"/>
                <path onClick={handleClick} id="m7-w1-d1-day" className="st0" d="M876.7,71.9V59.4h-4.8v-2.2h12.2v2.2h-4.8v12.5H876.7z M890.9,57.1v14.8h-2.5V61.2
                    c-0.7,0.7-1.8,0.9-3,0.9c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H890.9z"/>
            </g>
            <g onClick={handleClick} id="Veranstaltungsart">
                <g onClick={handleClick} id="type-kunst">
                    <text transform="matrix(-0.4827 -0.8758 0.8758 -0.4827 597.3408 748.9066)" className="st0 st1 st3">K</text>
                    <text transform="matrix(-0.4613 -0.8873 0.8873 -0.4613 590.7834 737.0399)" className="st0 st1 st3">U</text>
                    <text transform="matrix(-0.4286 -0.9035 0.9035 -0.4286 583.8649 723.7285)" className="st0 st1 st2">N</text>
                    <text transform="matrix(-0.3952 -0.9186 0.9186 -0.3952 577.442 710.1028)" className="st0 st1 st2">S</text>
                    <text transform="matrix(-0.3611 -0.9325 0.9325 -0.3611 572.1638 697.7117)" className="st0 st1 st3">T</text>
                    <text transform="matrix(-0.3496 -0.9369 0.9369 -0.3496 567.8857 686.5848)" className="st0 st1 st3"> </text>
                </g>
                <g onClick={handleClick} id="type-club">
                    <text transform="matrix(0.3611 -0.9325 0.9325 0.3611 565.6389 396.5466)" className="st0 st1 st3">C</text>
                    <text transform="matrix(0.3839 -0.9234 0.9234 0.3839 571.0208 382.4073)" className="st0 st1 st3">L</text>
                    <text transform="matrix(0.4175 -0.9087 0.9087 0.4175 575.4023 371.7802)" className="st0 st1 st3">U</text>
                    <text transform="matrix(0.4505 -0.8928 0.8928 0.4505 581.6569 358.0454)" className="st0 st1 st3">B</text>
                    <text transform="matrix(0.4613 -0.8873 0.8873 0.4613 588.0236 345.4043)" className="st0 st1 st3"> </text>
                </g>
                <g onClick={handleClick} id="type-workshop">
                    <text transform="matrix(0.5746 0.8184 -0.8184 0.5746 1297.4039 287.903)" className="st0 st1 st3">W</text>
                    <text transform="matrix(0.5448 0.8386 -0.8386 0.5448 1308.6139 303.7289)" className="st0 st1 st3">O</text>
                    <text transform="matrix(0.5141 0.8577 -0.8577 0.5141 1317.3127 317.3137)" className="st0 st1 st3">R</text>
                    <text transform="matrix(0.4827 0.8758 -0.8758 0.4827 1324.6234 329.4977)" className="st0 st1 st3">K</text>
                    <text transform="matrix(0.4613 0.8873 -0.8873 0.4613 1330.9193 340.9307)" className="st0 st1 st3">S</text>
                    <text transform="matrix(0.4286 0.9035 -0.9035 0.4286 1337.2889 353.1457)" className="st0 st1 st2">H</text>
                    <text transform="matrix(0.3952 0.9186 -0.9186 0.3952 1343.7343 366.7629)" className="st0 st1 st2">O</text>
                    <text transform="matrix(0.3611 0.9325 -0.9325 0.3611 1350.0048 381.6671)" className="st0 st1 st3">P</text>
                </g>
                <g onClick={handleClick} id="type-konzert">
                    <text transform="matrix(-0.3264 0.9452 -0.9452 -0.3264 1359.3165 670.1812)" className="st0 st1 st2">K</text>
                    <text transform="matrix(-0.3611 0.9325 -0.9325 -0.3611 1355.1151 682.3215)" className="st0 st1 st3">O</text>
                    <text transform="matrix(-0.3952 0.9186 -0.9186 -0.3952 1349.3397 697.3185)" className="st0 st1 st2">N</text>
                    <text transform="matrix(-0.4286 0.9035 -0.9035 -0.4286 1343.501 711.1354)" className="st0 st1 st2">Z</text>
                    <text transform="matrix(-0.4505 0.8928 -0.8928 -0.4505 1337.8787 722.8813)" className="st0 st1 st3">E</text>
                    <text transform="matrix(-0.4827 0.8758 -0.8758 -0.4827 1332.2108 734.1509)" className="st0 st1 st3">R</text>
                    <text transform="matrix(-0.5037 0.8639 -0.8639 -0.5037 1325.516 746.2114)" className="st0 st1 st3">T</text>
                </g>
                <g onClick={handleClick} id="type-diskurs">
                    <text transform="matrix(0.8699 -0.4932 0.4932 0.8699 747.5108 176.9946)" className="st0 st1 st2">D</text>
                    <text transform="matrix(0.8816 -0.472 0.472 0.8816 760.5245 169.6661)" className="st0 st1 st3">I</text>
                    <text transform="matrix(0.8928 -0.4505 0.4505 0.8928 765.7538 166.9021)" className="st0 st1 st3">S</text>
                    <text transform="matrix(0.9087 -0.4175 0.4175 0.9087 778.0016 160.5921)" className="st0 st1 st3">K</text>
                    <text transform="matrix(0.9186 -0.3952 0.3952 0.9186 790.3942 154.9126)" className="st0 st1 st2">U</text>
                    <text transform="matrix(0.9325 -0.3611 0.3611 0.9325 804.2567 149.1124)" className="st0 st1 st3">R</text>
                    <text transform="matrix(0.9452 -0.3264 0.3264 0.9452 817.4667 144.0449)" className="st0 st1 st2">S</text>
                    <text transform="matrix(0.953 -0.3029 0.3029 0.953 830.4845 139.5489)" className="st0 st1 st2"> </text>
                    <text transform="matrix(0.8758 -0.4827 0.4827 0.8758 779.6279 213.6229)" className="st0 st1 st3"> </text>
                    <text transform="matrix(0.9325 -0.3611 0.3611 0.9325 824.1442 192.5098)" className="st0 st1 st3"> </text>
                </g>
                <g onClick={handleClick} id="type-tattoo">
                    <text transform="matrix(0.9669 0.2552 -0.2552 0.9669 1061.6333 131.1901)" className="st0 st1 st2">T</text>
                    <text transform="matrix(0.9602 0.2792 -0.2792 0.9602 1073.4358 134.2434)" className="st0 st1 st3">A</text>
                    <text transform="matrix(0.9492 0.3147 -0.3147 0.9492 1086.1896 138.0511)" className="st0 st1 st2">T</text>
                    <text transform="matrix(0.9411 0.338 -0.338 0.9411 1098.6936 142.2408)" className="st0 st1 st3">T</text>
                    <text transform="matrix(0.928 0.3725 -0.3725 0.928 1110.036 146.2949)" className="st0 st1 st3">O</text>
                    <text transform="matrix(0.9137 0.4064 -0.4064 0.9137 1124.9974 152.3007)" className="st0 st1 st2">O</text>
                    <text transform="matrix(0.928 0.3725 -0.3725 0.928 1113.2023 147.5655)" className="st0 st1 st3"> </text>
                    <text transform="matrix(0.9369 0.3496 -0.3496 0.9369 1088.7562 189.2191)" className="st0 st1 st3"> </text>
                </g>
                <g onClick={handleClick} id="type-radio">
                    <text transform="matrix(-0.9137 0.4064 -0.4064 -0.9137 1136.3662 919.8963)" className="st0 st1 st2">R</text>
                    <text transform="matrix(-0.928 0.3725 -0.3725 -0.928 1123.3597 925.6337)" className="st0 st1 st3">A</text>
                    <text transform="matrix(-0.9411 0.338 -0.338 -0.9411 1110.1444 930.9691)" className="st0 st1 st3">D</text>
                    <text transform="matrix(-0.9492 0.3147 -0.3147 -0.9492 1096.0575 936.0073)" className="st0 st1 st2">I</text>
                    <text transform="matrix(-0.9567 0.2911 -0.2911 -0.9567 1090.5172 937.9461)" className="st0 st1 st3">O</text>
                    <text transform="matrix(-0.9636 0.2672 -0.2672 -0.9636 1074.9847 942.55)" className="st0 st1 st2"> </text>
                    <text transform="matrix(-0.9411 0.338 -0.338 -0.9411 1090.1193 887.5311)" className="st0 st1 st3"> </text>
                </g>
                <g onClick={handleClick} id="type-aktion">
                    <text transform="matrix(-0.9567 -0.2911 0.2911 -0.9567 843.6963 941.837)" className="st0 st1 st3">A</text>
                    <text transform="matrix(-0.9452 -0.3264 0.3264 -0.9452 830.0615 937.6023)" className="st0 st1 st2">K</text>
                    <text transform="matrix(-0.9325 -0.3611 0.3611 -0.9325 816.8883 933.0393)" className="st0 st1 st3">T</text>
                    <text transform="matrix(-0.928 -0.3725 0.3725 -0.928 805.0563 928.493)" className="st0 st1 st3">I</text>
                    <text transform="matrix(-0.9137 -0.4064 0.4064 -0.9137 799.5458 926.4206)" className="st0 st1 st2">O</text>
                    <text transform="matrix(-0.8982 -0.4396 0.4396 -0.8982 784.7975 919.9463)" className="st0 st1 st3">N</text>
                    <text transform="matrix(-0.8873 -0.4613 0.4613 -0.8873 771.3005 913.3248)" className="st0 st1 st3"> </text>
                    <text transform="matrix(-0.9636 -0.2672 0.2672 -0.9636 863.4128 897.7783)" className="st0 st1 st2"> </text>
                </g>
            </g>
            <g onClick={handleClick} id="Orte">
                <g onClick={handleClick} id="location-foyer">
                    <text transform="matrix(0.9995 -3.165000e-02 3.165000e-02 0.9995 945.7775 119.2661)" className="st0 st1 st2"> </text>
                    <text transform="matrix(0.9966 -8.216000e-02 8.216000e-02 0.9966 925.6234 168.2829)" className="st0 st1 st3">F</text>
                    <text transform="matrix(0.999 -4.430000e-02 4.430000e-02 0.999 937.5477 167.3021)" className="st0 st1 st2">O</text>
                    <text transform="matrix(1 -6.330000e-03 6.330000e-03 1 952.6768 166.6907)" className="st0 st1 st3">Y</text>
                    <text transform="matrix(0.9995 3.165000e-02 -3.165000e-02 0.9995 966.1054 166.6164)" className="st0 st1 st2">E</text>
                    <text transform="matrix(0.9976 6.956000e-02 -6.956000e-02 0.9976 978.744 166.9735)" className="st0 st1 st3">R</text>
                    <text transform="matrix(0.9955 9.475000e-02 -9.475000e-02 0.9955 992.8198 167.9977)" className="st0 st1 st2"> </text>
                </g>
                <g onClick={handleClick} id="location-radio-box">
                    <text transform="matrix(0.6592 0.7519 -0.7519 0.6592 1234.4801 286.6221)" className="st0 st1 st3">R</text>
                    <text transform="matrix(0.6319 0.7751 -0.7751 0.6319 1243.8757 297.2862)" className="st0 st1 st2">A</text>
                    <text transform="matrix(0.6037 0.7972 -0.7972 0.6037 1252.856 308.2992)" className="st0 st1 st2">D</text>
                    <text transform="matrix(0.5844 0.8115 -0.8115 0.5844 1261.8561 320.2683)" className="st0 st1 st3">I</text>
                    <text transform="matrix(0.5548 0.832 -0.832 0.5548 1265.4598 325.0036)" className="st0 st1 st3">O</text>
                    
                        <rect x="1281.7" y="335.1" transform="matrix(0.8516 -0.5243 0.5243 0.8516 13.0726 722.755)" className="st0" width="2.2" height="6.4"/>
                    <text transform="matrix(0.5037 0.8639 -0.8639 0.5037 1279.0309 345.852)" className="st0 st1 st3">B</text>
                    <text transform="matrix(0.472 0.8816 -0.8816 0.472 1286.1112 358.0882)" className="st0 st1 st3">O</text>
                    <text transform="matrix(0.4286 0.9035 -0.9035 0.4286 1293.3617 371.7191)" className="st0 st1 st2">X</text>
                    <text transform="matrix(0.4286 0.9035 -0.9035 0.4286 1296.495 378.3246)" className="st0 st1 st2"> </text>
                </g>
                <g onClick={handleClick} id="location-innenhof">
                    <text transform="matrix(-0.5346 0.8451 -0.8451 -0.5346 1318.0498 758.7684)" className="st0 st1 st2"> </text>
                    <text transform="matrix(-0.3496 0.9369 -0.9369 -0.3496 1310.4579 665.8162)" className="st0 st1 st3"> </text>
                    <text transform="matrix(-0.3952 0.9186 -0.9186 -0.3952 1303.3358 683.6778)" className="st0 st1 st2">I</text>
                    <text transform="matrix(-0.4286 0.9035 -0.9035 -0.4286 1301.1709 689.1927)" className="st0 st1 st2">N</text>
                    <text transform="matrix(-0.4613 0.8873 -0.8873 -0.4613 1294.7687 702.8056)" className="st0 st1 st3">N</text>
                    <text transform="matrix(-0.4932 0.8699 -0.8699 -0.4932 1287.8208 716.0071)" className="st0 st1 st2">E</text>
                    <text transform="matrix(-0.5244 0.8515 -0.8515 -0.5244 1281.7067 727.0423)" className="st0 st1 st3">N</text>
                    <text transform="matrix(-0.5548 0.832 -0.832 -0.5548 1273.757 739.7166)" className="st0 st1 st3">H</text>
                    <text transform="matrix(-0.5941 0.8044 -0.8044 -0.5941 1265.5363 752.2369)" className="st0 st1 st3">O</text>
                    <text transform="matrix(-0.6226 0.7825 -0.7825 -0.6226 1255.9095 765.2003)" className="st0 st1 st2">F</text>
                    <text transform="matrix(-0.6411 0.7675 -0.7675 -0.6411 1248.6063 774.3564)" className="st0 st1 st2"> </text>
                </g>
                <g onClick={handleClick} id="location-seeufer">
                    <text transform="matrix(-0.9955 9.475000e-02 -9.475000e-02 -0.9955 1004.3986 908.2522)" className="st0 st1 st2">S</text>
                    <text transform="matrix(-0.9984 5.694000e-02 -5.694000e-02 -0.9984 990.6823 909.5525)" className="st0 st1 st2">E</text>
                    <text transform="matrix(-0.9995 3.165000e-02 -3.165000e-02 -0.9995 978.0958 910.301)" className="st0 st1 st2">E</text>
                    <text transform="matrix(-1 -6.330000e-03 6.330000e-03 -1 965.4657 910.7292)" className="st0 st1 st3">U</text>
                    <text transform="matrix(-0.999 -4.430000e-02 4.430000e-02 -0.999 950.4659 910.5825)" className="st0 st1 st2">F</text>
                    <text transform="matrix(-0.9976 -6.956000e-02 6.956000e-02 -0.9976 938.2813 910.031)" className="st0 st1 st3">E</text>
                    <text transform="matrix(-0.9942 -0.1073 0.1073 -0.9942 925.6797 909.0718)" className="st0 st1 st2">R</text>
                    <text transform="matrix(-0.9912 -0.1323 0.1323 -0.9912 911.7136 907.4722)" className="st0 st1 st3"> </text>
                </g>
                <g onClick={handleClick} id="location-clubraum">
                    <text transform="matrix(-0.6857 -0.7279 0.7279 -0.6857 695.4128 799.5328)" className="st0 st1 st3">C</text>
                    <text transform="matrix(-0.6592 -0.7519 0.7519 -0.6592 684.9733 788.5114)" className="st0 st1 st3">L</text>
                    <text transform="matrix(-0.6319 -0.7751 0.7751 -0.6319 677.3642 779.8718)" className="st0 st1 st2">U</text>
                    <text transform="matrix(-0.6037 -0.7972 0.7972 -0.6037 667.9189 768.2343)" className="st0 st1 st2">B</text>
                    <text transform="matrix(-0.5746 -0.8184 0.8184 -0.5746 659.3604 756.9173)" className="st0 st1 st3">R</text>
                    <text transform="matrix(-0.5448 -0.8386 0.8386 -0.5448 651.2289 745.3616)" className="st0 st1 st3">A</text>
                    <text transform="matrix(-0.5037 -0.8639 0.8639 -0.5037 643.6342 733.6855)" className="st0 st1 st3">U</text>
                    <text transform="matrix(-0.472 -0.8816 0.8816 -0.472 636.0715 720.7534)" className="st0 st1 st3">M</text>
                    <text transform="matrix(-0.4396 -0.8982 0.8982 -0.4396 627.3721 704.1235)" className="st0 st1 st3"> </text>
                </g>
                <g onClick={handleClick} id="location-shedhalle">
                    <text transform="matrix(0.6944 -0.7196 0.7196 0.6944 655.9835 250.0806)" className="st0 st1 st3"> </text>
                    <text transform="matrix(0.7196 -0.6944 0.6944 0.7196 700.9591 272.3078)" className="st0 st1 st3"> </text>
                    <text transform="matrix(0.4613 -0.8873 0.8873 0.4613 628.1245 371.5654)" className="st0 st1 st3">S</text>
                    <text transform="matrix(0.5037 -0.8639 0.8639 0.5037 634.4747 359.4328)" className="st0 st1 st3">H</text>
                    <text transform="matrix(0.5346 -0.8451 0.8451 0.5346 642.0193 346.4671)" className="st0 st1 st2">E</text>
                    <text transform="matrix(0.5648 -0.8252 0.8252 0.5648 648.7116 335.6691)" className="st0 st1 st3">D</text>
                    <text transform="matrix(0.5941 -0.8044 0.8044 0.5941 657.0871 323.3704)" className="st0 st1 st3">H</text>
                    <text transform="matrix(0.6226 -0.7825 0.7825 0.6226 666.0508 311.36)" className="st0 st1 st2">A</text>
                    <text transform="matrix(0.6502 -0.7598 0.7598 0.6502 675.0554 300.2638)" className="st0 st1 st3">L</text>
                    <text transform="matrix(0.677 -0.736 0.736 0.677 682.7624 291.2527)" className="st0 st1 st3">L</text>
                    <text transform="matrix(0.7029 -0.7113 0.7113 0.7029 690.8337 282.4664)" className="st0 st1 st3">E</text>
                </g>
            </g>
            <g onClick={handleClick} id="Wochen">
                <path onClick={handleClick} id="m7-w2-d7-week" className="st0" d="M1333.1,255.5l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1333.1z M1359.5,253.3v2.2h-10.3c0.2-3.6,2-5.4,4.4-6.9
                    c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7c2.8,0,4.6,1.6,4.6,4.4
                    c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H1359.5z"/>
                <path onClick={handleClick} id="m7-w2-d8-week" className="st0" d="M1354.9,286.1l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1354.9z M1381.4,283.9v2.2h-10.3c0.2-3.6,2-5.4,4.4-6.9
                    c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7c2.8,0,4.6,1.6,4.6,4.4
                    c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H1381.4z"/>
                <path onClick={handleClick} id="m7-w2-d9-week" className="st0" d="M1373.6,316.7l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1373.6z M1400.1,314.5v2.2h-10.3c0.2-3.6,2-5.4,4.4-6.9
                    c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7c2.8,0,4.6,1.6,4.6,4.4
                    c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H1400.1z"/>
                <path onClick={handleClick} id="m7-w2-d10-week" className="st0" d="M1388.5,347.3l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1388.5z M1415,345.1v2.2h-10.3c0.2-3.6,2-5.4,4.4-6.9
                    c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7c2.8,0,4.6,1.6,4.6,4.4
                    c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H1415z"/>
                <path onClick={handleClick} id="m7-w2-d11-week" className="st0" d="M1400.8,377.8l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1400.8z M1427.3,375.6v2.2H1417c0.2-3.6,2-5.4,4.4-6.9
                    c1.6-1,3.2-1.9,3.2-3.7c0-1.4-0.7-2.3-2.1-2.3c-2.1,0-2.4,1.7-2.3,3l-2.7-0.4c0-2.3,1.3-4.7,5.1-4.7c2.8,0,4.6,1.6,4.6,4.4
                    c0,2.6-1.6,3.8-3.8,5.2c-1.6,1-3,1.8-3.3,3.2H1427.3z"/>
                <path onClick={handleClick} id="m7-w3-d14-week" className="st0" d="M1424.3,469.6l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1424.3z M1451.1,465.3c0,3-2.2,4.6-5.2,4.6c-3.4,0-5.1-2-5.2-4.8
                    l2.6-0.4c0,1.9,0.9,3.1,2.6,3.1c1.6,0,2.6-0.8,2.6-2.4c0-1.7-1.3-2.3-2.5-2.3h-1.4v-2.2h1.1c1,0,2.2-0.5,2.2-2
                    c0-1.3-0.7-2.1-2.1-2.1c-1.9,0-2.3,1.6-2.3,2.8l-2.7-0.4c0.1-2.8,2.1-4.5,5-4.5c2.6,0,4.7,1.4,4.7,4.1c0,1.3-0.7,2.4-1.9,3
                    C1450.2,462.2,1451.1,463.7,1451.1,465.3z"/>
                <path onClick={handleClick} id="m7-w3-d15-week" className="st0" d="M1427.9,500.2l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1427.9z M1454.6,495.9c0,3-2.2,4.6-5.2,4.6c-3.4,0-5.1-2-5.2-4.8
                    l2.6-0.4c0,1.9,0.9,3.1,2.6,3.1c1.6,0,2.6-0.8,2.6-2.4c0-1.7-1.3-2.3-2.5-2.3h-1.4v-2.2h1.1c1,0,2.2-0.5,2.2-2
                    c0-1.3-0.7-2.1-2.1-2.1c-1.9,0-2.3,1.6-2.3,2.8l-2.7-0.4c0.1-2.8,2.1-4.5,5-4.5c2.6,0,4.7,1.4,4.7,4.1c0,1.3-0.7,2.4-1.9,3
                    C1453.8,492.8,1454.6,494.3,1454.6,495.9z"/>
                <path onClick={handleClick} id="m7-w3-d16-week" className="st0" d="M1428.4,530.8l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1428.4z M1455.1,526.5c0,3-2.2,4.6-5.2,4.6c-3.4,0-5.1-2-5.2-4.8
                    l2.6-0.4c0,1.9,0.9,3.1,2.6,3.1c1.6,0,2.6-0.8,2.6-2.4c0-1.7-1.3-2.3-2.5-2.3h-1.4V522h1.1c1,0,2.2-0.5,2.2-2
                    c0-1.3-0.7-2.1-2.1-2.1c-1.9,0-2.3,1.6-2.3,2.8l-2.7-0.4c0.1-2.8,2.1-4.5,5-4.5c2.6,0,4.7,1.4,4.7,4.1c0,1.3-0.7,2.4-1.9,3
                    C1454.3,523.4,1455.1,524.9,1455.1,526.5z"/>
                <path onClick={handleClick} id="m7-w3-d17-week" className="st0" d="M1429.5,561.4l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1429.5z M1456.2,557.1c0,3-2.2,4.6-5.2,4.6c-3.4,0-5.1-2-5.2-4.8
                    l2.6-0.4c0,1.9,0.9,3.1,2.6,3.1c1.6,0,2.6-0.8,2.6-2.4c0-1.7-1.3-2.3-2.5-2.3h-1.4v-2.2h1.1c1,0,2.2-0.5,2.2-2
                    c0-1.3-0.7-2.1-2.1-2.1c-1.9,0-2.3,1.6-2.3,2.8l-2.7-0.4c0.1-2.8,2.1-4.5,5-4.5c2.6,0,4.7,1.4,4.7,4.1c0,1.3-0.7,2.4-1.9,3
                    C1455.4,554,1456.2,555.5,1456.2,557.1z"/>
                <path onClick={handleClick} id="m7-w3-d18-week" className="st0" d="M1427.8,592l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1427.8z M1454.6,587.7c0,3-2.2,4.6-5.2,4.6c-3.4,0-5.1-2-5.2-4.8
                    l2.6-0.4c0,1.9,0.9,3.1,2.6,3.1c1.6,0,2.6-0.8,2.6-2.4c0-1.7-1.3-2.3-2.5-2.3h-1.4v-2.2h1.1c1,0,2.2-0.5,2.2-2
                    c0-1.3-0.7-2.1-2.1-2.1c-1.9,0-2.3,1.6-2.3,2.8l-2.7-0.4c0.1-2.8,2.1-4.5,5-4.5c2.6,0,4.7,1.4,4.7,4.1c0,1.3-0.7,2.4-1.9,3
                    C1453.8,584.6,1454.6,586.1,1454.6,587.7z"/>
                <path onClick={handleClick} id="m7-w4-d21-week" className="st0" d="M1410.7,683.7l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1410.7z M1436.8,678.6v2.1h-1.9v3h-2.4v-3h-6.4v-2.4l6.4-9.3h2.5
                    v9.6H1436.8z M1432.5,678.6v-3.5c0-0.6,0-1.7,0-2.7c-0.5,0.9-1.2,1.9-1.5,2.3l-1.3,1.9c-0.4,0.5-0.9,1.3-1.4,2c0.7,0,1.5,0,1.9,0
                    H1432.5z"/>
                <path onClick={handleClick} id="m7-w4-d22-week" className="st0" d="M1401.3,714.3l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1401.3z M1427.4,709.2v2.1h-1.9v3h-2.4v-3h-6.4v-2.4l6.4-9.3h2.5
                    v9.6H1427.4z M1423,709.2v-3.5c0-0.6,0-1.7,0-2.7c-0.5,0.9-1.2,1.9-1.5,2.3l-1.3,1.9c-0.4,0.5-0.9,1.3-1.4,2c0.7,0,1.5,0,1.9,0
                    H1423z"/>
                <path onClick={handleClick} id="m7-w4-d23-week" className="st0" d="M1388.4,744.9l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1388.4z M1414.5,739.8v2.1h-1.9v3h-2.4v-3h-6.4v-2.4l6.4-9.3h2.5
                    v9.6H1414.5z M1410.2,739.8v-3.5c0-0.6,0-1.7,0-2.7c-0.5,0.9-1.2,1.9-1.5,2.3l-1.3,1.9c-0.4,0.5-0.9,1.3-1.4,2c0.7,0,1.5,0,1.9,0
                    H1410.2z"/>
                <path onClick={handleClick} id="m7-w4-d24-week" className="st0" d="M1373.3,775.5l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1373.3z M1399.3,770.4v2.1h-1.9v3h-2.4v-3h-6.4v-2.4l6.4-9.3h2.5
                    v9.6H1399.3z M1395,770.4v-3.5c0-0.6,0-1.7,0-2.7c-0.5,0.9-1.2,1.9-1.5,2.3l-1.3,1.9c-0.4,0.5-0.9,1.3-1.4,2c0.7,0,1.5,0,1.9,0
                    H1395z"/>
                <path onClick={handleClick} id="m7-w4-d25-week" className="st0" d="M1354.2,806.1l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1354.2z M1380.3,800.9v2.1h-1.9v3h-2.4v-3h-6.4v-2.4l6.4-9.3h2.5
                    v9.6H1380.3z M1376,800.9v-3.5c0-0.6,0-1.7,0-2.7c-0.5,0.9-1.2,1.9-1.5,2.3l-1.3,1.9c-0.4,0.5-0.9,1.3-1.4,2c0.7,0,1.5,0,1.9,0
                    H1376z"/>
                <path onClick={handleClick} id="m7-w5-d28-week" className="st0" d="M1277.4,897.9l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1277.4z M1304,893.1c0,2.8-1.8,5-5.3,5c-2.9,0-5-1.7-5-4.7l2.5-0.4
                    c0,1.9,1,3,2.5,3c1.8,0,2.7-1.1,2.7-3c0-1.8-1.1-2.7-2.7-2.7c-1.1,0-1.9,0.4-2.4,1.1l-2.3-0.4l1.1-8h8.1v2.2h-6l-0.5,3.8
                    c0.6-0.6,1.5-1,2.6-1C1301.7,888.2,1304,889.6,1304,893.1z"/>
                <path onClick={handleClick} id="m7-w5-d29-week" className="st0" d="M1239.9,928.5l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1239.9z M1266.5,923.7c0,2.8-1.8,5-5.3,5c-2.9,0-5-1.7-5-4.7
                    l2.5-0.4c0,1.9,1,3,2.5,3c1.8,0,2.7-1.1,2.7-3c0-1.8-1.1-2.7-2.7-2.7c-1.1,0-1.9,0.4-2.4,1.1l-2.3-0.4l1.1-8h8.1v2.2h-6l-0.5,3.8
                    c0.6-0.6,1.5-1,2.6-1C1264.2,918.7,1266.5,920.2,1266.5,923.7z"/>
                <path onClick={handleClick} id="m7-w5-d30-week" className="st0" d="M1192.8,959.1l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1192.8z M1219.4,954.3c0,2.8-1.8,5-5.3,5c-2.9,0-5-1.7-5-4.7
                    l2.5-0.4c0,1.9,1,3,2.5,3c1.8,0,2.7-1.1,2.7-3c0-1.8-1.1-2.7-2.7-2.7c-1.1,0-1.9,0.4-2.4,1.1l-2.3-0.4l1.1-8h8.1v2.2h-6l-0.5,3.8
                    c0.6-0.6,1.5-1,2.6-1C1217.1,949.3,1219.4,950.8,1219.4,954.3z"/>
                <path onClick={handleClick} id="m7-w5-d31-week" className="st0" d="M1125.9,989.6l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1125.9z M1152.5,984.9c0,2.8-1.8,5-5.3,5c-2.9,0-5-1.7-5-4.7
                    l2.5-0.4c0,1.9,1,3,2.5,3c1.8,0,2.7-1.1,2.7-3c0-1.8-1.1-2.7-2.7-2.7c-1.1,0-1.9,0.4-2.4,1.1l-2.3-0.4l1.1-8h8.1v2.2h-6l-0.5,3.8
                    c0.6-0.6,1.5-1,2.6-1C1150.2,979.9,1152.5,981.4,1152.5,984.9z"/>
                <path onClick={handleClick} id="m7-w1-d1-week" className="st0" d="M1026.8,72l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1026.8z M1049,57.3V72h-2.5V61.3c-0.7,0.7-1.8,0.9-3,0.9
                    c-0.2,0-0.4,0-0.6,0V60c2.4,0,3.7-0.8,4-2.7H1049z"/>
                <path onClick={handleClick} id="m7-w1-d2-week" className="st0" d="M1129.1,102.4l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1129.1z M1151.3,87.7v14.8h-2.5V91.7c-0.7,0.7-1.8,0.9-3,0.9
                    c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H1151.3z"/>
                <path onClick={handleClick} id="m7-w1-d3-week" className="st0" d="M1194.4,133l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8L1206,133h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1194.4z M1216.6,118.3V133h-2.5v-10.7c-0.7,0.7-1.8,0.9-3,0.9
                    c-0.2,0-0.4,0-0.6,0V121c2.4,0,3.7-0.8,4-2.7H1216.6z"/>
                <path onClick={handleClick} id="m7-w1-d4-week" className="st0" d="M1240.1,163.6l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1240.1z M1262.3,148.9v14.8h-2.5v-10.7c-0.7,0.7-1.8,0.9-3,0.9
                    c-0.2,0-0.4,0-0.6,0v-2.2c2.4,0,3.7-0.8,4-2.7H1262.3z"/>
                <path onClick={handleClick} id="m8-w5-d1-week" className="st0" d="M1028.6,1020.2l-3.6-14.8h2.8l1.7,8.1c0.4,2.1,0.5,2.5,0.7,3.7h0c0.3-1.2,0.6-2.5,0.9-3.7
                    l2.1-8.1h2.7l2.1,8.1c0.4,1.4,0.6,2.5,0.8,3.7h0c0.2-1.2,0.4-2.3,0.7-3.7l1.6-8.1h2.8l-3.6,14.8h-2.8l-2.1-8
                    c-0.3-1.2-0.7-2.5-0.9-3.7h0c-0.2,1.2-0.5,2.4-0.8,3.8l-2.1,7.9H1028.6z M1055.2,1015.5c0,2.8-1.8,5-5.3,5c-2.9,0-5-1.7-5-4.7
                    l2.5-0.4c0,1.9,1,3,2.5,3c1.8,0,2.7-1.1,2.7-3c0-1.8-1.1-2.7-2.7-2.7c-1.1,0-1.9,0.4-2.4,1.1l-2.3-0.4l1.1-8h8.1v2.2h-6l-0.5,3.8
                    c0.6-0.6,1.5-1,2.6-1C1052.9,1010.5,1055.2,1012,1055.2,1015.5z"/>
            </g>
            <g onClick={handleClick} id="Veranstaltungs-Slots">
            <path onClick={handleClick} id="m7-w1-d1-event-1" className="st0" d="M481.1,71.9L476,57.1h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H481.1z M490.8,71.9V57.1h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H490.8z M515,71.8L515,71.8l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6V57.1h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S514.3,70.9,515,71.8z M508.5,64c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6V64H508.5z M527.4,71.9
                l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H527.4z M521.1,65.8h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L521.1,65.8z M531.9,71.9V57.1h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H531.9z M545.9,67.1l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C548.8,72.2,545.9,70.5,545.9,67.1z M563.8,71.9V59.4H559v-2.2h12.2v2.2h-4.8v12.5H563.8z M581,71.9l-1.4-3.9h-5.8l-1.3,3.9h-2.8
                l5.7-14.8h2.7l5.6,14.8H581z M574.7,65.8h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L574.7,65.8z M585.4,71.9
                V57.1h2.6v12.5h7.4v2.2H585.4z M597.7,71.9V59.4h-4.8v-2.2h12.2v2.2h-4.8v12.5H597.7z M606.7,67v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6V67c0,3.4-2.1,5.1-6,5.1C608.8,72.2,606.7,70.4,606.7,67z M621.8,71.9V57.1h3
                l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3L626,64c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H621.8z M642.9,63.9h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V63.9z M651.6,67.1l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C654.5,72.2,651.6,70.5,651.6,67.1z M665.7,65.7v-2.2h6.4v2.2H665.7z M673.7,67.1l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C676.7,72.2,673.8,70.5,673.7,67.1z M688.4,71.9V57.1h2.6v12.5h7.4v2.2H688.4z M699.1,64.5c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C701.7,72.2,699.1,69.4,699.1,64.5z M709.7,68.5c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C707.8,70,709,69.5,709.7,68.5z M718.9,71.9V59.4h-4.8v-2.2h12.2v2.2h-4.8v12.5H718.9z"/>
            <path onClick={handleClick} id="m7-w1-d1-event-2" className="st0" d="M1195.8,71.9l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1195.8z M1205.5,71.9V57.1h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1205.5z M1229.7,71.8L1229.7,71.8
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6V57.1h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1229,70.9,1229.7,71.8z M1223.1,64c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6V64H1223.1z
                 M1242.1,71.9l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1242.1z M1235.8,65.8h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1235.8,65.8z M1246.5,71.9V57.1h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1246.5z M1260.5,67.1l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1263.4,72.2,1260.5,70.5,1260.5,67.1z M1278.4,71.9V59.4h-4.8v-2.2h12.2v2.2h-4.8v12.5H1278.4z M1295.7,71.9l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1295.7z M1289.3,65.8h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1289.3,65.8z M1300.1,71.9V57.1h2.6v12.5h7.4v2.2H1300.1z M1312.8,71.9V59.4h-4.8v-2.2h12.2v2.2h-4.8v12.5H1312.8z M1321.9,67
                v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6V67c0,3.4-2.1,5.1-6,5.1C1323.9,72.2,1321.9,70.4,1321.9,67z
                 M1336.9,71.9V57.1h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9
                c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1336.9z M1358,63.9h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2
                c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5
                c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V63.9z M1366.7,67.1l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1369.7,72.2,1366.8,70.5,1366.7,67.1z M1380.9,65.7v-2.2h6.4v2.2H1380.9z M1388.9,67.1l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1391.8,72.2,1388.9,70.5,1388.9,67.1z M1403.5,71.9V57.1h2.6v12.5h7.4v2.2H1403.5z M1414.2,64.5
                c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1416.9,72.2,1414.2,69.4,1414.2,64.5z M1424.8,68.5
                c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4
                c0.8,1,2,1.5,3.4,1.5C1423,70,1424.1,69.5,1424.8,68.5z M1434.1,71.9V59.4h-4.8v-2.2h12.2v2.2h-4.8v12.5H1434.1z"/>
            <path onClick={handleClick} id="m7-w1-d2-event-2" className="st0" d="M1258,102.5l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1258z M1267.7,102.5V87.7h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1267.7z M1291.9,102.4L1291.9,102.4
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6V87.7h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1291.2,101.5,1291.9,102.4z M1285.3,94.6c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1285.3z
                 M1304.3,102.5l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1304.3z M1298,96.4h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1298,96.4z M1308.7,102.5V87.7h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1308.7z M1322.7,97.6l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1325.6,102.7,1322.8,101.1,1322.7,97.6z M1340.6,102.5V90h-4.8v-2.2h12.2V90h-4.8v12.5H1340.6z M1357.9,102.5l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1357.9z M1351.5,96.4h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1351.5,96.4z M1362.3,102.5V87.7h2.6v12.5h7.4v2.2H1362.3z M1375,102.5V90h-4.8v-2.2h12.2V90h-4.8v12.5H1375z M1384.1,97.6v-9.9
                h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C1386.1,102.7,1384.1,100.9,1384.1,97.6z
                 M1399.1,102.5V87.7h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9
                c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1399.1z M1420.2,94.5h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2
                c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5
                c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V94.5z M1429,97.6l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1431.9,102.7,1429,101.1,1429,97.6z M1443.1,96.3v-2.2h6.4v2.2H1443.1z M1451.1,97.6l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1454,102.7,1451.1,101.1,1451.1,97.6z M1465.7,102.5V87.7h2.6v12.5h7.4v2.2H1465.7z M1476.4,95.1
                c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1479.1,102.7,1476.4,100,1476.4,95.1z M1487,99.1
                c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4
                c0.8,1,2,1.5,3.4,1.5C1485.2,100.6,1486.3,100.1,1487,99.1z M1496.3,102.5V90h-4.8v-2.2h12.2V90h-4.8v12.5H1496.3z"/>
            <path onClick={handleClick} id="m7-w1-d3-event-2" className="st0" d="M1306.4,133.1l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1306.4z M1316.1,133.1v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1316.1z M1340.3,133L1340.3,133
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2C1339.4,131.1,1339.6,132.1,1340.3,133z M1333.7,125.2c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7
                H1333.7z M1352.7,133.1l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1352.7z M1346.4,127h4.2l-1.2-3.6
                c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L1346.4,127z M1357.1,133.1v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0
                c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1357.1z M1371.1,128.2
                l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1374,133.3,1371.2,131.7,1371.1,128.2z M1389,133.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1389z
                 M1406.3,133.1l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1406.3z M1399.9,127h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1399.9,127z M1410.7,133.1v-14.8h2.6v12.5h7.4v2.2H1410.7z M1423.4,133.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8
                v12.5H1423.4z M1432.5,128.2v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1434.5,133.3,1432.5,131.5,1432.5,128.2z M1447.5,133.1v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5
                h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1447.5z M1468.6,125.1h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V125.1z
                 M1477.3,128.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1480.3,133.3,1477.4,131.7,1477.3,128.2z M1491.5,126.9v-2.2h6.4v2.2H1491.5z
                 M1499.5,128.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1502.4,133.3,1499.5,131.7,1499.5,128.2z M1514.1,133.1v-14.8h2.6v12.5h7.4v2.2
                H1514.1z M1524.8,125.7c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6
                C1527.5,133.3,1524.8,130.6,1524.8,125.7z M1535.4,129.7c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5
                c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1533.6,131.2,1534.7,130.7,1535.4,129.7z
                 M1544.7,133.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1544.7z"/>
            <path onClick={handleClick} id="m7-w1-d4-event-2" className="st0" d="M1343.3,163.7l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1343.3z M1352.9,163.7v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1352.9z M1377.1,163.6L1377.1,163.6
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1376.4,162.7,1377.1,163.6z M1370.6,155.7c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1370.6z
                 M1389.6,163.7l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1389.6z M1383.2,157.6h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1383.2,157.6z M1394,163.7v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1394z M1408,158.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1410.9,163.9,1408,162.3,1408,158.8z M1425.9,163.7v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1425.9z M1443.1,163.7l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1443.1z M1436.8,157.6h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1436.8,157.6z M1447.6,163.7v-14.8h2.6v12.5h7.4v2.2H1447.6z M1460.3,163.7v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1460.3z
                 M1469.3,158.8v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1471.4,163.9,1469.3,162.1,1469.3,158.8z M1484.4,163.7v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5
                h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1484.4z M1505.5,155.7h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V155.7z
                 M1514.2,158.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1517.1,163.9,1514.3,162.3,1514.2,158.8z M1528.3,157.5v-2.2h6.4v2.2H1528.3z
                 M1536.4,158.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1539.3,163.9,1536.4,162.3,1536.4,158.8z M1551,163.7v-14.8h2.6v12.5h7.4v2.2H1551
                z M1561.7,156.3c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1564.3,163.9,1561.7,161.2,1561.7,156.3z
                 M1572.3,160.3c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1
                c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1570.5,161.8,1571.6,161.3,1572.3,160.3z M1581.6,163.7v-12.5h-4.8v-2.2h12.2v2.2h-4.8
                v12.5H1581.6z"/>
            <path onClick={handleClick} id="m7-w2-d7-event-2" className="st0" d="M1424,255.4l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1424z M1433.7,255.4v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1433.7z M1457.9,255.4L1457.9,255.4
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1457.2,254.4,1457.9,255.4z M1451.3,247.5c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1451.3z
                 M1470.3,255.4l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1470.3z M1464,249.3h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1464,249.3z M1474.7,255.4v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1474.7z M1488.7,250.6l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1491.6,255.7,1488.8,254.1,1488.7,250.6z M1506.6,255.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1506.6z M1523.9,255.4l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1523.9z M1517.5,249.3h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1517.5,249.3z M1528.3,255.4v-14.8h2.6v12.5h7.4v2.2H1528.3z M1541,255.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1541z M1550.1,250.5
                v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1552.1,255.7,1550.1,253.9,1550.1,250.5z M1565.1,255.4v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5
                h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1565.1z M1586.2,247.5h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V247.5z
                 M1594.9,250.6l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1597.9,255.7,1595,254.1,1594.9,250.6z M1609.1,249.2V247h6.4v2.2H1609.1z
                 M1617.1,250.6l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1620,255.7,1617.1,254.1,1617.1,250.6z M1631.7,255.4v-14.8h2.6v12.5h7.4v2.2
                H1631.7z M1642.4,248.1c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1645.1,255.7,1642.4,253,1642.4,248.1z
                 M1653,252.1c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1
                c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1651.2,253.6,1652.3,253.1,1653,252.1z M1662.3,255.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5
                H1662.3z"/>
            <path onClick={handleClick} id="m7-w2-d8-event-2" className="st0" d="M1445.3,286l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1445.3z M1455,286v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1455z M1479.2,286L1479.2,286l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1478.5,285,1479.2,286z M1472.7,278.1c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1472.7z
                 M1491.7,286l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1491.7z M1485.3,279.9h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1485.3,279.9z M1496.1,286v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                V286h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1496.1z M1510.1,281.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1513,286.3,1510.1,284.7,1510.1,281.2z M1528,286v-12.5h-4.8v-2.2h12.2v2.2h-4.8V286H1528z M1545.2,286l-1.4-3.9h-5.8l-1.3,3.9
                h-2.8l5.7-14.8h2.7l5.6,14.8H1545.2z M1538.9,279.9h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L1538.9,279.9z
                 M1549.6,286v-14.8h2.6v12.5h7.4v2.2H1549.6z M1562.3,286v-12.5h-4.8v-2.2h12.2v2.2h-4.8V286H1562.3z M1571.4,281.1v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C1573.5,286.3,1571.4,284.5,1571.4,281.1z
                 M1586.4,286v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5V286h-3l-4.4-7.9
                c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1586.4z M1607.5,278h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2
                c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5
                c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V278z M1616.3,281.2l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1619.2,286.3,1616.3,284.7,1616.3,281.2z M1630.4,279.8v-2.2h6.4v2.2H1630.4z M1638.4,281.2l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1641.4,286.3,1638.5,284.7,1638.4,281.2z M1653.1,286v-14.8h2.6v12.5h7.4v2.2H1653.1z M1663.8,278.7
                c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1666.4,286.3,1663.8,283.6,1663.8,278.7z M1674.4,282.7
                c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4
                c0.8,1,2,1.5,3.4,1.5C1672.5,284.2,1673.7,283.7,1674.4,282.7z M1683.6,286v-12.5h-4.8v-2.2h12.2v2.2h-4.8V286H1683.6z"/>
            <path onClick={handleClick} id="m7-w2-d9-event-2" className="st0" d="M1461.2,316.6l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1461.2z M1470.9,316.6v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1470.9z M1495.1,316.6L1495.1,316.6
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1494.4,315.6,1495.1,316.6z M1488.6,308.7c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1488.6z
                 M1507.5,316.6l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1507.5z M1501.2,310.5h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1501.2,310.5z M1512,316.6v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1512z M1525.9,311.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1528.9,316.9,1526,315.3,1525.9,311.8z M1543.9,316.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1543.9z M1561.1,316.6l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1561.1z M1554.8,310.5h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1554.8,310.5z M1565.5,316.6v-14.8h2.6v12.5h7.4v2.2H1565.5z M1578.2,316.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1578.2z
                 M1587.3,311.7v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1589.4,316.9,1587.3,315.1,1587.3,311.7z M1602.3,316.6v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5
                h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1602.3z M1623.4,308.6h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V308.6z
                 M1632.2,311.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1635.1,316.9,1632.2,315.3,1632.2,311.8z M1646.3,310.4v-2.2h6.4v2.2H1646.3z
                 M1654.3,311.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1657.2,316.9,1654.4,315.3,1654.3,311.8z M1669,316.6v-14.8h2.6v12.5h7.4v2.2H1669
                z M1679.6,309.2c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1682.3,316.9,1679.6,314.2,1679.6,309.2z
                 M1690.2,313.3c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1
                c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1688.4,314.7,1689.5,314.3,1690.2,313.3z M1699.5,316.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8
                v12.5H1699.5z"/>
            <path onClick={handleClick} id="m7-w2-d10-event-2" className="st0" d="M1469.7,347.2l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1469.7z M1479.4,347.2v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1479.4z M1503.6,347.1L1503.6,347.1
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1502.9,346.2,1503.6,347.1z M1497,339.3c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1497z
                 M1516,347.2l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1516z M1509.7,341.1h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1509.7,341.1z M1520.4,347.2v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1520.4z M1534.4,342.4l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1537.4,347.5,1534.5,345.9,1534.4,342.4z M1552.3,347.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1552.3z M1569.6,347.2l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1569.6z M1563.2,341.1h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1563.2,341.1z M1574,347.2v-14.8h2.6V345h7.4v2.2H1574z M1586.7,347.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1586.7z M1595.8,342.3
                v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1597.9,347.5,1595.8,345.7,1595.8,342.3z M1610.8,347.2v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5
                h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1610.8z M1631.9,339.2h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V339.2z
                 M1640.7,342.4l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1643.6,347.5,1640.7,345.9,1640.7,342.4z M1654.8,341v-2.2h6.4v2.2H1654.8z
                 M1662.8,342.4l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1665.7,347.5,1662.8,345.9,1662.8,342.4z M1677.4,347.2v-14.8h2.6V345h7.4v2.2
                H1677.4z M1688.1,339.8c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6
                C1690.8,347.5,1688.1,344.7,1688.1,339.8z M1698.7,343.9c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5
                c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1696.9,345.3,1698,344.8,1698.7,343.9z
                 M1708,347.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1708z"/>
            <path onClick={handleClick} id="m7-w2-d11-event-2" className="st0" d="M1483.2,377.8L1478,363h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1483.2z M1492.9,377.8V363h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1492.9z M1517.1,377.7L1517.1,377.7
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6V363h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1516.4,376.8,1517.1,377.7z M1510.5,369.9c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1510.5z
                 M1529.5,377.8l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1529.5z M1523.2,371.7h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1523.2,371.7z M1534,377.8V363h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4V363h2.5v14.8
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1534z M1547.9,373l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1550.9,378.1,1548,376.5,1547.9,373z M1565.8,377.8v-12.5h-4.8V363h12.2v2.2h-4.8v12.5H1565.8z M1583.1,377.8l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1583.1z M1576.8,371.7h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1576.8,371.7z M1587.5,377.8V363h2.6v12.5h7.4v2.2H1587.5z M1600.2,377.8v-12.5h-4.8V363h12.2v2.2h-4.8v12.5H1600.2z
                 M1609.3,372.9V363h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1V363h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1611.4,378.1,1609.3,376.3,1609.3,372.9z M1624.3,377.8V363h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4V363h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1624.3z M1645.4,369.8h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V369.8z
                 M1654.2,373l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1657.1,378.1,1654.2,376.5,1654.2,373z M1668.3,371.6v-2.2h6.4v2.2H1668.3z
                 M1676.3,373l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1679.2,378.1,1676.3,376.5,1676.3,373z M1690.9,377.8V363h2.6v12.5h7.4v2.2H1690.9
                z M1701.6,370.4c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1704.3,378.1,1701.6,375.3,1701.6,370.4z
                 M1712.2,374.4c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1
                c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1710.4,375.9,1711.5,375.4,1712.2,374.4z M1721.5,377.8v-12.5h-4.8V363h12.2v2.2h-4.8v12.5
                H1721.5z"/>
            <path onClick={handleClick} id="m7-w5-d28-event-2" className="st0" d="M1372.1,897.9l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1372.1z M1381.7,897.9v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1381.7z M1405.9,897.8L1405.9,897.8
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2C1405.1,895.9,1405.2,896.9,1405.9,897.8z M1399.4,889.9c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6
                v4.7H1399.4z M1418.4,897.9l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1418.4z M1412,891.8h4.2l-1.2-3.6
                c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L1412,891.8z M1422.8,897.9v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0
                c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1422.8z M1436.8,893
                l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1439.7,898.1,1436.8,896.5,1436.8,893z M1454.7,897.9v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1454.7z
                 M1471.9,897.9l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1471.9z M1465.6,891.8h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1465.6,891.8z M1476.3,897.9v-14.8h2.6v12.5h7.4v2.2H1476.3z M1489,897.9v-12.5h-4.8v-2.2h12.2v2.2h-4.8
                v12.5H1489z M1498.1,893v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1500.2,898.1,1498.1,896.3,1498.1,893z M1513.1,897.9v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1513.1z M1534.3,889.9h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V889.9z M1543,893
                l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1545.9,898.1,1543,896.5,1543,893z M1557.1,891.7v-2.2h6.4v2.2H1557.1z M1565.1,893l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1568.1,898.1,1565.2,896.5,1565.1,893z M1579.8,897.9v-14.8h2.6v12.5h7.4v2.2H1579.8z M1590.5,890.5
                c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1593.1,898.1,1590.5,895.4,1590.5,890.5z M1601.1,894.5
                c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4c-0.7,0.9-1.1,2.4-1.1,4.1
                c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1599.2,896,1600.4,895.5,1601.1,894.5z M1610.3,897.9v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5
                H1610.3z"/>
            <path onClick={handleClick} id="m7-w5-d29-event-2" className="st0" d="M1342.9,928.4l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1342.9z M1352.5,928.4v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1352.5z M1376.7,928.4L1376.7,928.4
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1376,927.5,1376.7,928.4z M1370.2,920.5c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1370.2z
                 M1389.2,928.4l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1389.2z M1382.8,922.4h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1382.8,922.4z M1393.6,928.4v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1393.6z M1407.6,923.6l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1410.5,928.7,1407.6,927.1,1407.6,923.6z M1425.5,928.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1425.5z M1442.7,928.4l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1442.7z M1436.4,922.4h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1436.4,922.4z M1447.2,928.4v-14.8h2.6v12.5h7.4v2.2H1447.2z M1459.9,928.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1459.9z
                 M1468.9,923.6v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1471,928.7,1468.9,926.9,1468.9,923.6z M1484,928.4v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1484z M1505.1,920.5h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V920.5z
                 M1513.8,923.6l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1516.7,928.7,1513.9,927.1,1513.8,923.6z M1527.9,922.2V920h6.4v2.2H1527.9z
                 M1536,923.6l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1538.9,928.7,1536,927.1,1536,923.6z M1550.6,928.4v-14.8h2.6v12.5h7.4v2.2H1550.6
                z M1561.3,921.1c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1563.9,928.7,1561.3,926,1561.3,921.1z
                 M1571.9,925.1c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1
                c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1570.1,926.6,1571.2,926.1,1571.9,925.1z M1581.2,928.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8
                v12.5H1581.2z"/>
            <path onClick={handleClick} id="m7-w5-d30-event-2" className="st0" d="M1306.7,959l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1306.7z M1316.3,959v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1316.3z M1340.5,959L1340.5,959
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1339.8,958,1340.5,959z M1334,951.1c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1334z M1353,959
                l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1353z M1346.6,952.9h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1346.6,952.9z M1357.4,959v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                V959h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1357.4z M1371.4,954.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1374.3,959.3,1371.4,957.7,1371.4,954.2z M1389.3,959v-12.5h-4.8v-2.2h12.2v2.2h-4.8V959H1389.3z M1406.5,959l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1406.5z M1400.2,952.9h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1400.2,952.9z M1410.9,959v-14.8h2.6v12.5h7.4v2.2H1410.9z M1423.7,959v-12.5h-4.8v-2.2h12.2v2.2h-4.8V959H1423.7z M1432.7,954.1
                v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1434.8,959.3,1432.7,957.5,1432.7,954.1z M1447.7,959v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                V959h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1447.7z M1468.9,951h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V951z
                 M1477.6,954.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1480.5,959.3,1477.6,957.7,1477.6,954.2z M1491.7,952.8v-2.2h6.4v2.2H1491.7z
                 M1499.7,954.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1502.7,959.3,1499.8,957.7,1499.7,954.2z M1514.4,959v-14.8h2.6v12.5h7.4v2.2
                H1514.4z M1525.1,951.7c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6
                C1527.7,959.3,1525.1,956.6,1525.1,951.7z M1535.7,955.7c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5
                c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1533.8,957.2,1535,956.7,1535.7,955.7z
                 M1544.9,959v-12.5h-4.8v-2.2h12.2v2.2h-4.8V959H1544.9z"/>
            <path onClick={handleClick} id="m7-w5-d31-event-2" className="st0" d="M1258,989.6l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1258z M1267.7,989.6v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1267.7z M1291.8,989.6L1291.8,989.6
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1291.1,988.6,1291.8,989.6z M1285.3,981.7c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1285.3z
                 M1304.3,989.6l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1304.3z M1298,983.5h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1298,983.5z M1308.7,989.6v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1308.7z M1322.7,984.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1325.6,989.9,1322.7,988.3,1322.7,984.8z M1340.6,989.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1340.6z M1357.9,989.6l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1357.9z M1351.5,983.5h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1351.5,983.5z M1362.3,989.6v-14.8h2.6v12.5h7.4v2.2H1362.3z M1375,989.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1375z M1384.1,984.7
                v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1386.1,989.9,1384.1,988.1,1384.1,984.7z M1399.1,989.6v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5
                h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1399.1z M1420.2,981.6h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V981.6z
                 M1428.9,984.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1431.9,989.9,1429,988.3,1428.9,984.8z M1443.1,983.4v-2.2h6.4v2.2H1443.1z
                 M1451.1,984.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1454,989.9,1451.1,988.3,1451.1,984.8z M1465.7,989.6v-14.8h2.6v12.5h7.4v2.2
                H1465.7z M1476.4,982.2c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6
                C1479.1,989.9,1476.4,987.2,1476.4,982.2z M1487,986.3c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5
                c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1485.2,987.7,1486.3,987.3,1487,986.3z
                 M1496.3,989.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1496.3z"/>
            <path onClick={handleClick} id="m8-w5-d1-event-2" className="st0" d="M1195.8,1018.8l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1195.8z M1205.4,1018.8V1004h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1205.4z M1229.6,1018.7L1229.6,1018.7
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6V1004h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2C1228.8,1016.8,1228.9,1017.8,1229.6,1018.7z M1223.1,1010.9c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4
                h-2.6v4.7H1223.1z M1242.1,1018.8l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1242.1z M1235.7,1012.7h4.2l-1.2-3.6
                c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L1235.7,1012.7z M1246.5,1018.8V1004h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0
                c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1246.5z
                 M1260.5,1013.9l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1263.4,1019,1260.5,1017.4,1260.5,1013.9z M1278.4,1018.8v-12.5h-4.8v-2.2h12.2
                v2.2h-4.8v12.5H1278.4z M1295.6,1018.8l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1295.6z M1289.3,1012.7h4.2l-1.2-3.6
                c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L1289.3,1012.7z M1300.1,1018.8V1004h2.6v12.5h7.4v2.2H1300.1z M1312.8,1018.8
                v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1312.8z M1321.8,1013.9v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9
                c0,3.4-2.1,5.1-6,5.1C1323.9,1019,1321.8,1017.3,1321.8,1013.9z M1336.9,1018.8V1004h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0
                c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1336.9z M1358,1010.8
                h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5
                c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5
                c2.4,0,3.8-1.3,4-3.9h-4.3V1010.8z M1366.7,1013.9l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2
                c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2
                c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1369.6,1019,1366.8,1017.4,1366.7,1013.9z M1380.9,1012.6
                v-2.2h6.4v2.2H1380.9z M1388.9,1013.9l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2
                c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2
                c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1391.8,1019,1388.9,1017.4,1388.9,1013.9z M1403.5,1018.8
                V1004h2.6v12.5h7.4v2.2H1403.5z M1414.2,1011.4c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6
                C1416.8,1019,1414.2,1016.3,1414.2,1011.4z M1424.8,1015.4c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5
                c-1.6,0-2.8,0.5-3.4,1.4c-0.7,0.9-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1423,1016.9,1424.1,1016.4,1424.8,1015.4
                z M1434.1,1018.8v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1434.1z"/>
            <path onClick={handleClick} id="m7-w1-d2-event-1" className="st0" d="M416.7,102.5l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H416.7z M426.3,102.5V87.7h10v2.2H429v4h6.6v2.2H429v4.2h7.4v2.2H426.3z M450.5,102.4L450.5,102.4l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6V87.7h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S449.8,101.5,450.5,102.4z M444,94.5c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H444z M463,102.5
                l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H463z M456.6,96.4h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L456.6,96.4z M467.4,102.5V87.7h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H467.4z M481.4,97.6l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C484.3,102.7,481.4,101.1,481.4,97.6z M499.3,102.5V89.9h-4.8v-2.2h12.2v2.2h-4.8v12.5H499.3z M516.5,102.5l-1.4-3.9h-5.8l-1.3,3.9
                h-2.8l5.7-14.8h2.7l5.6,14.8H516.5z M510.2,96.4h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L510.2,96.4z
                 M521,102.5V87.7h2.6v12.5h7.4v2.2H521z M533.7,102.5V89.9h-4.8v-2.2h12.2v2.2h-4.8v12.5H533.7z M542.7,97.6v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C544.8,102.7,542.7,100.9,542.7,97.6z M557.8,102.5
                V87.7h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H557.8z M578.9,94.5h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V94.5z M587.6,97.6l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C590.5,102.7,587.7,101.1,587.6,97.6z M601.7,96.3v-2.2h6.4v2.2H601.7z M609.8,97.6l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C612.7,102.7,609.8,101.1,609.8,97.6z M624.4,102.5V87.7h2.6v12.5h7.4v2.2H624.4z M635.1,95.1c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C637.7,102.7,635.1,100,635.1,95.1z M645.7,99.1c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C643.9,100.6,645,100.1,645.7,99.1z M655,102.5V89.9h-4.8v-2.2h12.2v2.2h-4.8v12.5H655z"/>
            <path onClick={handleClick} id="m7-w1-d3-event-1" className="st0" d="M369.4,133.1l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H369.4z M379.1,133.1v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H379.1z M403.3,133L403.3,133l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2C402.4,131.1,402.6,132.1,403.3,133z M396.7,125.1c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7
                H396.7z M415.7,133.1l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H415.7z M409.4,127h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7
                h0c-0.3,1-0.5,1.7-0.8,2.7L409.4,127z M420.1,133.1v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H420.1z M434.1,128.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C437,133.3,434.2,131.7,434.1,128.2z M452,133.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H452z M469.3,133.1l-1.4-3.9h-5.8l-1.3,3.9H458
                l5.7-14.8h2.7l5.6,14.8H469.3z M462.9,127h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L462.9,127z
                 M473.7,133.1v-14.8h2.6v12.5h7.4v2.2H473.7z M486.4,133.1v-12.5h-4.8v-2.2h12.2v2.2H489v12.5H486.4z M495.5,128.2v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C497.5,133.3,495.5,131.5,495.5,128.2z M510.5,133.1
                v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H510.5z M531.6,125.1h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V125.1z M540.3,128.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C543.3,133.3,540.4,131.7,540.3,128.2z M554.5,126.9v-2.2h6.4v2.2H554.5z M562.5,128.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C565.4,133.3,562.5,131.7,562.5,128.2z M577.1,133.1v-14.8h2.6v12.5h7.4v2.2H577.1z M587.8,125.7c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C590.5,133.3,587.8,130.6,587.8,125.7z M598.4,129.7c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C596.6,131.2,597.7,130.7,598.4,129.7z M607.7,133.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H607.7z"/>
            <path onClick={handleClick} id="m7-w1-d4-event-1" className="st0" d="M335.1,163.6l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H335.1z M344.8,163.6v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H344.8z M369,163.6L369,163.6l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S368.3,162.7,369,163.6z M362.4,155.7c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H362.4z
                 M381.4,163.6l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H381.4z M375.1,157.6h4.2L378,154c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L375.1,157.6z M385.8,163.6v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H385.8z M399.8,158.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C402.7,163.9,399.9,162.3,399.8,158.8z M417.7,163.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H417.7z M435,163.6l-1.4-3.9h-5.8l-1.3,3.9
                h-2.8l5.7-14.8h2.7l5.6,14.8H435z M428.6,157.6h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L428.6,157.6z
                 M439.4,163.6v-14.8h2.6v12.5h7.4v2.2H439.4z M452.8,163.6v-12.5H448v-2.2h12.2v2.2h-4.8v12.5H452.8z M461.8,158.8v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C463.9,163.9,461.8,162.1,461.8,158.8z M476.9,163.6
                v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H476.9z M498,155.7h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9H498V155.7z M506.7,158.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C509.6,163.9,506.8,162.3,506.7,158.8z M520.8,157.5v-2.2h6.4v2.2H520.8z M528.8,158.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C531.8,163.9,528.9,162.3,528.8,158.8z M543.5,163.6v-14.8h2.6v12.5h7.4v2.2H543.5z M554.2,156.3c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C556.8,163.9,554.2,161.2,554.2,156.3z M564.8,160.3c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C562.9,161.8,564.1,161.3,564.8,160.3z M574.1,163.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H574.1z"/>
            <path onClick={handleClick} id="m7-w2-d7-event-1" className="st0" d="M257.4,255.4l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H257.4z M267.1,255.4v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H267.1z M291.3,255.4L291.3,255.4
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S290.6,254.4,291.3,255.4z M284.7,247.5c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H284.7z
                 M303.7,255.4l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H303.7z M297.4,249.3h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L297.4,249.3z M308.2,255.4v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H308.2z M322.1,250.6l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C325.1,255.7,322.2,254.1,322.1,250.6z M340.1,255.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H340.1z M357.3,255.4l-1.4-3.9h-5.8
                l-1.3,3.9H346l5.7-14.8h2.7l5.6,14.8H357.3z M351,249.3h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L351,249.3
                z M361.7,255.4v-14.8h2.6v12.5h7.4v2.2H361.7z M374.4,255.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H374.4z M383.5,250.5v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C385.6,255.7,383.5,253.9,383.5,250.5z M398.5,255.4
                v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H398.5z M419.6,247.4h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V247.4z M428.4,250.6l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C431.3,255.7,428.4,254.1,428.4,250.6z M442.5,249.2V247h6.4v2.2H442.5z M450.5,250.6l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C453.4,255.7,450.5,254.1,450.5,250.6z M465.2,255.4v-14.8h2.6v12.5h7.4v2.2H465.2z M475.8,248c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C478.5,255.7,475.8,253,475.8,248z M486.4,252.1c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C484.6,253.5,485.7,253.1,486.4,252.1z M495.7,255.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H495.7z"/>
            <path onClick={handleClick} id="m7-w2-d8-event-1" className="st0" d="M233.5,286l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H233.5z M243.2,286v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H243.2z M267.3,285.9L267.3,285.9l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S266.7,285,267.3,285.9z M260.8,278.1c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H260.8z
                 M279.8,286l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H279.8z M273.5,279.9h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L273.5,279.9z M284.2,286v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5V286
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H284.2z M298.2,281.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C301.1,286.3,298.2,284.7,298.2,281.2z M316.1,286v-12.5h-4.8v-2.2h12.2v2.2h-4.8V286H316.1z M333.4,286l-1.4-3.9h-5.8l-1.3,3.9
                h-2.8l5.7-14.8h2.7l5.6,14.8H333.4z M327,279.9h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L327,279.9z
                 M337.8,286v-14.8h2.6v12.5h7.4v2.2H337.8z M350.5,286v-12.5h-4.8v-2.2h12.2v2.2h-4.8V286H350.5z M359.6,281.1v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C361.6,286.3,359.6,284.5,359.6,281.1z M374.6,286
                v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5V286h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H374.6z M395.7,278h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V278z M404.4,281.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C407.4,286.3,404.5,284.7,404.4,281.2z M418.6,279.8v-2.2h6.4v2.2H418.6z M426.6,281.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C429.5,286.3,426.6,284.7,426.6,281.2z M441.2,286v-14.8h2.6v12.5h7.4v2.2H441.2z M451.9,278.6c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C454.6,286.3,451.9,283.5,451.9,278.6z M462.5,282.7c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C460.7,284.1,461.8,283.6,462.5,282.7z M471.8,286v-12.5H467v-2.2h12.2v2.2h-4.8V286H471.8z"/>
            <path onClick={handleClick} id="m7-w2-d9-event-1" className="st0" d="M217.7,316.6l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H217.7z M227.3,316.6v-14.8h10v2.2H230v4h6.6v2.2H230v4.2h7.4v2.2H227.3z M251.5,316.5L251.5,316.5l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S250.8,315.6,251.5,316.5z M245,308.7c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H245z M264,316.6
                l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H264z M257.6,310.5h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L257.6,310.5z M268.4,316.6v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H268.4z M282.4,311.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C285.3,316.9,282.4,315.2,282.4,311.8z M300.3,316.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H300.3z M317.5,316.6l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H317.5z M311.2,310.5h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L311.2,310.5z M321.9,316.6v-14.8h2.6v12.5h7.4v2.2H321.9z M334.6,316.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H334.6z M343.7,311.7
                v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C345.8,316.9,343.7,315.1,343.7,311.7z
                 M358.7,316.6v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9
                c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H358.7z M379.9,308.6h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2
                c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5
                c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V308.6z M388.6,311.8l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C391.5,316.9,388.6,315.2,388.6,311.8z M402.7,310.4v-2.2h6.4v2.2H402.7z M410.7,311.8l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C413.7,316.9,410.8,315.2,410.7,311.8z M425.4,316.6v-14.8h2.6v12.5h7.4v2.2H425.4z M436.1,309.2
                c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C438.7,316.9,436.1,314.1,436.1,309.2z M446.7,313.2
                c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4
                c0.8,1,2,1.5,3.4,1.5C444.8,314.7,446,314.2,446.7,313.2z M455.9,316.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H455.9z"/>
            <path onClick={handleClick} id="m7-w2-d10-event-1" className="st0" d="M203.3,347.2l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H203.3z M212.9,347.2v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H212.9z M237.1,347.1L237.1,347.1
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4H228v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S236.4,346.2,237.1,347.1z M230.6,339.3c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4H228v4.7H230.6z
                 M249.6,347.2l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H249.6z M243.2,341.1h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L243.2,341.1z M254,347.2v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H254z M268,342.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C270.9,347.4,268,345.8,268,342.3z M285.9,347.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H285.9z M303.1,347.2l-1.4-3.9H296l-1.3,3.9
                h-2.8l5.7-14.8h2.7l5.6,14.8H303.1z M296.8,341.1h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L296.8,341.1z
                 M307.6,347.2v-14.8h2.6V345h7.4v2.2H307.6z M320.3,347.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H320.3z M329.3,342.3v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C331.4,347.4,329.3,345.6,329.3,342.3z M344.4,347.2
                v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H344.4z M365.5,339.2h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V339.2z M374.2,342.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C377.1,347.4,374.2,345.8,374.2,342.3z M388.3,341v-2.2h6.4v2.2H388.3z M396.3,342.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C399.3,347.4,396.4,345.8,396.3,342.3z M411,347.2v-14.8h2.6V345h7.4v2.2H411z M421.7,339.8c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C424.3,347.4,421.7,344.7,421.7,339.8z M432.3,343.8c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C430.4,345.3,431.6,344.8,432.3,343.8z M441.5,347.2v-12.5h-4.8v-2.2H449v2.2h-4.8v12.5H441.5z"/>
            <path onClick={handleClick} id="m7-w2-d11-event-1" className="st0" d="M194.4,377.8l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H194.4z M204,377.8V363h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H204z M228.2,377.7L228.2,377.7l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6V363h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S227.5,376.8,228.2,377.7z M221.7,369.9c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H221.7z
                 M240.7,377.8l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H240.7z M234.3,371.7h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L234.3,371.7z M245.1,377.8V363h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4V363h2.5v14.8
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H245.1z M259.1,372.9l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C262,378,259.1,376.4,259.1,372.9z M277,377.8v-12.5h-4.8V363h12.2v2.2h-4.8v12.5H277z M294.2,377.8l-1.4-3.9h-5.8l-1.3,3.9H283
                l5.7-14.8h2.7l5.6,14.8H294.2z M287.9,371.7h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L287.9,371.7z
                 M298.6,377.8V363h2.6v12.5h7.4v2.2H298.6z M311.3,377.8v-12.5h-4.8V363h12.2v2.2H314v12.5H311.3z M320.4,372.9V363h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1V363h2.6v9.9c0,3.4-2.1,5.1-6,5.1C322.5,378,320.4,376.2,320.4,372.9z M335.4,377.8V363
                h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4V363h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H335.4z M356.6,369.8h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V369.8z M365.3,372.9l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C368.2,378,365.3,376.4,365.3,372.9z M379.4,371.6v-2.2h6.4v2.2H379.4z M387.4,372.9l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C390.4,378,387.5,376.4,387.4,372.9z M402.1,377.8V363h2.6v12.5h7.4v2.2H402.1z M412.8,370.4c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C415.4,378,412.8,375.3,412.8,370.4z M423.4,374.4c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C421.5,375.9,422.7,375.4,423.4,374.4z M432.6,377.8v-12.5h-4.8V363h12.2v2.2h-4.8v12.5H432.6z"/>
            <path onClick={handleClick} id="m7-w3-d14-event-1" className="st0" d="M172.2,469.5l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H172.2z M181.8,469.5v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H181.8z M206,469.5L206,469.5l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S205.3,468.6,206,469.5z M199.5,461.6c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H199.5z
                 M218.5,469.5l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H218.5z M212.1,463.5h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L212.1,463.5z M222.9,469.5v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H222.9z M236.9,464.7l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C239.8,469.8,236.9,468.2,236.9,464.7z M254.8,469.5V457H250v-2.2h12.2v2.2h-4.8v12.5H254.8z M272,469.5l-1.4-3.9h-5.8l-1.3,3.9
                h-2.8l5.7-14.8h2.7l5.6,14.8H272z M265.7,463.5h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L265.7,463.5z
                 M276.5,469.5v-14.8h2.6v12.5h7.4v2.2H276.5z M289.2,469.5V457h-4.8v-2.2h12.2v2.2h-4.8v12.5H289.2z M298.2,464.7v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C300.3,469.8,298.2,468,298.2,464.7z M313.3,469.5
                v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H313.3z M334.4,461.6h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V461.6z M343.1,464.7l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C346,469.8,343.1,468.2,343.1,464.7z M357.2,463.4v-2.2h6.4v2.2H357.2z M365.2,464.7l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C368.2,469.8,365.3,468.2,365.2,464.7z M379.9,469.5v-14.8h2.6v12.5h7.4v2.2H379.9z M390.6,462.2c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C393.2,469.8,390.6,467.1,390.6,462.2z M401.2,466.2c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C399.3,467.7,400.5,467.2,401.2,466.2z M410.4,469.5V457h-4.8v-2.2h12.2v2.2h-4.8v12.5H410.4z"/>
            <path onClick={handleClick} id="m7-w3-d15-event-1" className="st0" d="M167,500.1l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H167z M176.7,500.1v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H176.7z M200.9,500.1L200.9,500.1l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S200.2,499.1,200.9,500.1z M194.4,492.2c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H194.4z
                 M213.4,500.1l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H213.4z M207,494h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L207,494z M217.8,500.1v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H217.8z M231.8,495.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C234.7,500.4,231.8,498.8,231.8,495.3z M249.7,500.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H249.7z M266.9,500.1l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H266.9z M260.6,494h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L260.6,494z M271.3,500.1v-14.8h2.6v12.5h7.4v2.2H271.3z M284,500.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H284z M293.1,495.2v-9.9
                h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C295.2,500.4,293.1,498.6,293.1,495.2z
                 M308.1,500.1v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9
                c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H308.1z M329.3,492.2h6.9v8H334l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2
                c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5
                c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V492.2z M338,495.3l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C340.9,500.4,338,498.8,338,495.3z M352.1,493.9v-2.2h6.4v2.2H352.1z M360.1,495.3l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C363.1,500.4,360.2,498.8,360.1,495.3z M374.8,500.1v-14.8h2.6v12.5h7.4v2.2H374.8z M385.5,492.8
                c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C388.1,500.4,385.5,497.7,385.5,492.8z M396.1,496.8
                c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4
                c0.8,1,2,1.5,3.4,1.5C394.2,498.3,395.4,497.8,396.1,496.8z M405.3,500.1v-12.5h-4.8v-2.2h12.2v2.2H408v12.5H405.3z"/>
            <path onClick={handleClick} id="m7-w3-d16-event-1" className="st0" d="M164.7,530.7l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H164.7z M174.4,530.7V516h10v2.2H177v4h6.6v2.2H177v4.2h7.4v2.2H174.4z M198.5,530.7L198.5,530.7l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6V516h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S197.8,529.7,198.5,530.7z M192,522.8c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H192z M211,530.7
                l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H211z M204.7,524.6h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L204.7,524.6z M215.4,530.7V516h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4V516h2.5v14.8
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H215.4z M229.4,525.9l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C232.3,531,229.4,529.4,229.4,525.9z M247.3,530.7v-12.5h-4.8V516h12.2v2.2h-4.8v12.5H247.3z M264.6,530.7l-1.4-3.9h-5.8l-1.3,3.9
                h-2.8L259,516h2.7l5.6,14.8H264.6z M258.2,524.6h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L258.2,524.6z
                 M269,530.7V516h2.6v12.5h7.4v2.2H269z M281.7,530.7v-12.5h-4.8V516h12.2v2.2h-4.8v12.5H281.7z M290.8,525.8V516h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1V516h2.6v9.9c0,3.4-2.1,5.1-6,5.1C292.8,531,290.8,529.2,290.8,525.8z M305.8,530.7V516
                h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4V516h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H305.8z M326.9,522.7h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V522.7z M335.6,525.9l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C338.6,531,335.7,529.4,335.6,525.9z M349.8,524.5v-2.2h6.4v2.2H349.8z M357.8,525.9l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C360.7,531,357.8,529.4,357.8,525.9z M372.4,530.7V516h2.6v12.5h7.4v2.2H372.4z M383.1,523.4c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C385.8,531,383.1,528.3,383.1,523.4z M393.7,527.4c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C391.9,528.9,393,528.4,393.7,527.4z M403,530.7v-12.5h-4.8V516h12.2v2.2h-4.8v12.5H403z"/>
            <path onClick={handleClick} id="m7-w3-d17-event-1" className="st0" d="M164.8,561.3l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H164.8z M174.5,561.3v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H174.5z M198.7,561.3L198.7,561.3
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S198,560.3,198.7,561.3z M192.2,553.4c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H192.2z
                 M211.1,561.3l-1.4-3.9H204l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H211.1z M204.8,555.2h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L204.8,555.2z M215.6,561.3v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H215.6z M229.5,556.5l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C232.5,561.6,229.6,560,229.5,556.5z M247.5,561.3v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H247.5z M264.7,561.3l-1.4-3.9h-5.8l-1.3,3.9
                h-2.8l5.7-14.8h2.7l5.6,14.8H264.7z M258.4,555.2h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L258.4,555.2z
                 M269.1,561.3v-14.8h2.6v12.5h7.4v2.2H269.1z M281.8,561.3v-12.5H277v-2.2h12.2v2.2h-4.8v12.5H281.8z M290.9,556.4v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C293,561.6,290.9,559.8,290.9,556.4z M305.9,561.3
                v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H305.9z M327,553.3h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9H327V553.3z M335.8,556.5l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C338.7,561.6,335.8,560,335.8,556.5z M349.9,555.1v-2.2h6.4v2.2H349.9z M357.9,556.5l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C360.8,561.6,358,560,357.9,556.5z M372.6,561.3v-14.8h2.6v12.5h7.4v2.2H372.6z M383.2,553.9c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C385.9,561.6,383.2,558.9,383.2,553.9z M393.8,558c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C392,559.4,393.2,559,393.8,558z M403.1,561.3v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H403.1z"/>
            <path onClick={handleClick} id="m7-w5-d28-event-1" className="st0" d="M303,897.8l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H303z M312.7,897.8v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H312.7z M336.9,897.8L336.9,897.8l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2C336,895.9,336.2,896.8,336.9,897.8z M330.4,889.9c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7
                H330.4z M349.3,897.8L348,894h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H349.3z M343,891.7h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7
                h0c-0.3,1-0.5,1.7-0.8,2.7L343,891.7z M353.8,897.8v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3L358,890c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H353.8z M367.7,893l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C370.7,898.1,367.8,896.5,367.7,893z M385.7,897.8v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H385.7z M402.9,897.8l-1.4-3.9h-5.8l-1.3,3.9
                h-2.8l5.7-14.8h2.7l5.6,14.8H402.9z M396.6,891.7h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L396.6,891.7z
                 M407.3,897.8v-14.8h2.6v12.5h7.4v2.2H407.3z M420,897.8v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H420z M429.1,892.9v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C431.2,898.1,429.1,896.3,429.1,892.9z M444.1,897.8
                v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H444.1z M465.2,889.8h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V889.8z M474,893l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C476.9,898.1,474,896.5,474,893z M488.1,891.6v-2.2h6.4v2.2H488.1z M496.1,893l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C499,898.1,496.2,896.5,496.1,893z M510.8,897.8v-14.8h2.6v12.5h7.4v2.2H510.8z M521.5,890.5c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C524.1,898.1,521.5,895.4,521.5,890.5z M532.1,894.5c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4c-0.7,0.9-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4
                c0.8,1,2,1.5,3.4,1.5C530.2,896,531.4,895.5,532.1,894.5z M541.3,897.8v-12.5h-4.8v-2.2h12.2v2.2H544v12.5H541.3z"/>
            <path onClick={handleClick} id="m7-w5-d29-event-1" className="st0" d="M333,928.4l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H333z M342.7,928.4v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H342.7z M366.9,928.4L366.9,928.4l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S366.2,927.4,366.9,928.4z M360.3,920.5c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H360.3z
                 M379.3,928.4l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H379.3z M373,922.3h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L373,922.3z M383.7,928.4v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H383.7z M397.7,923.6l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C400.6,928.7,397.7,927.1,397.7,923.6z M415.6,928.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H415.6z M432.9,928.4l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H432.9z M426.5,922.3h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L426.5,922.3z M437.3,928.4v-14.8h2.6v12.5h7.4v2.2H437.3z M450,928.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H450z M459.1,923.5v-9.9
                h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C461.1,928.7,459.1,926.9,459.1,923.5z
                 M474.1,928.4v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9
                c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H474.1z M495.2,920.4h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2
                c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5
                c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V920.4z M503.9,923.6l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C506.9,928.7,504,927.1,503.9,923.6z M518.1,922.2V920h6.4v2.2H518.1z M526.1,923.6l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C529,928.7,526.1,927.1,526.1,923.6z M540.7,928.4v-14.8h2.6v12.5h7.4v2.2H540.7z M551.4,921
                c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C554.1,928.7,551.4,926,551.4,921z M562,925.1
                c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4
                c0.8,1,2,1.5,3.4,1.5C560.2,926.5,561.3,926.1,562,925.1z M571.3,928.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H571.3z"/>
            <path onClick={handleClick} id="m7-w5-d30-event-1" className="st0" d="M369.4,959l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H369.4z M379.1,959v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H379.1z M403.3,958.9L403.3,958.9l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S402.6,958,403.3,958.9z M396.7,951.1c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H396.7z
                 M415.7,959l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H415.7z M409.4,952.9h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L409.4,952.9z M420.1,959v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5V959
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H420.1z M434.1,954.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C437,959.3,434.2,957.7,434.1,954.2z M452,959v-12.5h-4.8v-2.2h12.2v2.2h-4.8V959H452z M469.3,959l-1.4-3.9h-5.8l-1.3,3.9H458
                l5.7-14.8h2.7l5.6,14.8H469.3z M462.9,952.9h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L462.9,952.9z
                 M473.7,959v-14.8h2.6v12.5h7.4v2.2H473.7z M486.4,959v-12.5h-4.8v-2.2h12.2v2.2H489V959H486.4z M495.5,954.1v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C497.5,959.3,495.5,957.5,495.5,954.1z M510.5,959
                v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5V959h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H510.5z M531.6,951h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V951z M540.3,954.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C543.3,959.3,540.4,957.7,540.3,954.2z M554.5,952.8v-2.2h6.4v2.2H554.5z M562.5,954.2l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C565.4,959.3,562.5,957.7,562.5,954.2z M577.1,959v-14.8h2.6v12.5h7.4v2.2H577.1z M587.8,951.6c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C590.5,959.3,587.8,956.5,587.8,951.6z M598.4,955.7c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C596.6,957.1,597.7,956.7,598.4,955.7z M607.7,959v-12.5h-4.8v-2.2h12.2v2.2h-4.8V959H607.7z"/>
            <path onClick={handleClick} id="m7-w5-d31-event-1" className="st0" d="M416.3,989.6l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H416.3z M426,989.6v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H426z M450.2,989.5L450.2,989.5l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4H441v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S449.5,988.6,450.2,989.5z M443.7,981.7c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4H441v4.7H443.7z
                 M462.6,989.6l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H462.6z M456.3,983.5h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L456.3,983.5z M467.1,989.6v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H467.1z M481,984.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C484,989.9,481.1,988.3,481,984.8z M499,989.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H499z M516.2,989.6l-1.4-3.9h-5.8l-1.3,3.9H505
                l5.7-14.8h2.7l5.6,14.8H516.2z M509.9,983.5h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L509.9,983.5z
                 M520.6,989.6v-14.8h2.6v12.5h7.4v2.2H520.6z M533.3,989.6v-12.5h-4.8v-2.2h12.2v2.2H536v12.5H533.3z M542.4,984.7v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C544.5,989.9,542.4,988.1,542.4,984.7z M557.4,989.6
                v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H557.4z M578.5,981.6h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V981.6z M587.3,984.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C590.2,989.9,587.3,988.3,587.3,984.8z M601.4,983.4v-2.2h6.4v2.2H601.4z M609.4,984.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C612.3,989.9,609.5,988.3,609.4,984.8z M624.1,989.6v-14.8h2.6v12.5h7.4v2.2H624.1z M634.8,982.2c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C637.4,989.9,634.8,987.1,634.8,982.2z M645.4,986.3c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C643.5,987.7,644.7,987.2,645.4,986.3z M654.6,989.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H654.6z"/>
            <path onClick={handleClick} id="m8-w5-d1-event-1" className="st0" d="M480.6,1020.2l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H480.6z M490.3,1020.2v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H490.3z M514.5,1020.1L514.5,1020.1
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S513.8,1019.2,514.5,1020.1z M508,1012.3c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H508z
                 M526.9,1020.2l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H526.9z M520.6,1014.1h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L520.6,1014.1z M531.4,1020.2v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H531.4z M545.3,1015.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C548.3,1020.4,545.4,1018.8,545.3,1015.3z M563.3,1020.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H563.3z M580.5,1020.2l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H580.5z M574.2,1014.1h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L574.2,1014.1z M584.9,1020.2v-14.8h2.6v12.5h7.4v2.2H584.9z M597.6,1020.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H597.6z
                 M606.7,1015.3v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C608.8,1020.4,606.7,1018.7,606.7,1015.3z M621.7,1020.2v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5
                h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H621.7z M642.8,1012.2h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V1012.2z
                 M651.6,1015.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C654.5,1020.4,651.6,1018.8,651.6,1015.3z M665.7,1014v-2.2h6.4v2.2H665.7z
                 M673.7,1015.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C676.6,1020.4,673.8,1018.8,673.7,1015.3z M688.4,1020.2v-14.8h2.6v12.5h7.4v2.2
                H688.4z M699.1,1012.8c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C701.7,1020.4,699.1,1017.7,699.1,1012.8
                z M709.7,1016.8c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1
                c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C707.8,1018.3,709,1017.8,709.7,1016.8z M718.9,1020.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5
                H718.9z"/>
            <path onClick={handleClick} id="m7-w4-d21-event-2" className="st0" d="M1501,683.8l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1501z M1510.7,683.8V669h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1510.7z M1534.9,683.7L1534.9,683.7
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6V669h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1534.2,682.8,1534.9,683.7z M1528.3,675.8c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1528.3z
                 M1547.3,683.8l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1547.3z M1541,677.7h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1541,677.7z M1551.7,683.8V669h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4V669h2.5v14.8
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1551.7z M1565.7,678.9l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1568.6,684,1565.8,682.4,1565.7,678.9z M1583.6,683.8v-12.5h-4.8V669h12.2v2.2h-4.8v12.5H1583.6z M1600.9,683.8l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1600.9z M1594.5,677.7h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1594.5,677.7z M1605.3,683.8V669h2.6v12.5h7.4v2.2H1605.3z M1618,683.8v-12.5h-4.8V669h12.2v2.2h-4.8v12.5H1618z M1627.1,678.9
                V669h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1V669h2.6v9.9c0,3.4-2.1,5.1-6,5.1C1629.1,684,1627.1,682.2,1627.1,678.9z
                 M1642.1,683.8V669h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4V669h2.5v14.8h-3l-4.4-7.9
                c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1642.1z M1663.2,675.8h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2
                c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5
                c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V675.8z M1671.9,678.9l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1674.9,684,1672,682.4,1671.9,678.9z M1686.1,677.6v-2.2h6.4v2.2H1686.1z M1694.1,678.9l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1697,684,1694.1,682.4,1694.1,678.9z M1708.7,683.8V669h2.6v12.5h7.4v2.2H1708.7z M1719.4,676.4
                c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1722.1,684,1719.4,681.3,1719.4,676.4z M1730,680.4
                c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4
                c0.8,1,2,1.5,3.4,1.5C1728.2,681.9,1729.3,681.4,1730,680.4z M1739.3,683.8v-12.5h-4.8V669h12.2v2.2h-4.8v12.5H1739.3z"/>
            <path onClick={handleClick} id="m7-w4-d22-event-2" className="st0" d="M1490.4,714.4l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1490.4z M1500.1,714.4v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1500.1z M1524.2,714.3L1524.2,714.3
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1523.5,713.4,1524.2,714.3z M1517.7,706.4c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1517.7z
                 M1536.7,714.4l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1536.7z M1530.4,708.3h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1530.4,708.3z M1541.1,714.4v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1541.1z M1555.1,709.5l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1558,714.6,1555.1,713,1555.1,709.5z M1573,714.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1573z M1590.3,714.4l-1.4-3.9h-5.8l-1.3,3.9
                h-2.8l5.7-14.8h2.7l5.6,14.8H1590.3z M1583.9,708.3h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L1583.9,708.3z
                 M1594.7,714.4v-14.8h2.6v12.5h7.4v2.2H1594.7z M1607.4,714.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1607.4z M1616.5,709.5v-9.9h2.6
                v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C1618.5,714.6,1616.5,712.8,1616.5,709.5z
                 M1631.5,714.4v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9
                c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1631.5z M1652.6,706.4h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2
                c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5
                c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V706.4z M1661.3,709.5l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1664.3,714.6,1661.4,713,1661.3,709.5z M1675.5,708.2V706h6.4v2.2H1675.5z M1683.5,709.5l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1686.4,714.6,1683.5,713,1683.5,709.5z M1698.1,714.4v-14.8h2.6v12.5h7.4v2.2H1698.1z M1708.8,707
                c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1711.5,714.6,1708.8,711.9,1708.8,707z M1719.4,711
                c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4
                c0.8,1,2,1.5,3.4,1.5C1717.6,712.5,1718.7,712,1719.4,711z M1728.7,714.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1728.7z"/>
            <path onClick={handleClick} id="m7-w4-d23-event-2" className="st0" d="M1477.6,745l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1477.6z M1487.2,745v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1487.2z M1511.4,744.9L1511.4,744.9
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1510.7,744,1511.4,744.9z M1504.9,737c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1504.9z
                 M1523.9,745l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1523.9z M1517.5,738.9h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1517.5,738.9z M1528.3,745v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                V745h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1528.3z M1542.3,740.1l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1545.2,745.2,1542.3,743.6,1542.3,740.1z M1560.2,745v-12.5h-4.8v-2.2h12.2v2.2h-4.8V745H1560.2z M1577.4,745l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1577.4z M1571.1,738.9h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1571.1,738.9z M1581.9,745v-14.8h2.6v12.5h7.4v2.2H1581.9z M1594.6,745v-12.5h-4.8v-2.2h12.2v2.2h-4.8V745H1594.6z M1603.6,740.1
                v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1605.7,745.2,1603.6,743.4,1603.6,740.1z M1618.7,745v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                V745h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1618.7z M1639.8,737h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V737z
                 M1648.5,740.1l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1651.4,745.2,1648.6,743.6,1648.5,740.1z M1662.6,738.8v-2.2h6.4v2.2H1662.6z
                 M1670.7,740.1l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1673.6,745.2,1670.7,743.6,1670.7,740.1z M1685.3,745v-14.8h2.6v12.5h7.4v2.2
                H1685.3z M1696,737.6c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1698.6,745.2,1696,742.5,1696,737.6z
                 M1706.6,741.6c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1
                c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1704.8,743.1,1705.9,742.6,1706.6,741.6z M1715.9,745v-12.5h-4.8v-2.2h12.2v2.2h-4.8V745
                H1715.9z"/>
            <path onClick={handleClick} id="m7-w4-d24-event-2" className="st0" d="M1462.5,775.5l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1462.5z M1472.1,775.5v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1472.1z M1496.3,775.5L1496.3,775.5
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2C1495.5,773.6,1495.6,774.6,1496.3,775.5z M1489.8,767.6c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6
                v4.7H1489.8z M1508.8,775.5l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1508.8z M1502.4,769.5h4.2l-1.2-3.6
                c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L1502.4,769.5z M1513.2,775.5v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0
                c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1513.2z M1527.2,770.7
                l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1530.1,775.8,1527.2,774.2,1527.2,770.7z M1545.1,775.5V763h-4.8v-2.2h12.2v2.2h-4.8v12.5H1545.1z
                 M1562.3,775.5l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1562.3z M1556,769.5h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1556,769.5z M1566.8,775.5v-14.8h2.6v12.5h7.4v2.2H1566.8z M1579.5,775.5V763h-4.8v-2.2h12.2v2.2h-4.8
                v12.5H1579.5z M1588.5,770.7v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1590.6,775.8,1588.5,774,1588.5,770.7z M1603.6,775.5v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1603.6z M1624.7,767.6h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V767.6z
                 M1633.4,770.7l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1636.3,775.8,1633.5,774.2,1633.4,770.7z M1647.5,769.3v-2.2h6.4v2.2H1647.5z
                 M1655.6,770.7l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1658.5,775.8,1655.6,774.2,1655.6,770.7z M1670.2,775.5v-14.8h2.6v12.5h7.4v2.2
                H1670.2z M1680.9,768.2c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6
                C1683.5,775.8,1680.9,773.1,1680.9,768.2z M1691.5,772.2c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5
                c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1689.7,773.7,1690.8,773.2,1691.5,772.2z
                 M1700.8,775.5V763h-4.8v-2.2h12.2v2.2h-4.8v12.5H1700.8z"/>
            <path onClick={handleClick} id="m7-w4-d25-event-2" className="st0" d="M1445.6,806.1l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1445.6z M1455.2,806.1v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1455.2z M1479.4,806.1L1479.4,806.1
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2C1478.6,804.2,1478.7,805.1,1479.4,806.1z M1472.9,798.2c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6
                v4.7H1472.9z M1491.9,806.1l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1491.9z M1485.5,800h4.2l-1.2-3.6
                c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L1485.5,800z M1496.3,806.1v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0
                c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1496.3z M1510.3,801.3
                l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1513.2,806.4,1510.3,804.8,1510.3,801.3z M1528.2,806.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1528.2z
                 M1545.4,806.1l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1545.4z M1539.1,800h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1539.1,800z M1549.8,806.1v-14.8h2.6v12.5h7.4v2.2H1549.8z M1562.6,806.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8
                v12.5H1562.6z M1571.6,801.2v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1573.7,806.4,1571.6,804.6,1571.6,801.2z M1586.6,806.1v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5
                h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1586.6z M1607.8,798.1h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V798.1z
                 M1616.5,801.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1619.4,806.4,1616.5,804.8,1616.5,801.3z M1630.6,799.9v-2.2h6.4v2.2H1630.6z
                 M1638.6,801.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1641.6,806.4,1638.7,804.8,1638.6,801.3z M1653.3,806.1v-14.8h2.6v12.5h7.4v2.2
                H1653.3z M1664,798.8c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1666.6,806.4,1664,803.7,1664,798.8z
                 M1674.6,802.8c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4c-0.7,0.9-1.1,2.4-1.1,4.1
                c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1672.7,804.3,1673.9,803.8,1674.6,802.8z M1683.8,806.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8
                v12.5H1683.8z"/>
            <path onClick={handleClick} id="m7-w3-d14-event-2" className="st0" d="M1507.9,469.6l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1507.9z M1517.6,469.6v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1517.6z M1541.8,469.6L1541.8,469.6
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1541.1,468.6,1541.8,469.6z M1535.2,461.7c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1535.2z
                 M1554.2,469.6l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1554.2z M1547.9,463.5h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1547.9,463.5z M1558.6,469.6v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1558.6z M1572.6,464.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1575.6,469.9,1572.7,468.3,1572.6,464.8z M1590.5,469.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1590.5z M1607.8,469.6l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1607.8z M1601.4,463.5h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1601.4,463.5z M1612.2,469.6v-14.8h2.6v12.5h7.4v2.2H1612.2z M1624.9,469.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1624.9z
                 M1634,464.7v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1636.1,469.9,1634,468.1,1634,464.7z M1649,469.6v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1649z M1670.1,461.6h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V461.6z
                 M1678.9,464.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1681.8,469.9,1678.9,468.3,1678.9,464.8z M1693,463.4v-2.2h6.4v2.2H1693z
                 M1701,464.8l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1703.9,469.9,1701,468.3,1701,464.8z M1715.6,469.6v-14.8h2.6v12.5h7.4v2.2H1715.6
                z M1726.3,462.2c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1729,469.9,1726.3,467.2,1726.3,462.2z
                 M1736.9,466.3c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1
                c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1735.1,467.7,1736.2,467.3,1736.9,466.3z M1746.2,469.6v-12.5h-4.8v-2.2h12.2v2.2h-4.8
                v12.5H1746.2z"/>
            <path onClick={handleClick} id="m7-w3-d15-event-2" className="st0" d="M1513.3,500.2l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1513.3z M1523,500.2v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1523z M1547.2,500.1L1547.2,500.1
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1546.5,499.2,1547.2,500.1z M1540.7,492.3c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1540.7z
                 M1559.6,500.2l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1559.6z M1553.3,494.1h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1553.3,494.1z M1564.1,500.2v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1564.1z M1578,495.4l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1581,500.5,1578.1,498.9,1578,495.4z M1596,500.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1596z M1613.2,500.2l-1.4-3.9h-5.8l-1.3,3.9
                h-2.8l5.7-14.8h2.7l5.6,14.8H1613.2z M1606.9,494.1h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L1606.9,494.1z
                 M1617.6,500.2v-14.8h2.6V498h7.4v2.2H1617.6z M1630.3,500.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1630.3z M1639.4,495.3v-9.9h2.6
                v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C1641.5,500.5,1639.4,498.7,1639.4,495.3z
                 M1654.4,500.2v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9
                c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1654.4z M1675.5,492.2h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2
                c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5
                c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V492.2z M1684.3,495.4l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1687.2,500.5,1684.3,498.9,1684.3,495.4z M1698.4,494v-2.2h6.4v2.2H1698.4z M1706.4,495.4l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1709.3,500.5,1706.4,498.9,1706.4,495.4z M1721.1,500.2v-14.8h2.6V498h7.4v2.2H1721.1z M1731.7,492.8
                c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1734.4,500.5,1731.7,497.7,1731.7,492.8z M1742.3,496.9
                c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4
                c0.8,1,2,1.5,3.4,1.5C1740.5,498.3,1741.6,497.8,1742.3,496.9z M1751.6,500.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1751.6z"/>
            <path onClick={handleClick} id="m7-w3-d16-event-2" className="st0" d="M1515.4,530.8l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1515.4z M1525,530.8V516h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1525z M1549.2,530.7L1549.2,530.7
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6V516h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1548.5,529.8,1549.2,530.7z M1542.7,522.9c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1542.7z
                 M1561.7,530.8l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1561.7z M1555.3,524.7h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1555.3,524.7z M1566.1,530.8V516h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4V516h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1566.1z M1580.1,526l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1583,531.1,1580.1,529.5,1580.1,526z M1598,530.8v-12.5h-4.8V516h12.2v2.2h-4.8v12.5H1598z M1615.2,530.8l-1.4-3.9h-5.8l-1.3,3.9
                h-2.8l5.7-14.8h2.7l5.6,14.8H1615.2z M1608.9,524.7h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L1608.9,524.7z
                 M1619.6,530.8V516h2.6v12.5h7.4v2.2H1619.6z M1632.3,530.8v-12.5h-4.8V516h12.2v2.2h-4.8v12.5H1632.3z M1641.4,525.9V516h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1V516h2.6v9.9c0,3.4-2.1,5.1-6,5.1C1643.5,531.1,1641.4,529.3,1641.4,525.9z
                 M1656.4,530.8V516h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4V516h2.5v14.8h-3l-4.4-7.9
                c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1656.4z M1677.6,522.8h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2
                c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5
                c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V522.8z M1686.3,526l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1689.2,531.1,1686.3,529.5,1686.3,526z M1700.4,524.6v-2.2h6.4v2.2H1700.4z M1708.4,526l2.7-0.3
                c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3
                c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5
                c0,3.6-3.1,4.6-6.1,4.6C1711.4,531.1,1708.5,529.5,1708.4,526z M1723.1,530.8V516h2.6v12.5h7.4v2.2H1723.1z M1733.8,523.4
                c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1736.4,531.1,1733.8,528.3,1733.8,523.4z M1744.4,527.4
                c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4
                c0.8,1,2,1.5,3.4,1.5C1742.5,528.9,1743.7,528.4,1744.4,527.4z M1753.6,530.8v-12.5h-4.8V516h12.2v2.2h-4.8v12.5H1753.6z"/>
            <path onClick={handleClick} id="m7-w3-d17-event-2" className="st0" d="M1514.5,561.4l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H1514.5z M1524.2,561.4v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1524.2z M1548.4,561.3L1548.4,561.3
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1547.7,560.4,1548.4,561.3z M1541.9,553.5c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1541.9z
                 M1560.8,561.4l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1560.8z M1554.5,555.3h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1554.5,555.3z M1565.3,561.4v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1565.3z M1579.2,556.5l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1582.2,561.6,1579.3,560,1579.2,556.5z M1597.2,561.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1597.2z M1614.4,561.4l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1614.4z M1608.1,555.3h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1608.1,555.3z M1618.8,561.4v-14.8h2.6v12.5h7.4v2.2H1618.8z M1631.5,561.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H1631.5z
                 M1640.6,556.5v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1642.7,561.6,1640.6,559.9,1640.6,556.5z M1655.6,561.4v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5
                h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1655.6z M1676.7,553.4h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V553.4z
                 M1685.5,556.5l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1688.4,561.6,1685.5,560,1685.5,556.5z M1699.6,555.2V553h6.4v2.2H1699.6z
                 M1707.6,556.5l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1710.5,561.6,1707.7,560,1707.6,556.5z M1722.3,561.4v-14.8h2.6v12.5h7.4v2.2
                H1722.3z M1732.9,554c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C1735.6,561.6,1732.9,558.9,1732.9,554z
                 M1743.5,558c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1
                c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1741.7,559.5,1742.8,559,1743.5,558z M1752.8,561.4v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5
                H1752.8z"/>
            <path onClick={handleClick} id="m7-w3-d18-event-2" className="st0" d="M1512.2,592l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8L1515,592H1512.2z M1521.8,592v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H1521.8z M1546,591.9L1546,591.9l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S1545.3,591,1546,591.9z M1539.5,584.1c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H1539.5z
                 M1558.5,592l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1558.5z M1552.1,585.9h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L1552.1,585.9z M1562.9,592v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                V592h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1562.9z M1576.9,587.1l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C1579.8,592.2,1576.9,590.6,1576.9,587.1z M1594.8,592v-12.5h-4.8v-2.2h12.2v2.2h-4.8V592H1594.8z M1612,592l-1.4-3.9h-5.8
                l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H1612z M1605.7,585.9h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7
                L1605.7,585.9z M1616.4,592v-14.8h2.6v12.5h7.4v2.2H1616.4z M1629.1,592v-12.5h-4.8v-2.2h12.2v2.2h-4.8V592H1629.1z M1638.2,587.1
                v-9.9h2.6v9.8c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1
                C1640.3,592.2,1638.2,590.4,1638.2,587.1z M1653.2,592v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                V592h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H1653.2z M1674.4,584h6.9v8h-2.2l-0.2-2
                c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1
                c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V584z
                 M1683.1,587.1l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1686,592.2,1683.1,590.6,1683.1,587.1z M1697.2,585.8v-2.2h6.4v2.2H1697.2z
                 M1705.2,587.1l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4
                c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1
                c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6C1708.2,592.2,1705.3,590.6,1705.2,587.1z M1719.9,592v-14.8h2.6v12.5h7.4v2.2
                H1719.9z M1730.6,584.6c0-4.5,2.6-7.6,7.2-7.6c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6
                C1733.2,592.2,1730.6,589.5,1730.6,584.6z M1741.2,588.6c0.7-1,1.1-2.4,1.1-4c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5
                c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5C1739.3,590.1,1740.5,589.6,1741.2,588.6z
                 M1750.4,592v-12.5h-4.8v-2.2h12.2v2.2h-4.8V592H1750.4z"/>
            <path onClick={handleClick} id="m7-w4-d21-event-1" className="st0" d="M179.8,683.8l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H179.8z M189.5,683.8V669h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H189.5z M213.7,683.7L213.7,683.7l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6V669h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S213,682.8,213.7,683.7z M207.2,675.8c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H207.2z
                 M226.1,683.8l-1.4-3.9H219l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H226.1z M219.8,677.7h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L219.8,677.7z M230.6,683.8V669h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4V669h2.5v14.8
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H230.6z M244.5,678.9l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C247.5,684,244.6,682.4,244.5,678.9z M262.5,683.8v-12.5h-4.8V669h12.2v2.2h-4.8v12.5H262.5z M279.7,683.8l-1.4-3.9h-5.8l-1.3,3.9
                h-2.8l5.7-14.8h2.7l5.6,14.8H279.7z M273.4,677.7h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L273.4,677.7z
                 M284.1,683.8V669h2.6v12.5h7.4v2.2H284.1z M296.8,683.8v-12.5H292V669h12.2v2.2h-4.8v12.5H296.8z M305.9,678.9V669h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1V669h2.6v9.9c0,3.4-2.1,5.1-6,5.1C308,684,305.9,682.2,305.9,678.9z M320.9,683.8V669h3
                l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4V669h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H320.9z M342,675.8h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7L346,674c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9H342V675.8z M350.8,678.9l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C353.7,684,350.8,682.4,350.8,678.9z M364.9,677.6v-2.2h6.4v2.2H364.9z M372.9,678.9l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C375.8,684,373,682.4,372.9,678.9z M387.6,683.8V669h2.6v12.5h7.4v2.2H387.6z M398.2,676.4c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C400.9,684,398.2,681.3,398.2,676.4z M408.8,680.4c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C407,681.9,408.2,681.4,408.8,680.4z M418.1,683.8v-12.5h-4.8V669h12.2v2.2h-4.8v12.5H418.1z"/>
            <path onClick={handleClick} id="m7-w4-d22-event-1" className="st0" d="M190.2,714.3l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H190.2z M199.9,714.3v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H199.9z M224.1,714.3L224.1,714.3
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4H215v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S223.4,713.3,224.1,714.3z M217.6,706.4c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4H215v4.7H217.6z
                 M236.5,714.3l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H236.5z M230.2,708.3h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L230.2,708.3z M241,714.3v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H241z M255,709.5l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C257.9,714.6,255,713,255,709.5z M272.9,714.3v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H272.9z M290.1,714.3l-1.4-3.9H283l-1.3,3.9h-2.8
                l5.7-14.8h2.7l5.6,14.8H290.1z M283.8,708.3h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L283.8,708.3z
                 M294.5,714.3v-14.8h2.6v12.5h7.4v2.2H294.5z M307.2,714.3v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H307.2z M316.3,709.5v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C318.4,714.6,316.3,712.8,316.3,709.5z M331.3,714.3
                v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H331.3z M352.4,706.4h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V706.4z M361.2,709.5l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C364.1,714.6,361.2,713,361.2,709.5z M375.3,708.1v-2.2h6.4v2.2H375.3z M383.3,709.5l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C386.2,714.6,383.4,713,383.3,709.5z M398,714.3v-14.8h2.6v12.5h7.4v2.2H398z M408.7,707c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C411.3,714.6,408.7,711.9,408.7,707z M419.3,711c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C417.4,712.5,418.6,712,419.3,711z M428.5,714.3v-12.5h-4.8v-2.2H436v2.2h-4.8v12.5H428.5z"/>
            <path onClick={handleClick} id="m7-w4-d23-event-1" className="st0" d="M203.3,744.2l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H203.3z M213,744.2v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H213z M237.2,744.1L237.2,744.1l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S236.5,743.2,237.2,744.1z M230.7,736.2c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H230.7z
                 M249.7,744.2l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H249.7z M243.3,738.1h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L243.3,738.1z M254.1,744.2v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H254.1z M268.1,739.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C271,744.4,268.1,742.8,268.1,739.3z M286,744.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H286z M303.2,744.2l-1.4-3.9h-5.8l-1.3,3.9H292
                l5.7-14.8h2.7l5.6,14.8H303.2z M296.9,738.1h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L296.9,738.1z
                 M307.6,744.2v-14.8h2.6v12.5h7.4v2.2H307.6z M320.3,744.2v-12.5h-4.8v-2.2h12.2v2.2H323v12.5H320.3z M329.4,739.3v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C331.5,744.4,329.4,742.6,329.4,739.3z M344.4,744.2
                v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H344.4z M365.6,736.2h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V736.2z M374.3,739.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C377.2,744.4,374.3,742.8,374.3,739.3z M388.4,738v-2.2h6.4v2.2H388.4z M396.4,739.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C399.4,744.4,396.5,742.8,396.4,739.3z M411.1,744.2v-14.8h2.6v12.5h7.4v2.2H411.1z M421.8,736.8c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C424.4,744.4,421.8,741.7,421.8,736.8z M432.4,740.8c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C430.5,742.3,431.7,741.8,432.4,740.8z M441.6,744.2v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H441.6z"/>
            <path onClick={handleClick} id="m7-w4-d24-event-1" className="st0" d="M219.5,775.5l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H219.5z M229.1,775.5v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H229.1z M253.3,775.5L253.3,775.5
                l-2.9,0.1c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S252.6,774.5,253.3,775.5z M246.8,767.6c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H246.8z
                 M265.8,775.5l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H265.8z M259.4,769.4h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L259.4,769.4z M270.2,775.5v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5
                v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H270.2z M284.2,770.7l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C287.1,775.8,284.2,774.2,284.2,770.7z M302.1,775.5V763h-4.8v-2.2h12.2v2.2h-4.8v12.5H302.1z M319.3,775.5l-1.4-3.9h-5.8l-1.3,3.9
                h-2.8l5.7-14.8h2.7l5.6,14.8H319.3z M313,769.4h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L313,769.4z
                 M323.8,775.5v-14.8h2.6v12.5h7.4v2.2H323.8z M336.5,775.5V763h-4.8v-2.2h12.2v2.2h-4.8v12.5H336.5z M345.5,770.6v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C347.6,775.8,345.5,774,345.5,770.6z M360.6,775.5
                v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H360.6z M381.7,767.5h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V767.5z M390.4,770.7l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C393.3,775.8,390.4,774.2,390.4,770.7z M404.5,769.3v-2.2h6.4v2.2H404.5z M412.5,770.7l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C415.5,775.8,412.6,774.2,412.5,770.7z M427.2,775.5v-14.8h2.6v12.5h7.4v2.2H427.2z M437.9,768.1c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C440.5,775.8,437.9,773.1,437.9,768.1z M448.5,772.2c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C446.6,773.6,447.8,773.2,448.5,772.2z M457.7,775.5V763H453v-2.2h12.2v2.2h-4.8v12.5H457.7z"/>
            <path onClick={handleClick} id="m7-w4-d25-event-1" className="st0" d="M240.3,806.1l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H240.3z M250,806.1v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H250z M274.2,806L274.2,806l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4H265v5.8h-2.6v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S273.5,805.1,274.2,806z M267.7,798.2c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4H265v4.7H267.7z
                 M286.6,806.1l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7l5.6,14.8H286.6z M280.3,800h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L280.3,800z M291.1,806.1v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H291.1z M305,801.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C308,806.4,305.1,804.8,305,801.3z M323,806.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H323z M340.2,806.1l-1.4-3.9h-5.8l-1.3,3.9H329
                l5.7-14.8h2.7l5.6,14.8H340.2z M333.9,800h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L333.9,800z
                 M344.6,806.1v-14.8h2.6v12.5h7.4v2.2H344.6z M357.3,806.1v-12.5h-4.8v-2.2h12.2v2.2H360v12.5H357.3z M366.4,801.2v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C368.5,806.4,366.4,804.6,366.4,801.2z M381.4,806.1
                v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5v14.8h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H381.4z M402.5,798.1h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V798.1z M411.3,801.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C414.2,806.4,411.3,804.8,411.3,801.3z M425.4,799.9v-2.2h6.4v2.2H425.4z M433.4,801.3l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C436.3,806.4,433.5,804.8,433.4,801.3z M448.1,806.1v-14.8h2.6v12.5h7.4v2.2H448.1z M458.8,798.7c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C461.4,806.4,458.8,803.6,458.8,798.7z M469.4,802.8c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C467.5,804.2,468.7,803.8,469.4,802.8z M478.6,806.1v-12.5h-4.8v-2.2h12.2v2.2h-4.8v12.5H478.6z"/>
            <path onClick={handleClick} id="m7-w3-d18-event-1" className="st0" d="M167.9,592l-5.2-14.8h2.8l2.5,7.9c0.7,2.2,1.1,3.6,1.3,4.2h0c0.1-0.5,0.6-2,1.3-4.2
                l2.5-7.9h2.8l-5.2,14.8H167.9z M177.6,592v-14.8h10v2.2h-7.4v4h6.6v2.2h-6.6v4.2h7.4v2.2H177.6z M201.7,591.9L201.7,591.9l-2.9,0.1
                c-0.5-0.8-0.6-1.4-0.6-3.4c0-1.8-0.8-2.4-2.9-2.4h-2.8v5.8H190v-14.8h5.4c2.9,0,5.9,0.5,5.9,4.4c0,1.8-0.9,3.1-2.3,3.6
                c1.4,0.5,2,1.6,2,3.2S201,591,201.7,591.9z M195.2,584.1c1.8,0,3.5-0.2,3.5-2.3c0-2.3-1.7-2.4-3.4-2.4h-2.6v4.7H195.2z M214.2,592
                l-1.4-3.9h-5.8l-1.3,3.9h-2.8l5.7-14.8h2.7L217,592H214.2z M207.9,585.9h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0
                c-0.3,1-0.5,1.7-0.8,2.7L207.9,585.9z M218.6,592v-14.8h3l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5V592
                h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0c0.1,1.5,0.1,3.5,0.1,3.9v7.5H218.6z M232.6,587.1l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C235.5,592.2,232.6,590.6,232.6,587.1z M250.5,592v-12.5h-4.8v-2.2H258v2.2h-4.8V592H250.5z M267.8,592l-1.4-3.9h-5.8l-1.3,3.9
                h-2.8l5.7-14.8h2.7l5.6,14.8H267.8z M261.4,585.9h4.2l-1.2-3.6c-0.3-0.8-0.6-1.8-0.9-2.7h0c-0.3,1-0.5,1.7-0.8,2.7L261.4,585.9z
                 M272.2,592v-14.8h2.6v12.5h7.4v2.2H272.2z M284.9,592v-12.5h-4.8v-2.2h12.2v2.2h-4.8V592H284.9z M294,587.1v-9.9h2.6v9.8
                c0,2.1,1.5,3.1,3.4,3.1c1.9,0,3.4-1,3.4-3.1v-9.8h2.6v9.9c0,3.4-2.1,5.1-6,5.1C296,592.2,294,590.4,294,587.1z M309,592v-14.8h3
                l4.4,7.7c0.6,1.1,1.4,2.5,1.9,3.8h0c-0.1-1.3-0.1-3.3-0.1-4v-7.5h2.5V592h-3l-4.4-7.9c-0.4-0.8-1.3-2.4-1.8-3.6h0
                c0.1,1.5,0.1,3.5,0.1,3.9v7.5H309z M330.1,584h6.9v8h-2.2l-0.2-2c-0.9,1.4-2.6,2.2-4.6,2.2c-4.4,0-7-2.7-7-7.6
                c0-4.5,2.6-7.6,7.3-7.6c3.2,0,5.7,1.6,6.5,4.7l-2.7,0.5c-0.4-1.7-1.6-3.1-3.8-3.1c-1.5,0-2.7,0.5-3.5,1.5c-0.6,0.9-1,2.2-1,4
                c0,1.8,0.3,3.1,0.9,4c0.7,1,1.9,1.5,3.6,1.5c2.4,0,3.8-1.3,4-3.9h-4.3V584z M338.8,587.1l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C341.8,592.2,338.9,590.6,338.8,587.1z M353,585.8v-2.2h6.4v2.2H353z M361,587.1l2.7-0.3c0,2.2,1.5,3.3,3.5,3.3
                c1.9,0,3.4-0.6,3.4-2.3c0-1.7-2-1.7-4.2-2.2c-2.7-0.6-5.1-1.6-5.1-4.4c0-3.1,2.9-4.3,5.5-4.3c3.1,0,5.6,1.2,5.9,4.7l-2.7,0.5
                c-0.1-2-1.3-3.1-3.3-3.1c-1.5,0-2.8,0.6-2.8,2c0,1.3,1.6,1.8,3.7,2.1c3.1,0.5,5.6,1.3,5.6,4.5c0,3.6-3.1,4.6-6.1,4.6
                C363.9,592.2,361,590.6,361,587.1z M375.6,592v-14.8h2.6v12.5h7.4v2.2H375.6z M386.3,584.6c0-4.5,2.6-7.6,7.2-7.6
                c4.6,0,7.2,3.2,7.2,7.6c0,4.5-2.6,7.6-7.2,7.6C389,592.2,386.3,589.5,386.3,584.6z M396.9,588.6c0.7-1,1.1-2.4,1.1-4
                c0-1.7-0.4-3.1-1.1-4c-0.7-1-1.8-1.5-3.3-1.5c-1.6,0-2.8,0.5-3.4,1.4s-1.1,2.4-1.1,4.1c0,1.8,0.4,3.2,1,4c0.8,1,2,1.5,3.4,1.5
                C395.1,590.1,396.2,589.6,396.9,588.6z M406.2,592v-12.5h-4.8v-2.2h12.2v2.2h-4.8V592H406.2z"/>
        </g>
        </svg>
        
        </CalendarGraphic>
    )
}

export default CalendarGraphicComponent

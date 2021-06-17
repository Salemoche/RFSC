import React from 'react'
import { useEffect } from 'react';
import CalendarComponent from '../../components/3_elements/calendar/calendar.component';
import actions from '../../state/actions';
import { useBaseState } from '../../state/provider';
import BackgroundVideoComponent from '../../components/1_atoms/background-video/background-video.component';

function HomePage({ props }) {

    const updateBaseState = useBaseState().dispatchBase;

    useEffect(() => {
        return () => {
            // updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: true } });
        }
    }, [])

    const contentLoaded = () => {
        // updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: true } });
    }
    

    return (
        <div className="rfsc-content rfsc-home" onLoad={ contentLoaded }>
            <BackgroundVideoComponent/>
            <CalendarComponent/>
        </div>
    )
}

export default HomePage

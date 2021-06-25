import React, { useState } from 'react'
import { useEffect } from 'react';
import CalendarComponent from '../../components/3_elements/calendar/calendar.component';
import actions from '../../state/actions';
import { useBaseState } from '../../state/provider';
import BackgroundVideoComponent from '../../components/1_atoms/background-video/background-video.component';
import { useSpring, animated, useTransition } from 'react-spring';
import LoadingComponent from '../../components/2_molecules/loading/loading.component';

function HomePage({ props }) {

    const updateBaseState = useBaseState().dispatchBase;
    const base = useBaseState().state.base;
    // const [show, set] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);
        
    const transitions = useTransition( base.contentFetched, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: {
            duration: 300
        }
    });

    // useEffect(() => {
    //     return () => {
    //         // updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: true } });
    //     }
    // }, [])

    const handleContentLoaded = () => {
        // set(!show)
        setContentLoaded(!contentLoaded)
        updateBaseState({ type: actions.SET_BASE, payload: { handleContentLoaded: true } });
    }
    

    return (
        <div className="rfsc-content rfsc-home" onLoad={ handleContentLoaded }>
            {transitions((styles, item) => 
                item && //<AnimatedCalendarDetailsComponent type={'event'} style={styles}/>

                <animated.div style={styles}>
                    <BackgroundVideoComponent/>
                    <CalendarComponent/>               
                </animated.div>
            )}
        </div>
    )
}

export default HomePage

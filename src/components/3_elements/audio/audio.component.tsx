import React, { useRef, useEffect } from 'react'
import actions from '../../../state/actions';
import { useBaseState } from '../../../state/provider';

function AudioComponent() {
    
    const baseState = useBaseState().state;
    const updateBaseState = useBaseState().dispatchBase;
    const elementRef = useRef<HTMLAudioElement>(null);

    const handlePlay = () => {
        updateBaseState({ type: actions.TOGGLE_PLAY });
    }

    useEffect(() => {

        if (elementRef && elementRef.current) {
            console.log(baseState.sound.isPlaying, 'should change now');
            const audioPlayer = elementRef.current;
            if ( baseState.sound.isPlaying ) {
                elementRef.current.play();
            } else {
                elementRef.current.pause();
            }

        }
        return () => {
            
        }
    }, [baseState.sound.isPlaying])

    const styles = {
        display: 'none'
    }

    return (
        <div className="rfsc-audio" style={styles}>
            { baseState.base.contentLoaded ? 
                <audio controls ref={ elementRef } src={ baseState.sound.stream } preload="auto" ></audio>
            : 
                ''
            }
        </div>
    )
}

export default AudioComponent

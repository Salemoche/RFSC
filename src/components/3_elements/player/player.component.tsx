import React from 'react'
import actions from '../../../state/actions';
import { useBaseState } from '../../../state/provider';

function PlayerComponent() {
    
    const baseState = useBaseState().state;
    const updateBaseState = useBaseState().dispatchBase;

    const handlePlay = () => {
        updateBaseState({ type: actions.TOGGLE_PLAY });
    }

    return (
        <div>
            this is the player
            <button onClick={handlePlay}>Play / Pause</button>
            The music is { baseState.sound.isPlaying ? 'playing' : 'not playing' }
        </div>
    )
}

export default PlayerComponent

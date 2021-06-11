import React from 'react'
import actions from '../../../state/actions';
import { useBaseState } from '../../../state/provider';
import { ButtonStyles, NavPlayerStyles } from '../../../styles/default.styles';

function PlayerComponent() {
    
    const baseState = useBaseState().state;
    const updateBaseState = useBaseState().dispatchBase;
    console.log(baseState)

    const handlePlay = () => {
        updateBaseState({ type: actions.TOGGLE_PLAY });
    }

    return (
        <NavPlayerStyles className="rfsc-nav-player" styles={ baseState.base.styles }>
            { baseState.base.contentLoaded ? 
                <ButtonStyles  className="rfsc-nav-player__button rfsc-button" onClick={handlePlay} styles={ baseState.base.styles }>
                    <div className="rfsc-nav-player__button__icon rfsc-icon">
                        <img src={ baseState.base.icons.iconPlay.sourceUrl } alt="" />
                    </div>
                    { baseState.sound.isPlaying ? 'Pause' : 'Play' }
                </ButtonStyles>
            : 
                ''
            }
        </NavPlayerStyles>
    )
}

export default PlayerComponent

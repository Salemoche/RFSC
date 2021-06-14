import React from 'react'
import actions from '../../../state/actions';
import { useBaseState } from '../../../state/provider';
import { ButtonStyles, IconStyles, NavPlayerStyles } from '../../../styles/default.styles';

function PlayerComponent() {
    
    const { base, sound } = useBaseState().state;
    const updateBaseState = useBaseState().dispatchBase;

    const handlePlay = () => {
        updateBaseState({ type: actions.TOGGLE_PLAY });
    }

    return (
        <NavPlayerStyles className="rfsc-nav-player" styles={ base.styles }>
            { base.contentLoaded ? 
                <React.Fragment>
                    <IconStyles className="rfsc-nav-player__button__icon rfsc-icon" styles={base.styles}>
                        { sound.onAir ?
                            sound.isPlaying ? 
                                <img src={ base.icons.iconPause.sourceUrl } alt="pause-icon" />
                            :
                                <img src={ base.icons.iconPlay.sourceUrl } alt="play-icon" />
                        :
                            ''
                        }
                    </IconStyles>
                    <ButtonStyles  className="rfsc-nav-player__button rfsc-button" onClick={handlePlay} styles={ base.styles }>
                        { sound.isPlaying ? 'Pause' : 'Play' }
                    </ButtonStyles>
                </React.Fragment>
            : 
                ''
            }
        </NavPlayerStyles>
    )
}

export default PlayerComponent

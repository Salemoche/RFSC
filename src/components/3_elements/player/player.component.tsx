import axios from 'axios';
import React, { useEffect, useState } from 'react'
import actions from '../../../state/actions';
import { useBaseState } from '../../../state/provider';
import { ButtonStyles, IconStyles, NavPlayerStyles } from '../../../styles/default.styles';

function PlayerComponent() {
    
    const { base, sound } = useBaseState().state;
    const updateBaseState = useBaseState().dispatchBase;

    useEffect(() => {
        fetchRadio();
    }, [])

    const handlePlay = () => {
        if (sound.onAir) {
            updateBaseState({ type: actions.TOGGLE_PLAY });
        }
    }

    const fetchRadio = async () => {
        
        const response = await axios.get('https://api.mixlr.com/users/4674673?source=embed');
        const data = await response.data;
        const onAir = data.is_live;
        const radioText = data.current_broadcast?.title
        const stream = data.live_stream_url;

        updateBaseState({ type: actions.SET_SOUND, payload: { onAir, radioText, stream } });

    }

    return (
        <NavPlayerStyles className="rfsc-nav-player" styles={ base.styles }>
            { base.contentLoaded ? 
                <React.Fragment>
                    { sound.onAir ?
                        <IconStyles className="rfsc-nav-player__button__icon rfsc-icon" styles={base.styles}>
                            {sound.isPlaying ? 
                                <img src={ base.icons.iconPause.sourceUrl } alt="pause-icon" />
                            :
                                <img src={ base.icons.iconPlayFooter.sourceUrl } alt="play-icon" />
                            }
                        
                        </IconStyles>
                        :
                            ''
                    }
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

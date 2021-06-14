import React from 'react'
import actions from '../../state/actions';
import { useBaseState } from '../../state/provider';
import { RadioStyles } from '../../styles/default.styles';


function RadioPage() {
    const radio = useBaseState().state.content.radio;
    const sound = useBaseState().state.sound;
    const base = useBaseState().state.base;
    const updateCalendar = useBaseState().dispatchBase;

    // console.log(radio, sound, base)

    const handlePlay = () => {
        updateCalendar({ type: actions.TOGGLE_PLAY });
    }

    return (
        <RadioStyles className="rfsc-content rfsc-radio" styles={ base.styles } sizes={ base.sizes }>
        { base.contentLoaded ? 
            <React.Fragment>
                <div className="rfsc-radio__header"></div>
                <div className="rfsc-radio__content">
                    <div className="rfsc-radio__icon rfsc-radio__icon-left">
                        <img src={ radio.iconLeft.sourceUrl } alt="radio-icon-left" />
                    </div>
                    <div className="rfsc-radio__player" onClick={ handlePlay }>
                        { sound.onAir ?
                            sound.isPlaying ? 
                                <img src={ base.icons.iconPause.sourceUrl } alt="pause-icon" />
                            :
                                <img src={ base.icons.iconPlay.sourceUrl } alt="play-icon" />
                        :
                            <div className="rfsc-radio__player__message">{ radio.offlineText }</div>
                        }
                    </div>
                    <div className="rfsc-radio__icon rfsc-radio__icon-right">
                        <img src={ radio.iconRight.sourceUrl } alt="radio-icon-right" />
                    </div>
                </div>
                <div className="rfsc-radio__footer"></div>
            </React.Fragment>
        : 
            ''
        }
        </RadioStyles>
    )
}

export default RadioPage

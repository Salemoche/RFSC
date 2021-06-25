import React, { useEffect, useState } from 'react'
import actions from '../../state/actions';
import { useBaseState } from '../../state/provider';
import { RadioStyles } from '../../styles/default.styles';
import ImageContainerComponent from '../../components/1_atoms/image-container/image-container.component';
import BannerComponent from '../../components/1_atoms/banner/banner.component';
import { useTransition, animated } from 'react-spring';


function RadioPage() {
    const radio = useBaseState().state.content.radio;
    const sound = useBaseState().state.sound;
    const base = useBaseState().state.base;
    const updateBaseState = useBaseState().dispatchBase;
    const [contentLoaded, setContentLoaded] = useState(false);
        
    const transitions = useTransition( base.contentFetched && radio, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: {
            duration: 300
        }
    });

    // console.log(radio, sound, base)

    useEffect(() => {
        updateBaseState({ type: actions.SET_BASE, payload: { headerFooterClass: 'radio' } });
        // updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: true } });
        return () => {       
            updateBaseState({ type: actions.SET_BASE, payload: { headerFooterClass: 'default' } });
            // updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: false } });
        }
    }, [])

    const handlePlay = () => {
        if (sound.onAir) {
            updateBaseState({ type: actions.TOGGLE_PLAY });
        }
    }

    // const handleOnLoad = (e) => {
    //     console.log(e.target);
    // }

    // const contentLoaded = () => {
    //     // updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: true } });
    // }

    return (
        transitions((styles, item) => 
            item && //<AnimatedCalendarDetailsComponent type={'event'} style={styles}/>
            
            <animated.div style={styles}>
            <RadioStyles className="rfsc-content rfsc-radio" styles={ base.styles } sizes={ base.sizes }>
                <div className="rfsc-radio__header"></div>
                <div className="rfsc-radio__content">
                    <BannerComponent src={radio.banners?.bannerTop?.sourceUrl} position={'top: 0; position: absolute;'}/>
                    <div className="rfsc-radio__icon rfsc-radio__icon-left">
                        <ImageContainerComponent src={ radio.iconLeft.sourceUrl } alt="radio-icon-left"/>
                    </div>
                    <div className="rfsc-radio__player" onClick={ handlePlay }>
                        { sound.onAir ?
                            sound.isPlaying ? 
                                <ImageContainerComponent src={ base.icons.iconPause.sourceUrl } alt="pause-icon"/>
                            :
                                <ImageContainerComponent src={ base.icons.iconPlay.sourceUrl } alt="play-icon"/>
                        :
                            <div className="rfsc-radio__player__message">{ radio.offlineText }</div>
                        }
                    </div>
                    <div className="rfsc-radio__icon rfsc-radio__icon-right">
                        <ImageContainerComponent src={ radio.iconRight.sourceUrl } alt="radio-icon-right"/>
                    </div>
                    <BannerComponent src={radio.banners?.bannerBottom?.sourceUrl} position={'bottom: 0; position: absolute;'}/>
                </div>
                <div className="rfsc-radio__footer"></div>
                </RadioStyles>
                </animated.div>
        )
    )
}

export default RadioPage

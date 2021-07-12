import React, { useEffect, useState } from 'react'
import actions from '../../state/actions';
import { useBaseState } from '../../state/provider';
import { RadioStyles } from '../../styles/default.styles';
import ImageContainerComponent from '../../components/1_atoms/image-container/image-container.component';
import BannerComponent from '../../components/1_atoms/banner/banner.component';
import { useTransition, animated } from 'react-spring';
import Marquee from "react-fast-marquee";
import BackgroundVideoComponent from '../../components/1_atoms/background-video/background-video.component';
import { ReactFitty } from 'react-fitty';

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

    const handleClickPlay = () => {

        if (sound.onAir) {
            if (window.innerWidth < 768) {
                window.open(sound.stream, '_blank');
            } else {
                updateBaseState({ type: actions.TOGGLE_PLAY });
            }
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
                    <BackgroundVideoComponent/>
                    <Marquee className="rfsc-radio__marquee rfsc-radio__marquee-top" gradient={false} speed={100}>
                        { sound.onAir ?
                            sound.radioText ?
                                <React.Fragment>
                                    {sound.radioText + ' '}
                                    {sound.radioText + ' '}
                                </React.Fragment>
                            :
                                <span>ONLINE ONLINE </span>
                        :
                            <React.Fragment>
                                { radio.offlineText + ' ' }
                                { radio.offlineText + ' ' }
                            </React.Fragment>
                        }
                    </Marquee>
                    <div className="rfsc-radio__content">
                        { sound.onAir ?
                            <React.Fragment>
                                <div className="rfsc-radio__icon rfsc-radio__icon-left">
                                    <ImageContainerComponent src={ radio.iconLeft.sourceUrl } alt="radio-icon-left"/>
                                </div>
                                <div className="rfsc-radio__player" onClick={ handleClickPlay }>
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
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <div className="rfsc-radio__icon offline rfsc-radio__icon-left"></div>
                                <div className="rfsc-radio__player offline" onClick={ handleClickPlay }>
                                    <ImageContainerComponent src={ radio.iconLeft.sourceUrl } alt="radio-icon-left"/>
                                </div>
                                <div className="rfsc-radio__icon offline rfsc-radio__icon-right"></div>
                            </React.Fragment>
                        }
                        {/* <BannerComponent src={radio.banners?.bannerBottom?.sourceUrl} position={'bottom: 0; position: absolute;'}/> */}
                    </div>
                    <a href="https://soundcloud.com/summer_camp" target="_blank" className="rfsc-radio__footer">
                        <div>SOUNDCLOUD</div>
                    </a>
                </RadioStyles>
            </animated.div>
        )
    )
}

export default RadioPage

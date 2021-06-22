import React, { useEffect, useState } from 'react'
import actions from '../../state/actions';
import { useBaseState } from '../../state/provider';
import { InfoStyles } from '../../styles/default.styles'
import BannerComponent from '../../components/1_atoms/banner/banner.component';
import { useTransition, animated } from 'react-spring';

function InfoPage() {

    const styles = useBaseState().state.base.styles;
    const base = useBaseState().state.base;
    const infos = useBaseState().state.content.infos;
    const updateBaseState = useBaseState().dispatchBase;
    const [contentLoaded, setContentLoaded] = useState(false);
    
    const transitions = useTransition( base.contentFetched, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: {
            duration: 300
        }
    });

    useEffect(() => {
        updateBaseState({ type: actions.SET_BASE, payload: { headerFooterClass: 'info' } });
        updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: true } });

        return () => {
            updateBaseState({ type: actions.SET_BASE, payload: { headerFooterClass: 'default' } });            
            // updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: false } });
        }
    }, [])

    // const contentLoaded = () => {
    //     updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: true } });
    //     console.log('loaded')
    // }

    return (

        transitions((styles, item) => 
            item && //<AnimatedCalendarDetailsComponent type={'event'} style={styles}/>

            <animated.div style={styles}>
            <InfoStyles className="rfsc-content rfsc-infos" styles={ styles }>
                <BannerComponent src={ infos?.banners?.bannerTop?.sourceUrl } position={'top: 0; position: relative;'}/>
                <div 
                    className="rfsc-infos__content" 
                    dangerouslySetInnerHTML={{ __html: infos.content }}    
                ></div>                    
                <BannerComponent src={ infos?.banners?.bannerBottom?.sourceUrl } position={'bottom: 0; position: relative;'}/>
            </InfoStyles>
            </animated.div>
        )
    )
}

export default InfoPage

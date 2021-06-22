import React, { useEffect, useState } from 'react'
import SignUpFormComponent from '../../components/2_molecules/sign-up-form/sign-up-form.component';
import actions from '../../state/actions';
import { useBaseState } from '../../state/provider';
import { SpaceStyles } from '../../styles/default.styles';
import ImageContainerComponent from '../../components/1_atoms/image-container/image-container.component';
import BannerComponent from '../../components/1_atoms/banner/banner.component';
import { animated, useTransition } from 'react-spring';

function SpacePage() {

    const space = useBaseState().state.content.space;
    const base = useBaseState().state.base;
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
        updateBaseState({ type: actions.SET_BASE, payload: { headerFooterClass: 'space' } });

        return () => {
            updateBaseState({ type: actions.SET_BASE, payload: { headerFooterClass: 'default' } });
            // updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: false } });
        }
    }, [])
    // console.log(space)

    // const contentLoaded = () => {
    //     // updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: true } });
    // }

    return (
        transitions((styles, item) => 
            item &&
            <animated.div style={styles}>
                <SpaceStyles className="rfsc-content rfsc-space" styles={ base.styles }>
                    <BannerComponent src={space.banners?.bannerTop?.sourceUrl} position={'top: 0; position: relative;'}/>
                    <div className="rfsc-space__icon">
                        <ImageContainerComponent src={space.icon.sourceUrl} alt="space-icon"/>
                    </div>
                    <div className="rfsc-space__content">
                        <div className="rfsc-space__content__text" dangerouslySetInnerHTML={{__html: space.content}}></div>
                        <SignUpFormComponent/>
                    </div>
                    <BannerComponent src={space.banners?.bannerBottom?.sourceUrl} position={'bottom: 0; position: relative;'}/>
                
                </SpaceStyles>
            </animated.div>
        )
    )
}

export default SpacePage

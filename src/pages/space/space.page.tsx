import React, { useEffect } from 'react'
import SignUpFormComponent from '../../components/2_molecules/sign-up-form/sign-up-form.component';
import actions from '../../state/actions';
import { useBaseState } from '../../state/provider';
import { SpaceStyles } from '../../styles/default.styles';
import ImageContainerComponent from '../../components/1_atoms/image-container/image-container.component';

function SpacePage() {

    const space = useBaseState().state.content.space;
    const base = useBaseState().state.base;
    const updateBaseState = useBaseState().dispatchBase;

    useEffect(() => {
        updateBaseState({ type: actions.SET_BASE, payload: { headerFooterClass: 'space' } });

        return () => {
            updateBaseState({ type: actions.SET_BASE, payload: { headerFooterClass: 'default' } });
            updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: false } });
        }
    }, [])
    // console.log(space)

    const contentLoaded = () => {
        updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: true } });
    }

    return (
        <SpaceStyles className="rfsc-content rfsc-space" styles={ base.styles } onLoad={ contentLoaded }>
            { base.contentFetched ? 
                <React.Fragment>
                    <div className="rfsc-space__icon">
                        <ImageContainerComponent src={space.icon.sourceUrl} alt="space-icon"/>
                    </div>
                    <div className="rfsc-space__content">
                        <div className="rfsc-space__content__text" dangerouslySetInnerHTML={{__html: space.content}}></div>
                        <SignUpFormComponent/>
                    </div>
                </React.Fragment>
            : 
                ''
            }
        </SpaceStyles>
    )
}

export default SpacePage

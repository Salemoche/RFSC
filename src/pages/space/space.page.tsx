import React, { useEffect } from 'react'
import SignUpFormComponent from '../../components/2_molecules/sign-up-form/sign-up-form.component';
import actions from '../../state/actions';
import { useBaseState } from '../../state/provider';
import { SpaceStyles } from '../../styles/default.styles';

function SpacePage() {

    const space = useBaseState().state.content.space;
    const base = useBaseState().state.base;
    const setheaderFooterClass = useBaseState().dispatchBase;

    useEffect(() => {
        setheaderFooterClass({ type: actions.SET_BASE, payload: { headerFooterClass: 'space' } });

        return () => {
            setheaderFooterClass({ type: actions.SET_BASE, payload: { headerFooterClass: 'default' } });
        }
    }, [])
    // console.log(space)

    return (
        <SpaceStyles className="rfsc-content rfsc-space" styles={ base.styles }>
            { base.contentLoaded ? 
                <React.Fragment>
                    <div className="rfsc-space__icon">
                        <img src={space.icon.sourceUrl} alt="space-icon" />
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

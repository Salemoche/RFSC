import React from 'react'
import SignUpFormComponent from '../../components/2_molecules/sign-up-form/sign-up-form.component';
import { useBaseState } from '../../state/provider';
import { SpaceStyles } from '../../styles/default.styles';

function SpacePage() {

    const space = useBaseState().state.content.space;
    const base = useBaseState().state.base;
    // console.log(space)

    return (
        <SpaceStyles className="rfsc-content rfsc-space">
            { base.contentLoaded ? 
                <React.Fragment>
                    <div className="rfsc-space__icon">
                        <img src={space.icon.sourceUrl} alt="space-icon" />
                    </div>
                    <div className="rfsc-space__content" dangerouslySetInnerHTML={{__html: space.content}}></div>
                    <SignUpFormComponent/>
                </React.Fragment>
            : 
                ''
            }
        </SpaceStyles>
    )
}

export default SpacePage

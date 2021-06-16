import React from 'react'
import { LoadingStyles } from '../../../styles/default.styles';
import { useBaseState } from '../../../state/provider';

function LoadingComponent() {

    const base = useBaseState().state.base;    
    // const content = useBaseState().state.content;

    return (
        <React.Fragment>
            { !base.contentLoaded ?    
                <LoadingStyles styles={base.styles}>
                    loading...
                </LoadingStyles>
            :
                ''
            }
        </React.Fragment>
    )
}

export default LoadingComponent

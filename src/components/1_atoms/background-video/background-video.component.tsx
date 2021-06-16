import React from 'react'
import { BackgroundVideoComponentStyles } from '../../../styles/default.styles';
// import video from '../../../assets/video/background_gray.mp4';
import { useBaseState } from '../../../state/provider';

function BackgroundVideoComponent() {

    const backgrounds = useBaseState().state.base.backgrounds;  
    // console.log(backgrounds);

    return (
        <BackgroundVideoComponentStyles>
            <video className="rfsc-background-video" muted autoPlay>
                <source src={ backgrounds.gray.mediaItemUrl } />
            </video>
        </BackgroundVideoComponentStyles>
    )
}

export default BackgroundVideoComponent

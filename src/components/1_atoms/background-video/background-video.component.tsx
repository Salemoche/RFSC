import React from 'react'
import { BackgroundVideoComponentStyles } from '../../../styles/default.styles';
// import video from '../../../assets/video/background_gray.mp4';
import { useBaseState } from '../../../state/provider';

function BackgroundVideoComponent() {

    const backgrounds = useBaseState().state.base.backgrounds;  
    // console.log(backgrounds);

    return (
        <BackgroundVideoComponentStyles>
            <video className="rfsc-background-video"src={ backgrounds.gray.mediaItemUrl } muted={true} autoPlay loop>
                {/* <source src={ backgrounds.gray.mediaItemUrl } /> */}
            </video>
        </BackgroundVideoComponentStyles>
    )
}

export default BackgroundVideoComponent

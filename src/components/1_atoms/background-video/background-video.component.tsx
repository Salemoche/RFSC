import React from 'react'
import { BackgroundVideoComponentStyles } from '../../../styles/default.styles';
// import video from '../../../assets/video/background_gray.mp4';
import { useBaseState } from '../../../state/provider';

function BackgroundVideoComponent() {

    const backgrounds = useBaseState().state.base.backgrounds;  
    // console.log(backgrounds);

    return (
        <BackgroundVideoComponentStyles>
            { window.innerWidth > 768 ?
                <div className="rfsc-background-video">
                    <img src={ backgrounds.gray.placeholder.sourceUrl } alt="" />
                    <video preload="metadata" muted={true} autoPlay loop>
                        <source className="rfsc-background-video" src={` ${backgrounds.gray.video.mediaItemUrl}#t=0.5 `} type="video/mp4" />
                    </video>
                </div>
            :
                <img src={ backgrounds.gray.placeholderMobile.sourceUrl } alt="" className="rfsc-background-placeholder" />
            }
        </BackgroundVideoComponentStyles>
    )
}

export default BackgroundVideoComponent

import React from 'react'
import { BannerStyles } from '../../../styles/default.styles';
// import video from '../../../assets/video/background_gray.mp4';
import { useBaseState } from '../../../state/provider';
import ImageContainerComponent from '../image-container/image-container.component';

function BannerComponent({src, position}) {

    const backgrounds = useBaseState().state.base.backgrounds;  
    // console.log(backgrounds);

    return (
        <BannerStyles className="rfsc-banner" position={position}>
            <ImageContainerComponent src={src} alt="date-banner" />
        </BannerStyles>
    )
}

export default BannerComponent

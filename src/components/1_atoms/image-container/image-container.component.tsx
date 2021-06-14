import React, { useState } from 'react';
import { ImageStyles } from '../../../styles/default.styles'

function ImageContainerComponent({ src, alt }) {

    const [imageLoaded, setImageLoaded] = useState(false);

    const handleOnLoad = () => {
        setImageLoaded(true);
        console.log('yeah');
    }

    return (
        <ImageStyles className="rfsc-image" imageLoaded={ imageLoaded }>
            <div className="rfsc-image-preloader"></div>
            <img src={src} alt={alt} onLoad={ handleOnLoad } />
        </ImageStyles>
    )
}

export default ImageContainerComponent
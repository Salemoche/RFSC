import React, { useState } from 'react';
import { ImageStyles } from '../../../styles/default.styles'

function ImageContainerComponent({ src, alt, className = '', hasLoader = true }) {

    const [imageLoaded, setImageLoaded] = useState(false);

    const handleOnLoad = () => {
        setImageLoaded(true);
    }

    return (
        <ImageStyles className={`rfsc-image ${className}`} imageLoaded={ imageLoaded } hasLoader={hasLoader}>
            { src ?
                <React.Fragment>
                    <div className="rfsc-image-preloader"></div>
                    <img src={src} alt={alt} onLoad={ handleOnLoad } />
                </React.Fragment>
            :
                ''
            }
        </ImageStyles>
    )
}

export default ImageContainerComponent
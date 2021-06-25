import styled, { createGlobalStyle } from 'styled-components'
import { animation } from './animation.styles';
// import { getTypography } from '../utils/helpers';


const getTypography = (props) => {
    const options = { 
        styles: defaultStyles, 
        size: 'fontMedium',
        fontSize: defaultStyles.typography.fontMedium.large.fontSize,
        lineHeight: defaultStyles.typography.fontMedium.large.lineHeight,
        letterSpacing: defaultStyles.typography.fontMedium.large.letterSpacing,
        ...props
    }

    
    const { typography } = options.styles;

    const styles = `
        font-size: ${ typography[options.size].large.fontSize };
        line-height: ${ typography[options.size].large.lineHeight };
        letter-spacing: ${ typography[options.size].large.letterSpacing };

        @media screen and ( max-width: ${ options.styles.breakpoints.large }px ) {
            font-size: ${ typography[options.size].large.fontSize };
            line-height: ${ typography[options.size].large.lineHeight };
            letter-spacing: ${ typography[options.size].large.letterSpacing };
        }

        @media screen and ( max-width: ${ options.styles.breakpoints.medium }px ) {
            font-size: ${ typography[options.size]?.medium?.fontSize || typography[options.size].small.fontSize };
            line-height: ${ typography[options.size]?.medium?.lineHeight || typography[options.size].small.lineHeight };
            letter-spacing: ${ typography[options.size]?.medium?.letterSpacing || typography[options.size].small.letterSpacing };
        }

        @media screen and ( max-width: ${ options.styles.breakpoints.small }px ) {
            font-size: ${ typography[options.size].small.fontSize };
            line-height: ${ typography[options.size].small.lineHeight };
            letter-spacing: ${ typography[options.size].small.letterSpacing };
        }
    `

    return styles
}

export const defaultStyles = {
    colors: {
        grayOpacity: '#00000044',
        grayReal: '#ccc',
        green: '#d0ff00',
        red: '#ff0000',
        grayFont: '#00000059',
        backgroundGrayOpacity: '#cccccc',
        backgroundGreenOpacity: '#d0ff00',
        backgroundWhiteOpacity: '#ffffff'
    },
    zIndices: {
        header: 100,
        details: 20,
        list: 15,
        locations: 10,
        types: 5,
    },
    spacing: {
        extraExtraSmall: 2,
        extraSmall: 4,
        small: 8,
        medium: 16,
        large: 32,
        extraLarge: 64,
        extraExtraLarge: 128
    },
    typography: {
        fontLarge: {
            large: {
                fontSize: '42px',
                lineHeight: 1,
                letterSpacing: '0.8px'
            },
            medium: {
                fontSize: '30px',
                lineHeight: 1,
                letterSpacing: '0.7px'
            },
            small: {
                fontSize: '7vw',
                lineHeight: 1,
                letterSpacing: '0.8px'
            },
        },
        fontExtraLarge: {
            large: {
                fontSize: '42px',
                lineHeight: 1,
                letterSpacing: '0.8px'
            },
            medium: {
                fontSize: '30px',
                lineHeight: 1,
                letterSpacing: '0.7px'
            },
            small: {
                fontSize: '12vw',
                lineHeight: 1,
                letterSpacing: '0.8px'
            },
        },
        fontMedium: {
            large: {
                fontSize: '23px',
                lineHeight: 1.1,
                letterSpacing: '0.8px'
            },
            small: {
                fontSize: '17px',
                lineHeight: 1.2,
                letterSpacing: '0.8px'
            },
        },
        fontSmall: {
            large: {
                fontSize: '19px',
                lineHeight: 1,
            },
            small: {
                fontSize: '16px',
                lineHeight: 1,
            },
        },

    },
    animation: {
        transitions: {
            regular: '.1s',
            long: '.3s',
            extraLong: '.6s',
            extraExtraLong: '1s'
        }
    },
    breakpoints: {
        xxLarge: 1800,
        xLarge: 1440,
        large: 1080,
        medium: 768,
        small: 420,
        xSmall: 320,
    }
}

export const GlobalStyle = createGlobalStyle `

    * {
        box-sizing: border-box;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        overflow: hidden;

        font-family: 'Monument', 'Helvetica', 'Arial', sans-serif;
        /* font-size: ${defaultStyles.typography.fontMedium.large.fontSize}px;
        letter-spacing: ${defaultStyles.typography.fontMedium.large.letterSpacing}px;
        line-height: ${defaultStyles.typography.fontMedium.large.lineHeight}; */
        ${getTypography({size: 'fontMedium'})}
    }

    a {
        text-decoration: none;
        color: black;
        transition: color .1s;

        &.active {
            color: ${props => (defaultStyles.colors.red)};
            cursor: default;
        }

        &:hover {
            color: ${props => (defaultStyles.colors.red)};
        }
    }

    p {
        margin-top: 0;
        margin-bottom: 0;
        letter-spacing: 0.7px;

        &:not(:last-of-type) {
            margin-bottom: ${props => defaultStyles.spacing.medium}px;
        }

        a {
            text-decoration: underline;
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-top: 0;
        font-weight: 400;
        text-transform: uppercase;
    }

    // animation 
    ${animation.blinking}
    ${animation.blinkingInOut}
`

export const AppStyles = styled.div `
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 
        ${props => (props.sizes.headerHeight)}px
        auto 
        ${props => (props.sizes.footerHeight)}px;
    height: 100vh;
    width: 100vw;

    @media screen and (max-width: ${ defaultStyles.breakpoints.medium }px ) {
        grid-template-rows: 
        calc( ${props => (props.sizes.headerHeight) + 5 }px) 
            auto 
    }
`

export const MainStyles = styled.main `
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 13;
    position: relative;
    background-color: ${props => (props.styles.colors.grayOpacity)};

    .rfsc-content {
        height: 100%;
        width: 100%;
        position: absolute;
        /* padding: 0 ${props => (props.styles.spacing.small)}px;  */

        &:not(.rfsc-home, .rfsc-radio) {
            overflow-y: scroll;

            /* -ms-overflow-style: none;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            } */
        }

        .rfsc-infos__content,
        .rfsc-space__content {
            /* display: block; */
            width: 1024px;
            /* height: 1024px; */
            max-width: calc( 100% - ${props => (props.styles.spacing.medium)}px);
            /* max-height: calc( 100% - ${props => (props.styles.spacing.medium)}px); */
            /* font-size: ${props => (props.styles.typography.fontMedium.large.fontSize)}px;
            line-height: ${props => (props.styles.typography.fontMedium.large.lineHeight)}; */
            ${getTypography({size: 'fontMedium'})}
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            > * {
                width: 100%;
            }

            p img {
                width: 500px;
                height: 500px;
                max-height: calc( 100vw - ${props => (props.styles.spacing.large)}px);
                max-width: calc( 100vw - ${props => (props.styles.spacing.large)}px);
                max-width: 60vw;
                max-height: 60vw;
                margin-top: ${props => props.styles.spacing.extraLarge}px;
                margin-bottom: ${props => props.styles.spacing.extraLarge}px;
            }
            
            .rfsc-space__content__text {
                margin-bottom: ${props => props.styles.spacing.medium}px;
            }
        }
    }

    
    

    @media screen and (max-width: ${ defaultStyles.breakpoints.medium }px ) {
        /* padding-bottom: 0 ${props => (props.styles.spacing.extraExtraLarge)}px;  */

        .rfsc-content {
            padding-bottom: ${props => (props.styles.spacing.extraExtraLarge)}px; 
        }

    }
` 

export const SpaceStyles = styled.div `

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* padding-bottom: ${props => (props.styles.spacing.extraLarge)}px; */
    background: white;

    a {
        text-decoration: none;
        color: black;
        transition: color .1s;

        &.active {
            color: black;
            cursor: default;
        }

        &:hover {
            color: black;
        }
    }

    .rfsc-space__content {
        /* opacity: 0.3; */
    }

    .rfsc-space__icon {
        width: 100%;
        /* padding-bottom: 100%; */
        margin-top: ${props => (props.styles.spacing.extraLarge)}px;
        margin-top: -${props => (props.styles.spacing.extraExtraLarge)}px;
        margin-bottom: ${props => (props.styles.spacing.large)}px;
        /* opacity: 0.3; */

        img {
            width: 414px;
            max-width: 80vw;
            margin: 0 auto;
            display: block;
        }
    }

`

export const InfoStyles = styled.div `
    background-color: white;
    
    .rfsc-infos__content {

        .aligncenter {
            margin: 0 auto;
            display: block;
        }
    }
`

export const ButtonStyles = styled.div `
    background: none;
    border: none;
    /* font-size: ${props => props.styles.typography.fontLarge.large.fontSize}px;
letter-spacing: ${props => props.styles.typography.fontLarge.large.letterSpacing}px;
    line-height: ${props => props.styles.typography.fontLarge.large.lineHeight}; */
    ${getTypography({size: 'fontLarge'})}

    display: inline-block;
    cursor: pointer;
    transition: opacity, color ${props => (props.styles.animation.transitions.long)};

    &:hover {
        color: ${props => props.styles.colors.red};
    }

    /* .rfsc-icon {
        display: inline;
    } */

    ${props => {
        if (props.className) {
            if (props.className.includes('color-')) {
                const color = props.className.split('color-')[1]
                return `color: ${ props.styles.colors[color]}`
            }
        }
    }}
`

const getHeaderFooterStyles = ({ styles, className}, header = true) => {
    if (className.includes('info') || className.includes('space') || className.includes('radio')) {
        return styles.colors.grayOpacity;
    } else {
        return styles.colors.grayOpacity;
    }
    
}

export const HeaderStyles = styled.nav `
    width: 100%;
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 13;
    background-color: ${props => getHeaderFooterStyles(props)};
    /* font-size: ${props => (props.styles.typography.fontLarge.large.fontSize)}px;
    line-height: ${props => (props.styles.typography.fontLarge.large.lineHeight)}; */
    ${getTypography({size: 'fontLarge'})}
    text-transform: uppercase;
    padding: 0 ${props => (props.styles.spacing.small)}px; 
    padding-top: 2px;
    transition: background-color ${props => (props.styles.animation.transitions.long)};
    z-index: ${props => props.styles.zIndices?.header};
    
    ul {
        width: 100%;
        height: 100%;
        align-items: center;
        display: flex;
        justify-content: space-between;
        list-style-type: none;
        padding: 0;
        margin: 0;

        .rfsc-close-icon svg {
            width: 30px;
            height: 30px;
        }

        a {
            transition: ${props => (props.styles.animation.transitions.long)};

            &:hover {
                color: ${props => (props.styles.colors.red)}
            }

            li {
                padding: 0;
                margin: 0;
            }
        }
    }
    

    @media screen and (max-width: ${ defaultStyles.breakpoints.medium }px ) {
        display: flex;
        align-items: flex-end;
        padding-bottom: ${props => (props.styles.spacing.small)}px;
        position: fixed;
        top: 0;
    }

    &.rfsc-header-mobile {
        height: ${props => (props.sizes.headerHeight) + 5}px;
        display: flex;
        justify-content: center;
        align-items: center;
        ${props => getTypography({styles: props.styles, size: 'fontExtraLarge'})}
        background: ${props => (props.styles.colors.grayReal)};
        padding: ${props => (props.styles.spacing.small)}px;

        .rfsc-header-mobile__button {    
            transform: translateY(2px);
            /* width: 100%;
            text-align: center; */
            &.rfsc-header-mobile-icon {
                min-width: 32px;
                min-height: 32px;
            }
        }

        .rfsc-header-mobile__menu {
            position: absolute;
            top: 100%;
        }

        &.menu-open {
            ul {
                opacity: 1;
                pointer-events: all;
            }
        }


        ul {
            opacity: 0;
            pointer-events: none;
            transition: ${props => (props.styles.animation.transitions.long)};
            padding: ${props => (props.styles.spacing.small)}px;
            padding-top: 0;
            background: ${props => (props.styles.colors.grayReal)};
            height: unset;

            flex-wrap: wrap;

            a {
                width: 100%;
                text-align: center;
                /* margin-top: ${props => (props.styles.spacing.small)}px; */
            }
        }
    }
`

export const FooterStyles = styled.footer `
    width: 100%;
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 13;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto;
    padding: 0 ${props => (props.styles.spacing.small)}px; 
    padding-top: ${props => (props.styles.spacing.extraSmall)}px;
    transition: background-color ${props => (props.styles.animation.transitions.long)};
    z-index: ${props => props.styles.zIndices?.header};

    /* display: flex; */
    /* justify-content: center; */

    ${getTypography({size: 'fontLarge'})}

    text-transform: uppercase;

    background-color: ${props => getHeaderFooterStyles(props, false)};

    .rfsc-nav-player {
        grid-column-start: 1;
        grid-column-end: 5;
        /* margin-right: auto;  */
        height: 100%;
        display: flex;
        align-items: center;

        .rfsc-nav-player__button {
            height: 100%;
            display: flex;
            align-items: center;
        }

        .rfsc-icon {
            /* height: 100%; */
            margin-right: ${props => (props.styles.spacing.extraSmall)}px;
            transform: translateY(-3px);
            /* margin-left: ${props => (props.styles.spacing.small)}px; */

            img {
                /* height: 100%; */
            }
        }
    }

    a {
        grid-column-start: 5;
        grid-column-end: 9;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: ${props => (props.styles.animation.transitions.long)};

        &:hover {
            color: ${props => (props.styles.colors.red)}
        }
    }

    .rfsc-footer-on-air {
        text-align: right;
        grid-column-start: 9;
        grid-column-end: 13;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        cursor: default;

        .rfsc-icon {
            opacity: 0;
            margin-left: ${props => (props.styles.spacing.extraSmall)}px;
            animation: rfsc_blink 1s infinite alternate;
            transform: translateY(1px);
            /* margin-right: ${props => (props.styles.spacing.small)}px; */
        }
        /* margin-left: auto;  */
    }
    

    @media screen and (max-width: ${ defaultStyles.breakpoints.medium }px ) {
        align-content: flex-start;
        padding-top: ${props => (props.styles.spacing.small)}px;
    }
`

export const NavPlayerStyles = styled.div `

`

export const RadioStyles = styled.div `

    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 
        ${props => (props.sizes.headerHeight)}px
        auto 
        ${props => (props.sizes.footerHeight)}px;
    height: 100vh;
    background-color: white;

    .rfsc-radio__header {
        grid-row-start: 1;
        grid-row-end: 2;
        grid-column-start: 1;
        grid-column-end: 13;
        background-color: ${props => (props.styles.colors.green)};
        display: none;
    }

    .rfsc-radio__content {
        grid-row-start: 2;
        grid-row-end: 3;
        grid-column-start: 1;
        grid-column-end: 13;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > div:not(.rfsc-banner) {
            width: 33%;

            &.rfsc-radio__icon {
                transform: scale(1.5);
                /* width: 33%; */
                /* height: 100%; */
            }

            &.rfsc-radio__player {
                cursor: pointer;
                /* width: 33%; */
                /* height: 100%; */
                .rfsc-image {
                    width: 200px;
                    max-width: 66%;
                    margin: 0 auto;
                    display: block;
                }

                .rfsc-radio__player__message {
                    text-align: center;
                    cursor: default;
                }
            }
        }
    }

    .rfsc-radio__footer {
        grid-row-start: 3;
        grid-row-end: 4;
        grid-column-start: 1;
        grid-column-end: 13;
        background-color: ${props => (props.styles.colors.green)};
        display: none;
    }

    @media screen and (max-width: ${ defaultStyles.breakpoints.medium }px ) {
        .rfsc-radio__content {

            display: flex;
            flex-wrap: wrap;

            > div:not(.rfsc-banner) {
                width: 100%;
                max-height: 33%;
                height: 200px;

                .rfsc-image {
                    width: 100%;
                    height: 100%;
                }

                &.rfsc-radio__icon {
                    transform: scale(1);
                    /* width: 33%; */
                    /* height: 100%; */
                }

                &.rfsc-radio__player {
                    cursor: pointer;
                    height: 100px;
                    /* width: 33%; */
                    /* height: 100%; */
                }
            }
        }
    }
`

export const IconStyles = styled.div`
    /* width: ${props => (props.styles.typography.fontLarge.large.fontSize)}px;
    height: ${props => (props.styles.typography.fontLarge.large.fontSize)}px; */
    width: 32px;
    height: 32px;
    display: inline-block;

    img {
        width: 100%;
        height: 100%;
    }
    

    @media screen and (max-width: ${ defaultStyles.breakpoints.medium }px ) {

        width: 28px;
        height: 28px;
    }
    

    @media screen and (max-width: ${ defaultStyles.breakpoints.small }px ) {

        width: 6vw;
        height: 6vw;
    }

`

export const FormStyles = styled.form`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    label {
        /* transform: translate(12px, 44px); */
        margin-top: ${props => (props.styles.spacing.medium)}px;
        margin-bottom: ${props => (props.styles.spacing.medium)}px;
    }

    input, 
    textarea,
    select {
        font-family: 'Monument', 'Helvetica', 'Arial', sans-serif;
        width: 100%;
        /* font-size: ${props => (props.styles.typography.fontMedium.large.fontSize)}px;
        line-height: ${props => (props.styles.typography.fontMedium.large.lineHeight)}; */
        ${getTypography({size: 'fontMedium'})}
        padding: ${props => (props.styles.spacing.small)}px;
        border: 2px solid black;
        border-radius: 0;
        margin-bottom: ${props => (props.styles.spacing.medium)}px;
        
        &[type="date"],
        &[type="time"] {
            width: calc(50% - ${props => (props.styles.spacing.small)}px)
        }

        &[type="submit"] {
            background: ${props => (props.styles.colors.grayReal)};
            transition: ${props => (props.styles.animation.transitions.long)};
            border: none;
            cursor: pointer;
            
            &:hover {
                color: ${props => (props.styles.colors.red)};
            }
        }
    }

    .rfsc-checkbox-container {
        width: 100%;
        display: grid;
        grid-template-columns: ${props => (props.styles.spacing.large)}px auto;
        margin-bottom: ${props => (props.styles.spacing.large)}px;
        
        label {
            grid-column-start: 1;
            grid-column-end: 3;
        }

        input[type="checkbox"] {
            grid-column-start: 1;
            grid-column-end: 2;
        }

        .rfsc-checkbox-label {
            display: inline-block;
            grid-column-start: 2;
            grid-column-end: 3;
            padding-left: ${props => (props.styles.spacing.large)}px;
        }
    }
`


export const ImageStyles = styled.div`

    position: relative;
    
    .rfsc-image-preloader {
        /* width: 100%;
        height: 100%; */
        width: 100px;
        height: 100px;
        /* padding-bottom: 100%; */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        
        ${props => {
            if (props.hasLoader) {
                return "background-image: url('https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif');"
            }
        }}

        background-position: center;
        background-size: cover;
        transition: .3s;
        
        ${props => {
            if (props.imageLoaded) {
                return `
                    opacity: 0;
                    pointer-events: none;
                `
            }
        }}
    }
    
    img {
        width: 100%;
        height: 100%;
        transition: .3s;
        opacity: 0;
        object-fit: contain;    
        
        ${props => {
            if (props.imageLoaded) {
                return `
                    opacity: 1;
                    pointer-events: all;
                `
            }
        }}
    }
`
export const LoadingStyles = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: white;
    z-index: 1000;
    transition: ${props => (props.styles.animation.transitions.extraLong)};
    /* ${props => (props.transitionStyles)} */

    .rfsc-loading__graphic {
        width: 500px;
        height: 500px;
        max-height: calc( 100vw - ${props => (props.styles.spacing.large)}px);
        max-width: calc( 100vw - ${props => (props.styles.spacing.large)}px);
        /* max-width: 80vw;
        max-height: 80vh; */


        svg {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

            .rfsc-loading-graphic-blink {
                opacity: 0;
            }

            #rfsc-loading-graphic__2 {
                animation: rfsc_blink_in_out 5s  0.5s infinite;
            }

            #rfsc-loading-graphic__text-summer {
                animation: rfsc_blink_in_out 5s infinite;
            }

            #rfsc-loading-graphic__text-camp {
                animation: rfsc_blink_in_out 5s infinite;
            }

            #rfsc-loading-graphic__1 {
                animation: rfsc_blink_in_out 5s  0.5s infinite;
            }
        }
    }

    @media screen and ( max-width: ${ defaultStyles.breakpoints.medium }px ) {
        .rfsc-loading__graphic {
            max-width: 50vw;
            max-height: 50vw;

            svg {
                max-width: 50vw;
                max-height: 50vw;
                top: calc(50% - 60px)
            }
        }
    }
`



export const BackgroundVideoComponentStyles = styled.div `
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
    /* z-index: -1; */

    .rfsc-background-video {
        width: 100%;
        height: 100%;

        video, img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
            /* pointer-events: none; */
        }

    }

`

export const BannerStyles = styled.div`
    width: 100%;
    left: 0;
    ${props => (props.position)}
    opacity: 0.3;
    
    img {
        width: 100%;
    }
    
    @media screen and (max-width: ${ defaultStyles.breakpoints.medium }px ) {
        /* padding: ${defaultStyles.spacing.small}px;
         */
    }
`
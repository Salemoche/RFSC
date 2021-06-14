import styled, { createGlobalStyle } from 'styled-components'

export const defaultStyles = {
    colors: {
        gray: '#00000044',
        green: '#d0ff00',
        red: '#ff0000',
        grayFont: '#00000059'
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
                fontSize: 42,
                lineHeight: 1,
            },
            small: {
                fontSize: 42,
                lineHeight: 1,
            },
        },
        fontMedium: {
            large: {
                fontSize: 28,
                lineHeight: 1.2,
            },
            small: {
                fontSize: 28,
                lineHeight: 1.2,
            },
        },
        fontSmall: {
            large: {
                fontSize: 21,
                lineHeight: 1,
            },
            small: {
                fontSize: 21,
                lineHeight: 1,
            },
        },

    },
    animation: {
        transitions: {
            regular: '.1s',
            long: '.3s'
        }
    },
}

export const GlobalStyle = createGlobalStyle `

    * {
        box-sizing: border-box;
    }

    body {
        overflow: hidden;

        font-family: 'Monument', 'Helvetica', 'Arial', sans-serif;
        font-size: ${defaultStyles.typography.fontSmall.large.fontSize}px;
        line-height: ${defaultStyles.typography.fontSmall.large.lineHeight};
    }

    a {
        text-decoration: none;
        color: black;

        &.active {
            color: ${props => (defaultStyles.colors.red)};
        }
    }

    p {
        margin-top: 0;

        &::not(:last-child) {
            margin-bottom: ${defaultStyles.spacing.medium};
        }
    }
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
`

export const MainStyles = styled.main `
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 13;
    position: relative;
    background-color: ${props => (props.styles.colors.gray)};

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
            height: 1024px;
            max-width: 80vw;
            max-height: 80vw;
            font-size: ${props => (props.styles.typography.fontMedium.large.fontSize)}px;
            line-height: ${props => (props.styles.typography.fontMedium.large.lineHeight)};
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
                max-width: 60vw;
                max-height: 60vw;
                margin-top: ${props => props.styles.spacing.extraLarge}px;
                margin-bottom: ${props => props.styles.spacing.extraLarge}px;
            }
        }
    }
` 

export const SpaceStyles = styled.div `

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: ${props => (props.styles.spacing.extraLarge)}px 0;
    background: white;

    .rfsc-space__content {
        opacity: 0.3;
    }

    .rfsc-space__icon {
        width: 100%;
        /* padding-bottom: 100%; */
        margin-bottom: ${props => (props.styles.spacing.large)}px;
        opacity: 0.3;

        img {
            width: 414px;
            max-width: 80vw;
            margin: 0 auto;
            display: block;
        }
    }

`

export const InfoStyles = styled.div `
    background-color: ${props => (props.styles.colors.green)};
    
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
    font-size: ${props => props.styles.typography.fontLarge.large.fontSize}px;
    line-height: ${props => props.styles.typography.fontLarge.large.lineHeight};
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
    if (className.includes('info') || className.includes('space')) {
        return styles.colors.gray;
    } else {
        return styles.colors.green;
    }
}

export const HeaderStyles = styled.nav `
    width: 100%;
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 13;
    background-color: ${props => getHeaderFooterStyles(props)};
    font-size: ${props => (props.styles.typography.fontLarge.large.fontSize)}px;
    line-height: ${props => (props.styles.typography.fontLarge.large.lineHeight)};
    text-transform: uppercase;
    padding: 0 ${props => (props.styles.spacing.small)}px; 
    
    ul {
        width: 100%;
        height: 100%;
        align-items: center;
        display: flex;
        justify-content: space-between;
        list-style-type: none;
        padding: 0;
        margin: 0;

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

    /* display: flex; */
    /* justify-content: center; */

    font-size: ${props => (props.styles.typography.fontLarge.large.fontSize)}px;
    line-height: ${props => (props.styles.typography.fontLarge.large.lineHeight)};
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

        .rfsc-icon {
            margin-left: ${props => (props.styles.spacing.extraSmall)}px;
            /* margin-right: ${props => (props.styles.spacing.small)}px; */
        }
        /* margin-left: auto;  */
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
        background-color: ${props => (props.styles.colors.green)}
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

        > div {
            width: 33%;

            &.rfsc-radio__icon {
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
            }
        }
    }

    .rfsc-radio__footer {
        grid-row-start: 3;
        grid-row-end: 4;
        grid-column-start: 1;
        grid-column-end: 13;
        background-color: ${props => (props.styles.colors.green)}
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

`

export const FormStyles = styled.form`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    input, 
    textarea,
    select {
        font-family: 'Monument', 'Helvetica', 'Arial', sans-serif;
        width: 100%;
        font-size: ${props => (props.styles.typography.fontMedium.large.fontSize)}px;
        line-height: ${props => (props.styles.typography.fontMedium.large.lineHeight)};
        padding: ${props => (props.styles.spacing.small)}px;
        border: 2px solid black;
        border-radius: 0;
        margin-bottom: ${props => (props.styles.spacing.medium)}px;
        
        &[type="date"],
        &[type="time"] {
            width: calc(50% - ${props => (props.styles.spacing.small)}px)
        }
    }
`


export const ImageStyles = styled.div`

    position: relative;
    
    .rfsc-image-preloader {
        width: 100%;
        height: 100%;
        min-width: 100px;
        min-height: 100px;
        /* padding-bottom: 100%; */
        position: absolute;
        top: 0;
        left: 0;
        background-image: url('https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif');
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
    }
`

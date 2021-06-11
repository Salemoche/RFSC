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
    typography: {
        large: {
            large: {
                fontSize: 42,
                lineHeight: 1,
            },
            small: {
                fontSize: 42,
                lineHeight: 1,
            },
        },
        medium: {
            large: {
                fontSize: 28,
                lineHeight: 1.2,
            },
            small: {
                fontSize: 28,
                lineHeight: 1.2,
            },
        },
        small: {
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
    body {
        overflow: hidden;

        font-family: 'Helvetica', 'Arial', sans-serif;
        font-size: ${defaultStyles.typography.small.large.fontSize}px;
        line-height: ${defaultStyles.typography.small.large.lineHeight};
        font-weight: 600;
    }

    a {
        text-decoration: none;
        color: black;

        &.active {
            color: ${props => (defaultStyles.colors.red)};
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

        &:not(.rfsc-home, .rfsc-space) {
            overflow-y: scroll;

            /* -ms-overflow-style: none;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            } */
        }
    }
` 

export const ButtonStyles = styled.div `
    background: none;
    border: none;
    font-size: ${props => props.styles.typography.large.large.fontSize}px;
    line-height: ${props => props.styles.typography.large.large.lineHeight};
    display: inline-block;
    cursor: pointer;
    transition: opacity, color ${props => (props.styles.animation.transitions.long)};

    &:hover {
        color: ${props => props.styles.colors.red};
    }

    .rfsc-icon {
        display: inline;
    }
`

export const HeaderStyles = styled.nav `
    width: 100%;
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 13;
    background-color: ${props => (props.styles.colors.green)};
    font-size: ${props => (props.styles.typography.large.large.fontSize)}px;
    line-height: ${props => (props.styles.typography.large.large.lineHeight)};
    text-transform: uppercase;
    
    ul {
        width: 100%;
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

    /* display: flex; */
    /* justify-content: center; */

    background-color: ${props => (props.styles.colors.green)};
    font-size: ${props => (props.styles.typography.large.large.fontSize)}px;
    line-height: ${props => (props.styles.typography.large.large.lineHeight)};
    text-transform: uppercase;

    .rfsc-nav-player {
        grid-column-start: 1;
        grid-column-end: 5;
        /* margin-right: auto;  */
        height: 100%;

        .rfsc-nav-player__button {
            height: 100%;

            .rfsc-nav-player__button__icon {
                height: 100%;

                img {
                    height: 100%;
                }
            }
        }
    }

    a {
        grid-column-start: 5;
        grid-column-end: 9;
        text-align: center;
        
        transition: ${props => (props.styles.animation.transitions.long)};

        &:hover {
            color: ${props => (props.styles.colors.red)}
        }
    }

    .rfsc-footer-on-air {
        text-align: right;
        grid-column-start: 9;
        grid-column-end: 13;
        /* margin-left: auto;  */
    }
`

export const NavPlayerStyles = styled.div `

`

export const SpaceStyles = styled.div `

`

export const InfoStyles = styled.div `
    background-color: ${props => (props.styles.colors.green)}
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

    .rfsc-space__header {
        grid-row-start: 1;
        grid-row-end: 2;
        grid-column-start: 1;
        grid-column-end: 13;
        background-color: ${props => (props.styles.colors.green)}
    }

    .rfsc-space__content {
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

            &.rfsc-space__icon {
                /* width: 33%; */
                /* height: 100%; */
            }

            &.rfsc-space__player {
                cursor: pointer;
                /* width: 33%; */
                /* height: 100%; */
                img {
                    width: 200px;
                    max-width: 66%;
                    margin: 0 auto;
                    display: block;
                }
            }
        }
    }

    .rfsc-space__footer {
        grid-row-start: 3;
        grid-row-end: 4;
        grid-column-start: 1;
        grid-column-end: 13;
        background-color: ${props => (props.styles.colors.green)}
    }
`
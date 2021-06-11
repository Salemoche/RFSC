import styled, { createGlobalStyle } from 'styled-components'

export const defaultStyles = {
    colors: {
        gray: '#dddddd',
        green: '#cffc53',
        red: '#ff0000'
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
        transition: '.1s'
    },
}

export const GlobalStyle = createGlobalStyle `
    body {
        overflow: hidden;
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
    background-color: ${props => (props.styles.colors.gray)}
` 

export const HeaderStyles = styled.nav `
    width: 100%;
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 13;
    background-color: ${props => (props.styles.colors.green)};
    
    
    ul {
        width: 100%;
        display: flex;
        justify-content: space-between;
        list-style-type: none;
        padding: 0;
        margin: 0;

        li {
            padding: 0;
            margin: 0;
        }
    }
`

export const FooterStyles = styled.nav `
    width: 100%;
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 13;
    background-color: ${props => (props.styles.colors.green)};
`
import styled from 'styled-components';
import { getTypography } from '../utils/helpers';
import { defaultStyles } from './default.styles';
import { animated } from 'react-spring';

export const CalendarStyles = styled.div `
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    perspective: 500px;
    /* transform-style: preserve-3d; */

    .rfsc-filter-reset {
        position: absolute;
        right: 0;
        bottom: ${props => (props.styles.spacing.medium)}px;
        right: ${props => (props.styles.spacing.medium)}px;
        color: ${props => (props.styles.colors.red)};
        cursor: pointer;
        text-transform: uppercase;
    }


    @media screen and (max-width: ${ defaultStyles.breakpoints.medium }px ) {

        perspective: 450px;
        
    }
`

export const CalendarListStyles = styled.div `
    position: absolute;
    left: 0;
    top: 70%;
    width: 100%;
    pointer-events: none;
    /* transform: translate(-50%, -50%) rotate3d(1, 0, 0, 60deg) */
    /* transform: translate(-50%, -50%) rotateX(60deg) */
    transform: translateY(-50%) rotateX(60deg);
    transform-style: preserve-3d;
    z-index: ${props => props.styles.zIndices?.list};
    text-align: center;
    /* perspective: 500px; */
    /* background: purple; */

    .rfsc-calendar__list-container {
        /* transform: translateY(${props => props.scrollDist}px);
        transform: translate(-50%, -50%) rotateX(60deg) perspective(10px);
        position: absolute;
        top: 50%;
        left: 50%;
        background: red; */
        transform-style: preserve-3d;
        transform: translateY(calc(-50% + (${props => props.scrollDist}px)));
        /* margin-top: -5000px; */

        .rfsc-calendar__list__day {
            /* transform-style: preserve-3d; */
        }

        .rfsc-calendar__list__title {
            transform: rotateX(-60deg);
            width: 80vw;
            display: block;
            margin: 0 auto;
            max-width: 1000px;

            .rfsc-calendar__list__title__logo,
            .rfsc-calendar__list__title__text {
                opacity: 0;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%;
                max-width: 500px;
                pointer-events: none;
                color: ${props => (defaultStyles.colors.red)}
                ;
            }

            .rfsc-calendar__list__title__logo {
                animation: rfsc_blink_in_out 5s infinite;
            }

            .rfsc-calendar__list__title__text {
                animation: rfsc_blink_in_out 5s 2.5s infinite;
                /* font-size: ${props => props.styles.typography.fontLarge.large.fontSize}px;
                letter-spacing: ${props => props.styles.typography.fontLarge.large.letterSpacing}px;
                line-height: ${props => props.styles.typography.fontLarge.large.lineHeight}; */
                ${props => getTypography({styles: props.styles, size: 'fontLarge'})}

                text-align: center;
                text-transform: uppercase;
            }
        }
    }


    /* @media screen and (max-width: ${ defaultStyles.breakpoints.medium }px ) {

        top: 60%;
        
        .rfsc-calendar__list-container .rfsc-calendar__list__title .rfsc-calendar__list__title__logo {
            max-width: unset;
            width: 120%;
        }
    } */

    @media screen and (max-width: ${ defaultStyles.breakpoints.medium }px ) {

        top: 0;
        transform: none;

        .rfsc-calendar__list-container {
            transform: none;
            height: 100vh;
            overflow-y: scroll;
            pointer-events: all;
            padding-bottom: 128px;
            /* padding-top: ${props => (props.styles.spacing.medium)}px */
            /* display: flex;
            flex-wrap: wrap;
            flex-direction: column-reverse; */
            
            .rfsc-calendar__list__day {
/* 
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                flex-direction: column-reverse; */
            }
        }
    }
`
export const CalendarListItemStyles = styled.div `
    box-sizing: border-box;
    transform: rotateX(-60deg);
    height: 500px;
    width: 500px;
    max-height: calc( 100vw - ${props => (props.styles.spacing.large)}px);
    max-width: calc( 100vw - ${props => (props.styles.spacing.large)}px);
    margin: 0 auto;
    transition: ${props => props.styles.animation.transitions.long};
    pointer-events: all;
    /* font-size: ${props => props.styles.typography.fontMedium.large.fontSize}px;
    letter-spacing: ${props => props.styles.typography.fontMedium.large.letterSpacing}px;
    line-height: ${props => props.styles.typography.fontMedium.large.lineHeight}; */
    ${props => getTypography({styles: props.styles, size: 'fontMedium'})}

    .rfsc-list-item__side {

        &.rfsc-list-item__side-front {
            padding: ${props => (props.styles.spacing.medium)}px;
            position: relative;
            /* border: ${props => (props.styles.spacing.medium)}px solid ${props => (props.styles.colors.green)}; */

            &.radio {
                background: ${props => (props.styles.colors.grayReal)};
                /* border: ${props => (props.styles.spacing.medium)}px solid ${props => (props.styles.colors.grayReal)}; */
                color: black;
            }

            &.space {
                background: white;

                .rfsc-list-item__header {
                    display: none;
                }
                /* border: ${props => (props.styles.spacing.medium)}px solid ${props => (props.styles.colors.grayReal)}; */
            }

            &.tattoo {
                color: black; 


                .rfsc-list-item__header {
                    color: black; 
                }
            }

            &.event {

                display: grid;
                grid-template-rows: auto 1fr auto;
                grid-template-columns: 1fr;

                .rfsc-list-item__header {
                    grid-row-start: 1;
                    grid-row-end: 2;
                    position: relative;
                    padding: 0;
                }

                .rfsc-list-item__content {
                    grid-row-start: 2;
                    grid-row-end: 3;
                    position: relative;
                    /* overflow-y: scroll; */
                    align-items: center;
                    align-content: center;
                    /* transform: translateY(10px); */
                    margin-top: -7px;
                }
            }

            .rfsc-list-item__header {
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                justify-content: space-between;
                width: 100%;
                text-transform: uppercase;
                padding: ${props => (props.styles.spacing.medium)}px;

                .rfsc-list-item__header__date {

                }

                .rfsc-list-item__header__category {
                }

                .rfsc-list-item__header__week {

                }
            }

            .rfsc-list-item__content {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                align-items: center;
                /* align-items: space-between;
                align-content: space-between; 
                grid-row-start: 2;
                grid-row-end: 3;
                font-size: ${props => props.styles.typography.fontMedium.large.fontSize}px;
                letter-spacing: ${props => props.styles.typography.fontMedium.large.letterSpacing}px;
                line-height: ${props => props.styles.typography.fontMedium.large.lineHeight}; */
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
                height: 100%;
                ${props => getTypography({styles: props.styles, size: 'fontMedium'})}

                .rfsc-list-item__content__item {
                    width: 100%;
                    margin: ${props => (props.styles.spacing.medium)}px 0;
                    

                    span {
                    }

                    .rfsc-list-item__content__item__title {
                        width: 100%;
                        /* font-size: ${props => props.styles.typography.fontLarge.large.fontSize}px;
                        letter-spacing: ${props => props.styles.typography.fontLarge.large.letterSpacing}px;
                        line-height: ${props => props.styles.typography.fontLarge.large.lineHeight}; */
                        ${props => getTypography({styles: props.styles, size: 'fontLarge'})}

                        margin: ${props => (props.styles.spacing.medium)}px 0;
                        margin: 0px;
                    }

                    .rfsc-list-item__content__item__location {
                        text-transform: uppercase;
                    }
                }

                .rfsc-list-item__content__icon {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    z-index: -1;
                }
            }


            .rfsc-list-item__extra {
                position: absolute;
                bottom: 0;
                left: 0;
                text-transform: uppercase;
                padding: ${props => (props.styles.spacing.medium)}px;
                width: 100%;
                text-align: center;
            }
        }
    }




    .rfsc-list-item__side {
        width: 100%;
        height: 100%;
        position: absolute;
        transition: ${props => props.styles.animation.transitions.long};
        backface-visibility: hidden;

        &.rfsc-list-item__side-front {
            transform: rotateY(0deg);
            background-color: ${props => props.styles.colors.green};
            color: ${props => props.styles.colors.red};

            &.tattoo {
                background-color: white;
            }
        }

        &.rfsc-list-item__side-back {
            transform: rotateY(180deg);
            background: white;
        }
    }

    @media screen and (min-width: ${ defaultStyles.breakpoints.medium }px ) {

        &.initial {
            opacity: 0 !important;
        }

        &.filtered-out {
            opacity: 0.25
        }


        &.active {
            opacity: 1;
            transform: rotateX(-60deg) scale(1);
            cursor: pointer;
        }

        &.inactive {
            transform: rotateX(-60deg) scale(0.9);
            /* opacity: 0.9 */
            /* opacity: 0.5; */
        }

        &.behind-viewport {
            opacity: 0;
            pointer-events: none !important;
            transform: rotateX(-60deg) scale(2);

            * {
                pointer-events: none !important;
            }
        }

        &.in-front-of-viewport {
            /* background: yellow; */
        }

        &.invisible {
            opacity: 0;
            /* display: none; */
        }

        &:hover {
            transform: rotateX(-60deg) scale(1.05);


            /* .rfsc-list-item__side {
                &.rfsc-list-item__side-front {
                    transform: rotateY(-180deg);
                }

                &.rfsc-list-item__side-back {
                    transform: rotateY(0deg);
                }
            } */
        }


        /* &.rendered {
            display: inherit;
        }*/

        &.not-rendered {
            visibility: hidden;
        } 

    }

    @media screen and (max-width: ${ defaultStyles.breakpoints.medium }px ) {

        transform: none;
        width: 100%;
        max-width: unset;
        height: 100vw;
        max-height: unset;
        /* margin-bottom: ${props => (props.styles.spacing.medium)}px; */
        
        /* height: 100%; */
        .rfsc-list-item__side {

            &.rfsc-list-item__side-front {
                padding: ${props => (props.styles.spacing.medium)}px;
                position: relative;
                /* border: ${props => (props.styles.spacing.medium)}px solid ${props => (props.styles.colors.green)}; */
            }
        }

        /* &.rfsc-list-item-event:not(:last-of-type) {
            border-bottom: 1px solid ${props => props.styles.colors.red};
        } */
    }

`

export const CalendarGraphic = styled.div `

    /* .st0{fill: #ffffff;}
    .st1{font-family:'ABCMonumentGrotesk-Medium';}
    .st2{font-size:21.0676px;}
    .st3{font-size:21.0675px;} */

    /* .st0{fill:#1A171B;}
    .st1{font-family:'ABCMonumentGrotesk-Medium';}
    .st2{font-size:21.0676px;}
    .st3{font-size:21.0675px;}
    .st4{font-size:21.0695px;}
    .st5{font-size:21.0661px;}
    .st6{font-size:21.0657px;}
    .st7{font-size:21.066px;}
    .st8{fill:none;}
    .st9{font-size:21px;}
    .st10{font-size:21.0653px;}
    .st11{font-size:21.0692px;}
    .st12{font-size:21.0662px;}
    .st13{font-size:21.069px;}
    .st14{display:none;} */

    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 21px;
    line-height: 0.5px;

    svg {

        height: calc(100vh - 100px);
        width: 100vw;
        position: absolute;
        /* left: 0;
        top: 0; */

        #Layer_1 {
            position: absolute;
            height: 108%;
            width: 100%;

            [id*=event],
            [id*=week],
            [id*=day],
            [id*=location],
            [id*=type],
            [id*=Monate] {
                cursor: default;
                transition: ${props => props.styles.animation.transitions.regular};
                transform-origin: center;
                fill: white;

                /* &:hover {
                    fill: ${props => props.styles.colors.red};

                    text {
                        fill: ${props => props.styles.colors.red};
                    }
                } */
            }


            
            [id*=week],
            [id*=day], 
            [id*=event],
            /* [id*=location], */
            /* [id*=type], */
            [id*=Monate] {
                cursor: pointer;
                transition: ${props => props.styles.animation.transitions.regular};
                transform-origin: center;
                fill: white;

                &:hover {
                    /* transform: scale(1.5); */
                    fill: black;

                    text {
                        fill: black;
                    }
                }
            }
            [id*=event-1] {
                text-anchor: end;
            }

            rect {
                fill: none;
            }

            text {
                transition: ${props => props.styles.animation.transitions.regular};
                text-transform: uppercase;
                font-size: 21px;
                letter-spacing: 0.5px;
            }

            tspan {
                /* pointer-events: none; */
            }

            [data-active] {
                fill: green;
            }

            ${props => getActiveId(props)} {
                fill: black;

                text {
                    fill: black;
                }

                /* &:hover {

                    fill: white;

                        text {
                            fill: white;
                        }
                    }
                } */
            }

            ${props => getFilteredId(props)} {
                fill: black;

                text {
                    /* fill: ${props => props.styles.colors.red}; */
                }

                /* &:hover {

                    fill: white;

                        text {
                            fill: white;
                        }
                    }
                } */
            }

            #Orte, 
            #Veranstaltungsart {
                transform-origin: center center;
                transition: ${props => (props.styles.animation.transitions.extraExtraLong)};                
            }
            
            #Veranstaltungsart {
                transform: rotate(${props => getRotations(props, true).typeRotation }deg);
            }

            #Orte {
                transform: rotate(${props => getRotations(props, true).locationRotation }deg);
            }

            .active {
                /* color:  ${props => props.styles.colors.red}; */
            }

        }
    }

    @media screen and (max-width: 768px ) {

        display: none;

        svg {
            width: 260%;

            [id*='-event'] {
                display: none;
            }

            #Layer_1 {
                transform: translateY(-10%);
            }

            
            #Veranstaltungsart {
                transform: rotate(${props => +getRotations(props).typeRotation}deg) !important;
            }

            #Orte {
                transform: rotate(${props => +getRotations(props).locationRotation}deg) !important;
            }
        }
    }

`

const getActiveId = ({currentDetail: {id, day, week, month}}) => {

    return `
        #m${month}-w${week}-d${day}-day,
        [id*='m${month}-w${week}-d${day}'][id*='-event'],
        #m${month}-w${week}-d${day}-week,
        [id*='m${month}'][id*='-month']
    `;
}

const getFilteredId = (props) => {

    if (!props.currentDetail) return ''

    const { locations, types } = props.currentDetail
    if ( !props.hasScrolled ) return ''
    
    const locationString = locations?.map(loc => (` #location-${loc}`)).toString();
    const typeString = types?.map(typ => (` #type-${typ}`)).toString();
    

    const filterString = `
        ${locationString ? typeString + ', ' : typeString } ${locationString}
    `

    return filterString;
}

const getRotations = (props, shift = false) => {

    const { locations, types } = props.currentDetail;
    const { rotations } = props;

    const shiftValue = shift ? 90 : 0
    
    let typeRotation = 0;
    let locationRotation = 0;

    if ( locations?.length == 0 && types?.length == 0 || !props.hasScrolled || !props.currentDetail) return { typeRotation, locationRotation }

    if (types) typeRotation = types[0] ? rotations.types[types[0]] + shiftValue : 0
    if (locations) locationRotation = locations[0] ? rotations.locations[locations[0]] - shiftValue : 0

    return {
        typeRotation,
        locationRotation
    }
}

// const getFocused = ({currentDetailParameters: {location, type}}) => {

//     const locationString = location.map(loc => (` #location-${loc}`)).toString();
//     const typeString = type.map(typ => (` #type-${typ}`)).toString();

//     const filterString = `
//         ${locationString ? typeString + ', ' : typeString } ${locationString}
//     `

//     return filterString;
// }


const CalendarCircleStyles = styled.div `
    /* position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%; */
`

export const CalendarLocationsStyles = styled(CalendarCircleStyles) `
    /* min-width: 500px;
    min-height: 500px;
    width: 50vh;
    height: 50vh;
    // background: red;
    z-index: ${props => props.styles.zIndices?.locations};
    transform: translate(-50%, -50%) rotate(${props => 0}); */
`
export const CalendarTypesStyles = styled(CalendarCircleStyles) `
    /* min-width: 800px;
    min-height: 800px;
    width: 60vh;
    height: 60vh;
    // background: yellow;
    z-index: ${props => props.styles.zIndices?.types};
    transform: translate(-50%, -50%) rotate(${props => 0}); */
`

const rotateCircleItem = (props, index) => {

    // let count = 1;

    // if (props.locations) {
    //     count = props.locations.length    
    // } else if (props.types) {
    //     count = props.types.length    
    // }

    // return 360 / count * index + 'deg';
}

// const positionCircleItem = (props, index) => {

//     let count = 1;
//     let displacement = 200;
    
//     if (props.locations) {
//         count = props.locations.length    
//     } else if (props.types) {
//         count = props.types.length    
//     }

//     let positionBase = index / count + index;
//     console.log(positionBase, Math.sin(positionBase));

//     return `${Math.sin(positionBase) * displacement }px, ${Math.cos(positionBase) * displacement }px`
// }

const positionCircleItem = (props, index) => {

    // let count = 1;
    // let displacement = 200;
    
    // if (props.locations) {
    //     count = props.locations.length    
    // } else if (props.types) {
    //     count = props.types.length    
    // }

    // let positionBase = index / count + index;
    // // console.log(positionBase, Math.sin(positionBase));

    // return `${Math.sin(positionBase) * displacement }px, ${Math.cos(positionBase) * displacement }px`
}

export const CalendarCircleItemStyles = styled.div `
    /* position: absolute;
    left: 50%;
    top: 50%;
    //  height: 100%;
    // transform: translate(-50%, -50%) rotate(${props => rotateCircleItem(props, props.index)});
    transform: translate(${props => positionCircleItem(props, props.index)});

    .rfsc-calendar__item__label {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%)
    } */
`


export const CalendarDetailsStyles = styled(animated.div) `
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 900px;
    max-height: calc( 100vh - 130px);
    max-width: calc( 100vw - ${props => (props.styles.spacing.large)}px);
    overflow-y: scroll;
    background: white;
    z-index: ${props => props.styles.zIndices.details};

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }


    

    @media screen and (max-width: ${ defaultStyles.breakpoints.medium }px ) {

        max-height: calc( 100vh - 150px);
        top: calc(50% - 48px);
        max-width: 100vw;
    }

`

export const CalendarEventDetailsStyles = styled(CalendarDetailsStyles) `
    /* padding: ${props => props.styles.spacing.medium}px; */

    /* > * {
        padding: ${props => props.styles.spacing.medium}px;
    } */

    &.event {
        background-color: ${props => props.styles.colors.backgroundGreenOpacity};
        color: ${props => props.styles.colors.red};

        a {
            color: ${props => props.styles.colors.red};
            text-decoration: underline;

            &:hover {
                color: black;
            }
        }
        /* border: ${props => props.styles.spacing.medium}px solid ${props => props.styles.colors.green}; */
    }

    &.radio {
        background-color: ${props => props.styles.colors.backgroundGrayOpacity};
        color: black;
        /* border: ${props => props.styles.spacing.medium}px solid ${props => props.styles.colors.grayReal}; */
    }

    &.tattoo {
        background-color: ${props => props.styles.colors.backgroundWhiteOpacity};
        color: black;
        /* border: ${props => props.styles.spacing.medium}px solid white; */
    }


    .rfsc-detail-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: ${props => props.styles.spacing.medium}px;
        margin-top: ${props => props.styles.spacing.medium}px;
        padding-bottom: 13px;
        border-bottom: 2px solid ${props => props.styles.colors.red};

        .rfsc-detail-header__item {
            text-transform: uppercase;
        }

        .rfsc-event-detail__header__date,
        .rfsc-tattoo-detail__header__date {
            width: 170px;
        }

        .rfsc-event-detail__header__leader,
        .rfsc-radio-detail__header__host,
        .rfsc-tattoo-detail__header__host {
            text-align: center;
            flex-grow: 1;
        }

        .rfsc-event-detail__header__type,
        .rfsc-radio-detail__header__type,
        .rfsc-tattoo-detail__header__type {
            text-align: right;
            width: 170px;
        }

        .rfsc-radio-detail__header__date,
        .rfsc-radio-detail__header__type {
            width: 100px
        }

    }

    .rfsc-event-detail__header-mobile,
    .rfsc-tattoo-detail__header-mobile,
    .rfsc-radio-detail__header-mobile {
        flex-wrap: wrap;

        .rfsc-event-detail__header__by,
        .rfsc-radio-detail__header__by,
        .rfsc-tattoo-detail__header__by {
            text-align: center;
            width: 33%;
        }

        
        [class*='detail__header__date'],
        [class*='detail__header__type'] {
            width: 33%;
        }

        .rfsc-event-detail__header__leader-wide,
        .rfsc-event-radio__header__host-wide,
        .rfsc-event-tattoo__header__host-wide {
            width: 100%;
        }
    }

    
    .rfsc-radio-detail__header,
    .rfsc-tattoo-detail__header {
        border-bottom: 2px solid black;
        /* padding-bottom: ${props => props.styles.spacing.medium}px; */
    }
`

export const CalendarDetailStyles = styled.div `
    margin-bottom: ${props => props.styles.spacing.medium}px;

    > * {
        padding-left: ${props => props.styles.spacing.medium}px;
        padding-right: ${props => props.styles.spacing.medium}px;

    }
    /*  font-size: ${props => props.styles.typography.fontMedium.large.fontSize}px;
letter-spacing: ${props => props.styles.typography.fontMedium.large.letterSpacing}px;
    line-height: ${props => props.styles.typography.fontMedium.large.lineHeight}; */

    &.rfsc-event {
        border-bottom: 2px solid ${props => props.styles.colors.red};
        margin-bottom: 84px;
    }

    &.rfsc-radio, &.rfsc-tattoo {
        /* border-bottom: 2px solid black; */

        &:not(:first-of-type) {
            margin-top: 84px;
        }
    }

    /* ========
    Event 
    ======== */

    .rfsc-radio-detail__text,
    .rfsc-tattoo-detail__text {
        /* width: 170px; */
        margin-bottom: ${props => props.styles.spacing.medium}px;
        padding-bottom: ${props => props.styles.spacing.medium}px;
        border-bottom: 2px solid black;
    }

    .rfsc-event-detail__lead {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: ${props => props.styles.spacing.medium}px;

        .rfsc-event-detail__lead__time,
        .rfsc-event-detail__lead__title,
        .rfsc-event-detail__lead__location {
            text-align: center;
            width: 100%;
            text-transform: uppercase;
        }

        .rfsc-event-detail__lead__time {
            /* font-size: ${props => props.styles.typography.fontLarge.large.fontSize}px;
letter-spacing: ${props => props.styles.typography.fontLarge.large.letterSpacing}px;
            line-height: ${props => props.styles.typography.fontLarge.large.lineHeight}; */
        }

        .rfsc-event-detail__lead__title {
            /* font-size: ${props => props.styles.typography.fontLarge.large.fontSize}px;
            letter-spacing: ${props => props.styles.typography.fontLarge.large.letterSpacing}px;
            line-height: ${props => props.styles.typography.fontLarge.large.lineHeight}; */
            ${props => getTypography({styles: props.styles, size: 'fontLarge'})}
        }
    }

    .rfsc-event-detail__content {
        margin-bottom: ${props => props.styles.spacing.medium}px;

        p {
            margin-top: 0;

            &:not(:last-of-type) {
                margin-bottom: ${props => props.styles.spacing.medium}px;
            }
        }
    }

    /* ========
    Radio / Tattoo 
    ======== */

    .rfsc-tattoo-detail__item,
    .rfsc-radio-detail__item {
        border-bottom: 2px solid black;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        text-align: center;
        margin-bottom: ${props => props.styles.spacing.medium}px;
        padding-bottom: ${props => props.styles.spacing.medium}px;
        text-transform: uppercase;

        > * {
            width: 100%;
        }

        .rfsc-radio-detail__item__artist,
        .rfsc-tattoo-detail__item__artist {
            text-transform: uppercase;
            /* font-size: ${props => props.styles.typography.fontLarge.large.fontSize}px;
            letter-spacing: ${props => props.styles.typography.fontLarge.large.letterSpacing}px;
            line-height: ${props => props.styles.typography.fontLarge.large.lineHeight}; */
            ${props => getTypography({styles: props.styles, size: 'fontLarge'})}

        }
    }

`
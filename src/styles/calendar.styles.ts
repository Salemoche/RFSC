import styled from 'styled-components';

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
                width: 100%
            }

            .rfsc-calendar__list__title__logo {
                animation: rfsc_blink_in_out 5s infinite;
            }

            .rfsc-calendar__list__title__text {
                animation: rfsc_blink_in_out 5s 2.5s infinite;
                font-size: ${props => props.styles.typography.fontLarge.large.fontSize}px;
                letter-spacing: ${props => props.styles.typography.fontLarge.large.letterSpacing}px;
                line-height: ${props => props.styles.typography.fontLarge.large.lineHeight};
                text-align: center;
                text-transform: uppercase;
            }
        }
    }
`
export const CalendarListItemStyles = styled.div `
    box-sizing: border-box;
    transform: rotateX(-60deg);
    height: 500px;
    width: 500px;
    margin: 0 auto;
    transition: ${props => props.styles.animation.transitions.long};
    cursor: pointer;
    pointer-events: all;
     font-size: ${props => props.styles.typography.fontMedium.large.fontSize}px;
    letter-spacing: ${props => props.styles.typography.fontMedium.large.letterSpacing}px;
    line-height: ${props => props.styles.typography.fontMedium.large.lineHeight};

    .rfsc-list-item__side {

        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 1fr;

        &.rfsc-list-item__side-front {
            padding: ${props => (props.styles.spacing.medium)}px;
            /* border: ${props => (props.styles.spacing.medium)}px solid ${props => (props.styles.colors.green)}; */

            &.radio {
                background: ${props => (props.styles.colors.grayReal)};
                /* border: ${props => (props.styles.spacing.medium)}px solid ${props => (props.styles.colors.grayReal)}; */
                color: black;
            }

            &.tattoo {
                color: black; 


                .rfsc-list-item__header {
                    color: black; 
                }
            }

            &.event {

                .rfsc-list-item__header {
                    
                }

                .rfsc-list-item__content {
                    grid-row-end: 3;
                    overflow: scroll;
                    align-items: center;
                    align-content: center;
                }
            }
        }
    }

    .rfsc-list-item__header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        grid-row-start: 1;
        grid-row-end: 2;
        text-transform: uppercase;

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
        align-content: space-between; */
        grid-row-start: 2;
        grid-row-end: 3;
            font-size: ${props => props.styles.typography.fontMedium.large.fontSize}px;
        letter-spacing: ${props => props.styles.typography.fontMedium.large.letterSpacing}px;
        line-height: ${props => props.styles.typography.fontMedium.large.lineHeight};

        .rfsc-list-item__content__item {
            width: 100%;
            margin: ${props => (props.styles.spacing.medium)}px 0;
            

            span {
            }

            .rfsc-list-item__content__item__title {
                width: 100%;
                font-size: ${props => props.styles.typography.fontLarge.large.fontSize}px;
                letter-spacing: ${props => props.styles.typography.fontLarge.large.letterSpacing}px;
                line-height: ${props => props.styles.typography.fontLarge.large.lineHeight};
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
            text-transform: uppercase;
        }
    }

    &.initial {
        opacity: 0 !important;
    }

    &.active {
        opacity: 1;
        transform: rotateX(-60deg) scale(1);
    }

    &.inactive {
        transform: rotateX(-60deg) scale(0.9);
        opacity: 0.9
        /* opacity: 0.5; */
    }

    &.behind-viewport {
        opacity: 0;
        pointer-events: none;
        transform: rotateX(-60deg) scale(2);
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


    /* &.rendered {
        display: inherit;
    }

    &.not-rendered {
        display: none;
    } */

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

    font-size: ${props => props.styles.typography.fontSmall.large.fontSize}px;
    line-height: ${props => props.styles.typography.fontSmall.large.lineHeight};

    svg {

        height: 108%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;

        [id*=event],
        [id*=week],
        [id*=day],
        [id*=location],
        [id*=type],
        [id*=Monate] {
            cursor: pointer;
            transition: ${props => props.styles.animation.transitions.regular};
            transform-origin: center;
            fill: white;

            &:hover {
                /* transform: scale(1.5); */
                fill: ${props => props.styles.colors.red};

                text {
                    fill: ${props => props.styles.colors.red};
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
            /* fill: ${props => props.styles.colors.red}; */

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
        }

        .active {
            /* color:  ${props => props.styles.colors.red}; */
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

const getFilteredId = ({filters: {location, type}}) => {

    const locationString = location.map(loc => (` #location-${loc}`)).toString();
    const typeString = type.map(typ => (` #type-${typ}`)).toString();

    const filterString = `
        ${locationString ? typeString + ', ' : typeString } ${locationString}
    `

    return filterString;
}


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


export const CalendarDetailsStyles = styled.div `
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    transform: translate(-50%, -50%);
    min-width: 800px;
    min-height: 800px;
    width: 60vh;
    height: 60vh;
    overflow-y: scroll;
    background: white;
    z-index: ${props => props.styles.zIndices.details};

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

`

export const CalendarEventDetailsStyles = styled(CalendarDetailsStyles) `
    padding: ${props => props.styles.spacing.medium}px;

    &.event {
        background-color: ${props => props.styles.colors.backgroundGreenOpacity};
        color: ${props => props.styles.colors.red};
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

    
    .rfsc-radio-detail__header,
    .rfsc-tattoo-detail__header {
        border-bottom: 2px solid black;
        /* padding-bottom: ${props => props.styles.spacing.medium}px; */
        padding-bottom: 13px;
    }
`

export const CalendarEventDetailStyles = styled.div `
    margin-bottom: ${props => props.styles.spacing.medium}px;
    /*  font-size: ${props => props.styles.typography.fontMedium.large.fontSize}px;
letter-spacing: ${props => props.styles.typography.fontMedium.large.letterSpacing}px;
    line-height: ${props => props.styles.typography.fontMedium.large.lineHeight}; */

    &.rfsc-event {
        border-bottom: 2px solid ${props => props.styles.colors.red};
    }

    &.rfsc-radio, &.rfsc-tattoo {
        /* border-bottom: 2px solid black; */

        &:not(:first-of-type) {
            margin-top: calc(${props => props.styles.typography.fontMedium.large.fontSize * 1.2}px + ${props => props.styles.typography.fontMedium.large.fontSize * 1.2}px + ${props => props.styles.typography.fontLarge.large.fontSize * 1.2}px + ${props => props.styles.spacing.large}px)
        }
    }

    /* ========
    Event 
    ======== */

    .rfsc-event-detail__lead {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: ${props => props.styles.spacing.large}px;

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
            font-size: ${props => props.styles.typography.fontLarge.large.fontSize}px;
            letter-spacing: ${props => props.styles.typography.fontLarge.large.letterSpacing}px;
            line-height: ${props => props.styles.typography.fontLarge.large.lineHeight};
        }
    }

    .rfsc-event-detail__content {
        margin-bottom: ${props => props.styles.spacing.medium}px;

        p {
            margin-top: 0;

            &:not(:last-of-type) {
                margin-bottom: ${props => props.styles.typography.fontLarge.large.lineHeight};
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
            font-size: ${props => props.styles.typography.fontLarge.large.fontSize}px;
            letter-spacing: ${props => props.styles.typography.fontLarge.large.letterSpacing}px;
            line-height: ${props => props.styles.typography.fontLarge.large.lineHeight};
        }
    }

`
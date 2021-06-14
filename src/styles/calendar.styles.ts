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
        color: ${props => (props.styles.colors.red)};
        cursor: pointer;
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
            width: 50vw;
            display: block;
            margin: 0 auto;
            max-width: 500px;
        }
    }
`
export const CalendarListItemStyles = styled.div `
    box-sizing: border-box;
    /* transform: rotateX(-60deg) rotateY(${props => props.distanceFromViewport * 0.05}deg); */
    transform: rotateX(-60deg);
    height: 500px;
    width: 500px;
    margin: 0 auto;
    transition: ${props => props.styles.animation.transitions.long};
    cursor: pointer;
    pointer-events: all;

    &:hover {
        /* transform: rotateX(-60deg) scale(1.05); */


        .rfsc-list-item__side {
            &.rfsc-list-item__side-front {
                transform: rotateY(-180deg);
            }

            &.rfsc-list-item__side-back {
                transform: rotateY(0deg);
            }
        }
    }

    &.active {
        opacity: 1;
    }

    &.inactive {
        opacity: 0.5;
    }

    &.behind-viewport {
        opacity: 0;
        pointer-events: none;
    }

    &.in-front-of-viewport {
        /* background: yellow; */
    }

    &.invisible {
        opacity: 0;
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

    .st0{fill: #ffffff;}
    .st1{font-family:'ABCMonumentGrotesk-Medium';}
    .st2{font-size:21.0676px;}
    .st3{font-size:21.0675px;}

    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {

        height: 100%;

        [id*=event],
        [id*=week],
        [id*=day],
        [id*=location],
        [id*=type] {
            cursor: pointer;
            transition: ${props => props.styles.animation.transitions.regular};
            transform-origin: center;
            fill: white;

            &:hover {
                /* transform: scale(1.5); */
                fill: ${props => props.styles.colors.red};
            }
        }

        #Orte, 
        #Veranstaltungsart {
            transform-origin: center center;
        }

        .active {
            color:  ${props => props.styles.colors.red};
        }
    }

`

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
    background-color: ${props => props.styles.colors.green};
    color: ${props => props.styles.colors.red};
    padding: ${props => props.styles.spacing.medium}px;
`
export const CalendarEventDetailStyles = styled.div `
    border-bottom: 2px solid ${props => props.styles.colors.red};
    margin-bottom: ${props => props.styles.spacing.medium}px;
    font-size: ${props => props.styles.typography.fontMedium.large.fontSize}px;
    line-height: ${props => props.styles.typography.fontMedium.large.lineHeight};

    .rfsc-event-detail__header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: ${props => props.styles.spacing.large}px;

        .rfsc-event-detail__header__leader,
        .rfsc-event-detail__header__type {
            text-transform: uppercase;
        }
    }

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
            line-height: ${props => props.styles.typography.fontLarge.large.lineHeight}; */
        }

        .rfsc-event-detail__lead__title {
            font-size: ${props => props.styles.typography.fontLarge.large.fontSize}px;
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

`

import styled from 'styled-components';

export const CalendarStyles = styled.div `
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    perspective: 500px;
    /* transform-style: preserve-3d; */
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
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
`

export const CalendarLocationsStyles = styled(CalendarCircleStyles) `
    min-width: 500px;
    min-height: 500px;
    width: 50vh;
    height: 50vh;
    /* background: red; */
    z-index: ${props => props.styles.zIndices?.locations};
    transform: translate(-50%, -50%) rotate(${props => 0});
`
export const CalendarTypesStyles = styled(CalendarCircleStyles) `
    min-width: 800px;
    min-height: 800px;
    width: 60vh;
    height: 60vh;
    /* background: yellow; */
    z-index: ${props => props.styles.zIndices?.types};
    transform: translate(-50%, -50%) rotate(${props => 0});
`

const rotateCircleItem = (props, index) => {

    let count = 1;

    if (props.locations) {
        count = props.locations.length    
    } else if (props.types) {
        count = props.types.length    
    }

    return 360 / count * index + 'deg';
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

    let count = 1;
    let displacement = 200;
    
    if (props.locations) {
        count = props.locations.length    
    } else if (props.types) {
        count = props.types.length    
    }

    let positionBase = index / count + index;
    // console.log(positionBase, Math.sin(positionBase));

    return `${Math.sin(positionBase) * displacement }px, ${Math.cos(positionBase) * displacement }px`
}

export const CalendarCircleItemStyles = styled.div `
    position: absolute;
    left: 50%;
    top: 50%;
    /* height: 100%;
    transform: translate(-50%, -50%) rotate(${props => rotateCircleItem(props, props.index)}); */
    transform: translate(${props => positionCircleItem(props, props.index)});

    .rfsc-calendar__item__label {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%)
    }
`


export const CalendarDetails = styled.div `
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    transform: translate(-50%, -50%);
    min-width: 800px;
    min-height: 800px;
    width: 60vh;
    height: 60vh;
    overflow: scroll;
    background: white;
    z-index: ${props => props.styles.zIndices.details};
`
export const CalendarDetail = styled.div `
`

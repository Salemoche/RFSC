import React from 'react'
// import { formatTime, formatDate, isType, isLocation } from '../../../utils/helpers';
import { CalendarDetailStyles } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';
// import { deflateSync } from 'zlib';

function CalendarDetailComponent({ type, post }) {

    const styles = useBaseState().state.base.styles;
    const content = useBaseState().state.content;

    return (
        <React.Fragment>
            <CalendarDetailStyles className={`rfsc-${type}-detail__item`} styles={styles}>
                <div className={`rfsc-${type}-detail__item__time`}>{post.time}</div>
                { post.artistLink ? 
                    <a href={post.artistLink} target="_blank" className={`rfsc-${type}-detail__item__artist`}>{post.artist}</a>
                :   
                    <div className={`rfsc-${type}-detail__item__artist`}>{post.artist}</div>                                    
                }
                { post.labelLink ? 
                    <a href={post.labelLink} target="_blank" className={`rfsc-${type}-detail__item__label`}>{post.label}</a>
                :   
                    <div className={`rfsc-${type}-detail__item__label`}>{post.label}</div>                                    
                }
            </CalendarDetailStyles>
        </React.Fragment>
    )
}

export default CalendarDetailComponent

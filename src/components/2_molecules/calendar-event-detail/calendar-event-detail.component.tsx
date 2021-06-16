import React from 'react'
import { formatTime, formatDate, isType, isLocation } from '../../../utils/helpers';
import { CalendarEventDetailStyles } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';
import { deflateSync } from 'zlib';

function CalendarEventDetailComponent({ post, type }) {

    const styles = useBaseState().state.base.styles;
    const content = useBaseState().state.content;

    const getDetailContent = () => {

        let postObject = {
            type,
        };
        let detailContent = <React.Fragment></React.Fragment>;

        if ( type == 'event' && post.fieldGroupName === 'Page_Days_days_Posts_EventLayout' ) {
            detailContent = 
                <React.Fragment>
                {post.events.map((event) => {
                    return (<CalendarEventDetailStyles 
                            className="rfsc-calendar__details__detail rfsc-event-detail rfsc-event" 
                            data-id={ event.id } 
                            styles={ styles }
                            type={ postObject.type }
                            key={ event.id }
                        >
                        <div className="rfsc-event-detail__header rfsc-detail-header">
                            <div className="rfsc-event-detail__header__date rfsc-detail-header__item">
                                { formatDate(event.event_content.date)?.day }
                                .
                                { formatDate(event.event_content.date)?.month }
                            </div>
                            <div className="rfsc-event-detail__header__leader rfsc-detail-header__item">
                                { event.event_content.leader }
                            </div>
                            <div className="rfsc-event-detail__header__type rfsc-detail-header__item">
                                { 'type' }
                            </div>
                        </div>
                        <div className="rfsc-event-detail__lead">
                            <div className="rfsc-event-detail__lead__time">
                            { `${formatTime(event?.event_content?.fromTime)?.hours}:${formatTime(event?.event_content?.fromTime)?.minutes}` } 
                            -
                            { `${formatTime(event?.event_content?.toTime)?.hours}:${formatTime(event?.event_content?.toTime)?.minutes}` }
                            </div>
                            <div className="rfsc-event-detail__lead__title">
                                { event.title }
                            </div>
                            <div className="rfsc-event-detail__lead__location">
                                {'location'}
                            </div>
                        </div>
                        <div className="rfsc-event-detail__content" dangerouslySetInnerHTML={{ __html: event.event_content.eventText }}></div>
                    </CalendarEventDetailStyles>)
                })}
                </React.Fragment>
        }

        // console.log(post)

        return { postObject, content: detailContent}
    }

    // console.log(getDetailContent())

    return (
        <React.Fragment>
            {getDetailContent().content}
        </React.Fragment>
    )
}

export default CalendarEventDetailComponent

import React from 'react'
import { formatTime, formatDate, isType, isLocation } from '../../../utils/helpers';
import { CalendarEventDetailStyles } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';

function CalendarDetailComponent({post}) {

    // const formatedToTime = formatTime(toTime)!;
    // const formatedFromTime = formatTime(fromTime)!;
    // const type = categories.filter((category) => {
    //     return isType(category.node) }
    // )[0].node
    // const location = categories.filter((category) => {
    //     return isLocation(category.node) }
    // )[0].node
    const styles = useBaseState().state.base.styles;    

    const getDetailContent = () => {

        let postObject = {
            type: '',
        };
        let content = <React.Fragment></React.Fragment>;

        switch (post.fieldGroupName) {
            case 'Page_Days_days_Posts_EventLayout':
                postObject.type = 'event'
                content = 
                    <React.Fragment>
                    {post.events.map((event) => {
                        return (<CalendarEventDetailStyles 
                                className="rfsc-calendar__details__detail rfsc-event-detail rfsc-event" 
                                data-id={ event.id } 
                                styles={ styles }
                                type={ postObject.type }
                                key={ event.id }
                            >
                            <div className="rfsc-event-detail__header">
                                <div className="rfsc-event-detail__header__date">
                                    { formatDate(event.event_content.date)?.day }
                                    .
                                    { formatDate(event.event_content.date)?.month }
                                </div>
                                <div className="rfsc-event-detail__header__leader">
                                    { event.event_content.leader }
                                </div>
                                <div className="rfsc-event-detail__header__type">
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
                break;
            case 'Page_Days_days_Posts_TattooLayout':
                postObject.type = 'tattoo'
                break;
            case 'Page_Days_days_Posts_RadioLayout':
                postObject.type = 'radio'
                content = <div>{(post.extra)}</div>;
                break;
            case 'Page_Days_days_Posts_SpaceLayout':
                postObject.type = 'space'
                content = <div>{(post.extra)}</div>;
                break;
        }

        // console.log(post)

        return { postObject, content}
    }

    // console.log(getDetailContent())

    return (
        <React.Fragment>
            {getDetailContent().content}
            {/* <h1>{ title }</h1>
            <h2>{ date }</h2>
            <h2>{ eventText }</h2>
            <h2>{ `${formatedFromTime.hours}:${formatedFromTime.minutes}` } - { `${formatedToTime.hours}:${formatedToTime.minutes}` }</h2>
            <h2>W{ week }</h2>
            <h3>{ type.name }</h3>
            <h3>{ location.name }</h3> */}
        </React.Fragment>
    )
}

export default CalendarDetailComponent

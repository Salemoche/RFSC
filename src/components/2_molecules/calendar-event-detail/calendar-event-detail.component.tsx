import React from 'react'
import { formatTime, formatDate, isType, isLocation, getCategories } from '../../../utils/helpers';
import { CalendarDetailStyles } from '../../../styles/calendar.styles';
import { useBaseState } from '../../../state/provider';

function CalendarEventDetailComponent({ post, type }) {

    const styles = useBaseState().state.base.styles;
    const content = useBaseState().state.content;
    const device = useBaseState().state.base.device;

    const getDetailContent = () => {

        let postObject = {
            type,
        };
        let detailContent = <React.Fragment></React.Fragment>;

        if ( type == 'event' && post.fieldGroupName === 'Page_Days_days_Posts_EventLayout' ) {
            detailContent = 
                <React.Fragment>
                {post.events.map((event) => {

                    // const locations: string[] = [];
                    // const locationTitles: string[] = [];
                    // const types: string[] = [];
                    // const typeTitles: string[] = [];

                    // event.categories.edges.forEach(node => {
                    //     const category = node.node;
                    //     if ( isType(category)) {
                    //         types.push(category?.slug);
                    //         typeTitles.push(category?.name);
                    //     } else if ( isLocation(category)) {
                    //         locations.push(category?.slug);
                    //         locationTitles.push(category?.name);
                    //     }
                    // });

                    const categories = getCategories(event);

                    // console.log(event)
                    return (<CalendarDetailStyles 
                            className={`rfsc-calendar__details__detail rfsc-event-detail rfsc-event`} 
                            data-id={ event.id } 
                            styles={ styles }
                            type={ postObject.type }
                            key={ event.id }
                        >

                        {device?.device?.type !== 'smartphone' && window.innerWidth > 768  ?
                            <div className="rfsc-event-detail__header rfsc-detail-header">
                                <div className="rfsc-event-detail__header__date rfsc-detail-header__item">
                                    { formatDate(event.event_content.date)?.day }
                                    .
                                    { formatDate(event.event_content.date)?.month }.
                                </div>
                                <div className="rfsc-event-detail__header__leader rfsc-detail-header__item">
                                    by { event.event_content.leader }
                                </div>
                                <div className="rfsc-event-detail__header__type rfsc-detail-header__item">
                                    { categories.typeTitles.toString() }
                                </div>
                            </div>
                        :
                            <div className="rfsc-event-detail__header rfsc-event-detail__header-mobile rfsc-detail-header">
                                <div className="rfsc-event-detail__header__date rfsc-detail-header__item">
                                    { formatDate(event.event_content.date)?.day }
                                    .
                                    { formatDate(event.event_content.date)?.month }.
                                </div>
                                <div className="rfsc-event-detail__header__by rfsc-detail-header__item">
                                    by
                                </div>
                                <div className="rfsc-event-detail__header__type rfsc-detail-header__item">
                                    { categories.typeTitles.toString() }
                                </div>
                                <div className="rfsc-event-detail__header__leader rfsc-event-detail__header__leader-wide rfsc-detail-header__item">
                                    { event.event_content.leader }
                                </div>
                            </div>
                        }
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
                                { categories.locationTitles.toString()}
                            </div>
                        </div>
                        <div className="rfsc-event-detail__content" dangerouslySetInnerHTML={{ __html: event.event_content.eventText }}></div>
                    </CalendarDetailStyles>)
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

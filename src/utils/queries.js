export const WP_EVENTS_QUERY = {
    query: `{ 
        events {
            nodes {
                title
                event_content {
                    date
                    eventText
                    fieldGroupName
                    fromTime
                    toTime
                    week
                }
            }
        }
    }`
};

export const WP_QUERY = {
    query: `{
        categories {
            edges {
                node {
                    id
                    name
                    slug
                    parentId
                }
            }
        }
        events {
            nodes {
                id
                title
                event_content {
                    date
                    eventText
                    fieldGroupName
                    fromTime
                    toTime
                    week
                }
                categories {
                    edges {
                        node {
                            slug
                            name
                            parentId
                        }
                    }
                }
            }
        }
        pageBy(pageId: 21) {
            days {
                days {
                    week
                    index
                    events {
                    ... on Event {
                        id
                        slug
                        event_content {
                            eventText
                            date
                            fromTime
                            toTime
                            }
                        }
                    }
                    posts {
                        testText
                    }
                }
            }
        }
    }`
}
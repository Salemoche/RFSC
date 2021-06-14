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
    }`,
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
        pages {
            nodes {    
            pageId
            infos {
                content
            }
            space {
                content
                icon {
                    sourceUrl
                }
            }
            radio {
                iconLeft {
                    sourceUrl
                }
                iconRight {
                    sourceUrl
                }
                offlineText
            }
            days {
                days {
                    week
                    index
                    posts {
                        ... on Page_Days_days_Posts_EventLayout {
                            events {
                                ... on Event {
                                    id
                                    title
                                    slug
                                    event_content {
                                        eventText
                                        date
                                        fromTime
                                        toTime
                                        leader
                                    }
                                    categories {
                                        edges {
                                            node {
                                            id
                                            slug
                                            parentId
                                            name
                                            }
                                        }
                                    }
                                }
                            }
                            fieldGroupName
                        }
                        ... on Page_Days_days_Posts_RadioLayout {
                            extra
                            fieldGroupName
                            icon {
                                sourceUrl
                            }
                        }
                        ... on Page_Days_days_Posts_SpaceLayout {
                            fieldGroupName
                            icon {
                                sourceUrl
                            }
                        }
                        ... on Page_Days_days_Posts_TattooLayout {
                            extra
                            fieldGroupName
                                icon {
                                    sourceUrl
                                }
                            }
                        }
                    }
                }
            }
        }
        events {
            edges {
                node {
                    id
                }
            }
        }
        siteSettings {
            siteSettings {
                logo {
                    sourceUrl
                }
                iconPlay {
                    sourceUrl
                }
                iconPause {
                    sourceUrl
                }
                iconOnAir {
                    sourceUrl
                }
            }
        }
    }`
}

export const WP_SPACE_QUERY = {
    query: `{
        pageBy(id: "67") {
            id
            space {
                content
                icon {
                    sourceUrl
                }
            }
        }
    }`
}

export const WP_TEST_QUERY = {
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
        pageBy(pageId: 21) {
            days {
                days {
                    week
                    index
                    posts {
                        ... on Page_Days_days_Posts_EventLayout {
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
                            fieldGroupName
                        }
                        ... on Page_Days_days_Posts_RadioLayout {
                            extra
                            fieldGroupName
                            icon {
                                sourceUrl
                            }
                        }
                        ... on Page_Days_days_Posts_SpaceLayout {
                            fieldGroupName
                            icon {
                                sourceUrl
                            }
                        }
                        ... on Page_Days_days_Posts_TattooLayout {
                                extra
                                fieldGroupName
                                icon {
                                    sourceUrl
                                }
                            }
                        }
                    }
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
    }`,
};
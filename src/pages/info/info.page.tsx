import React, { useEffect } from 'react'
import actions from '../../state/actions';
import { useBaseState } from '../../state/provider';
import { InfoStyles } from '../../styles/default.styles'

function InfoPage() {

    const styles = useBaseState().state.base.styles;
    const { content } = useBaseState().state.content.infos;
    // const base = useBaseState().base;
    const updateBaseState = useBaseState().dispatchBase;

    useEffect(() => {
        updateBaseState({ type: actions.SET_BASE, payload: { headerFooterClass: 'info' } });
        updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: true } });

        return () => {
            updateBaseState({ type: actions.SET_BASE, payload: { headerFooterClass: 'default' } });            
            updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: false } });
        }
    }, [])

    // const contentLoaded = () => {
    //     updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: true } });
    //     console.log('loaded')
    // }

    return (
        <InfoStyles className="rfsc-content rfsc-infos" styles={ styles }>
            <div 
                className="rfsc-infos__content" 
                dangerouslySetInnerHTML={{ __html: content }}    
            ></div>
        </InfoStyles>
    )
}

export default InfoPage

import React, { useEffect } from 'react'
import actions from '../../state/actions';
import { useBaseState } from '../../state/provider';
import { InfoStyles } from '../../styles/default.styles'

function InfoPage() {

    const styles = useBaseState().state.base.styles;
    const { content } = useBaseState().state.content.infos;
    // const base = useBaseState().base;
    const setheaderFooterClass = useBaseState().dispatchBase;

    useEffect(() => {
        setheaderFooterClass({ type: actions.SET_BASE, payload: { headerFooterClass: 'info' } });

        return () => {
            setheaderFooterClass({ type: actions.SET_BASE, payload: { headerFooterClass: 'default' } });
        }
    }, [])

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

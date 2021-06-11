import React from 'react'
import { useBaseState } from '../../state/provider';
import { InfoStyles } from '../../styles/default.styles'

function InfoPage() {

    const styles = useBaseState().state.base.styles;

    return (
        <InfoStyles className="rfsc-content rfsc-info" styles={ styles }>
            <h1>This is the info</h1>
        </InfoStyles>
    )
}

export default InfoPage

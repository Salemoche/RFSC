import React, { useEffect } from 'react'

// Styles
// import './footer.styles.scss';
import { FooterStyles } from '../../../styles/default.styles';
import { useBaseState } from '../../../state/provider';
import actions from '../../../state/actions';

function FooterComponent() {
    const state = useBaseState().state;
    const setFooterSize = useBaseState().dispatchBase;

    useEffect(() => {
        setFooterSize({ type: actions.SET_SIZES, payload: { footerHeight: 50} });
    }, [])

    return (
        <FooterStyles className="rfsc-footer" sizes={ state.base.sizes } styles={ state.base.styles }>
            Footer
        </FooterStyles>
    )
}

export default FooterComponent

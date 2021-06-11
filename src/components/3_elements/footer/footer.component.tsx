import React, { useEffect } from 'react'
import PlayerComponent from '../player/player.component';
// Styles
// import './footer.styles.scss';
import { ButtonStyles, FooterStyles } from '../../../styles/default.styles';
import { useBaseState } from '../../../state/provider';
import actions from '../../../state/actions';
import { Link } from 'react-router-dom';

function FooterComponent() {
    const state = useBaseState().state;
    const setFooterSize = useBaseState().dispatchBase;

    useEffect(() => {
        setFooterSize({ type: actions.SET_SIZES, payload: { footerHeight: 50} });
    }, [])

    // console.log(state.sound)

    return (
        <FooterStyles className="rfsc-footer" sizes={ state.base.sizes } styles={ state.base.styles }>
            <PlayerComponent/>
            <Link to="/radio">Radio</Link>
            <ButtonStyles className="rfsc-footer-on-air" styles={ state.base.styles }>
                { state.sound.onAir.sourceUrl ?
                    <span>on air <img src={state.base.icons.onAir} alt="rfsc-logo" /></span>
                    
                :
                    <span>offline</span>
                }
            </ButtonStyles>
        </FooterStyles>
    )
}

export default FooterComponent

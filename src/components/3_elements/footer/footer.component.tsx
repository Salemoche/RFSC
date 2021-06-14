import React, { useEffect } from 'react'
import PlayerComponent from '../player/player.component';
// Styles
// import './footer.styles.scss';
import { ButtonStyles, FooterStyles, IconStyles } from '../../../styles/default.styles';
import { useBaseState } from '../../../state/provider';
import actions from '../../../state/actions';
import { NavLink } from 'react-router-dom';

function FooterComponent() {
    const state = useBaseState().state;
    const setFooterSize = useBaseState().dispatchBase;

    useEffect(() => {
        setFooterSize({ type: actions.SET_SIZES, payload: { footerHeight: 50} });
    }, [])

    return (
        <FooterStyles className={`rfsc-footer ${ state.base.headerFooterClass }`} sizes={ state.base.sizes } styles={ state.base.styles }>
            <PlayerComponent/>
            <NavLink to="/radio">Radio</NavLink>
            <ButtonStyles className="rfsc-footer-on-air" styles={ state.base.styles }>
                { state.sound.onAir ?
                    <div>
                        on air 
                        <IconStyles className="rfsc-icon" styles={ state.base.styles }>
                            <img src={state.base.icons.iconOnAir.sourceUrl} alt="rfsc-logo" />
                        </IconStyles>
                    </div>
                :
                    <span>offline</span>
                }
            </ButtonStyles>
        </FooterStyles>
    )
}

export default FooterComponent

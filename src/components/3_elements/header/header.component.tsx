import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import PlayerComponent from '../player/player.component';

// Styles
// import './header.styles.scss';
import { HeaderStyles } from '../../../styles/default.styles';
import { useBaseState } from '../../../state/provider';
import actions from '../../../state/actions';

function HeaderComponent() {
    const state = useBaseState().state;
    const setHeaderSize = useBaseState().dispatchBase;

    useEffect(() => {
        setHeaderSize({ type: actions.SET_SIZES, payload: { headerHeight: 50} });
    }, [])

    return (
        <HeaderStyles className="rfsc-header" sizes={ state.base.sizes } styles={ state.base.styles }>
            <ul>
                <NavLink to="/infos">
                    <li>Infos</li>
                </NavLink>
                <NavLink to="/" exact>
                    <li>Kalender</li>
                </NavLink>
                <NavLink to="/radio">
                    <li>Radio</li>
                </NavLink>
            </ul>
            <PlayerComponent/>
        </HeaderStyles>
    )
}

export default HeaderComponent

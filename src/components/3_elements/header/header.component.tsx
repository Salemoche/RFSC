import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';

// Styles
// import './header.styles.scss';
import { HeaderStyles, ButtonStyles } from '../../../styles/default.styles';
import { useBaseState } from '../../../state/provider';
import actions from '../../../state/actions';

function HeaderComponent() {
    const state = useBaseState().state;
    const setBaseState = useBaseState().dispatchBase;

    useEffect(() => {
        setBaseState({ type: actions.SET_SIZES, payload: { headerHeight: 50 } });
    }, [])

    const handleClose = () => {
        setBaseState({ type: actions.SET_BASE, payload: { showEventDetail: false } });
    }

    return (
        <HeaderStyles className={`rfsc-header ${ state.base.headerFooterClass }`} sizes={ state.base.sizes } styles={ state.base.styles }>
            <ul>
                <NavLink to="/infos">
                    <li>Infos</li>
                </NavLink>
                { state.base.showEventDetail ?
                    <ButtonStyles 
                        className="color-red" 
                        styles={ state.base.styles }
                        onClick={ handleClose }
                    >X</ButtonStyles>
                :
                    <NavLink to="/" exact>
                        <li>Kalender</li>
                    </NavLink>
                }
                <NavLink to="/space">
                    <li>Space</li>
                </NavLink>
            </ul>
        </HeaderStyles>
    )
}

export default HeaderComponent

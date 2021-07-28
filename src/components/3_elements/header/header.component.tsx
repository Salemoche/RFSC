import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';

// Styles
// import './header.styles.scss';
import { HeaderStyles, ButtonStyles } from '../../../styles/default.styles';
import { useBaseState } from '../../../state/provider';
import actions from '../../../state/actions';
import xIcon from '../../../assets/img/SC_X_Webseite-11.svg'

function HeaderComponent() {
    const state = useBaseState().state;
    const setBaseState = useBaseState().dispatchBase;

    useEffect(() => {
        setBaseState({ type: actions.SET_SIZES, payload: { headerHeight: 55 } });
    }, [])

    const handleClose = () => {
        setBaseState({ type: actions.SET_BASE, payload: { showEventDetail: false, showRadioDetail: false, showTattooDetail: false } });
    }

    return (
        <HeaderStyles className={`rfsc-header ${ state.base.headerFooterClass }`} sizes={ state.base.sizes } styles={ state.base.styles }>
            <ul>
                <NavLink to="/infos">
                    <li>Infos</li>
                </NavLink>
                { state.base.showEventDetail || state.base.showRadioDetail || state.base.showTattooDetail ?
                    <ButtonStyles 
                        className="rfsc-close-icon color-red" 
                        styles={ state.base.styles }
                        onClick={ handleClose }
                    >
                        <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 637.58 637.52">
                        <text transform="matrix(2.4 0 0 1 -145.0133 624.0554)"> </text>
                        <text transform="matrix(2.4 0 0 1 -12.0797 566.6774)"> </text>
                        <text transform="matrix(2.4 0 0 1 -95.8473 574.4528)"> </text>
                        <g>
                            <path style={{fill: '#E42321'}} d="M393.85,308.96L637.7,636.8H495.44l-99.76-140.76c-19.15-28.15-56.25-78.89-77.41-111.59
                                c-19.15,29.97-51.21,74.35-77.41,111.59L141.11,636.8H0.86l243.85-327.84L17.99,1.1h137.33l90.69,126.23
                                c22.17,30.88,55.13,77.08,74.28,107.05c19.15-29.97,53.22-76.17,75.39-107.05L485.36,1.1h136.22L393.85,308.96z"/>
                        </g>
                        </svg>
                    </ButtonStyles>
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

// Base
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
import HomePage from '../../../pages/home/home.page';
import HeaderComponent from '../../../components/3_elements/header/header.component';
import RadioPage from '../../../pages/radio/radio.page';
import InfoPage from '../../../pages/info/info.page';

// Helpers

// Styles 
import { GlobalStyle, AppStyles, MainStyles } from '../../../styles/default.styles';
import { useBaseState } from '../../../state/provider';
import FooterComponent from '../footer/footer.component';

function Wrapper() {

    const state = useBaseState().state;

    return (
        <Router>
            <GlobalStyle/>
            <AppStyles sizes={ state.base.sizes }>
                <HeaderComponent/>
                <MainStyles className="rfsc-content" styles={ state.base.styles }>
                <Switch>
                    <Route path="/"component={HomePage}/>
                    <Route path="/infos" exact component={InfoPage}/>
                    <Route path="/radio" exact component={RadioPage}/>
                </Switch>
                </MainStyles>
                <FooterComponent/>
            </AppStyles>
        </Router>
    );
}

export default Wrapper;

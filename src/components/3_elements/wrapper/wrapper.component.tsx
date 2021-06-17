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
import SpacePage from '../../../pages/space/space.page';
import AudioComponent from '../audio/audio.component';
import LoadingComponent from '../../2_molecules/loading/loading.component';
import actions from '../../../state/actions';

function Wrapper() {

    const state = useBaseState().state;
    const updateBaseState = useBaseState().dispatchBase;

    const handleLoad = () => {
        // console.log('everything is ready');
        updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: true } });
    }

    return (
        <Router>
            <GlobalStyle/>
            <AppStyles sizes={ state.base.sizes } device={ state.base.device } onLoad={ handleLoad }>
                <HeaderComponent/>
                <MainStyles styles={ state.base.styles }>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/infos" exact component={InfoPage}/>
                    <Route path="/radio" exact component={RadioPage}/>
                    <Route path="/space" exact component={SpacePage}/>
                </Switch>
                </MainStyles>
                <LoadingComponent/>
                <FooterComponent/>
                <AudioComponent/>
            </AppStyles>
        </Router>
    );
}

export default Wrapper;

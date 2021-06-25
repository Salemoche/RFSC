// Base
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
import DeviceDetector from 'device-detector-js';
import HeaderMobileComponent from '../header-mobile/header-mobile.component';

function Wrapper() {

    const state = useBaseState().state;
    const updateBaseState = useBaseState().dispatchBase;

    interface Device {
        client: {
            name: string,
        },
        device: {
            type: string
        }
    }

    const [device, setDevice] = useState<Device | DeviceDetector.DeviceDetectorResult | null>({
        client: {
            name: '',
        },
        device: {
            type: ''
        }
    });

    const handleLoad = () => {
        // console.log('everything is ready');
        updateBaseState({ type: actions.SET_BASE, payload: { contentLoaded: true } });
    }

    const handleResize = () => {
        console.log(device?.client?.name);
    }

    useEffect(() => {

        handleResize();
        window.addEventListener('resize', handleResize);
        updateBaseState({ type: actions.SET_BASE, payload: { device: getDevice() } });
        
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const getDevice = () => {
        const deviceDetector = new DeviceDetector();
        const userAgent = window.navigator.userAgent;
        const detectedDevice = deviceDetector.parse(userAgent);
        setDevice(detectedDevice)
        return detectedDevice;
    }

    return (
        <Router>
            <GlobalStyle/>
            <AppStyles sizes={ state.base.sizes } device={ device } onLoad={ handleLoad }>
                {device?.device?.type !== 'smartphone' && window.innerWidth > 768 ?
                    <HeaderComponent/>
                :
                    <HeaderMobileComponent/>
                }
                <MainStyles styles={ state.base.styles }>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/infos" exact component={InfoPage}/>
                    <Route path="/radio" exact component={RadioPage}/>
                    <Route path="/space" exact component={SpacePage}/>
                </Switch>
                </MainStyles>
                <LoadingComponent/>
                {device?.device?.type !== 'smartphone' && window.innerWidth > 768  ?
                    <FooterComponent/>
                :
                    ''
                }
                <AudioComponent/>
            </AppStyles>
        </Router>
    );
}

export default Wrapper;

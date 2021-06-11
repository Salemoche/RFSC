// Base
import './App.scss';

// Helpers
import { BaseStateProvider } from './state/provider';
import LoaderComponent from './components/1_atoms/loader/loader.component';

// Styles 
import Wrapper from './components/3_elements/wrapper/wrapper.component';

function App() {
  
  // const [base, dispatchBase] = useReducer( reducer, baseState);
  // const [content, dispatchContent] = useReducer( reducer, baseState);
  // const [months, setMonths] = useState([]);
  // const [days, setDays] = useState([]);

  return (
    <BaseStateProvider>
      <LoaderComponent/>
      <div className="App rfsc">
        <Wrapper/>
      </div>
    </BaseStateProvider>
  );
}

export default App;

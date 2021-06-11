import React, { useContext, useReducer, useMemo } from 'react';
import { baseState } from './base-state';
import { reducer } from './reducers';

const BaseStateContext = React.createContext(  );
// const BaseStateContextUpdate = React.createContext();

export const useBaseState = () => {
    return useContext(BaseStateContext);
}

export const BaseStateProvider = ({ children }) => {

    const [state, dispatchBase] = useReducer(reducer, baseState);
    const contextValue = useMemo(() => {
        return {state, dispatchBase}
    }, [state, dispatchBase])

    return (
        <BaseStateContext.Provider value={contextValue}>
            { children }    
        </BaseStateContext.Provider>
    )
}
import React from 'react'
import { AppContext } from './AppContext';

const ContextProvider = ({children}) => {
  const name = "Agalo Simon";
  const phone ="25070000056";

  return (
    <div>
      <AppContext.Provider value={{name, phone}}>
        {children}
      </AppContext.Provider>
    </div>
  )
}

export default ContextProvider

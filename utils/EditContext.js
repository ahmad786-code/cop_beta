import React, { createContext, useContext, useState } from 'react';

const EditContext = createContext();

export const EditProvider = ({ children }) => {
  const [isEdit, setIsEdit] = useState(false);

 
  const toggleEdit = () => setIsEdit(prev => !prev);

  return (
    <EditContext.Provider value={{ isEdit, setIsEdit, toggleEdit }}>
      {children}
    </EditContext.Provider>
  );
};

 
export const useEdit = () => useContext(EditContext);

export  const reducer = (state, action) => {
    const { inputId, inputValue } = action;
    const updatedValues = {
        ...state.inputValues,
        [inputId]: inputValue
    };

    return {
        inputValues: updatedValues,
        
    };
}
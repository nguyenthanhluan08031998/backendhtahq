const updateState = (oldState, updatedState) => {
   return {
      ...oldState, // overide the old statef
      ...updatedState, // update the new state
   };
};

const initialState = {
   isLoading: false
};

const setLoading = (state, value) => {
   return updateState(state, { isLoading: value.isLoading });
};

const reducer = (state = initialState, action) => {
   return setLoading(state, action);
};

export default reducer;

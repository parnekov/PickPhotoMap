const initialState = {
  photo: null,
  where: {latitude: null, longitude: null},
  error: null,
  isReady: false
}

export const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
      case 'GET_PHOTO':          
          return {...state, photo: payload};
      case 'GET_GPS':
          return {...state, where: payload};       
      case 'GET_ERROR':
          return {...state, error: payload};    
      default: 
      return state;
  }
}


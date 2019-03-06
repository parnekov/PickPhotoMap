
export const getGpsAsync = ()=>{
    return (dispatch) => {
        const geoOptions = {
            enableHighAccuracy: false,
            timeOut: 50000,
            maximumAge: 60 * 60 * 24
        }
        navigator.geolocation.getCurrentPosition(
            (position)=>{console.log(position); dispatch({type: 'GET_GPS', payload: position.coords}) }, /*succsess*/
            (err)=>{console.log(err); dispatch({type: 'GET_ERROR', payload: err.message})}, /*error*/
            geoOptions);
    }
};

export const getPhoto = (uri)=>({type: 'GET_PHOTO',  payload: uri});
import { FAILED, REQUEST, SUCCESS } from "../reducer/empReducer";

export const getallemp = (api) => async (dispatch) => {
    try {
        dispatch(REQUEST());
        const response = await fetch(api, {
            headers: {
                "token": JSON.parse(localStorage.getItem("token")),
                "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        const res = await response.json();

        if (res.result) {
            dispatch(SUCCESS(res.data));
        } else {
            console.log(res.message)
            dispatch(FAILED(res.message));
        }
    } catch (error) {
        console.log(error)
        dispatch(FAILED(error.message));
    }
};
const SET_STARTED = 'training/SET_STARTED'

export const setStarted = (started) => ({type: SET_STARTED, started})

const initialState = {
    started: false,
}

const trainingRedux = (state = initialState, action) => {
    switch (action.type) {
        case SET_STARTED:
            return {...state, started: action.started}
        default:
            return state
    }
}
export default trainingRedux
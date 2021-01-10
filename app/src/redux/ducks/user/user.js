const SET_APPBAR_TITLE = 'user/SET_APPBAR_TITLE'

export const setAppbarTitle = (newTitle) => ({type: SET_APPBAR_TITLE, newTitle})

const initialState = {
    appbarTitle: ""
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_APPBAR_TITLE:
            return {...state, appbarTitle: action.newTitle}
        default:
            return state
    }
}
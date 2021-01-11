const SET_APPBAR_TITLE = 'user/SET_APPBAR_TITLE'
const SET_APPBAR_HIDDEN = 'user/SET_APPBAR_HIDDEN'

export const setAppbarTitle = (newTitle) => ({type: SET_APPBAR_TITLE, newTitle})
export const setAppbarHidden = (hidden) => ({type: SET_APPBAR_HIDDEN, hidden})

const initialState = {
    appbarTitle: "Dashboard",
    isAppbarHidden: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_APPBAR_TITLE:
            return {...state, appbarTitle: action.newTitle}
        case SET_APPBAR_HIDDEN:
            return {...state, isAppbarHidden: action.hidden}
        default:
            return state
    }
}
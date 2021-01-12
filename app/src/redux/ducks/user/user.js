const SET_DARK_MODE = 'user/SET_DARK_MODE'
const SET_APPBAR_TITLE = 'user/SET_APPBAR_TITLE'
const SET_APPBAR_HIDDEN = 'user/SET_APPBAR_HIDDEN'

export const setDarkMode = (isOn) => ({type: SET_DARK_MODE, isOn})
export const setAppbarTitle = (newTitle) => ({type: SET_APPBAR_TITLE, newTitle})
export const setAppbarHidden = (hidden) => ({type: SET_APPBAR_HIDDEN, hidden})

const initialState = {
    darkMode: false,
    appbarTitle: "Dashboard",
    isAppbarHidden: false,
}

const userRedux = (state = initialState, action) => {
    switch (action.type) {
        case SET_DARK_MODE:
            return {...state, darkMode: action.isOn}
        case SET_APPBAR_TITLE:
            return {...state, appbarTitle: action.newTitle}
        case SET_APPBAR_HIDDEN:
            return {...state, isAppbarHidden: action.hidden}
        default:
            return state
    }
}
export default userRedux
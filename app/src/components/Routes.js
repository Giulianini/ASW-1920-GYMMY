const routes = {
    user: {
        name: "User",
        value: "user",
    },
    admin: {
        name: "Admin",
        value: "admin",
        routes: {
            dashboard: {
                name: "Dashboard",
                value: `admin/dashboard`
            },
            goals: {
                name: "Goals",
                value: `admin/goals`
            },
            cards: {
                name: "Cards",
                value: `admin/cards`
            },
            activities: {
                name: "Activities",
                value: `admin/activities`
            },
            locations: {
                name: "Locations",
                value: `admin/locations`
            }
        }
    },
    dashboard: {
        name: "Dashboard",
        value: "user/dashboard",
    },
    personal: {
        name: "Personal",
        value: "user/personal",
    },
    statistics: {
        name: "Statistics",
        value: "user/statistics",
    },
    training: {
        name: "Training",
        value: "user/training",
    },
    login: {
        name: "Login",
        value: "login",
    },
    signup: {
        name: "Signup",
        value: "signup",
    },
}

export default routes
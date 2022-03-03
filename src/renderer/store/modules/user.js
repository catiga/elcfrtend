const state = {
    nowUser: null    // 默认值
}

const getters = {
    getLoginUser: state=> state.nowUser
}

const mutations = {
    updateLoginUser(state, currentUser) {
        state.nowUser = currentUser
    }
}

export default {
    state,
    mutations,
    getters
}
export const state = () => ({
    allTodos: []
})

export const mutations = {
    setTodos(state, payload) {
        state.allTodos = payload
    },
    processTask(state, payload) {
        const task = payload.task
        const index = state.allTodos.findIndex(item => item.id === task.id)

        switch (payload.action) {
            case "POST": {
                state.allTodos.push(task)
                break;
            }
            case "PUT": {
                state.allTodos[index] = task
                break;
            }
            case "DELETE": {
                state.allTodos = state.allTodos.filter(item => item.id !== task.id)
                break;
            }
        }
    },
}


export const actions = {
    async getTodos({ commit }) {
        let data = await this.$axios.$get("todos")
        commit('setTodos', data)
    },
    handleTask({ commit }, payload) {
        const task = payload.task
        delete task.edit

        this.$axios({
            method: payload.action,
            url: `todos/${task.id || ''}`,
            data: task
        }).then((res) => {
            commit('processTask', { action: payload.action, task: Object.keys(res.data).length ? res.data : task })
        })
    }
}
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
                const currentTask = state.allTodos.find(item => item.id === task.id)
                currentTask.title = task.title
                currentTask.completed = task.completed
                currentTask.edit = task.edit
                break;
            }
            case "DELETE": {
                state.allTodos = state.allTodos.filter(item => item.id !== task.id)
                break;
            }
        }
    },
    setTaskEditable(state, payload) {
        payload.task.edit = true
        const currentTask = state.allTodos.find(item => item.id === payload.task.id)

        if (currentTask) {
            currentTask.edit = payload.edit
        }
    }
}


export const actions = {
    async getTodos({ commit }) {
        let data = await this.$axios.$get("todos")
        commit('setTodos', data)
    },
    handleTask({ commit }, payload) {
        const task = payload.task
        console.log("🚀 ~ file: todos.js ~ line 48 ~ handleTask ~ task", task)

        this.$axios({
            method: payload.action,
            url: `todos/${task.id !== undefined ? task.id : ''}`,
            data: task
        }).then((res) => {
            commit('processTask', { action: payload.action, task: Object.keys(res.data).length ? res.data : task })
        })
    }
}
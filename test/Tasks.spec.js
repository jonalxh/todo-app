import { mount } from '@vue/test-utils'
import Tasks from '@/components/Tasks.vue'
import { actions, mutations } from "@/store/todos.js"

describe('Tasks', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Tasks)
    expect(wrapper.vm).toBeTruthy()
  })

  test('Get todos from API and set the result to the state', async () => {
    const commit = jest.fn() // Fake method
    const state = {
      allTodos: []
    }

    await actions.getTodos({ commit }).then(res => {
      expect(res.length).toBeGreaterThan(0)
      mutations.setTodos(state, res)
      expect(state.allTodos).toBe(res)
    })
  })

  test('Create fake task in DB with API', async () => {
    const commit = jest.fn() // Fake method

    await actions.handleTask({ commit }, {
      task: {
        title: "Testing task from Jest",
        completed: false,
        edit: false
      },
      action: "POST"
    }).then(res => {
      expect(res.data.title).toStrictEqual("Testing task from Jest")
    })
  })
})

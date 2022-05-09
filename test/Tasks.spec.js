import { shallowMount } from '@vue/test-utils'
import Tasks from '@/components/Tasks.vue'
import { actions, state } from "@/store/todos.js"

describe('Tasks', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Tasks)
    expect(wrapper.vm).toBeTruthy()
  })

  test('Get todos from API', async () => {
    const commit = jest.fn()

    await actions.getTodos({ commit }).then(res => {
      expect(res.length > 0).toBeTruthy()
    })
  })
})

import { mount } from '@vue/test-utils'
import App from './../src/App.vue'

describe('Mounted App', () => {
  const wrapper = mount(App);

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('Hello world')
  })

  it('button click works', () => {
    expect(wrapper.vm.message).toBe("button is not clicked")
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.message).toBe('button was clicked')
  })
})

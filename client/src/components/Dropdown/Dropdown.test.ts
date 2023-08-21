import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Dropdown from './index.vue'

describe('Dropdown', () => {
  it('renders properly', () => {
    const wrapper = mount(Dropdown, { props: { text: 'Label' } })
    expect(wrapper.text()).toContain('Label')
    expect(wrapper.html()).toMatchSnapshot()
  })
})

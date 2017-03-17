import React from 'react'
import { shallow } from 'enzyme'
import Animation from 'components/atoms/animation'
import constants from 'store/constants'

jest.mock('svg/normal-star.svg', () => 'normalsvg')
jest.mock('svg/better-star.svg', () => 'bettersvg')
jest.mock('svg/boom-star.svg', () => 'boomsvg')

it('should render an en element without animation', () => {
  const wrapper = shallow(
    <Animation
      total={3}
      current={2}
    />
  )

  const wrapperClassList = wrapper.prop('className').split(' ')
  expect(wrapperClassList).not.toContain('animated')
  expect(wrapperClassList).not.toContain('headShake')
  expect(wrapperClassList).not.toContain('tada')
})

it('should render an element without animation', () => {
  const wrapper = shallow(
    <Animation
      direction={constants.ACTION_UP}
      total={2}
      current={3}
    />
  )

  const wrapperClassList = wrapper.prop('className').split(' ')
  expect(wrapperClassList).not.toContain('animated')
  expect(wrapperClassList).not.toContain('headShake')
  expect(wrapperClassList).not.toContain('tada')
})

it('should render an element without animation', () => {
  const wrapper = shallow(
    <Animation
      direction={constants.ACTION_DOWN}
      total={3}
      current={3}
    />
  )

  const wrapperClassList = wrapper.prop('className').split(' ')
  expect(wrapperClassList).not.toContain('animated')
  expect(wrapperClassList).not.toContain('headShake')
  expect(wrapperClassList).not.toContain('tada')
})

it('should render an element with an upward animation', () => {
  const wrapper = shallow(
    <Animation
      direction={constants.ACTION_UP}
      total={3}
      current={3}
    />
  )

  const wrapperClassList = wrapper.prop('className').split(' ')
  expect(wrapperClassList).toContain('animated')
  expect(wrapperClassList).not.toContain('headShake')
  expect(wrapperClassList).toContain('tada')
})

it('should render an element with an downward animation', () => {
  const wrapper = shallow(
    <Animation
      direction={constants.ACTION_DOWN}
      total={2}
      current={3}
    />
  )

  const wrapperClassList = wrapper.prop('className').split(' ')
  expect(wrapperClassList).toContain('animated')
  expect(wrapperClassList).toContain('headShake')
  expect(wrapperClassList).not.toContain('tada')
})

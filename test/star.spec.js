import React from 'react'
import { shallow } from 'enzyme'
import Star from 'components/atoms/star'

jest.mock('svg/normal-star.svg', () => 'normalsvg')
jest.mock('svg/better-star.svg', () => 'bettersvg')
jest.mock('svg/boom-star.svg', () => 'boomsvg')

it('should render an active and selected star', () => {
  const wrapper = shallow(
    <Star
      selected
      onClick={() => {}}
      type="normal"
    />
  )

  const wrapperClassList = wrapper.prop('className').split(' ')
  expect(wrapperClassList).toContain('active')
  expect(wrapperClassList).toContain('selected')
})

it('should render a active star', () => {
  const wrapper = shallow(
    <Star
      onClick={() => {}}
      selected={false}
      type="normal"
    />
  )

  const wrapperClassList = wrapper.prop('className').split(' ')
  expect(wrapperClassList).toContain('active')
  expect(wrapperClassList).not.toContain('selected')
})

it('should render a without animations', () => {
  const wrapper = shallow(
    <Star
      selected={false}
      type="normal"
    />
  )

  const wrapperClassList = wrapper.prop('className').split(' ')
  expect(wrapperClassList).not.toContain('animated')
})

it('should render with the right icon', () => {
  const wrapper = shallow(
    <Star
      selected
      type="normal"
    />
  )

  expect(wrapper.find('SVGInline').prop('svg')).toEqual('normalsvg')

  wrapper.setProps({
    type: 'boom'
  })

  expect(wrapper.find('SVGInline').prop('svg')).toEqual('boomsvg')

  wrapper.setProps({
    type: 'better'
  })

  expect(wrapper.find('SVGInline').prop('svg')).toEqual('bettersvg')
})

it('should have a clickable svg', () => {
  const onClick = jest.fn()
  const wrapper = shallow(
    <Star
      onClick={onClick}
      selected
      type="normal"
    />
  )

  wrapper.simulate('click')
  expect(onClick).not.toBeCalled()

  wrapper.find('SVGInline').simulate('click')
  expect(onClick).toBeCalled()
})

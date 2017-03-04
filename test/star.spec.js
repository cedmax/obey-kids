import React from 'react';
import { shallow } from 'enzyme';
import Star from 'components/atoms/star';
import Beep from 'components/atoms/beep';

jest.mock('svg/normal-star.svg', () => 'normalsvg');
jest.mock('svg/better-star.svg', () => 'bettersvg');
jest.mock('svg/boom-star.svg', () => 'boomsvg');

it('should render an active and selected star', () => {
  const wrapper = shallow(
    <Star 
      active={true}
      selected={true}
      type="normal" />
  );

  const wrapperClassList = wrapper.prop('className').split(' ');
  expect(wrapperClassList).toContain('active');
  expect(wrapperClassList).toContain('selected');
});

it('should render a selected star', () => {
  const wrapper = shallow(
    <Star 
      active={false}
      selected={true}
      type="normal" />
  );
  
  const wrapperClassList = wrapper.prop('className').split(' ');
  expect(wrapperClassList).not.toContain('active');
  expect(wrapperClassList).toContain('selected');
});

it('should render a active star', () => {
  const wrapper = shallow(
    <Star 
      active={true}
      selected={false}
      type="normal" />
  );
  
  const wrapperClassList = wrapper.prop('className').split(' ');
  expect(wrapperClassList).toContain('active');
  expect(wrapperClassList).not.toContain('selected');
});

it('should render a without sounds or animations', () => {
  const wrapper = shallow(
    <Star 
      active={true}
      selected={false}
      type="normal" />
  );
  
  const wrapperClassList = wrapper.prop('className').split(' ');
  expect(wrapperClassList).not.toContain('animated');
  expect(wrapper.contains(<Beep direction="up" />)).toBeFalsy();
  expect(wrapper.contains(<Beep direction="down" />)).toBeFalsy();
});

it('should render with an animation and sound if changes selection to down', () => {
  const wrapper = shallow( 
    <Star 
      active={true}
      selected={true}
      type="normal" />
  );
  
  wrapper.setProps({
    'selected': false
  });

  const wrapperClassList = wrapper.prop('className').split(' ');
  expect(wrapperClassList).toContain('headShake');
  expect(wrapper.contains(<Beep direction="down" />)).toBeTruthy();
});

it('should render with an animation and sound if changes selection to up', () => {
  const wrapper = shallow(
    <Star 
      active={true}
      selected={false}
      type="normal" />
  );
  
  wrapper.setProps({
    'selected': true
  });

  const wrapperClassList = wrapper.prop('className').split(' ');
  expect(wrapperClassList).toContain('animated');
  expect(wrapperClassList).toContain('tada');
  expect(wrapper.contains(<Beep direction="up" />)).toBeTruthy();
});

it('should render with the right icon', ()=>{
  const wrapper = shallow(
    <Star 
      active={true}
      selected={true}
      type="normal" />
  );

  expect(wrapper.find('SVGInline').prop('svg')).toEqual('normalsvg');

  wrapper.setProps({
    type: 'boom'
  });
  
  expect(wrapper.find('SVGInline').prop('svg')).toEqual('boomsvg');

  wrapper.setProps({
    type: 'better'
  });
  
  expect(wrapper.find('SVGInline').prop('svg')).toEqual('bettersvg');
});

it('should have a clickable svg', ()=>{
  const onClick = jest.fn();
  const wrapper = shallow(
    <Star
      onClick={onClick}
      active={true}
      selected={true}
      type="normal" />
  );
  
  wrapper.simulate('click');
  expect(onClick).not.toBeCalled();

  wrapper.find('SVGInline').simulate('click');
  expect(onClick).toBeCalled();
});
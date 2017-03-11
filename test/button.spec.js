import React from 'react';
import { shallow } from 'enzyme';
import Button from 'components/atoms/button';

it('should apply the className to the wrapping element', () => {
  const onClick = jest.fn();
  const wrapper = shallow(
    <Button
      onClick={ onClick }
      text="My Button"
      className="btn"
    />
  );
  expect(wrapper.prop('className')).toEqual('btn');
});

it('should insert the text in the button', () => {
  const onClick = jest.fn();
  const wrapper = shallow(
    <Button
      onClick={ onClick }
      text="My Button"
      className="btn"
    />
  );
  expect(wrapper.text()).toEqual('My Button');
});

it('should trigger the onClick', () => {
  const onClick = jest.fn();
  const wrapper = shallow(
    <Button
      onClick={ onClick }
      text="My Button"
      className="btn"
    />
  );
  wrapper.simulate('click');
  expect(onClick).toBeCalled();
});
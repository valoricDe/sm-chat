import React from 'react';
import { shallow } from 'enzyme';
import Box from "./Box";

it('renders no content', () => {
  const wrapper = shallow(<Box></Box>);
  expect(wrapper.text()).toEqual('');
});

it('renders content', () => {
  const wrapper = shallow(<Box>FooBar</Box>);
  expect(wrapper.contains('FooBar')).toEqual(true);
  expect(wrapper.text()).toEqual('FooBar');
});

it('renders content with title', () => {
  const wrapper = shallow(<Box title="Test">FooBar</Box>);
  expect(wrapper.find('h2').at(0).text()).toEqual('Test');
  expect(wrapper.find('h2 + div').at(0).text()).toEqual('FooBar');
});
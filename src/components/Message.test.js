import React from 'react';
import { shallow } from 'enzyme';
import Message from "./Message";

it('render no content throws', () => {
  expect(() => {
    const wrapper = shallow(<Message data={{}} />);
  }).toThrow();
});

it('renders content', () => {
  const data = {id: 'alphanumeric234', message: 'myOwnMessage', username: 'MySelf', updated: '2017-12-12 12:13:14.1234'};
  const wrapper = shallow(<Message data={data} />);
  const text = wrapper.text();
  expect(text).toContain(data.message);
  expect(text).toContain(data.updated.slice(0, 18));
  expect(text).not.toContain(data.username);
});
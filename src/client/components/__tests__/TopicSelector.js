import React from 'react';
import { shallow } from 'enzyme';
import TopicSelector from '../TopicSelector';

describe('<TopicSelector />', () => {
  it('renders without exploding', () => {
    const props = {
      sort: 'active',
      isSingle: true,
      bold: true,
      topics: ['dsocial', 'introduceyourself', 'dweebs'],
    };
    const wrapper = shallow(<TopicSelector {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import ReceiveTransaction from '../ReceiveTransaction';

describe('(Component) ReceiveTransaction', () => {
  describe('with default prop values', () => {
    it('renders and matches snapshot', () => {
      const props = {
        from: 'holadweb',
        memo: 'Test Memo',
        amount: <span>{'0 BEX'}</span>,
        timestamp: '0',
      };
      const wrapper = shallow(<ReceiveTransaction {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

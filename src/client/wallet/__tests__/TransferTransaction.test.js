import React from 'react';
import { shallow } from 'enzyme';
import TransferTransaction from '../TransferTransaction';

describe('(Component) TransferTransaction', () => {
  describe('with default prop values', () => {
    it('renders and matches snapshot', () => {
      const props = {
        to: 'holadweb',
        memo: 'Test Transfer Transaction',
        amount: <span>{'0 BEX'}</span>,
        timestamp: '0',
      };
      const wrapper = shallow(<TransferTransaction {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

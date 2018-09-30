import React from 'react';
import { shallow } from 'enzyme';
import UserWalletSummary from '../UserWalletSummary';

describe('(Component) UserWalletSummary', () => {
  describe('with default prop values', () => {
    it('renders and matches snapshot', () => {
      const props = {
        user: {
          balance: '100',
          vesting_shares: '0',
          savings_balance: '100 BEX',
          savings_bbd_balance: '1000 BEX',
        },
        estAccountValue: '100.00 BEX',
        totalVestingShares: '100 BEX',
        totalVestingFundDPay: '100 BEX',
        loading: false,
      };
      const wrapper = shallow(<UserWalletSummary {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

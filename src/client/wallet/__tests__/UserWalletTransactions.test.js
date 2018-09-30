import React from 'react';
import { shallow } from 'enzyme';
import UserWalletTransactions from '../UserWalletTransactions';

describe('(Component) UserWalletTransactions', () => {
  describe('with default prop values', () => {
    it('renders and matches snapshot', () => {
      const props = {
        transactions: [
          {
            timestamp: '0',
            op: [
              'transfer_to_vesting',
              {
                amount: '100 BEX',
              },
            ],
          },
          {
            timestamp: '0',
            op: [
              'transfer',
              {
                from: 'holadweb1',
                memo: 'transfer memo',
                amount: '100 BEX',
              },
            ],
          },
        ],
        currentUsername: 'holadweb',
        totalVestingShares: '0',
        totalVestingFundDPay: '0',
      };
      const wrapper = shallow(<UserWalletTransactions {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

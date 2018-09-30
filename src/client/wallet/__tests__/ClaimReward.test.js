import React from 'react';
import { shallow } from 'enzyme';
import ClaimReward from '../ClaimReward';

describe('(Component) ClaimReward', () => {
  describe('with default prop values', () => {
    it('renders and matches snapshot', () => {
      const props = {
        timestamp: '0',
        rewardDPay: '0 BEX',
        rewardBbd: '0 BBD',
        rewardVests: '0 BP',
        totalVestingShares: '0',
        totalVestingFundDPay: '0',
      };
      const wrapper = shallow(<ClaimReward {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

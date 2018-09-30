import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { injectIntl, FormattedMessage, FormattedNumber } from 'react-intl';
import DPayID from '../dPayIdAPI';
import { getAuthenticatedUser } from '../reducers';
import { getUserAccountHistory } from './walletActions';
import { reload } from '../auth/authActions';
import Action from '../components/Button/Action';
import './ClaimRewardsBlock.less';
import '../components/Sidebar/SidebarContentBlock.less';

@injectIntl
@connect(
  state => ({
    user: getAuthenticatedUser(state),
  }),
  {
    getUserAccountHistory,
    reload,
  },
)
class ClaimRewardsBlock extends Component {
  static propTypes = {
    user: PropTypes.shape(),
    intl: PropTypes.shape().isRequired,
    getUserAccountHistory: PropTypes.func.isRequired,
    reload: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: {},
  };

  state = {
    loading: false,
    rewardClaimed: false,
  };

  handleClaimRewards = () => {
    const { user } = this.props;
    const {
      name,
      reward_dpay_balance: dpayBalance,
      reward_bbd_balance: bbdBalance,
      reward_vesting_balance: vestingBalance,
    } = user;
    this.setState({
      loading: true,
    });
    DPayID.claimRewardBalance(name, dpayBalance, bbdBalance, vestingBalance, err => {
      if (!err) {
        this.setState({
          loading: false,
          rewardClaimed: true,
        });
        this.props.getUserAccountHistory(name).then(() => this.props.reload());
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };

  renderReward = (value, currency, rewardField) => (
    <div className="ClaimRewardsBlock__reward">
      <span className="ClaimRewardsBlock__reward__field">
        <FormattedMessage
          id={rewardField}
          defaultMessage={_.startCase(rewardField.replace('_', ''))}
        />
      </span>
      <span className="ClaimRewardsBlock__reward__value">
        <FormattedNumber value={value} minimumFractionDigits={3} maximumFractionDigits={3} />
        {` ${currency}`}
      </span>
    </div>
  );

  render() {
    const { user, intl } = this.props;
    const { rewardClaimed } = this.state;
    const rewardDPay = parseFloat(user.reward_dpay_balance);
    const rewardBbd = parseFloat(user.reward_bbd_balance);
    const rewardBP = parseFloat(user.reward_vesting_dpay);
    const userHasRewards = rewardDPay > 0 || rewardBbd > 0 || rewardBP > 0;

    const buttonText = rewardClaimed
      ? intl.formatMessage({
          id: 'reward_claimed',
          defaultMessage: 'Reward Claimed',
        })
      : intl.formatMessage({
          id: 'claim_rewards',
          defaultMessage: 'Claim Rewards',
        });

    if (!userHasRewards || rewardClaimed) return null;

    return (
      <div className="SidebarContentBlock ClaimRewardsBlock">
        <h4 className="SidebarContentBlock__title">
          <i className="iconfont icon-ranking SidebarContentBlock__icon" />{' '}
          <FormattedMessage id="rewards" defaultMessage="Rewards" />
        </h4>
        <div className="SidebarContentBlock__content">
          {!rewardClaimed && (
            <div>
              {rewardDPay > 0 && this.renderReward(rewardDPay, 'BEX', 'dpay')}
              {rewardBbd > 0 && this.renderReward(rewardBbd, 'BBD', 'dpay_dollar')}
              {rewardBP > 0 && this.renderReward(rewardBP, 'BP', 'dpay_power')}
            </div>
          )}
          <Action
            primary
            big
            disabled={rewardClaimed}
            loading={this.state.loading}
            style={{ width: '100%' }}
            onClick={this.handleClaimRewards}
          >
            {buttonText}
          </Action>
        </div>
      </div>
    );
  }
}

export default ClaimRewardsBlock;

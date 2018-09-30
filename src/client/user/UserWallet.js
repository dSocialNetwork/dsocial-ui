import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import UserWalletSummary from '../wallet/UserWalletSummary';
import { BBD, BEX } from '../../common/constants/cryptos';
import { getUserDetailsKey } from '../helpers/stateHelpers';
import UserWalletTransactions from '../wallet/UserWalletTransactions';
import Loading from '../components/Icon/Loading';
import {
  getUser,
  getAuthenticatedUser,
  getAuthenticatedUserName,
  getTotalVestingShares,
  getTotalVestingFundDPay,
  getUsersTransactions,
  getUsersAccountHistory,
  getUsersAccountHistoryLoading,
  getLoadingGlobalProperties,
  getLoadingMoreUsersAccountHistory,
  getUserHasMoreAccountHistory,
  getCryptosPriceHistory,
} from '../reducers';
import {
  getGlobalProperties,
  getUserAccountHistory,
  getMoreUserAccountHistory,
} from '../wallet/walletActions';
import { getAccount } from './usersActions';

@withRouter
@connect(
  (state, ownProps) => ({
    user:
      ownProps.isCurrentUser || ownProps.match.params.name === getAuthenticatedUserName(state)
        ? getAuthenticatedUser(state)
        : getUser(state, ownProps.match.params.name),
    authenticatedUserName: getAuthenticatedUserName(state),
    totalVestingShares: getTotalVestingShares(state),
    totalVestingFundDPay: getTotalVestingFundDPay(state),
    usersTransactions: getUsersTransactions(state),
    usersAccountHistory: getUsersAccountHistory(state),
    usersAccountHistoryLoading: getUsersAccountHistoryLoading(state),
    loadingGlobalProperties: getLoadingGlobalProperties(state),
    loadingMoreUsersAccountHistory: getLoadingMoreUsersAccountHistory(state),
    userHasMoreActions: getUserHasMoreAccountHistory(
      state,
      ownProps.isCurrentUser
        ? getAuthenticatedUserName(state)
        : getUser(state, ownProps.match.params.name).name,
    ),
    cryptosPriceHistory: getCryptosPriceHistory(state),
  }),
  {
    getGlobalProperties,
    getUserAccountHistory,
    getMoreUserAccountHistory,
    getAccount,
  },
)
class Wallet extends Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    totalVestingShares: PropTypes.string.isRequired,
    totalVestingFundDPay: PropTypes.string.isRequired,
    user: PropTypes.shape().isRequired,
    getGlobalProperties: PropTypes.func.isRequired,
    getUserAccountHistory: PropTypes.func.isRequired,
    getMoreUserAccountHistory: PropTypes.func.isRequired,
    getAccount: PropTypes.func.isRequired,
    usersTransactions: PropTypes.shape().isRequired,
    usersAccountHistory: PropTypes.shape().isRequired,
    cryptosPriceHistory: PropTypes.shape().isRequired,
    usersAccountHistoryLoading: PropTypes.bool.isRequired,
    loadingGlobalProperties: PropTypes.bool.isRequired,
    loadingMoreUsersAccountHistory: PropTypes.bool.isRequired,
    userHasMoreActions: PropTypes.bool.isRequired,
    isCurrentUser: PropTypes.bool,
    authenticatedUserName: PropTypes.string,
  };

  static defaultProps = {
    isCurrentUser: false,
    authenticatedUserName: '',
  };

  componentDidMount() {
    const {
      totalVestingShares,
      totalVestingFundDPay,
      usersTransactions,
      user,
      isCurrentUser,
      authenticatedUserName,
    } = this.props;
    const username = isCurrentUser
      ? authenticatedUserName
      : this.props.location.pathname.match(/@(.*)(.*?)\//)[1];

    if (_.isEmpty(totalVestingFundDPay) || _.isEmpty(totalVestingShares)) {
      this.props.getGlobalProperties();
    }

    if (_.isEmpty(usersTransactions[getUserDetailsKey(username)])) {
      this.props.getUserAccountHistory(username);
    }

    if (_.isEmpty(user)) {
      this.props.getAccount(username);
    }
  }

  render() {
    const {
      user,
      totalVestingShares,
      totalVestingFundDPay,
      loadingGlobalProperties,
      usersTransactions,
      usersAccountHistoryLoading,
      loadingMoreUsersAccountHistory,
      userHasMoreActions,
      usersAccountHistory,
      cryptosPriceHistory,
    } = this.props;
    const userKey = getUserDetailsKey(user.name);
    const transactions = _.get(usersTransactions, userKey, []);
    const actions = _.get(usersAccountHistory, userKey, []);
    const currentDPayRate = _.get(
      cryptosPriceHistory,
      `${BEX.symbol}.priceDetails.currentUSDPrice`,
      null,
    );
    const currentBBDRate = _.get(
      cryptosPriceHistory,
      `${BBD.symbol}.priceDetails.currentUSDPrice`,
      null,
    );
    const dpayRateLoading = _.isNull(currentDPayRate) || _.isNull(currentBBDRate);

    return (
      <div>
        <UserWalletSummary
          user={user}
          loading={user.fetching}
          totalVestingShares={totalVestingShares}
          totalVestingFundDPay={totalVestingFundDPay}
          loadingGlobalProperties={loadingGlobalProperties}
          dpayRate={currentDPayRate}
          bbdRate={currentBBDRate}
          dpayRateLoading={dpayRateLoading}
        />
        {transactions.length === 0 && usersAccountHistoryLoading ? (
          <Loading style={{ marginTop: '20px' }} />
        ) : (
          <UserWalletTransactions
            transactions={transactions}
            actions={actions}
            currentUsername={user.name}
            totalVestingShares={totalVestingShares}
            totalVestingFundDPay={totalVestingFundDPay}
            getMoreUserAccountHistory={this.props.getMoreUserAccountHistory}
            loadingMoreUsersAccountHistory={loadingMoreUsersAccountHistory}
            userHasMoreActions={userHasMoreActions}
          />
        )}
      </div>
    );
  }
}

export default Wallet;

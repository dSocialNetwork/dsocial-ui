import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import formatter from '../helpers/dpayFormatter';
import { calculateTotalDelegatedBP, calculateEstAccountValue } from '../vendor/dSiteHelpers';
import BTooltip from '../components/BTooltip';
import Loading from '../components/Icon/Loading';
import USDDisplay from '../components/Utils/USDDisplay';
import './UserWalletSummary.less';

const getFormattedTotalDelegatedBP = (user, totalVestingShares, totalVestingFundDPay) => {
  const totalDelegatedBP = calculateTotalDelegatedBP(
    user,
    totalVestingShares,
    totalVestingFundDPay,
  );

  if (totalDelegatedBP !== 0) {
    return (
      <BTooltip
        title={
          <span>
            <FormattedMessage
              id="dpay_power_delegated_to_account_tooltip"
              defaultMessage="BEX Power delegated to this account"
            />
          </span>
        }
      >
        <span>
          {totalDelegatedBP > 0 ? '(+' : '('}
          <FormattedNumber
            value={calculateTotalDelegatedBP(user, totalVestingShares, totalVestingFundDPay)}
          />
          {' BP)'}
        </span>
      </BTooltip>
    );
  }

  return null;
};

const UserWalletSummary = ({
  user,
  loading,
  totalVestingShares,
  totalVestingFundDPay,
  loadingGlobalProperties,
  dpayRate,
  bbdRate,
  dpayRateLoading,
}) => (
  <div className="UserWalletSummary">
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-dpay UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="dpay" defaultMessage="dPay" />
      </div>
      <div className="UserWalletSummary__value">
        {loading ? (
          <Loading />
        ) : (
          <span>
            <FormattedNumber value={parseFloat(user.balance)} />
            {' BEX'}
          </span>
        )}
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-flashlight_fill UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="dpay_power" defaultMessage="BEX Power" />
      </div>
      <div className="UserWalletSummary__value">
        {loading || loadingGlobalProperties ? (
          <Loading />
        ) : (
          <span>
            <FormattedNumber
              value={parseFloat(
                formatter.vestToDPay(
                  user.vesting_shares,
                  totalVestingShares,
                  totalVestingFundDPay,
                ),
              )}
            />
            {' BP '}
            {getFormattedTotalDelegatedBP(user, totalVestingShares, totalVestingFundDPay)}
          </span>
        )}
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-Dollar UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="dpay_dollar" defaultMessage="BEX Dollar" />
      </div>
      <div className="UserWalletSummary__value">
        {loading ? (
          <Loading />
        ) : (
          <span>
            <FormattedNumber value={parseFloat(user.bbd_balance)} />
            {' BBD'}
          </span>
        )}
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-savings UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="savings" defaultMessage="Savings" />
      </div>
      <div className="UserWalletSummary__value">
        {loading ? (
          <Loading />
        ) : (
          <span>
            <FormattedNumber value={parseFloat(user.savings_balance)} />
            {' BEX, '}
            <FormattedNumber value={parseFloat(user.savings_bbd_balance)} />
            {' BBD'}
          </span>
        )}
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-people_fill UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="est_account_value" defaultMessage="Est. Account Value" />
      </div>
      <div className="UserWalletSummary__value">
        {loading || loadingGlobalProperties || dpayRateLoading ? (
          <Loading />
        ) : (
          <USDDisplay
            value={calculateEstAccountValue(
              user,
              totalVestingShares,
              totalVestingFundDPay,
              dpayRate,
              bbdRate,
            )}
          />
        )}
      </div>
    </div>
  </div>
);

UserWalletSummary.propTypes = {
  loadingGlobalProperties: PropTypes.bool.isRequired,
  user: PropTypes.shape().isRequired,
  totalVestingShares: PropTypes.string.isRequired,
  totalVestingFundDPay: PropTypes.string.isRequired,
  dpayRate: PropTypes.number,
  bbdRate: PropTypes.number,
  loading: PropTypes.bool,
  dpayRateLoading: PropTypes.bool,
};

UserWalletSummary.defaultProps = {
  dpayRate: 1,
  bbdRate: 1,
  loading: false,
  dpayRateLoading: false,
};

export default UserWalletSummary;

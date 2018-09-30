import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  FormattedRelative,
  FormattedNumber,
  FormattedDate,
  FormattedTime,
} from 'react-intl';
import formatter from '../helpers/dpayFormatter';
import BTooltip from '../components/BTooltip';

const getFormattedPayout = (
  rewardDPay,
  rewardBbd,
  rewardVests,
  totalVestingShares,
  totalVestingFundDPay,
) => {
  const payouts = [];
  const parsedRewardDPay = parseFloat(rewardDPay);
  const parsedRewardBbd = parseFloat(rewardBbd);
  const parsedRewardVests = parseFloat(
    formatter.vestToDPay(rewardVests, totalVestingShares, totalVestingFundDPay),
  );

  if (parsedRewardDPay > 0) {
    payouts.push(
      <span key="BEX" className="UserWalletTransactions__payout-rewards">
        <FormattedNumber
          value={parsedRewardDPay}
          minimumFractionDigits={3}
          maximumFractionDigits={3}
        />
        {' BEX'}
      </span>,
    );
  }

  if (parsedRewardBbd > 0) {
    payouts.push(
      <span key="BBD" className="UserWalletTransactions__payout-rewards">
        <FormattedNumber
          value={parsedRewardBbd}
          minimumFractionDigits={3}
          maximumFractionDigits={3}
        />
        {' BBD'}
      </span>,
    );
  }

  if (parsedRewardVests > 0) {
    payouts.push(
      <span key="BP" className="UserWalletTransactions__payout-rewards">
        <FormattedNumber
          value={parsedRewardVests}
          minimumFractionDigits={3}
          maximumFractionDigits={3}
        />
        {' BP'}
      </span>,
    );
  }

  return payouts;
};

const ClaimReward = ({
  timestamp,
  rewardDPay,
  rewardBbd,
  rewardVests,
  totalVestingShares,
  totalVestingFundDPay,
}) => (
  <div className="UserWalletTransactions__transaction">
    <div className="UserWalletTransactions__icon-container">
      <i className="iconfont icon-success_fill UserWalletTransactions__icon" />
    </div>
    <div className="UserWalletTransactions__content">
      <div className="UserWalletTransactions__content-recipient">
        <div>
          <FormattedMessage id="claim_rewards" defaultMessage="Claim rewards" />
        </div>
        <div className="UserWalletTransactions__payout">
          {getFormattedPayout(
            rewardDPay,
            rewardBbd,
            rewardVests,
            totalVestingShares,
            totalVestingFundDPay,
          )}
        </div>
      </div>
      <span className="UserWalletTransactions__timestamp">
        <BTooltip
          title={
            <span>
              <FormattedDate value={`${timestamp}Z`} /> <FormattedTime value={`${timestamp}Z`} />
            </span>
          }
        >
          <span>
            <FormattedRelative value={`${timestamp}Z`} />
          </span>
        </BTooltip>
      </span>
    </div>
  </div>
);

ClaimReward.propTypes = {
  timestamp: PropTypes.string.isRequired,
  rewardDPay: PropTypes.string.isRequired,
  rewardBbd: PropTypes.string.isRequired,
  rewardVests: PropTypes.string.isRequired,
  totalVestingShares: PropTypes.string.isRequired,
  totalVestingFundDPay: PropTypes.string.isRequired,
};

export default ClaimReward;

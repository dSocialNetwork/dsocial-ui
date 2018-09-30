import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import formatter from '../helpers/dpayFormatter';

const AuthorRewardMessage = ({
  actionDetails,
  intl,
  totalVestingShares,
  totalVestingFundDPay,
}) => {
  const rewards = [
    { payout: actionDetails.bbd_payout, currency: 'BBD' },
    { payout: actionDetails.dpay_payout, currency: 'BEX' },
    { payout: actionDetails.vesting_payout, currency: 'BP' },
  ];

  const parsedRewards = _.reduce(
    rewards,
    (array, reward) => {
      const parsedPayout = parseFloat(reward.payout);

      if (parsedPayout > 0) {
        let rewardsStr;
        if (reward.currency === 'BP') {
          const vestsToBP = formatter.vestToDPay(
            parsedPayout,
            totalVestingShares,
            totalVestingFundDPay,
          );
          rewardsStr = intl.formatNumber(vestsToBP, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          });
        } else {
          rewardsStr = intl.formatNumber(parsedPayout, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          });
        }

        array.push(`${rewardsStr} ${reward.currency}`);
      }

      return array;
    },
    [],
  );

  return (
    <FormattedMessage
      id="author_reward_for_post"
      defaultMessage="Author reward: {rewards} for {author} ({postLink})"
      values={{
        rewards: parsedRewards.join(', '),
        author: actionDetails.author,
        postLink: (
          <Link to={`/@${actionDetails.author}/${actionDetails.permlink}`}>
            {actionDetails.permlink}
          </Link>
        ),
      }}
    />
  );
};

AuthorRewardMessage.propTypes = {
  actionDetails: PropTypes.shape().isRequired,
  intl: PropTypes.shape().isRequired,
  totalVestingShares: PropTypes.string.isRequired,
  totalVestingFundDPay: PropTypes.string.isRequired,
};

export default injectIntl(AuthorRewardMessage);

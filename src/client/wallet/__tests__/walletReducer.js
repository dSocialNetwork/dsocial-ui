import reducer from '../walletReducer';
import * as actions from '../walletActions';

const reducerInitialState = {
  totalVestingShares: '',
  totalVestingFundDPay: '',
  powerUpOrDownVisible: false,
  powerDown: false,
  usersTransactions: {},
  usersAccountHistory: {},
  usersEstAccountsValues: {},
  usersAccountHistoryLoading: true,
  loadingEstAccountValue: true,
  loadingGlobalProperties: true,
  loadingMoreUsersAccountHistory: false,
  accountHistoryFilter: [],
  currentDisplayedActions: [],
  currentFilteredActions: [],
};

describe('walletReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      ...reducerInitialState,
      transferVisible: false,
      transferTo: '',
    });
  });

  it('should handle OPEN_TRANSFER', () => {
    expect(
      reducer(undefined, {
        type: actions.OPEN_TRANSFER,
        payload: 'sekhmet',
      }),
    ).toEqual({
      ...reducerInitialState,
      transferVisible: true,
      transferTo: 'sekhmet',
    });

    expect(
      reducer(
        {
          transferVisible: true,
          transferTo: 'sekhmet',
        },
        {
          type: actions.OPEN_TRANSFER,
          payload: 'fabien',
        },
      ),
    ).toEqual({
      transferVisible: true,
      transferTo: 'fabien',
    });
  });

  it('should handle CLOSE_TRANSFER', () => {
    expect(
      reducer(undefined, {
        type: actions.CLOSE_TRANSFER,
      }),
    ).toEqual({
      ...reducerInitialState,
      transferVisible: false,
      transferTo: '',
    });

    expect(
      reducer(
        {
          transferVisible: true,
          transferTo: 'fabien',
        },
        {
          type: actions.CLOSE_TRANSFER,
        },
      ),
    ).toEqual({
      transferVisible: false,
      transferTo: 'fabien',
    });
  });

  it('should open power up modal', () => {
    const initial = reducerInitialState;

    const expected = {
      ...initial,
      powerUpOrDownVisible: true,
      powerDown: false,
    };

    const actual = reducer(initial, actions.openPowerUpOrDown());

    expect(actual).toEqual(expected);
  });

  it('should open power down modal', () => {
    const initial = reducerInitialState;

    const expected = {
      ...initial,
      powerUpOrDownVisible: true,
      powerDown: true,
    };

    const actual = reducer(initial, actions.openPowerUpOrDown(true));

    expect(actual).toEqual(expected);
  });

  it('should close power up or down modal', () => {
    const expected = {
      ...reducerInitialState,
      powerUpOrDownVisible: false,
    };

    const actual = reducer(reducerInitialState, actions.closePowerUpOrDown());

    expect(actual).toEqual(expected);
  });

  it('should return previous state if actions is not recognized', () => {
    const states = [
      {
        transferVisible: true,
        transferTo: 'fabien',
        ...reducerInitialState,
      },
      {
        transferVisible: false,
        transferTo: '',
        ...reducerInitialState,
      },
    ];

    expect(
      reducer(states[0], {
        type: 'NOT_EXISTING',
      }),
    ).toEqual(states[0]);

    expect(
      reducer(states[1], {
        type: 'ANOTHER_NOT_EXISTING',
      }),
    ).toEqual(states[1]);
  });
});

import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import DPayID from '../dPayIdAPI';
import './LoginModal.less';

class LoginModal extends React.Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    handleLoginModalCancel: PropTypes.func,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    handleLoginModalCancel: () => {},
    visible: false,
  };

  constructor(props) {
    super(props);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup() {
    window.open(process.env.SIGNUP_URL);
    this.props.handleLoginModalCancel();
  }

  render() {
    const { handleLoginModalCancel, visible, location } = this.props;
    const next = location.pathname.length > 1 ? location.pathname : '';
    return (
      <Modal
        title=""
        visible={visible}
        onCancel={handleLoginModalCancel}
        footer={
          <div className="LoginModal__footer">
            <FormattedMessage
              id="login_modal_footer_text"
              defaultMessage="Don't have an account? Signup with {link}"
              values={{
                link: (
                  <a role="presentation" onClick={this.handleSignup}>
                    dPay
                  </a>
                ),
              }}
            />
          </div>
        }
      >
        <div className="LoginModal__body">
          <i className="iconfont icon-dsocial LoginModal__icon" />
          <span className="LoginModal__login-title">
            <FormattedMessage id="login_to_dsocial" defaultMessage="Login to dSocial" />
          </span>
          <span className="LoginModal__login-description">
            <FormattedMessage
              id="login_modal_description"
              defaultMessage="Login with your dPay account using dPayID to enjoy dSocial at 100%"
            />
          </span>
          <a className="LoginModal__login-button" href={DPayID.getLoginURL(next)}>
            <FormattedMessage
              id="login_with_dpayid"
              defaultMessage="Login with dPayID"
            />
          </a>
        </div>
      </Modal>
    );
  }
}

export default withRouter(LoginModal);

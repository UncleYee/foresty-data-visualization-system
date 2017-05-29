import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(state => ({
  user: state.auth.user
}), {
  authActions
})
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>系统登录</h1>
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="请输入用户名" className="form-control"/>
            </div>
            &nbsp;&nbsp;
            <div className="form-group">
              <input type="text" ref="passwd" placeholder="请出入密码" className="form-control"/>
            </div>
            &nbsp;&nbsp;
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}登录
            </button>
          </form>
          <p>管理员登录系统，对系统数据进行维护。</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}登出</button>
          </div>
        </div>
        }
      </div>
    );
  }
}

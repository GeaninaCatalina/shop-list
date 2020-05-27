import React, { Component } from 'react';
import { Button, Grid, Form, Input } from 'semantic-ui-react';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      confirmed: ''
    };
  }


  onSubmitUser = (e) => {
    this.setState({ userName: e.target.value });
  }

  onSubmitPassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onSubmitConfirm = (e) => {
    this.setState({ confirmed: e.target.value });
  }

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

   async onSubmitCredentials(){
      const res = await axios.post('http://localhost:4100/signin', 
      {
        userName: this.state.userName,
        password: this.state.password
      });
      if (res.data === true) {
        this.props.history.push('/login');
      } else {
        alert ('User name already exits!')
      }
  }

  isPasswordIsValid= () => {
    return this.state.password !== '' && 
    this.state.password === this.state.confirmed && 
    this.state.userName !== '';
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <Grid centered columns={3}>
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={6} verticalAlign='middle'>
              <Form>
                <Form.Field>
                  <Input align='left' placeholder={t('signin_name')} onChange={this.onSubmitUser} />
                </Form.Field>
                <Form.Field>
                  <Input align='left' type='password' placeholder={t('signin_password')} onChange={this.onSubmitPassword} />
                </Form.Field>
                <Form.Field>
                  <Input align='left' type='password' placeholder={t('signin_confirm')} onChange={this.onSubmitConfirm} />
                </Form.Field>
                <Button color='green' type='submit' disabled={!this.isPasswordIsValid()} onClick={() => this.onSubmitCredentials()}>{t('submit')}</Button>
              </Form>
              <h2>{t('signin_message')} <Link to='/login'>{t('log_in')}</Link></h2>
            </Grid.Column>
            <Grid.Column width={3} ></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
export default withNamespaces()(Signin); 
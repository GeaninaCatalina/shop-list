import React, { Component } from 'react';
import { Button, Grid, Form, Input } from 'semantic-ui-react';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';
import { Link } from 'react-router-dom';
import UserRestService from '../../service/UserRestService';


class Login extends Component {
  state = {
    userName: '',
    password: ''
  }

  async onSubmitCredentials(){
    const {userName, password} = this.state;
    const res = await UserRestService.userLogin({userName, password});
    
    if (res.data === true) {
      this.props.history.push('/lists');
    } else {
      alert ('Wrong User name or password!');
    }
  }

  onSubmitUser = (e) => {
    this.setState({ userName: e.target.value });
  }

  onSubmitPassword = (e) => {
    this.setState({ password: e.target.value });
  }

  changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <Grid centered columns={3}>
          <Grid.Row>
            <Grid.Column width={5}></Grid.Column>
            <Grid.Column width={6} verticalAlign='middle'>
              <Form width='equal'>
                <Form.Field>
                  <Input align='left' placeholder={t('login_name')} onChange={this.onSubmitUser} />
                </Form.Field>
                <Form.Field>
                  <Input align='left' type='password' placeholder={t('login_password')} onChange={this.onSubmitPassword} />
                </Form.Field>
                <Button color='green' type='submit' onClick={() => this.onSubmitCredentials()}>{t('submit')}</Button>
              </Form>
            </Grid.Column>
            <Grid.Column width={5} ></Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}></Grid.Column>
            <Grid.Column width={6} verticalAlign='middle'>
              <h2>{t('login_message')} <Link to='/signin'>{t('sign_in')}</Link></h2>
            </Grid.Column>
            <Grid.Column width={5}></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
export default withNamespaces()(Login); 
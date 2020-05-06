import React, { Component } from 'react';
import { Button, Grid, Form, Label, Input } from 'semantic-ui-react';
import { withNamespaces } from 'react-i18next';
import i18n from '../i18n';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
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

  onSubmit = () => {
    this.props.history.push('/lists');
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
                  <Label align='left'>{t('login_name')}</Label>
                  <Input align='left' placeholder={t('login_name')} onChange={this.onSubmitUser} />
                </Form.Field>
                <Form.Field>
                  <Label align='left' >{t('login_password')}</Label>
                  <Input align='left' type='password' placeholder={t('login_password')} onChange={this.onSubmitPassword} />
                </Form.Field>
                <Button color='green' type='submit' onClick={this.onSubmit}>{t('submit')}</Button>
              </Form>
            </Grid.Column>
            <Grid.Column width={3} ></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
export default withNamespaces()(Login); 
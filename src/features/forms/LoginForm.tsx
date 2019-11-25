import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import {createUseStyles} from "react-jss";
import {useHistory} from "react-router";
import {FormikHelpers, FormikProps, useFormik} from "formik";
import {useStores} from "../../store";
import {IAuthLogin} from "../../config/interfaces";

const useStyles = createUseStyles({
  form: {
    width: 300
  },
  forgot: {
    float: 'right'
  },
  button: {
    width: '100%'
  }
});

export default function () {

  const classes = useStyles();
  const history = useHistory();
  const { authStore: { login } } = useStores();

  const formik: FormikProps<IAuthLogin> = useFormik({
    initialValues: {
      identity: '',
      password: '',
    },
    onSubmit: async (values, formikHelpers: FormikHelpers<IAuthLogin>) => {
      formikHelpers.setSubmitting(true);
      try {
        await login(values);
        history.push('/admin');
      } catch (e) {
        formikHelpers.setSubmitting(false);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className={classes.form}>
      <Form.Item hasFeedback required>
        <Input
          name="identity"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="E-mail ou Nick"
          inputMode="email"
          size="large"
          onChange={formik.handleChange}
          value={formik.values.identity}
        />
      </Form.Item>

      <Form.Item hasFeedback required>
        <Input.Password
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Senha"
          name="password"
          size="large"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </Form.Item>
      <Form.Item>
        <a className={classes.forgot} href="">
          Forgot password
        </a>
        <Button loading={formik.isSubmitting} type="primary" htmlType="submit" className={classes.button} size="large">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

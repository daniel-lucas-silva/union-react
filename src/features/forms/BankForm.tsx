import React, {forwardRef, useImperativeHandle} from 'react';
import {FormikHelpers, FormikProps, useFormik} from "formik";
import {createUseStyles} from 'react-jss';

import {DialogCallbackRef} from "../../components/Dialog";
import Form from "antd/es/form";
import Input from "antd/es/input";
import {IBank} from "../../models/bank";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";

const useStyles = createUseStyles({
  grey: {
    color: "#aaa"
  },
});

export default forwardRef((props, ref) => {

  const classes = useStyles();
  const formik: FormikProps<IBank> = useFormik({
    initialValues: {
      name: '',
      ag: '',
      cc: '',
      type: 'CONTA-CORRENTE ',
      balance: 0,
      managerName: '',
      managerEmail: '',
      managerPhone: '',
    },
    onSubmit: (values, formikHelpers: FormikHelpers<IBank>) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useImperativeHandle<unknown, DialogCallbackRef>(ref, () => ({
    onOk: async () => {
      return formik.submitForm();
    },
    onCancel: () => {
      return Promise.resolve();
    }
  }), []);

  return (
    <Form labelCol={{span: 6}} wrapperCol={{span: 18}} onSubmit={formik.handleSubmit} autoComplete="off" noValidate={true}>

      <Form.Item label="Nome" hasFeedback required>
        <Input
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </Form.Item>

      <Form.Item label="Conta" hasFeedback required>
        <Input.Group>
          <Row gutter={8}>
            <Col span={10}>
              <Input
                name="ag"
                formNoValidate={true}
                inputMode="numeric"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.ag}
                prefix={<span className={classes.grey}>ag</span>}
              />
            </Col>
            <Col span={14}>
              <Input
                name="cc"
                formNoValidate={true}
                inputMode="numeric"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.cc}
                prefix={<span className={classes.grey}>cc</span>}
              />
            </Col>
          </Row>
        </Input.Group>
      </Form.Item>

      <Form.Item label="Balanço">
        <Input
          name="balance"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.balance}
        />
      </Form.Item>

      <Form.Item label="Gerente">
        <Input
          name="managerName"
          onChange={formik.handleChange}
          value={formik.values.managerName}
        />
      </Form.Item>

      <Form.Item label="E-mail">
        <Input
          name="managerEmail"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.managerEmail}
        />
      </Form.Item>

      <Form.Item label="Telefone" >
        <Input
          name="managerPhone"
          onChange={formik.handleChange}
          value={formik.values.managerPhone}
        />
      </Form.Item>

    </Form>
  );
});

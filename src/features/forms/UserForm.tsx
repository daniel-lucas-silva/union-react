import React, {forwardRef, useImperativeHandle} from 'react';
import {FormikHelpers, FormikProps, useFormik} from "formik";
import {DialogCallbackRef} from "../../components/Dialog";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Select from "antd/es/select";


export default forwardRef((props, ref) => {
  interface Values {
    name: string;
    nickname: string;
    email: string;
    password: string;
    role?: string;
  }

  const formik: FormikProps<Values> = useFormik({
    initialValues: {
      name: '',
      nickname: '',
      email: '',
      password: '',
      role: 'AGENT',
    },
    onSubmit: (values, formikHelpers: FormikHelpers<Values>) => {
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
    <Form labelCol={{span: 6}} wrapperCol={{span: 18}} onSubmit={formik.handleSubmit}>

      <Form.Item label="Nome" hasFeedback required>
        <Input
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </Form.Item>

      <Form.Item label="Nickname" hasFeedback required>
        <Input
          name="nickname"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.nickname}
        />
      </Form.Item>

      <Form.Item label="E-mail" hasFeedback required>
        <Input
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </Form.Item>

      <Form.Item label="Password" hasFeedback required validateStatus="success">
        <Input.Password
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </Form.Item>

      {/*<Form.Item*/}
      {/*  label="Validating"*/}
      {/*  hasFeedback*/}
      {/*  validateStatus="validating"*/}
      {/*  help="The information is being validated..."*/}
      {/*>*/}
      {/*  <Input*/}
      {/*    placeholder="I'm the content is being validated"*/}
      {/*    name="validating"*/}
      {/*    onChange={formik.handleChange}*/}
      {/*    value={formik.values.validating}*/}
      {/*  />*/}
      {/*</Form.Item>*/}


      <Form.Item label="Nível" hasFeedback>
        <Select
          value={formik.values.role}
          onChange={formik.handleChange('role')}
        >
          <Select.Option value="ADMIN">Administrador</Select.Option>
          <Select.Option value="AGENT">Agente</Select.Option>
          <Select.Option value="OPERATOR">Operador</Select.Option>
          <Select.Option value="MANAGER">Gerente</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
});

import React from 'react';
import moment from 'moment';
import {FormikHelpers, FormikProps, useFormik} from "formik";
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Row,
  Col,
  Input,
  DatePicker,
  TimePicker,
} from 'antd';
import {UploadChangeParam} from "antd/es/upload";
import {CheckboxValueType} from "antd/es/checkbox/Group";

const { Option } = Select;

export default function() {
  interface Values {
    input: string;
    password: string;
    validating?:string;
    success?: string;
    date?: string;
    time?: string;
    select?: string;
    number?: number;
    switch?: boolean;
    slide?: number;
    radioGroup?: string;
    radioButton?: string;
    checkboxGroup?: CheckboxValueType[];
    rate?: number;
    upload?: string;
    uploadDrop?: string;
  }

  const formik: FormikProps<Values> = useFormik({
    initialValues: {
      input: 'dannlks',
      password: '',
      date: moment().format('YYYY-MM-DD'),
      time: moment().format('hh:mm:ss')
    },
    onSubmit: (values, formikHelpers: FormikHelpers<Values>) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const normFile = (e: UploadChangeParam) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 17,
        offset: 7,
      },
    },
  };

  return (
    <Form labelCol={{ span: 7 }} wrapperCol={{ span: 17 }} onSubmit={formik.handleSubmit} labelAlign="left">

      <Form.Item label="Input" hasFeedback required>
        <Input
          name="input"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.input}
        />
      </Form.Item>

      <Form.Item label="Password" hasFeedback required>
        <Input.Password
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </Form.Item>

      <Form.Item
        label="Validating"
        hasFeedback
        validateStatus="validating"
        help="The information is being validated..."
      >
        <Input
          placeholder="I'm the content is being validated"
          name="validating"
          onChange={formik.handleChange}
          value={formik.values.validating}
        />
      </Form.Item>

      <Form.Item label="Success" hasFeedback validateStatus="success">
        <Input
          placeholder="I'm the content"
          name="success"
          onChange={formik.handleChange}
          value={formik.values.success}
        />
      </Form.Item>

      <Form.Item
        label="DateTime"
        style={{ marginBottom: 0 }}
        validateStatus="error"
        help="Please select the correct date"
      >
        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
          <DatePicker
            name="date"
            onChange={(_, d) => formik.handleChange('date')(d)}
            value={moment(formik.values.date, "YYYY-MM-DD")}
          />
        </Form.Item>
        <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
          <TimePicker
            onChange={(_, d) => formik.handleChange('time')(d)}
            value={moment(formik.values.time, "hh:mm:ss")}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Select" hasFeedback>
        <Select
          value={formik.values.select}
          onChange={formik.handleChange('select')}
        >
          <Option value="china">China</Option>
          <Option value="usa">U.S.A</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Input Number" hasFeedback required>
        <InputNumber
          min={1}
          max={10}
          name="number"
          onChange={(v) => formik.setFieldValue('number', v)}
        />
        <span className="ant-form-text"> machines</span>
      </Form.Item>

      <Form.Item label="Switch" hasFeedback required>
        <Switch
          checked={formik.values.switch}
          onChange={(value, _) => formik.setFieldValue('switch', value)}
        />
      </Form.Item>
      <Form.Item label="Slider" hasFeedback required>
        <Slider
          value={formik.values.slide}
          onChange={(value) => formik.setFieldValue('slide', value)}
        />
      </Form.Item>
      <Form.Item label="Radio.Group" hasFeedback required>
        <Radio.Group
          name="radioGroup"
          value={formik.values.radioGroup}
          onChange={formik.handleChange}
        >
          <Radio value="a">item 1</Radio>
          <Radio value="b">item 2</Radio>
          <Radio value="c">item 3</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Radio.Button" hasFeedback required>
        <Radio.Group
          name="radioButton"
          value={formik.values.radioButton}
          onChange={formik.handleChange}
        >
          <Radio.Button value="a">item 1</Radio.Button>
          <Radio.Button value="b">item 2</Radio.Button>
          <Radio.Button value="c">item 3</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Checkbox.Group" hasFeedback required>
        <Checkbox.Group
          style={{ width: '100%' }}
          name="checkboxGroup"
          value={formik.values.checkboxGroup}
          onChange={(value) => formik.setFieldValue('checkboxGroup', value)}
        >
          <Row>
            <Col span={8}>
              <Checkbox value="A">A</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox disabled value="B">
                B
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="C">C</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="D">D</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="E">E</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item label="Rate" hasFeedback required>
        <Rate
          value={formik.values.rate}
          count={5}
          onChange={(value) => formik.setFieldValue('rate', value)}
        />
      </Form.Item>
      <Form.Item label="Upload" hasFeedback required>
        <Upload name="logo" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture" onChange={normFile} onPreview={console.log}>
          <Button>
            <Icon type="upload" /> Click to upload
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item label="Upload.Dragger" hasFeedback required>
        <Upload.Dragger name="files" action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
        </Upload.Dragger>
      </Form.Item>
      <Form.Item {...tailFormItemLayout} >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

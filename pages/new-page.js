import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Radio, Checkbox } from 'antd';
import { Form } from 'antd';
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import {Login} from './api/api-service';

export default function NewPage() {
  function onChangeRadio(e) {
    console.log(`radio checked:${e.target.value}`);
  }

  function onChangeCheckbox(checkedValues) {
    console.log('checked = ', checkedValues);
  }

  const onFinish = values => {
    console.log('Success!', values);    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  //checkbox的选项
  const plainOptions = ['Remember me'];

  return (
    <>
      <h1 className="ant-row ant-row-center">Course Management Assistant</h1>
      <div className="ant-row ant-row-center">
      <div className="ant-col ant-col-sm-24 ant-col-md-8">
          <Form
            onFinish={onFinish}>
            <Form.Item>
              <Radio.Group onChange={onChangeRadio} defaultValue="a">
                <Radio.Button value="Student">Student</Radio.Button>
                <Radio.Button value="Teacher">Teacher</Radio.Button>
                <Radio.Button value="Manager">Manager</Radio.Button>
              </Radio.Group> 
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input the email",
                },
                {
                  type: "email",
                  message: "Invalid Email",
                }
              ]}>
              <Input placeholder="Username" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input the password",
                },
                {
                  min: 4,
                  max: 16,
                  message: "Please input valid password(4-16)",
                }
              ]}>
              <Input placeholder="Password" prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item>
              <Checkbox.Group options={plainOptions} defaultValue={['Remember me']} onChange={onChangeCheckbox} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block>Primary</Button>
            </Form.Item>
          </Form>
      </div>
      </div>
    </>    
  )
}

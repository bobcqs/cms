import 'antd/dist/antd.css';
import { useRouter } from "next/router";
import { Button } from 'antd';
import { Input, Radio, Checkbox, Row, Col } from 'antd';
import { Form } from 'antd';
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import axios from 'axios';
import { AES } from "crypto-js";
import { setAuthData } from "./api/storage";


export default function Home() {
  const router = useRouter();

  const onFinish = values => {
    console.log(values)
    axios.post('https://cms.chtoma.com/api/login', {
      email: values.email,
      password: AES.encrypt(values.password, 'cms').toString(),
      role: values.role,
    })
    .then(function (response) {
      console.log(response);
      // localStorage.setItem("key", JSON.stringify(values));
      setAuthData(values);
      router.push("/new-page");
    })
    .catch(function (error) {
      console.log(error);
    });
  };


  function onChangeRadio(e) {
    console.log(`radio checked:${e.target.value}`);
  }

  function onChangeCheckbox(checkedValues) {
    console.log('checked = ', checkedValues);
  }
  
  //checkbox的选项
  const plainOptions = ['Remember me'];

  return (
    <>
      <Row justify="center">
        <h1>Login successfully</h1>
      </Row>
      <Row justify="center">
        <Col md={8}>
            <Form
              name="login"
              onFinish={onFinish}>
              <Form.Item
                name="role">
                <Radio.Group onChange={onChangeRadio} defaultValue="a">
                  <Radio.Button value="student">Student</Radio.Button>
                  <Radio.Button value="teacher">Teacher</Radio.Button>
                  <Radio.Button value="manager">Manager</Radio.Button>
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
                <Button type="primary" htmlType="submit" block>Log in</Button>
              </Form.Item>
            </Form>
            </Col>
          </Row>
    </>    
  )
}

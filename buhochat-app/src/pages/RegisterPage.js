import "../styles/register.css";

import { Layout } from "antd";
import withoutAuth from "../hocs/withoutAuth";
import RegistrationForm from "../components/RegistrationForm.js";

const RegisterPage = () => {
  const { Content } = Layout;

  return (
    <>
      <Layout>
        <Content className="content">
          <div className="form">
            <p>
              <strong>Registrate y ¡COMIENZA!</strong>{" "}
            </p>
            <RegistrationForm />
          </div>
        </Content>
      </Layout>
    </>
  );
};
export default withoutAuth(RegisterPage);

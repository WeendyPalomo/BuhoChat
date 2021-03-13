import "../styles/register.css";
import { Layout } from "antd";
import withoutAuth from "../hocs/withoutAuth";
import RegistrationForm from "../components/RegistrationForm.js";

const RegisterPage = () => {
  const { Content } = Layout;

  return (
    <>
      <Layout>
        <Content className="register-content">
          <div className="register-form">
            <p>
              <strong className="register-title">Registrate y ¡COMIENZA!</strong>{" "}
            </p>
            <RegistrationForm />
          </div>
        </Content>
      </Layout>
    </>
  );
};
export default withoutAuth(RegisterPage);

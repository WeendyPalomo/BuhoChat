import {Layout} from 'antd';
import "../styles/register.css";
import RegistrationForm from "./RegistrationForm.js";

const ScreenRegister =()=> {
 const {Content } = Layout;

    return(
            <>
              <Layout>
                <Content className="register-content">
                    <div className="register-form">
                    <p><strong className="register-title">Registrate y ¡COMIENZA!</strong> </p>
                      <RegistrationForm/>
                    </div>                                              
                </Content>
              </Layout>    
            </>         
    );
};


export default ScreenRegister;
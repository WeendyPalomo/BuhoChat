import "../styles/register.css"
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { Button, Radio } from 'antd';
import RegistrationForm from "./RegistrationForm.js";

const ScreenRegister =()=> {
 const { Header, Footer, Sider, Content } = Layout;

    return(

            <>
              <Layout>
                <Content className="content">
                  <div className="form">
                  <p><strong>Registrate y ¡COMIENZA!</strong> </p>
                    <RegistrationForm/>
                  </div>                  
                </Content>
              </Layout>    
            </>
         
    );
};
export default ScreenRegister;
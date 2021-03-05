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
                <Header className="header">
                  <p>BuhoChat</p>
                 
                </Header>
                <Content className="content">
                  <div className="form">
                  <p><strong>Registrate y ¡COMIENZA!</strong> </p>
                    <RegistrationForm/>
                  </div>                  
                </Content>
                <Footer className="footer">
                  <p>Derechos Reservados  EPN ©</p>
                </Footer>
              </Layout>    
            </>
         
    );
};
export default ScreenRegister;
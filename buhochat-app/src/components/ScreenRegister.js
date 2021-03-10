import "../styles/register.css"

import { Layout } from 'antd';

import RegistrationForm from "./RegistrationForm.js";

const ScreenRegister =()=> {
 const {Content } = Layout;

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
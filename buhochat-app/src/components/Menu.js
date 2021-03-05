import imgGroup from "../images/chat_group.jpeg";
import imgPosts from "../images/posts.jpeg";
import "../styles/menu.css"
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { Button, Radio } from 'antd';

const Menu =()=> {
 const { Header, Footer, Sider, Content } = Layout;

    return(
     
            <>
              <Layout>
                <Header className="header">
                  <p>BuhoChat</p>
                 
                </Header>
                <Content className="content">
                  <Row>
                      <Col span={12}>
                        <img src={imgGroup} />
                        <p>Ingresa a chats aleatorios con 
                          personas de la comunidad politécnica </p>
                          
                      </Col>
                      <Col span={12}>
                        <img src={imgPosts} />
                        <p>Publica, comenta y encuentra 
                          publicaciones de tu interés.</p>                          
                      </Col>
                  </Row> 
                  <Row className="buttonsChatPost">
                    <Col span={12}>
                      <Button id="button" shape="round">
                        CHAT
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button id="button" shape="round">
                        POST
                      </Button>
                    </Col>
                  </Row>

                </Content>
                <Footer className="footer">
                  <p>Derechos Reservados  EPN ©</p>
                </Footer>
              </Layout>    
            </>
    );
};
export default Menu;
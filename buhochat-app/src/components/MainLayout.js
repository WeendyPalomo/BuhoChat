import React from 'react'
import { Layout, Menu, Button, Row, Col} from 'antd';
import '../styles/MainLayout.css'


const { Header, Content, Footer } = Layout;

const MainLayout = ({children}) => {
    return (
        <Layout className="layout">
            <Header className="header" >
                <Row>
                    <Col span={8}>BúhoChat</Col>
                    <Col span={3} offset={9} align="end">
                        <Button>Iniciar sesión</Button>
                    </Col>
                    <Col span={1} align="center">
                    ó
                    </Col>
                    <Col span={3} align="start">
                        <Button>Registrarse</Button>
                    </Col>
                </Row>
            </Header>
            <Content style={{ padding: '0 50px 0 50px' }}>
                <div className='site-layout-content'>{children}</div>
                
            </Content>
            <Footer style={{ textAlign: 'center', background:'#F03A47', padding:5 }}>Derechos Reservados EPN©</Footer>
        </Layout>
    )
}



export default MainLayout;

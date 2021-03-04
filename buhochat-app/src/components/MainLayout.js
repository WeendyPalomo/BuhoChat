import React from 'react'
import { Layout, Menu} from 'antd';
import ChatsLayout from './ChatsLayout'

const { Header, Content, Footer } = Layout;

const MainLayout = ({children}) => {
    return (
        <Layout className="layout">
            <Header style= {{background:'#F03A47'}}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style= {{background:'#F03A47'}}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px 0 50px' }}>
                <div className='site-layout-content'>{children}</div>
                
            </Content>
            <Footer style={{ textAlign: 'center', background:'#F03A47', padding:5 }}>Derechos Reservados EPN©</Footer>
        </Layout>
    )
}



export default MainLayout;

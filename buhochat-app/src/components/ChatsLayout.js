import React from 'react'
import '../styles/ChatsLayout.css'
import { Layout, Menu, Breadcrumb, Button, Form, Input } from 'antd';

const { Header, Content, Footer } = Layout;


const ChatsLayout = () => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px 0 50px' }}>
            
                <div className="site-layout-content">
                    <div class='navigation-buttons'>
                        <Button type="primary" shape='round'>Posts</Button>
                        <Button type="primary" shape='round'>Chats</Button>
                        
                    </div>
                    <div class='main-content'>
                        <div class='chats-list'>
                            <Input placeholder="Buscar usuarios, amigos" id='search-chat'  />
                            <Content>jjjjj</Content>
                        </div>
                        <div class='chat-window'>
                            <Header>User 2</Header>
                            <Content></Content>
                        </div>
                        
                    </div>
                            
                </div>
            </Content>
            <Footer style={{ textAlign: 'center', background:'#F03A47', padding:5 }}>Derechos Reservados EPN©</Footer>
        </Layout>
        

    );
}



export default ChatsLayout

import imgGroup from "../images/chat_group.jpeg";
import imgPosts from "../images/posts.jpeg";
import "../styles/menu.css";
import {Button, Col, Layout, Row} from "antd";
import {Link} from "react-router-dom";
import Routes from "../constants/routes";
import withAuth from "../hocs/withAuth";



const MenuPage = () => {
  const { Content } = Layout;

  return (
    <>
      <Layout>
        <Content className="content">
          <Row>
            <Col span={12}>
              <img src={imgGroup} className="img-menu-page" />
              <p className="p-menu-page">
                Ingresa a chats aleatorios con personas de la comunidad
                politécnica{" "}
              </p>
            </Col>
            <Col span={12}>
              <img src={imgPosts} className="img-menu-page" />
              <p className="p-menu-page">
                Publica, comenta y encuentra publicaciones de tu interés.
              </p>
            </Col>
          </Row>
          <Row className="buttonsChatPost">
            <Col span={12}>
              <Button id="buttonChat" shape="round">
                <Link to={Routes.CHAT}>CHAT</Link>
              </Button>
            </Col>
            <Col span={12}>
              <Button id="buttonPost" shape="round">
                <Link to={Routes.POSTS}>POST</Link>
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
export default withAuth(MenuPage);

import { Row, Col, Card, Typography } from "antd";
import './style.css';

const {Text} = Typography;
import '../../components/Card/styles.css';
import { useNavigate } from "react-router-dom";

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate()
  
  return (
    <>
      <Row gutter={ [16, 24] }>
        <Col span={ 24 }>
          <div style={ {textAlign: 'center'} }>
            <h1>Select a server to manage</h1>
          </div>
        </Col>
        <Col xs={ 24 } sm={ 24 } md={ 24 } lg={ 24 } xl={ 6 }>
          <div className="server-card">
            <div className="banner">
              <div className="banner-image" style={ {backgroundImage: 'url(http://localhost:5173/img.webp)'} }></div>
              <img src="img.webp"/>
            </div>
            <div className="menu">
              <div className="opener"><span></span><span></span><span></span></div>
            </div>
            <h2 className="name">Morgan Sweeney</h2>
            <div className="title">Owner</div>
            <div className="actions">
              <div className="follow-info">
                <h2><a href="#"><span>12</span><small>Members</small></a></h2>
                <h2><a href="#"><span>1000</span><small>Plugins Enabled</small></a></h2>
              </div>
              <div className="follow-btn">
                <button onClick={
                  () => {
                    // navigate to /users
                    navigate("/users")
                  }
                }>Manage Server</button>
              </div>
            </div>
            <div className="desc"></div>
          </div>
        </Col>
        <Col xs={ 24 } sm={ 24 } md={ 24 } lg={ 24 } xl={ 6 }>
          <div className="server-card">
            <div className="banner">
              <div className="banner-image" style={ {backgroundImage: 'url(http://localhost:5173/img.webp)'} }></div>
              <img src="img.webp"/>
            </div>
            <div className="menu">
              <div className="opener"><span></span><span></span><span></span></div>
            </div>
            <h2 className="name">Angel's Server</h2>
            <div className="title">Owner</div>
            <div className="actions">
              <div className="follow-info">
                <h2><a href="#"><span>12</span><small>Members</small></a></h2>
                <h2><a href="#"><span>1000</span><small>Plugins Enabled</small></a></h2>
              </div>
              <div className="follow-btn">
                <button>Manage Server</button>
              </div>
            </div>
            <div className="desc"></div>
          </div>
        </Col>
        <Col xs={ 24 } sm={ 24 } md={ 24 } lg={ 24 } xl={ 6 }>
          <div className="server-card">
            <div className="banner">
              <div className="banner-image" style={ {backgroundImage: 'url(http://localhost:5173/img.webp)'} }></div>
              <img src="img.webp"/>
            </div>
            <div className="menu">
              <div className="opener"><span></span><span></span><span></span></div>
            </div>
            <h2 className="name">Morgan Sweeney</h2>
            <div className="title">Owner</div>
            <div className="actions">
              <div className="follow-info">
                <h2><a href="#"><span>12</span><small>Members</small></a></h2>
                <h2><a href="#"><span>1000</span><small>Plugins Enabled</small></a></h2>
              </div>
              <div className="follow-btn">
                <button>Manage Server</button>
              </div>
            </div>
            <div className="desc"></div>
          </div>
        </Col>
        <Col xs={ 24 } sm={ 24 } md={ 24 } lg={ 24 } xl={ 6 }>
          <div className="server-card">
            <div className="banner">
              <div className="banner-image" style={ {backgroundImage: 'url(http://localhost:5173/img.webp)'} }></div>
              <img src="img.webp"/>
            </div>
            <div className="menu">
              <div className="opener"><span></span><span></span><span></span></div>
            </div>
            <h2 className="name">Morgan Sweeney</h2>
            <div className="title">Owner</div>
            <div className="actions">
              <div className="follow-info">
                <h2><a href="#"><span>12</span><small>Members</small></a></h2>
                <h2><a href="#"><span>1000</span><small>Plugins Enabled</small></a></h2>
              </div>
              <div className="follow-btn">
                <button>Manage Server</button>
              </div>
            </div>
            <div className="desc"></div>
          </div>
        </Col>
      </Row>
    </>
  );
};
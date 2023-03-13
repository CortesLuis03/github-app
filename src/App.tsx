import { useState } from "react";
import "./App.css";
import { UserData } from "./types";
import { Layout, Row, Col, Empty, Skeleton } from "antd";
import { UserInfo, UserInfoDetail, UserSearch } from "./components";
import { EMPTY_USER } from "./constants";

function App() {
  const [userData, setUserData] = useState<UserData>(EMPTY_USER);
  const [empty, setEmpty] = useState<Boolean>(true);
  const [detailType, setDetailType] = useState<string>("repos");

  return (
    <>
      <Layout className="container">
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <UserSearch
              onSelectUser={(userData: UserData) => {
                setUserData(userData);
                setEmpty(false);
              }}
            ></UserSearch>
          </Col>
          {!empty ? (
            <>
              <Col
                xs={24}
                sm={24}
                md={{ span: 10, offset: 0 }}
                xxl={{ span: 8, offset: 2 }}
              >
                <UserInfo
                  userData={userData}
                  onSelectDetail={(data: string) => {
                    setDetailType(data);
                  }}
                ></UserInfo>
              </Col>
              <Col xs={24} sm={24} md={{ span: 14 }} xxl={{ span: 12 }}>
                <UserInfoDetail
                  username={userData.login}
                  type={detailType}
                  onSelectUser={(userData: UserData) => {
                    setUserData(userData);
                    setEmpty(false);
                  }}
                ></UserInfoDetail>
              </Col>
            </>
          ) : (
            <>
              <Col
                xs={24}
                sm={24}
                md={{ span: 10, offset: 0 }}
                xxl={{ span: 8, offset: 2 }}
              >
                <Skeleton.Image
                  active
                  className="_app-skeleton-image"
                />
                <Skeleton active></Skeleton>
              </Col>
              <Col xs={24} sm={24} md={{ span: 14 }} xxl={{ span: 12 }}>
                <Skeleton active></Skeleton>
              </Col>
            </>
          )}
        </Row>
      </Layout>
    </>
  );
}

export default App;

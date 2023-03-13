import { Button, Card, Empty, List, Typography } from "antd";
import { ReactNode, useMemo, useState } from "react";
import CountUp from "react-countup";
import { UserInfoProps } from "./types";
import { GrLocation } from "react-icons/gr";
import "./UserInfo.scss";

const { Text, Link, Title } = Typography;

export function UserInfo({ userData, onSelectDetail }: UserInfoProps) {
  const [listDetailUser, setListDetailInfo] = useState<Array<ReactNode>>([]);

  useMemo(() => {
    let options = [];
    if (userData?.bio) {
      options.push(<Text>{userData.bio}</Text>);
    }
    if (userData?.company) {
      options.push(<Text>{userData.company}</Text>);
    }
    if (userData?.location) {
      options.push(
        <>
          <Text>
            <GrLocation style={{ marginRight: 10 }} />
            {userData.location}
          </Text>
        </>
      );
    }

    setListDetailInfo(options);
  }, [userData]);

  return userData?.login != "No user" && userData?.login != null ? (
    <>
      <Card
        className="_card-user-info"
        cover={
          <Link href={userData.html_url} target="_blank">
            <img src={userData?.avatar_url} className="_user-avatar-image" />
          </Link>
        }
        bordered={false}
        actions={[
          <Button
            type="link"
            onClick={() => {
              onSelectDetail("followers");
            }}
          >
            <CountUp
              end={userData?.followers ? userData?.followers : 0}
              suffix=" followers"
            />
          </Button>,
          <Button
            type="link"
            onClick={() => {
              onSelectDetail("following");
            }}
          >
            <CountUp
              end={userData?.following ? userData?.following : 0}
              suffix=" following"
            />
          </Button>,
          <Button
            type="link"
            onClick={() => {
              onSelectDetail("repos");
            }}
          >
            <CountUp
              end={userData?.public_repos ? userData?.public_repos : 0}
              suffix=" repositories"
            />
          </Button>,
        ]}
      >
        <List
          bordered={false}
          dataSource={listDetailUser}
          renderItem={(item) => <List.Item>{item}</List.Item>}
          header={
            <>
              <Title level={2}>{userData.name}</Title>
              <Text type="secondary">{userData.login}</Text>
            </>
          }
        />
      </Card>
    </>
  ) : (
    <Empty></Empty>
  );
}

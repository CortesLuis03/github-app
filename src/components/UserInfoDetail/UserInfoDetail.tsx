import {
  Avatar,
  Card,
  Empty,
  List,
  Space,
  Tag,
  Typography,
  Button,
} from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { fetchDetails, fetchUser } from "../../services/githubApi";
import { UserData } from "../../types";
import { InfoDetailProps } from "./types";
import "./UserInfoDetail.scss";
const { Link, Paragraph } = Typography;

const tagColors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

function getRandomInt() {
  return Math.floor(Math.random() * (0 - 10) + 10);
}

export function UserInfoDetail({
  username,
  type,
  onSelectUser,
}: InfoDetailProps) {
  const [list, setList] = useState<Array<any>>([]);
  useMemo(() => {
    return fetchDetails(username, type, setList);
  }, [username, type]);
  const handleClick = (user: string) => {
    fetchUser(user, (data: UserData) => {
      onSelectUser(data);
    });
  };
  return (
    <>
      <Card className="_card-user-info">
        {type == "repos" ? (
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3 }}
            dataSource={list}
            loading={list.length > 0 ? false : true}
            renderItem={(item) => (
              <List.Item>
                <Card className="_card-item-repo">
                  <Space align="start" direction="vertical">
                    <Link href={item.html_url} target="_blank">
                      {item?.name}
                    </Link>
                    {item?.homepage != "" && item?.homepage ? (
                      <Paragraph
                        copyable={{
                          onCopy: () => {
                            window.open(item.homepage, "_blank");
                          },
                          tooltips: false,
                          icon: <LinkOutlined />,
                        }}
                      >
                        Website
                      </Paragraph>
                    ) : (
                      <></>
                    )}
                  </Space>
                  <br />
                  {item?.language != null ? (
                    <Tag color={tagColors[getRandomInt()]}>{item.language}</Tag>
                  ) : (
                    <Space style={{ minHeight: 10 }}> </Space>
                  )}
                </Card>
              </List.Item>
            )}
          />
        ) : type == "followers" || type == "following" ? (
          <List
            itemLayout="horizontal"
            dataSource={list}
            loading={list.length > 0 ? false : true}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={item.avatar_url}
                      style={{ minWidth: 50, minHeight: 50 }}
                    />
                  }
                  description={
                    <Button
                      type="link"
                      onClick={() => {
                        handleClick(item.login);
                      }}
                    >
                      {item?.login}
                    </Button>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <>
            <Empty></Empty>
          </>
        )}
      </Card>
    </>
  );
}

import { useState } from "react";
import { Empty, Select, SelectProps, Space, Spin } from "antd";
import { UserData } from "../../types";
import "./UserSearch.scss";
import { fetchUser, fetchUsers } from "../../services/githubApi";
import { UserSearchProps } from "./types";

export function UserSearch({ onSelectUser }: UserSearchProps) {
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>();
  const [fetching, setFetching] = useState(false);
  const handleSearch = (newValue: string) => {
    if (newValue) {
      setFetching(true);
      fetchUsers(newValue, setData, setFetching);
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    fetchUser(newValue, (data: UserData) => {
      onSelectUser(data);
    });
  };
  const handleClear = () => {
    setData([]);
  };
  return (
    <>
      <Space className="_container-user-selector">
        <Select
          showSearch
          size="large"
          value={value}
          className="_user-selector"
          placeholder="Search Github User"
          defaultActiveFirstOption={false}
          allowClear
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleChange}
          onClear={handleClear}
          notFoundContent={fetching ? <Spin size="small" /> : <Empty></Empty>}
          options={(data || []).map((item) => ({
            value: item.value,
            label: item.text,
          }))}
        />
      </Space>
    </>
  );
}

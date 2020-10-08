import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const NavMenu = () => {

  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
  console.log(openKeys);

  function onOpenChange(key) {
    console.log(openKeys);
    console.log(key);
    const latestOpenKey = openKeys;
    console.log(latestOpenKey);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      console.log(rootSubmenuKeys.indexOf(latestOpenKey));
      setOpenKeys({ openKeys });
    } else {
      console.log(latestOpenKey);
      setOpenKeys({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
    >
      <SubMenu
        key="sub1"
        title={
          <span>
            <MailOutlined />
            <span>Navigation One</span>
          </span>
        }
      >
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default NavMenu;

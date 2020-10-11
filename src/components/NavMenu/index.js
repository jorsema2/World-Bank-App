import React, { useState } from "react";
import {Link} from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const NavMenu = () => {

  // Ant design library forces us to use an array here:
  const [openSubmenu, setOpenSubmenu] = useState(["sub1"]);

  function changeOpenSubmenu(key) {
    const newOpenSubmenu = [key[1]]
    setOpenSubmenu(newOpenSubmenu);
  }

  return (
    <Menu
      mode="inline"
      openKeys={openSubmenu}
      onOpenChange={changeOpenSubmenu}
      style={{ width: 200 }}
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
        <Menu.Item key="1"><Link to={`/`}>Home</Link></Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <Menu.Item key="7">Option 6</Menu.Item>
        <Menu.Item key="8">Option 6</Menu.Item>
      </SubMenu>
      <SubMenu key="sub3" icon={<SettingOutlined />} title="Navigation Three">
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default NavMenu;

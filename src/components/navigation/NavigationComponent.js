import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class NavigationComponent extends React.Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    handleMenu = (e) => {
        switch (e.key) {
            case 'organizers': {
                browserHistory.push('/organizers');
                break;
            }
            case 'new_tickets': {
                browserHistory.push('/new_tickets');
                break;
            }
        }
    };


    handleLogo = () => {
        browserHistory.push('/');
    };

    render() {
        const {collapsed} = this.state;
        const pathname = this.props.children.props.location.pathname;
        const selectedKey = pathname.split('/')[1];
        return (
            <Layout>
                <Sider
                    width={180}
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" onClick={this.handleLogo}>{!collapsed? 'TicketChain': <Icon type="home" />}</div>
                    <Menu
                        theme="dark" mode={this.state.mode}
                        style={{ height: '100%' }}
                        onClick={this.handleMenu}
                        defaultSelectedKeys={[selectedKey]}
                    >
                        <Menu.Item key="organizers">
                          <span>
                            <Icon type="user" />
                            <span className="nav-text">Организаторы</span>
                          </span>
                        </Menu.Item>
                        <Menu.Item key="new_tickets">
                          <span>
                            <Icon type="file" />
                            <span className="nav-text">Создание бланков</span>
                          </span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#ECECEC', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <div className="page-wrapper">
                        <div className="content-wrapper">
                            {this.props.children}
                        </div>
                    </div>
                    <Footer style={{ textAlign: 'center' }}>
                        TicketChain ©2017 Created by Chain.cloud
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default NavigationComponent;

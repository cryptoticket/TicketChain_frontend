import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class NavigationComponent extends React.Component {
    constructor(props) {
        super(props);
        const pathname = this.props.children.props.location.pathname;
        const selectedKey = pathname.split('/')[1];
        this.state = {
            mode: 'inline',
            selectedKey
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.children.props.location.pathname !== this.props.children.props.location.pathname) {
            const pathname = nextProps.children.props.location.pathname;
            const selectedKey = pathname.split('/')[1];
            this.setState({selectedKey});
        }
    };
    
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
            case 'new_tickets_by_num': {
                browserHistory.push('/new_tickets_by_num');
                break;
            }
            case 'new_csv': {
                browserHistory.push('/new_csv');
                break;
            }
        }
    };
    
    handleLogo = () => {
        this.setState({selectedKey: null});
        browserHistory.push('/');
    };
    
    render() {
        const {collapsed, selectedKey} = this.state;
        return (
            <Layout>
                <Sider
                    width={250}
                    trigger={null}
                >
                    <div className="logo" onClick={this.handleLogo}>{!collapsed ? 'TicketChain' :
                        <Icon type="home"/>}</div>
                    <Menu
                        theme="dark" mode={this.state.mode}
                        style={{height: '100%'}}
                        onClick={this.handleMenu}
                        selectedKeys={[selectedKey]}
                    >
                        <Menu.Item key="organizers">
                            <span className="nav-text">
                                <svg className="nav-icon">
                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#organizers" />
                                </svg>
                                Организаторы
                            </span>
                        </Menu.Item>
                        <Menu.Item key="new_tickets">
                            <span className="nav-text">
                                <svg className="nav-icon">
                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#creation" />
                                </svg>
                                Создание бланков
                            </span>
                        </Menu.Item>
                        <Menu.Item key="new_tickets_by_num">
                            <span className="nav-text">
                                <svg className="nav-icon">
                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#creationNum" />
                                </svg>
                                Создание бланков (кол-во)
                            </span>
                        </Menu.Item>
                        <Menu.Item key="new_csv">
                            <span className="nav-text">
                                <svg className="nav-icon">
                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#loading" />
                                </svg>
                                Загрузка CSV файла
                            </span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#ECECEC', padding: 0}}>
                    </Header>
                    <div className="page-wrapper">
                        <div className="content-wrapper">
                            {this.props.children}
                        </div>
                    </div>
                    <Footer style={{textAlign: 'center'}}>
                        TicketChain ©2017, Built by <a href="http://chain.cloud">Chain.Cloud</a>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default NavigationComponent;

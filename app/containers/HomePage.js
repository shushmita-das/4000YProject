// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import FileUploadForm from '../components/FileUploadForm';
import NivoGraph from '../components/NivoSampleGraph';
import TableData from '../components/TableData';
import { PageHeader, Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Button } from 'antd/lib/radio';

type Props = {};

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class HomePage extends Component<Props> {
  props: Props;

  state = {
    collapsed: false,
    showGraph: false,
    showImport: true,
    showTable: false,
    csvData: "",
    button: false,
    key: "1",
  };

  //Handles the responsive sidebar
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  //Handles button state and gets csv data
  handleCsvData = csvData => {
    //console.log(csvData);
    this.setState({ csvData });
    this.setState({ button: true });

    //console.log(csvData[0]);
  }

  //Handles graph generation state
  handleGraph = showGraph => {
    console.log(showGraph);
    this.setState({ showGraph });
    this.setState({ key: "2" });
    this.setState({ showImport: false });
  }

  //Handles table generation state
  handleTable = showTable => {
    console.log(showTable);
    this.setState(
      { 
        showTable,
        key: "3",
        showImport: false
      }
     );
  }

  /*
    Docs for Antd Layouts: https://ant.design/components/layout/

    Summary:  Renders the app layout, including the sidebar. Also loads the FileUploadForm component
              into the a div displayed on the main page.
  */

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" selectedKeys={this.state.key}>
            <Menu.Item key="1">
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="bar-chart" />
              <span>Graphs</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="table" />
              <span>Tables</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="export" />
              <span>Export Data</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="setting" />
              <span>Settings</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <PageHeader title="Home Page" subTitle="Import Data" />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              {this.state.showImport ? <div style={{ padding: 24, background: '#fff' }}> <FileUploadForm getCsvData={this.handleCsvData} /> </div> : null}
              <div style={{ padding: 24, background: '#fff' }}>
                <Button onClick={this.handleGraph} disabled={!this.state.button}>Generate Graph</Button>
              </div>
              <div style={{ padding: 24, background: '#fff' }}>
                <Button onClick={this.handleTable} disabled={!this.state.button}>Generate Table</Button>
              </div>
            </div>
            {this.state.showGraph ? <div style={{ padding: 24 }}> <NivoGraph csvData={this.state.csvData} /> </div> : null}
            {this.state.showTable ? <TableData csvData={this.state.csvData} /> : null}
          </Content>
          <Footer style={{ textAlign: 'center' }}>This is a footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

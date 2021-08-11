import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import SideMenu from "./components/SideMenu";
import Standby from "./components/Standby";
import InformationIct from "./components/InformationIct";
import ChartIct from "./components/ChartIct";
import InformationOhca from "./components/InformationOhca";
import ResultOhca from "./components/ResultOhca";
import "./App.css";

const { Header, Content, Sider, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirect: false,
      selectedMenu: null,
      inputData: null,
      outputData: null,
      inputData02: null,
      outputData02: null,
    };
  }

  // onCollapse = (collapsed) => {
  //   console.log(collapsed);
  //   this.setState({ collapsed });
  // }

  changeAppState = (inputData, outputData) => {
    this.setState({ inputData: inputData, outputData: outputData });
  };
  changeAppStateOhca = (inputData, outputData) => {
    this.setState({ inputData02: inputData, outputData02: outputData });
  };

  changeIsRedirect = () => {
    this.setState({ isRedirect: true });
  };

  changeMenu = (val) => {
    this.setState({ selectedMenu: val });
  };

  render() {
    // console.log("App.js 렌더링, state ", this.state);
    // console.log("App.js 렌더링, props", this.props);

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
        // collapsible
        // collapsed={this.state.collapsed}
        // onCollapse={this.onCollapse}
        >
          <div className="title">
            <h1 style={{ color: "white", fontSize: 20, marginLeft: 30 }}>
              P-cdss
            </h1>
          </div>
          <SideMenu
            selectedMenu={this.state["selectedMenu"]}
            changeMenu={this.changeMenu}
          />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {/* <Breadcrumb.Item>이건</Breadcrumb.Item>
              <Breadcrumb.Item>뭐할때 쓰지</Breadcrumb.Item> */}
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                <Route
                  exact
                  path="/standby"
                  render={() => {
                    return <Standby />;
                  }}
                />
                <Route
                  path="/informationIct"
                  render={() => {
                    return (
                      <InformationIct
                        changeMenu={this.changeMenu}
                        route={"informationIct"}
                        isRedirect={this.state["isRedirect"]}
                        changeIsRedirect={this.changeIsRedirect}
                        changeAppState={this.changeAppState}
                      />
                    );
                  }}
                />
                <Route
                  path="/chartIct"
                  render={() => {
                    return (
                      <ChartIct
                        changeMenu={this.changeMenu}
                        route={"chartIct"}
                        isRedirect={this.state["isRedirect"]}
                        changeIsRedirect={this.changeIsRedirect}
                        inputData={this.state.inputData}
                        outputData={this.state.outputData}
                      />
                    );
                  }}
                />
                <Route
                  path="/informationOhca"
                  render={() => {
                    return (
                      <InformationOhca
                        changeMenu={this.changeMenu}
                        route={"informationOhca"}
                        isRedirect={this.state["isRedirect"]}
                        changeIsRedirect={this.changeIsRedirect}
                        changeAppState={this.changeAppStateOhca}
                      />
                    );
                  }}
                />
                <Route
                  path="/chartOhca"
                  render={() => {
                    return (
                      <ResultOhca
                        changeMenu={this.changeMenu}
                        route={"chartOhca"}
                        isRedirect={this.state["isRedirect"]}
                        changeIsRedirect={this.changeIsRedirect}
                        inputData={this.state.inputData02}
                        outputData={this.state.outputData02}
                      />
                    );
                  }}
                />
              </Switch>
            </div>
            {this.state["isRedirect"] ? null : <Redirect to="/standby" />}
            {this.state["isRedirect"]
              ? null
              : this.setState({ isRedirect: true })}
          </Content>
          <Footer style={{ textAlign: "center", background: "#fff" }}>
            SHL ©2021
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Card, Divider, Row, Col } from "antd";
import Plot from "react-plotly.js";

class ResultOhca extends Component {
  state = {
    inputData: this.props.inputData,
    outputData: this.props.outputData,
  };

  render() {
    return (
      <div>
        <Row>
          <Card
            title="Information"
            bordered={false}
            style={{ margin: 10, width: 1840 }}
          >
            <Row style={{ display: "flex", justifyContent: "row" }}>
              {this.props.inputData === null ? (
                <Col style={{ margin: 10, fontSize: 15 }}>
                  {"불러올 정보가 없습니다"}
                </Col>
              ) : (
                <Col
                  title="OHCA line plot"
                  bordered={false}
                  style={{ margin: 10, width: 600 }}
                >
                  <Plot
                    data={[
                      {
                        x: this.props.outputData["X_plot"],
                        y: this.props.outputData["Y_plot"],
                        type: "line",
                        mode: "markers",
                        marker: { color: "#E64506" },
                      },
                    ]}
                    layout={{ width: 500, height: 500, title: "" }}
                  />
                </Col>
              )}
            </Row>
          </Card>
        </Row>
      </div>
    );
  }
}

export default ResultOhca;

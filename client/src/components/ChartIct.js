import React, { Component } from "react";
import { Card, Divider, Row, Col } from "antd";
import Plot from "react-plotly.js";
import { densityPlotData } from "../chartData/densityPlot";

class ChartIct extends Component {
  state = {
    inputData: this.props.inputData,
    outputData: this.props.outputData,
  };

  componentDidMount() {}

  informationFunc = (currArr, key) => {
    return currArr[0] === "sexx" ? (
      <Col style={{ margin: 10, fontSize: 15 }} key={key}>
        {"sex" + ": " + currArr[1]}
      </Col>
    ) : (
      <Col style={{ margin: 10, fontSize: 15 }} key={key}>
        {currArr[0] + ": " + currArr[1]}
      </Col>
    );
  };

  chartCard = (title, x, y, type, mode, xPoint, yMax) => {
    // console.log("xPoint", xPoint);
    return (
      <Card title={title} bordered={false} style={{ margin: 10, width: 600 }}>
        <Plot
          // style={{ paddingTop: 0 }}
          data={[
            {
              x: x,
              y: y,
              type: type,
              mode: mode,
              marker: { color: "#E64506" },
            },
            {
              x: [xPoint[0], xPoint[0]],
              y: [0, yMax],
              type: "scatter",
              mode: "lines",
              marker: { color: "#0E0189" },
            },
            // {
            //   x: densityPlotData.ich["x"],
            //   y: densityPlotData.ich["y"],
            //   type: "bar",
            //   mode: "none",
            //   marker: { color: "#F9AD0D" },
            // },
          ]}
          layout={{ width: 500, height: 500, title: "", showlegend: false }}
        />
      </Card>
    );
  };

  render() {
    console.log("Chart.js 렌더링, state", this.state);
    console.log("Chart.js 렌더링, props", this.props);
    // console.log("densityPlotData =>", densityPlotData);
    // console.log("test", Object.entries(densityPlotData));
    // console.log(
    //   "inputData len =>",
    //   Object.keys(this.state["inputData"]).length
    // );

    return (
      <div className="">
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
                Object.entries(this.props.inputData).map((curr, index, arr) => {
                  return curr[0] === "isSubmitClicked" ||
                    curr[0] === "isResponseCorrect"
                    ? null
                    : this.informationFunc(curr, index);
                })
              )}
            </Row>
          </Card>
        </Row>
        <Row style={{ display: "flex", justifyContent: "row" }}>
          {this.props.inputData === null ? (
            <Card bordered={false} style={{ margin: 10, width: 1840 }}>
              <Col style={{ margin: 10, fontSize: 15 }}>
                {"불러올 정보가 없습니다"}
              </Col>
            </Card>
          ) : (
            <>
              {Object.entries(densityPlotData).map((curr, index, arr) => {
                // console.log("map test", this.props.outputData[curr[0]]);
                return this.chartCard(
                  curr[0],
                  curr[1]["x"],
                  curr[1]["y"],
                  "scatter",
                  "lines",
                  [this.props.outputData[curr[0]]],
                  densityPlotData[curr[0]]["y"][0]
                );
              })}
              <Card
                title="diag_all"
                bordered={false}
                style={{ margin: 10, width: 600 }}
              >
                <Plot
                  data={[
                    {
                      x: this.props.outputData["diag_all"]["list_pred"],
                      y: this.props.outputData["diag_all"]["list_prob"],
                      type: "bar",
                      mode: "markers",
                      marker: { color: "#E64506" },
                    },
                    // {
                    //   x: densityPlotData.tbi["x"],
                    //   y: densityPlotData.tbi["y"],
                    //   type: "bar",
                    //   mode: "none",
                    //   marker: { color: "#F9AD0D" },
                    // },
                  ]}
                  layout={{ width: 500, height: 500, title: "" }}
                />
              </Card>
              <Card
                title="emrt"
                bordered={false}
                style={{ margin: 10, width: 600 }}
              >
                <Plot
                  data={[
                    {
                      x: this.props.outputData["emrt"]["list_pred"],
                      y: this.props.outputData["emrt"]["list_prob"],
                      type: "bar",
                      mode: "markers",
                      marker: { color: "#E64506" },
                    },
                    // {
                    //   x: densityPlotData.tbi["x"],
                    //   y: densityPlotData.tbi["y"],
                    //   type: "bar",
                    //   mode: "none",
                    //   marker: { color: "#F9AD0D" },
                    // },
                  ]}
                  layout={{ width: 500, height: 500, title: "" }}
                />
              </Card>
            </>
          )}
        </Row>
        <Row>
          <Card title="Result sentence 01">
            {this.props.inputData === null ? (
              <Col style={{ margin: 10, fontSize: 15 }}>
                {"불러올 정보가 없습니다"}
              </Col>
            ) : (
              <>
                <div style={{ margin: 10, fontSize: 20 }}>
                  이 환아가 속한 그룹의 뇌출혈 확률은 {}% 입니다.
                </div>
                <div style={{ margin: 10, fontSize: 20 }}>
                  같은 나이 그룹에서 상위 {} percentile의 위험도에 속합니다.
                </div>
              </>
            )}
          </Card>
        </Row>
        <Row>
          <Card title="Result sentence 02">
            {this.props.inputData === null ? (
              <Col style={{ margin: 10, fontSize: 15 }}>
                {"불러올 정보가 없습니다"}
              </Col>
            ) : (
              <div style={{ margin: 10, fontSize: 20 }}>CDSS는 CT를 {}</div>
            )}
          </Card>
        </Row>
      </div>
    );
  }
}

export default ChartIct;

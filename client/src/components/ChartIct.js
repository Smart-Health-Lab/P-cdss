import React, { Component } from "react";
import { Card, Typography, Row, Col } from "antd";
import Plot from "react-plotly.js";
import { densityPlotData } from "../chartData/densityPlot";

const { Title } = Typography;

class ChartIct extends Component {
  state = {
    inputData: this.props.inputData,
    outputData: this.props.outputData,
  };

  componentDidMount() {}

  informationFunc = (currArr, key) => {
    let titleKR = null;
    if (currArr[0] === "name") {
      titleKR = "이름";
    } else if (currArr[0] === "age") {
      titleKR = "나이";
    } else if (currArr[0] === "cm_breath") {
      titleKR = "분당 호흡수";
    } else if (currArr[0] === "cm_dp") {
      titleKR = "이완기 혈압";
    } else if (currArr[0] === "cm_pc") {
      titleKR = "분당 맥박수";
    } else if (currArr[0] === "cm_sp") {
      titleKR = "수축기 혈압";
    } else if (currArr[0] === "cm_tmpt") {
      titleKR = "체온";
    } else if (currArr[0] === "on_date") {
      titleKR = "손상발생 날짜";
    } else if (currArr[0] === "in_date") {
      titleKR = "입실 날짜";
    } else if (currArr[0] === "on_time") {
      titleKR = "손상발생 시간";
    } else if (currArr[0] === "in_time") {
      titleKR = "입실 시간";
    } else if (currArr[0] === "cm_avpu") {
      titleKR = "AVPU";
    } else if (currArr[0] === "cm_gcs_e") {
      titleKR = "GCS_Eye";
    } else if (currArr[0] === "cm_gcs_v") {
      titleKR = "GCS_Verbal";
    } else if (currArr[0] === "cm_gcs_m") {
      titleKR = "GCS_Motor";
    } else if (currArr[0] === "alco") {
      titleKR = "음주여부";
    } else if (currArr[0] === "intent") {
      titleKR = "손상의도";
    } else if (currArr[0] === "method") {
      titleKR = "내원수단";
    } else if (currArr[0] === "mech") {
      titleKR = "손상기전";
    } else if (currArr[0] === "place1") {
      titleKR = "발생장소1";
    } else if (currArr[0] === "place2") {
      titleKR = "실 내/외 여부";
    } else if (currArr[0] === "place3") {
      titleKR = "발생장소2";
    } else if (currArr[0] === "factor_u") {
      titleKR = "손상 유발물질";
    } else if (currArr[0] === "sports") {
      titleKR = "스포츠 유형";
    } else if (currArr[0] === "iact") {
      titleKR = "손상 시 활동";
    } else if (currArr[0] === "sympu1") {
      titleKR = "주증상1";
    } else if (currArr[0] === "sympu2") {
      titleKR = "주증상2";
    } else if (currArr[0] === "sympu3") {
      titleKR = "주증상3";
    } else if (currArr[0] === "sympu4") {
      titleKR = "주증상4";
    } else if (currArr[0] === "sympu5") {
      titleKR = "주증상5";
    }

    return currArr[0] === "sexx" ? (
      <Col style={{ margin: 10, fontSize: 15 }} key={key}>
        {"성별" + ": " + currArr[1]}
      </Col>
    ) : (
      <Col style={{ margin: 10, fontSize: 15 }} key={key}>
        {titleKR + ": " + currArr[1]}
      </Col>
    );
  };

  chartCard = (title, x, y, type, mode, xPoint, yMax) => {
    if (title === "tbi") {
      title = "Traumatic Brain Injury";
    } else if (title === "ich") {
      title = "Intracranial Hemorrhage";
    } else if (title === "op") {
      title = "Operation";
    }
    return (
      <Card title={title} bordered={false} style={{ margin: 10, width: 600 }}>
        <Plot
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
          ]}
          layout={{
            width: 500,
            height: 500,
            title: "",
            showlegend: false,
            xaxis: {
              title: "Kernal Density",
            },
            yaxis: {
              title: "Probability",
            },
          }}
        />
      </Card>
    );
  };

  render() {
    // console.log("Chart.js 렌더링, state", this.state);
    // console.log("Chart.js 렌더링, props", this.props);

    return (
      <div className="">
        <Row>
          <Card
            title={<Title level={4}>Patient's Information</Title>}
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
            <Card
              title={<Title level={4}>Plot</Title>}
              bordered={false}
              style={{ margin: 10, width: 1840 }}
            >
              <Col style={{ margin: 10, fontSize: 15 }}>
                {"불러올 정보가 없습니다"}
              </Col>
            </Card>
          ) : (
            <>
              {Object.entries(densityPlotData).map((curr, index, arr) => {
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
                title="Predicted Diagnosis"
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
                  ]}
                  layout={{
                    width: 500,
                    height: 500,
                    title: "",
                    xaxis: {
                      title: "Predicted ICD-10 Diagnosis",
                    },
                    yaxis: {
                      title: "Probability",
                    },
                  }}
                />
              </Card>
              <Card
                title=" Emergency Result"
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
                  ]}
                  layout={{
                    width: 500,
                    height: 500,
                    title: "",
                    xaxis: {
                      title: "Predicted Emergency Result",
                    },
                    yaxis: {
                      title: "Probability",
                    },
                  }}
                />
              </Card>
            </>
          )}
        </Row>
      </div>
    );
  }
}

export default ChartIct;

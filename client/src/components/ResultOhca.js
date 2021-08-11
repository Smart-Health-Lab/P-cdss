import React, { Component } from "react";
import { Card, Typography, Row, Col } from "antd";
import Plot from "react-plotly.js";

const { Title } = Typography;

const mappingDict = {
  name: "환자명",
  act: "발생당시 활동",
  age: "나이",
  bystander_cpr: "구조자의 CPR여부",
  cause_disease: "발생원인",
  er_defib: "제세동 여부_ER",
  er_ekg: "심전도 여부_ER",
  first_defib_place: "최초 제세동 장소",
  first_ekg_place: "최초 심전도 장소",
  h_place_public: "발생장소",
  h_sex: "성별",
  pre_er_cpr: "ER 전 CPR여부",
  pre_er_defib: "ER 전 제새동여부",
  pre_er_ekg: "ER 전 심전도여부",
  witness: "목격자",
  phx_dm: "당뇨력",
  phx_heart: "심장질환력",
  phx_htn: "고혈압력",
  phx_renal: "신장질환력",
  phx_respi: "호흡기질환력",
  phx_stroke: "뇌졸중력",
  phx_dyslipi: "지질혈증력",
  arrest_er_time: "ER 도착 시간",
  cpr: "CPR 수행여부",
};

class ResultOhca extends Component {
  state = {
    inputData: this.props.inputData,
    outputData: this.props.outputData,
  };

  render() {
    console.log("ResultOhaca.js 렌더링..");
    console.log("this.props ==>", this.props);

    return (
      <div>
        <Card
          title={<Title level={4}>Information</Title>}
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
                if (curr[0] === "key") {
                  return null;
                } else {
                  return (
                    <Col style={{ margin: 10, fontSize: 15 }} key={index}>
                      {mappingDict[curr[0]] + ": " + curr[1]}
                    </Col>
                  );
                }
              })
            )}
          </Row>
        </Card>
        <Card
          title={<Title level={4}>Line plot</Title>}
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
                      line: { shape: "spline" },
                      marker: { color: "#E64506" },
                    },
                  ]}
                  layout={{
                    width: 500,
                    height: 500,
                    title: "",
                    xaxis: {
                      title: "Min",
                    },
                    yaxis: {
                      title: "Survival rate",
                    },
                  }}
                />
              </Col>
            )}
          </Row>
        </Card>
      </div>
    );
  }
}

export default ResultOhca;

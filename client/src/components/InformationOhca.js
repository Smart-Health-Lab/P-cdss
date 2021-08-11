import React, { Component } from "react";
import { Table, Card, Button, Alert } from "antd";
import { Redirect } from "react-router-dom";
import data from "../data/ohcaData";

const columns = [
  { title: "환자명", dataIndex: "name", fixed: "left" },
  { title: "발생당시 활동", dataIndex: "act" },
  { title: "나이", dataIndex: "age", sorter: (a, b) => a.age - b.age },
  { title: "구조자의 CPR여부", dataIndex: "bystander_cpr" },
  { title: "발생원인", dataIndex: "cause_disease" },
  { title: "제세동 여부_ER", dataIndex: "er_defib" },
  { title: "심전도 여부_ER", dataIndex: "er_ekg" },
  { title: "최초 제세동 장소", dataIndex: "first_defib_place" },
  { title: "최초 심전도 장소", dataIndex: "first_ekg_place" },
  { title: "발생장소", dataIndex: "h_place_public" },
  { title: "성별", dataIndex: "h_sex" },
  { title: "ER 전 CPR여부", dataIndex: "pre_er_cpr" },
  { title: "ER 전 제새동여부", dataIndex: "pre_er_defib" },
  { title: "ER 전 심전도여부", dataIndex: "pre_er_ekg" },
  { title: "목격자", dataIndex: "witness" },
  { title: "당뇨력", dataIndex: "phx_dm" },
  { title: "심장질환력", dataIndex: "phx_heart" },
  { title: "고혈압력", dataIndex: "phx_htn" },
  { title: "신장질환력", dataIndex: "phx_renal" },
  { title: "호흡기질환력", dataIndex: "phx_respi" },
  { title: "뇌졸중력", dataIndex: "phx_stroke" },
  { title: "지질혈증력", dataIndex: "phx_dyslipi" },
  { title: "ER 도착 시간", dataIndex: "arrest_er_time" },
  { title: "CPR 수행여부", dataIndex: "cpr" },
];

class InformationOhca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionType: "checkbox",
      selectedRowKeys: [],
      selectedRows: [],
      isSubmitClicked: false,
      isResponseCorrect: false,
    };
  }

  checkState = () => {
    // 체크 하고 submit 눌렀는지 확인
    if (this.state.selectedRows.length === 1) {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    } else if (this.state.selectedRows.length > 1) {
      alert("한명만 선택해 주세요");
      return new Promise((resolve, reject) => {
        resolve(false);
      });
    } else {
      alert("환자를 선택해 주세요");
      return new Promise((resolve, reject) => {
        resolve(false);
      });
    }
  };

  fetchFunc = () => {
    return fetch("http://127.0.0.1:5000/test02", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...this.state.selectedRows[0],
      }),
    });
  };

  render() {
    console.log("InformationOhca is rendering...");
    console.log("InformationOhca state ====> ", this.state);

    const { selectedRowKeys } = this.state;

    if (this.state["isResponseCorrect"]) {
      return <Redirect to="/chartOhca" />;
    }

    return (
      <div className="">
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({
                selectedRowKeys: selectedRowKeys,
                selectedRows: selectedRows,
              });
            },
          }}
          scroll={{ x: 4000, y: 1000 }}
          columns={columns}
          dataSource={data.data}
        />
        <div style={{ display: "flex" }}>
          <Card title="" bordered={false} style={{ background: "none" }}>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                this.checkState().then((val) => {
                  if (val === true) {
                    this.fetchFunc()
                      .then((response) => response.json())
                      .then((res) => {
                        this.setState({ isSubmitClicked: false });
                        // console.log("response ====> ", res);

                        // 정상적인 output을 받은 경우
                        if (res.status === 200) {
                          this.setState({ isResponseCorrect: true });
                          this.props.changeMenu("4");
                          this.props.changeAppState(
                            this.state.selectedRows[0],
                            res.output_data
                          );
                        } else {
                          console.log("== submit 에러 ==", val);
                        }
                      });
                  }
                });
              }}
            >
              Submit
            </Button>
          </Card>
        </div>
      </div>
    );
  }
}

export default InformationOhca;

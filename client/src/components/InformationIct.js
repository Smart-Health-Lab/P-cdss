import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Card,
  Input,
  Select,
  Button,
  Typography,
  DatePicker,
  TimePicker,
} from "antd";
import { inputDataList } from "../inputData/inputDataList";

const { Option } = Select;
const { Title } = Typography;

class InformationIct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      sexx: null,
      age: null,
      cm_breath: null,
      cm_dp: null,
      cm_pc: null,
      cm_sp: null,
      cm_tmpt: null,
      cm_avpu: null,
      cm_gcs_e: null,
      cm_gcs_v: null,
      cm_gcs_m: null,
      sympu1: null,
      sympu2: null,
      sympu3: null,
      sympu4: null,
      sympu5: null,
      alco: null,
      intent: null,
      method: null,
      mech: null,
      place1: null,
      place2: null,
      place3: null,
      factor_u: null,
      sports: null,
      iact: null,
      on_date: null,
      in_date: null,
      on_time: null,
      in_time: null,
      isSubmitClicked: false,
      isResponseCorrect: false,
    };
  }

  componentDidMount() {}

  componentWrapper = (title, component) => {
    let titleKR = null;
    if (title === "on_date") {
      titleKR = "손상발생 날짜";
    } else if (title === "in_date") {
      titleKR = "입실 날짜";
    } else if (title === "on_time") {
      titleKR = "손상발생 시간";
    } else if (title === "in_time") {
      titleKR = "입실 시간";
    }

    return (
      <div style={{ marginRight: 10 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: 15,
              marginTop: 15,
              marginBottom: 0,
              marginLeft: 5,
            }}
          >
            {titleKR}
          </p>
          {this.state["isSubmitClicked"] ? (
            this.state[title] === null ? (
              <p
                style={{
                  fontSize: 15,
                  marginTop: 15,
                  marginBottom: 0,
                  color: "red",
                }}
              >
                {"필수"}
              </p>
            ) : null
          ) : null}
        </div>
        {component}
      </div>
    );
  };

  inputComponent = (title, keyIndex) => {
    let titleKR = null;
    if (title === "name") {
      titleKR = "이름";
    } else if (title === "age") {
      titleKR = "나이";
    } else if (title === "cm_breath") {
      titleKR = "분당 호흡수";
    } else if (title === "cm_dp") {
      titleKR = "이완기 혈압";
    } else if (title === "cm_pc") {
      titleKR = "분당 맥박수";
    } else if (title === "cm_sp") {
      titleKR = "수축기 혈압";
    } else if (title === "cm_tmpt") {
      titleKR = "체온";
    }

    return (
      <div style={{ marginRight: 10 }}>
        {title === "sexx" ? null : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: 15,
                marginTop: 15,
                marginBottom: 0,
                marginLeft: 5,
              }}
            >
              {titleKR}
            </p>
            {this.state["isSubmitClicked"] ? (
              this.state[title] === null || this.state[title] === "" ? (
                <p
                  style={{
                    fontSize: 15,
                    marginTop: 15,
                    marginBottom: 0,
                    color: "red",
                  }}
                >
                  {"필수"}
                </p>
              ) : null
            ) : null}
          </div>
        )}
        {title === "sexx" ? (
          this.selectInputComponent("sexx", "", 1)
        ) : (
          <Input
            key={keyIndex}
            style={{ width: 300 }}
            placeholder={""}
            onChange={(val) => {
              this.state[title] = val.target.value;
              // let timer;
              // if (timer) {
              //   clearTimeout(timer);
              // }
              // timer = setTimeout(() => {
              //   this.setState({ ...this.state, [title]: val.target.value });
              // }, 3000);
            }}
          />
        )}
      </div>
    );
  };

  selectInputComponent = (title, defaultValue, key) => {
    // {this.selectInputComponent("cm_avpu", "", 1)}
    // {this.selectInputComponent("cm_gcs_e", "", 1)}
    // {this.selectInputComponent("cm_gcs_v", "", 1)}
    // {this.selectInputComponent("cm_gcs_m", "", 1)}
    let titleKR = null;
    if (title === "cm_avpu") {
      titleKR = "AVPU";
    } else if (title === "cm_gcs_e") {
      titleKR = "GCS_Eye";
    } else if (title === "cm_gcs_v") {
      titleKR = "GCS_Verbal";
    } else if (title === "cm_gcs_m") {
      titleKR = "GCS_Motor";
    } else if (title === "alco") {
      titleKR = "음주여부";
    } else if (title === "intent") {
      titleKR = "손상의도";
    } else if (title === "method") {
      titleKR = "내원수단";
    } else if (title === "mech") {
      titleKR = "손상기전";
    } else if (title === "place1") {
      titleKR = "발생장소1";
    } else if (title === "place2") {
      titleKR = "실 내/외 여부";
    } else if (title === "place3") {
      titleKR = "발생장소2";
    } else if (title === "factor_u") {
      titleKR = "손상 유발물질";
    } else if (title === "sports") {
      titleKR = "스포츠 유형";
    } else if (title === "iact") {
      titleKR = "손상 시 활동";
    }

    return (
      <div style={{ marginRight: 10 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: 15,
              marginTop: 15,
              marginBottom: 0,
              marginLeft: 5,
            }}
          >
            {title === "sexx"
              ? "성별"
              : title === "sympu"
              ? "주증상" + Number(key + 1)
              : titleKR}
            {/* {title === "sympu" ? title + Number(key + 1) : title} */}
          </p>
          {this.state["isSubmitClicked"] ? (
            this.state[title] === null ? (
              title === "sympu" ? null : (
                <p
                  style={{
                    fontSize: 15,
                    marginTop: 15,
                    marginBottom: 0,
                    color: "red",
                  }}
                >
                  {"필수"}
                </p>
              )
            ) : null
          ) : null}
        </div>
        <Select
          showSearch
          key={key}
          defaultValue={defaultValue}
          style={{ width: 300 }}
          onSelect={(curVal) => {
            if (title === "sympu") {
              this.state[String(title + Number(key + 1))] = curVal;
              // this.setState({
              //   ...this.state,
              //   [String(title + Number(key + 1))]: curVal,
              // });
            } else {
              this.state[title] = curVal;
              // this.setState({ ...this.state, [title]: curVal });
            }
          }}
        >
          {inputDataList[title].map((curr, index, arr) => {
            return (
              <Option key={index} value={curr} style={{ width: "100%" }}>
                {curr}
              </Option>
            );
          })}
        </Select>
      </div>
    );
  };

  checkState = () => {
    let stateObj = JSON.parse(JSON.stringify(this.state));
    delete stateObj.sympu1;
    delete stateObj.sympu2;
    delete stateObj.sympu3;
    delete stateObj.sympu4;
    delete stateObj.sympu5;
    delete stateObj.isSubmitClicked;
    let stateValueArr = Object.values(stateObj);

    // 누락된 입력 값이 있는지 확인
    const result = !(
      stateValueArr.includes(null) || stateValueArr.includes("")
    );

    return new Promise((resolve, reject) => {
      resolve(result);
    });
  };

  fetchFunc = () => {
    return fetch("http://127.0.0.1:5000/test01", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...this.state,
      }),
    });
  };

  render() {
    console.log("Information.js 렌더링, state", this.state);
    console.log("Information.js 렌더링, props", this.props);
    // console.log(inputDataList);
    // console.log(Object.keys(inputDataList).length);

    if (this.state["isResponseCorrect"]) {
      return <Redirect to="/chartIct" />;
    }

    return (
      <div className="">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Card
              title={<Title level={4}>Patient Info</Title>}
              bordered={false}
              style={{ margin: 10, width: 700 }}
            >
              <Input.Group compact>
                {[
                  "name",
                  "sexx",
                  "age",
                  "cm_breath",
                  "cm_dp",
                  "cm_pc",
                  "cm_sp",
                  "cm_tmpt",
                ].map((curr, index) => {
                  return this.inputComponent(curr, index);
                })}
                {this.selectInputComponent("cm_avpu", "", 1)}
                {this.selectInputComponent("cm_gcs_e", "", 1)}
                {this.selectInputComponent("cm_gcs_v", "", 1)}
                {this.selectInputComponent("cm_gcs_m", "", 1)}
              </Input.Group>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Input.Group compact>
                  {[1, 2, 3, 4, 5].map((num, index) => {
                    return this.selectInputComponent("sympu", "", index);
                  })}
                </Input.Group>
              </div>
            </Card>
            <Card
              title={<Title level={4}>Environmental Info</Title>}
              bordered={false}
              style={{ margin: 10, width: 700 }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Input.Group compact>
                  {Object.keys(inputDataList).map((curr, index, arr) => {
                    return curr === "cm_avpu" ||
                      curr === "output" ||
                      curr === "in_month" ||
                      curr === "in_weekday" ||
                      curr === "in_hour" ||
                      curr === "sympu" ||
                      curr === "on_month" ||
                      curr === "on_weekday" ||
                      curr === "on_hour" ||
                      curr === "mech_higher" ||
                      curr === "place1_higher" ||
                      curr === "factor_u_higher" ||
                      curr === "factor_u_highest" ||
                      curr === "sports_higher" ||
                      curr === "cm_gcs_e" ||
                      curr === "cm_gcs_v" ||
                      curr === "cm_gcs_m" ||
                      curr === "sexx"
                      ? null
                      : this.selectInputComponent(curr, "", index);
                  })}
                </Input.Group>
              </div>
            </Card>
          </div>
          {/* <div>
            <Card
              title={<Title level={4}>Visit Info(삭제 예정)</Title>}
              bordered={false}
              style={{
                display: "flex",
                flexDirection: "column",
                margin: 10,
                width: 700,
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                {this.inputComponent("time_took", "")}
              </div>
              <Input.Group compact>
                {Object.keys(inputDataList).map((curr, index, arr) => {
                  return curr === "in_month" ||
                    curr === "in_weekday" ||
                    curr === "in_hour" ||
                    curr === "on_month" ||
                    curr === "on_weekday" ||
                    curr === "on_hour"
                    ? this.selectInputComponent(curr, "", index)
                    : null;
                })}
              </Input.Group>
            </Card>
          </div> */}
          {/* antd calendar component */}
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Card
              title={<Title level={4}>Date&time Info</Title>}
              bordered={false}
              style={{ margin: 10, width: 700 }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                {this.componentWrapper(
                  "on_date",
                  <DatePicker
                    format={"YYYY-MM-DD"}
                    onChange={(date, dateString) => {
                      this.state["on_date"] = dateString;
                    }}
                  />
                )}
                {this.componentWrapper(
                  "in_date",
                  <DatePicker
                    format={"YYYY-MM-DD"}
                    onChange={(date, dateString) => {
                      this.state["in_date"] = dateString;
                    }}
                  />
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {this.componentWrapper(
                  "on_time",
                  <TimePicker
                    format={"HH:mm"}
                    onChange={(time, timeString) => {
                      this.state["on_time"] = timeString;
                    }}
                  />
                )}
                {this.componentWrapper(
                  "in_time",
                  <TimePicker
                    format={"HH:mm"}
                    onChange={(time, timeString) => {
                      this.state["in_time"] = timeString;
                    }}
                  />
                )}
              </div>
            </Card>
          </div>
        </div>
        {/* SubmitButton */}
        <div style={{ display: "flex" }}>
          <Card title="" bordered={false} style={{ background: "none" }}>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                this.checkState().then((val) => {
                  // console.log("checkState result => ", val);
                  if (val === false) {
                    this.setState({ isSubmitClicked: true });
                  } else {
                    this.fetchFunc()
                      .then((response) => response.json())
                      .then((res) => {
                        // console.log(res.response);
                        this.setState({ isSubmitClicked: false });

                        // 아래는 정상적인 ouput 결과를 받은경우 실행
                        if (res.status === 200) {
                          this.setState({ isResponseCorrect: true });
                          this.props.changeMenu("2");
                          this.props.changeAppState(
                            this.state,
                            res.output_data
                          );
                          //여기 Redirect 작동 안함. 함수 내부에 쓰면 안되고 렌더링 바로 밑에 해야 하는 듯
                          // <Redirect path="*" to="/chartIct" />;
                          // Render() 바로 아래에 결과 Redirect 코드 짜놨음
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

export default InformationIct;

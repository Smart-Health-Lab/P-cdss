import React, { Component } from "react";
import { Table, Card, Button } from "antd";
import data from "../data/ohcaData";

const columns = [
  { title: "Name", dataIndex: "name", fixed: "left" },
  { title: "Act", dataIndex: "act" },
  { title: "Age", dataIndex: "age", sorter: (a, b) => a.age - b.age },
  { title: "Bystander_cpr", dataIndex: "bystander_cpr" },
  { title: "Cause_disease", dataIndex: "cause_disease" },
  { title: "Er_defib", dataIndex: "er_defib" },
  { title: "Er_ekg", dataIndex: "er_ekg" },
  { title: "First_defib_place", dataIndex: "first_defib_place" },
  { title: "First_ekg_place", dataIndex: "first_ekg_place" },
  { title: "H_place_public", dataIndex: "h_place_public" },
  { title: "H_sex", dataIndex: "h_sex" },
  { title: "Pre_er_cpr", dataIndex: "pre_er_cpr" },
  { title: "Pre_er_defib", dataIndex: "pre_er_defib" },
  { title: "Pre_er_ekg", dataIndex: "pre_er_ekg" },
  { title: "Witness", dataIndex: "witness" },
  { title: "Year", dataIndex: "year" },
  { title: "Phx_dm", dataIndex: "phx_dm" },
  { title: "Phx_heart", dataIndex: "phx_heart" },
  { title: "Phx_htn", dataIndex: "phx_htn" },
  { title: "Phx_renal", dataIndex: "phx_renal" },
  { title: "Phx_respi", dataIndex: "phx_respi" },
  { title: "Phx_stroke", dataIndex: "phx_stroke" },
  { title: "Phx_dyslipi", dataIndex: "phx_dyslipi" },
  { title: "Arrest_er_time", dataIndex: "arrest_er_time" },
];

class InformationOhca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionType: "checkbox",
      selectedRowKeys: [],
      selectedRows: [],
    };
  }

  render() {
    console.log("InformationOhca is rendering...");
    console.log("state ====> ", this.state);

    const { selectedRowKeys } = this.state;

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
            <Button type="primary" size="large">
              Submit
            </Button>
          </Card>
        </div>
      </div>
    );
  }
}

export default InformationOhca;

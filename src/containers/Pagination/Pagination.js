import React from 'react';
import ReduxSelect from 'components/Form/ReduxSelect';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {connect} from 'react-redux';
import {getForestryInfoByNodeNo} from 'redux/modules/forestry';

@connect(state => ({
  forestryByNodeInfo: state.forestry.forestryByNodeInfo || []
}), {
  getForestryInfoByNodeNo
})
export default class Pagination extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    forestryByNodeInfo: React.PropTypes.array,
    getForestryInfoByNodeNo: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      nodeNo: 4
    };
  }

  componentWillMount() {
    this.props.getForestryInfoByNodeNo(this.state.nodeNo);
  }

  changeNode = (value) => {
    this.setState({
      nodeNo: value
    });
    this.props.getForestryInfoByNodeNo(value);
  }

  render() {
    const forestryByNodeInfo = this.props.forestryByNodeInfo;
    const styles = require('./Pagination.scss');
    const options = [
      {value: 4, label: '4号节点'},
      {value: 5, label: '5号节点'},
      {value: 6, label: '6号节点'}
    ];
    const tableOption = {
      noDataText: '无数据'
    };
    const tableData = forestryByNodeInfo;
    // const tableData = [{
    //   _id: 1,
    //   nodeNo: 4,
    //   airTemperature: 12,
    //   airHumidity: 123,
    //   light: 123,
    //   soilMoisture1: 111,
    //   soilMoisture2: 333,
    //   soilTemperature1: 123,
    //   soilTemperature2: 321,
    //   dateTime: '2016-06-29'
    // }, {
    //   _id: 2,
    //   nodeNo: 4,
    //   airTemperature: 12,
    //   airHumidity: 123,
    //   light: 123,
    //   soilMoisture1: 111,
    //   soilMoisture2: 333,
    //   soilTemperature1: 123,
    //   soilTemperature2: 321,
    //   dateTime: '2016-06-29'
    // }];
    return (
      <div className="container" style={{alignItems: 'center'}}>
        <div className={styles.container}>
          <div className={styles.title}>
            数据表格
          </div>
          <div className={styles.selectionContainer}>
            <div className={styles.node}>
              <span className={styles.nodeNo}>节点号：</span>
              <ReduxSelect
                name="nodeName"
                options={options}
                defaultValue={4}
                getInfo={this.changeNode}
                />
            </div>
          </div>
          <div style={{width: 1132, height: 660, overflow: 'scroll', margin: '0 auto'}}>
            <div style={{width: 1300, height: 660, overflow: 'hidden'}}>
              <BootstrapTable pagination options={tableOption} bodyStyle={{height: 452, overflow: 'auto'}} data={tableData} headerStyle={{background: '#e6e7e8'}}>
                <TableHeaderColumn dataField="_id" isKey width="0%" hidden>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="nodeNo" width="6%">节点号</TableHeaderColumn>
                <TableHeaderColumn dataField="airTemperature" width="11%">大气温度</TableHeaderColumn>
                <TableHeaderColumn dataField="airHumidity" width="11%">大气湿度</TableHeaderColumn>
                <TableHeaderColumn dataField="light" width="11%">光照</TableHeaderColumn>
                <TableHeaderColumn dataField="soilMoisture1" width="12%">土壤湿度1</TableHeaderColumn>
                <TableHeaderColumn dataField="soilMoisture2" width="12%">土壤湿度2</TableHeaderColumn>
                <TableHeaderColumn dataField="soilTemperature1" width="12%">土壤温度1</TableHeaderColumn>
                <TableHeaderColumn dataField="soilTemperature2" width="12%">土壤温度2</TableHeaderColumn>
                <TableHeaderColumn dataField="dateTime" width="13%">时间</TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


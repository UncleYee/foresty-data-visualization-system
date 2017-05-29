import React from 'react';
import ReduxSelect from 'components/Form/ReduxSelect';
import ReactEcharts from 'echarts-for-react';

export default class Gauge extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      param: 'airTemperature',
      nodeNo: 4
    };
  }

  componentWillMount() {
  }

  getOption = () => {
    const dictionary = {
      airTemperature: '大气温度',
      airHumidity: '大气湿度',
      light: '光照',
      soilMoisture1: '土壤湿度1',
      soilMoisture2: '土壤湿度2',
      soilTemperature1: '土壤温度1',
      soilTemperature2: '土壤温度2',
    };
    return {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}'
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          detail: {formatter: '{value}'},
          data: [{value: 25, name: this.state.nodeNo + '号节点:' + dictionary[this.state.param]}]
        }
      ]
    };
  }

  changeNode = (value) => {
    this.setState({
      nodeNo: value
    });
  }

  changeParam = (value) => {
    this.setState({
      param: value
    });
  }

  render() {
    const styles = require('./Graph.scss');
    const options = [
      {value: 4, label: '4号节点'},
      {value: 5, label: '5号节点'},
      {value: 6, label: '6号节点'}
    ];
    const paramOptions = [
      {value: 'airTemperature', label: '大气温度'},
      {value: 'airHumidity', label: '大气湿度'},
      {value: 'light', label: '光照'},
      {value: 'soilMoisture1', label: '土壤湿度1'},
      {value: 'soilMoisture2', label: '土壤湿度2'},
      {value: 'soilTemperature1', label: '土壤温度1'},
      {value: 'soilTemperature2', label: '土壤温度2'},
    ];
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          参数实时监控
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
          <div className={styles.node}>
            <span className={styles.nodeNo}>节点号：</span>
            <ReduxSelect
              name="nodeName"
              options={paramOptions}
              defaultValue="airTemperature"
              getInfo={this.changeParam}
              />
          </div>
        </div>
        <ReactEcharts
          option={this.getOption()}
          style={{width: 800, height: 500}}
        />
      </div>
    );
  }
}


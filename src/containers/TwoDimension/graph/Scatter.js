import React from 'react';
import ReactEcharts from 'echarts-for-react';
import DateRangePicker from 'components/DatePicker/DateRangePicker';
import ReduxSelect from 'components/Form/ReduxSelect';
import moment from 'moment';
import {connect} from 'react-redux';
import {getForestryInfo} from 'redux/modules/forestry';

@connect(state => ({
  forestryInfo: state.forestry.forestryInfo || {}
}), {
  getForestryInfo
})
export default class Scatter extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    getForestryInfo: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      airTemperature: [],
      airHumidity: [],
      light: [],
      soilMoisture1: [],
      soilMoisture2: [],
      soilTemperature1: [],
      soilTemperature2: [],
      nodeNo: 4,
      defaultStartDate: moment(new Date('2015-06-28 00:00:00')),
      defaultEndDate: moment(new Date('2015-06-29 00:00:00')),
      startDate: '2015-06-28',
      endDate: '2015-06-29',
      xAxis: 'airTemperature',
      yAxis: 'airHumidity'
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.postMsg('2015-06-28', '2015-06-29', 4);
  }

  getOption = () => {
    const xAxis = this.state.xAxis;
    const yAxis = this.state.yAxis;
    const xData = this.state[xAxis];
    const yData = this.state[yAxis];
    const dictionary = {
      airTemperature: '大气温度',
      airHumidity: '大气湿度',
      light: '光照',
      soilMoisture1: '土壤湿度1',
      soilMoisture2: '土壤湿度2',
      soilTemperature1: '土壤温度1',
      soilTemperature2: '土壤温度2',
    };
    const len = xData.length;
    const data = [];
    for (let idx = 0; idx < len; idx++) {
      const temp = [xData[idx], yData[idx]];
      data.push(temp);
    }
    return {
      grid: {
        left: '3%',
        right: '7%',
        bottom: '3%',
        containLabel: true
      },
      tooltip: {
        // trigger: 'axis',
        showDelay: 0,
        formatter: function tips(params) {
          return dictionary[xAxis] + ': ' + params.value[0] + ' ' +
            dictionary[yAxis] + ': ' + params.value[1];
        },
        axisPointer: {
          show: true,
          type: 'cross',
          lineStyle: {
            type: 'dashed',
            width: 1
          }
        }
      },
      toolbox: {
        feature: {
          dataZoom: {},
          brush: {
            type: ['rect', 'polygon', 'clear']
          }
        }
      },
      brush: {
      },
      legend: {
        data: ['节点'],
        left: 'center'
      },
      xAxis: [
        {
          type: 'value',
          scale: true,
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '节点',
          type: 'scatter',
          data: data,
          markArea: {
            silent: true,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderWidth: 1,
                borderType: 'dashed'
              }
            },
            data: [[{
              name: '分布区间',
              xAxis: 'min',
              yAxis: 'min'
            }, {
              xAxis: 'max',
              yAxis: 'max'
            }]]
          },
        }
      ]
    };
  }

  postMsg = (startDate, endDate, nodeNo) => {
    this.props.getForestryInfo(startDate, endDate, nodeNo).then(data => {
      const datas = data.data;
      const airTemperature = [];
      const airHumidity = [];
      const light = [];
      const soilMoisture1 = [];
      const soilMoisture2 = [];
      const soilTemperature1 = [];
      const soilTemperature2 = [];
      datas.map( item => {
        airTemperature.push(item.airTemperature);
        airHumidity.push(item.airHumidity);
        light.push(item.light);
        soilMoisture1.push(item.soilMoisture1);
        soilMoisture2.push(item.soilMoisture2);
        soilTemperature1.push(item.soilTemperature1);
        soilTemperature2.push(item.soilTemperature2);
      });
      this.setState({
        airTemperature: airTemperature,
        airHumidity: airHumidity,
        light: light,
        soilMoisture1: soilMoisture1,
        soilMoisture2: soilMoisture2,
        soilTemperature1: soilTemperature1,
        soilTemperature2: soilTemperature2
      });
    });
  }

  // 为了重绘
  updateData = (startDate, endDate, nodeNo) => {
    this.props.getForestryInfo(startDate, endDate, nodeNo);
  }

  // 改变节点
  changeNode = (value) => {
    this.setState({
      nodeNo: value
    });
    this.postMsg(this.state.startDate, this.state.endDate, value);
  }

  // 修改 X 轴
  changeX = (value) => {
    this.setState({
      xAxis: value
    });
    this.updateData(this.state.startDate, this.state.endDate, this.state.nodeNo);
  }
  // 改变 Y 轴
  changeY = (value) => {
    this.setState({
      yAxis: value
    });
    this.updateData(this.state.startDate, this.state.endDate, this.state.nodeNo);
  }

  // 初始时间段
  defaultTimeRange = () => {
    return moment.range(this.state.defaultStartDate, this.state.defaultEndDate);
  }

  // 时间选择
  timeSelect = (range) => {
    const startDate = moment(range.start).format('YYYY-MM-DD');
    const endDate = moment(range.end).format('YYYY-MM-DD');
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
    this.postMsg(startDate, endDate, this.state.nodeNo);
  }

  render() {
    const styles = require('./Graph.scss');
    const options = [
      {value: 4, label: '4号节点'},
      {value: 5, label: '5号节点'},
      {value: 6, label: '6号节点'}
    ];
    const xOptions = [
      {value: 'airTemperature', label: '大气温度'},
      {value: 'airHumidity', label: '大气湿度'},
      {value: 'light', label: '光照'},
      {value: 'soilMoisture1', label: '土壤湿度1'},
      {value: 'soilMoisture2', label: '土壤湿度2'},
      {value: 'soilTemperature1', label: '土壤温度1'},
      {value: 'soilTemperature2', label: '土壤温度2'},
    ];
    const yOptions = [
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
          任意两种参数散点分布图
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
          &nbsp;&nbsp;
          <div className={styles.dateRange}>
            <span className={styles.time}>时间段：</span>
            <DateRangePicker
              onSelect={this.timeSelect}
              defaultValue={this.defaultTimeRange()}
              />
          </div>
        </div>
        <div className={styles.selectionContainer}>
          <div className={styles.node}>
            <span className={styles.nodeNo}>横坐标：</span>
            <ReduxSelect
              name="nodeX"
              options={xOptions}
              defaultValue="airTemperature"
              getInfo={this.changeX}
              />
          </div>
          &nbsp;&nbsp;
          <div className={styles.node}>
            <span className={styles.nodeNo}>纵坐标：</span>
            <ReduxSelect
              name="nodeY"
              options={yOptions}
              defaultValue="airHumidity"
              getInfo={this.changeY}
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

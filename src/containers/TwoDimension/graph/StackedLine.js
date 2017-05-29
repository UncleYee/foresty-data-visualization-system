import React from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import {connect} from 'react-redux';
import {getForestryInfo} from 'redux/modules/forestry';
import DateRangePicker from 'components/DatePicker/DateRangePicker';
import ReduxSelect from 'components/Form/ReduxSelect';

@connect(state => ({
  forestryInfo: state.forestry.forestryInfo || {}
}), {
  getForestryInfo
})
export default class StackedLine extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    getForestryInfo: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
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
      endDate: '2015-06-29'
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.postMsg('2015-06-28', '2015-06-29', 4);
  }

  componentWillReceiveProps() {
  }


  getOption = () => {
    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['大气温度', '大气湿度', '光照', '土壤湿度1', '土壤湿度2', '土壤温度1', '土壤温度2']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.state.categories
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '大气温度',
          type: 'line',
          data: this.state.airTemperature
        },
        {
          name: '大气湿度',
          type: 'line',
          data: this.state.airHumidity
        },
        {
          name: '光照',
          type: 'line',
          data: this.state.light
        },
        {
          name: '土壤湿度1',
          type: 'line',
          data: this.state.soilMoisture1
        },
        {
          name: '土壤湿度2',
          type: 'line',
          data: this.state.soilMoisture2
        },
        {
          name: '土壤温度1',
          type: 'line',
          data: this.state.soilTemperature1
        },
        {
          name: '土壤温度2',
          type: 'line',
          data: this.state.soilTemperature1
        }
      ]
    };
  }

  // 向服务器请求数据
  postMsg = (startDate, endDate, nodeNo) => {
    this.props.getForestryInfo(startDate, endDate, nodeNo).then(data => {
      const datas = data.data;
      const categories = [];
      const airTemperature = [];
      const airHumidity = [];
      const light = [];
      const soilMoisture1 = [];
      const soilMoisture2 = [];
      const soilTemperature1 = [];
      const soilTemperature2 = [];
      datas.reverse();
      datas.map( item => {
        categories.push(moment(new Date(item.dateTime)).format('MM-DD HH:mm'));
        airTemperature.push(item.airTemperature);
        airHumidity.push(item.airHumidity);
        light.push(item.light);
        soilMoisture1.push(item.soilMoisture1);
        soilMoisture2.push(item.soilMoisture2);
        soilTemperature1.push(item.soilTemperature1);
        soilTemperature2.push(item.soilTemperature2);
      });
      this.setState({
        categories: categories,
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

  // 选择新的时间段后的操作
  timeSelect = (range) => {
    const startDate = moment(range.start).format('YYYY-MM-DD');
    const endDate = moment(range.end).format('YYYY-MM-DD');
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
    this.postMsg(startDate, endDate, this.state.nodeNo);
  }

  // 选择新的节点后操作
  changeNode = (value) => {
    this.setState({
      nodeNo: value
    });
    this.postMsg(this.state.startDate, this.state.endDate, value);
  }

  // 初始数据时间段
  defaultTimeRange = () => {
    return moment.range(this.state.defaultStartDate, this.state.defaultEndDate);
  }

  render() {
    const styles = require('./Graph.scss');
    const options = [
      {value: 4, label: '4号节点'},
      {value: 5, label: '5号节点'},
      {value: 6, label: '6号节点'}
    ];
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          林业参数折线图堆叠
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
        <ReactEcharts
          option={this.getOption()}
          style={{width: 800, height: 500}}
        />
      </div>
    );
  }
}


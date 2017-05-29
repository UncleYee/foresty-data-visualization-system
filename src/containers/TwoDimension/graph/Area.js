import React from 'react';
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts-more';
import ReduxSelect from 'components/Form/ReduxSelect';
import DateRangePicker from 'components/DatePicker/DateRangePicker';
import moment from 'moment';
import {connect} from 'react-redux';
import {getForestryInfo} from 'redux/modules/forestry';


@connect(state => ({
  forestryByDateInfo: state.forestry.forestryByDateInfo || {}
}), {
  getForestryInfo
})
export default class Area extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    getForestryInfo: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      param: 'airTemperature',
      nodeNo: 4,
      defaultStartDate: moment(new Date('2015-06-24 00:00:00')),
      defaultEndDate: moment(new Date('2015-06-29 00:00:00')),
      startDate: '2015-06-24',
      endDate: '2015-06-29'
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.postMsg(this.state.startDate, this.state.endDate, this.state.nodeNo);
  }

  getOption = (data) => {
    const flag = this.state.param === 'airTemperature' ? true : false;
    return {
      credits: {
        enabled: false
      },
      chart: {
        type: 'arearange',
        zoomType: 'x'
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: null
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: flag ? '°C' : ''
      },
      legend: {
        enabled: false
      },
      series: [{
        name: '数值',
        data: data
      }]
    };
  }

  // 向后台请求数据
  postMsg = (startDate, endDate, nodeNo) => {
    const param = this.state.param;
    highchartsMore(Highcharts);
    this.props.getForestryInfo(startDate, endDate, nodeNo).then(data => {
      const datas = data.data;
      datas.reverse();
      const len = (moment(endDate) - moment(startDate)) / 86400000 + 1;
      const days = [];
      for (let idx = 0; idx < len; idx++) {
        if (idx === 0) {
          days.push(startDate);
        } else {
          const temp = moment(startDate).add(idx, 'days').format('YYYY-MM-DD');
          days.push(temp);
        }
      }
      const all = [];
      for (let idx = 0; idx < days.length; idx++) {
        all.push([]);
      }
      datas.map(item => {
        for (let idx = 0; idx < days.length; idx++) {
          if (item.dateTime.indexOf(days[idx]) === 0) {
            all[idx].push(item[param]);
          }
        }
      });
      const result = [];
      for (let idx = 0; idx < days.length; idx++) {
        all[idx].sort();
        const first = all[idx][0] === undefined ? null : all[idx][0];
        const end = all[idx][all[idx].length - 1] === undefined ? null : all[idx][all[idx].length - 1];
        const temp = [new Date(days[idx] + ' 08:00:00').getTime(), first, end];
        result.push(temp);
      }
      Highcharts.chart('areaGraph', this.getOption(result));
    });
  }

  // 节点选择
  changeNode = (value) => {
    this.setState({
      nodeNo: value
    });
    this.postMsg(this.state.startDate, this.state.endDate, value);
  }

  // 换参数
  changeParam = (value) => {
    this.setState({
      param: value
    }, () =>
    this.postMsg(this.state.startDate, this.state.endDate, this.state.nodeNo));
  }

  // 初始时间段
  defaultTimeRange = () => {
    return moment.range(this.state.defaultStartDate, this.state.defaultEndDate);
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

  render() {
    const styles = require('./Graph.scss');
    const options = [
      {value: 4, label: '4号节点'},
      {value: 5, label: '5号节点'},
      {value: 6, label: '6号节点'}
    ];
    const optionsParam = [
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
          时间段内选定参数变化面积图
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
            <span className={styles.nodeNo}>选参数：</span>
            <ReduxSelect
              name="nodeParam"
              options={optionsParam}
              defaultValue="airTemperature"
              getInfo={this.changeParam}
              />
          </div>
        </div>
        <div style={{width: 800, height: 500}} id="areaGraph"/>
      </div>
    );
  }
}


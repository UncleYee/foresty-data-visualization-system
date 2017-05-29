import React from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import {connect} from 'react-redux';
import {getForestryInfoByDate} from 'redux/modules/forestry';
import DateRangePicker from 'components/DatePicker/DateRangePicker';
import ReduxSelect from 'components/Form/ReduxSelect';

@connect(state => ({
  forestryByDateInfo: state.forestry.forestryByDateInfo || {}
}), {
  getForestryInfoByDate
})
export default class NodeLine extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    getForestryInfoByDate: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      airTemperatureFour: [],
      airHumidityFour: [],
      lightFour: [],
      soilMoisture1Four: [],
      soilMoisture2Four: [],
      soilTemperature1Four: [],
      soilTemperature2Four: [],
      airTemperatureFive: [],
      airHumidityFive: [],
      lightFive: [],
      soilMoisture1Five: [],
      soilMoisture2Five: [],
      soilTemperature1Five: [],
      soilTemperature2Five: [],
      airTemperatureSix: [],
      airHumiditySix: [],
      lightSix: [],
      soilMoisture1Six: [],
      soilMoisture2Six: [],
      soilTemperature1Six: [],
      soilTemperature2Six: [],
      param: 'airTemperature',
      defaultStartDate: moment(new Date('2015-06-28 00:00:00')),
      defaultEndDate: moment(new Date('2015-06-29 00:00:00')),
      startDate: '2015-06-28',
      endDate: '2015-06-29'
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.postMsg('2015-06-28', '2015-06-29');
  }

  componentWillReceiveProps() {
  }


  getOption = () => {
    const param = this.state.param;
    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['4号节点', '5号节点', '6号节点']
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: {readOnly: false},
          magicType: {type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.state.categories
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [
        {
          name: '4号节点',
          type: 'line',
          data: this.state[param + 'Four'],
        },
        {
          name: '5号节点',
          type: 'line',
          data: this.state[param + 'Five'],
        },
        {
          name: '6号节点',
          type: 'line',
          data: this.state[param + 'Six'],
        }
      ]
    };
  }

  // 向服务器请求数据
  postMsg = (startDate, endDate) => {
    this.props.getForestryInfoByDate(startDate, endDate).then(data => {
      const datas = data.data;
      const categories = [];
      const airTemperatureFour = [];
      const airHumidityFour = [];
      const lightFour = [];
      const soilMoisture1Four = [];
      const soilMoisture2Four = [];
      const soilTemperature1Four = [];
      const soilTemperature2Four = [];
      const airTemperatureFive = [];
      const airHumidityFive = [];
      const lightFive = [];
      const soilMoisture1Five = [];
      const soilMoisture2Five = [];
      const soilTemperature1Five = [];
      const soilTemperature2Five = [];
      const airTemperatureSix = [];
      const airHumiditySix = [];
      const lightSix = [];
      const soilMoisture1Six = [];
      const soilMoisture2Six = [];
      const soilTemperature1Six = [];
      const soilTemperature2Six = [];
      datas.reverse();
      datas.map( item => {
        if (item.nodeNo === 4) {
          categories.push(moment(new Date(item.dateTime)).format('MM-DD HH:mm'));
          airTemperatureFour.push(item.airTemperature);
          airHumidityFour.push(item.airHumidity);
          lightFour.push(item.light);
          soilMoisture1Four.push(item.soilMoisture1);
          soilMoisture2Four.push(item.soilMoisture2);
          soilTemperature1Four.push(item.soilTemperature1);
          soilTemperature2Four.push(item.soilTemperature2);
        }
        if (item.nodeNo === 5) {
          airTemperatureFive.push(item.airTemperature);
          airHumidityFive.push(item.airHumidity);
          lightFive.push(item.light);
          soilMoisture1Five.push(item.soilMoisture1);
          soilMoisture2Five.push(item.soilMoisture2);
          soilTemperature1Five.push(item.soilTemperature1);
          soilTemperature2Five.push(item.soilTemperature2);
        }
        if (item.nodeNo === 6) {
          airTemperatureSix.push(item.airTemperature);
          airHumiditySix.push(item.airHumidity);
          lightSix.push(item.light);
          soilMoisture1Six.push(item.soilMoisture1);
          soilMoisture2Six.push(item.soilMoisture2);
          soilTemperature1Six.push(item.soilTemperature1);
          soilTemperature2Six.push(item.soilTemperature2);
        }
      });
      this.setState({
        categories: categories,
        airTemperatureFour: airTemperatureFour,
        airHumidityFour: airHumidityFour,
        lightFour: lightFour,
        soilMoisture1Four: soilMoisture1Four,
        soilMoisture2Four: soilMoisture2Four,
        soilTemperature1Four: soilTemperature1Four,
        soilTemperature2Four: soilTemperature2Four,
        airTemperatureFive: airTemperatureFive,
        airHumidityFive: airHumidityFive,
        lightFive: lightFive,
        soilMoisture1Five: soilMoisture1Five,
        soilMoisture2Five: soilMoisture2Five,
        soilTemperature1Five: soilTemperature1Five,
        soilTemperature2Five: soilTemperature2Five,
        airTemperatureSix: airTemperatureSix,
        airHumiditySix: airHumiditySix,
        lightSix: lightSix,
        soilMoisture1Six: soilMoisture1Six,
        soilMoisture2Six: soilMoisture2Six,
        soilTemperature1Six: soilTemperature1Six,
        soilTemperature2Six: soilTemperature2Six
      });
    });
  }

  // 图标重绘
  updateMsg = (startDate, endDate) => {
    this.props.getForestryInfoByDate(startDate, endDate);
  }

  // 选择新的时间段后的操作
  timeSelect = (range) => {
    const startDate = moment(range.start).format('YYYY-MM-DD');
    const endDate = moment(range.end).format('YYYY-MM-DD');
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
    this.postMsg(startDate, endDate);
  }

  // 选择新的参数后操作
  changeNode = (value) => {
    this.setState({
      param: value
    });
    this.updateMsg(this.state.startDate, this.state.endDate);
  }

  // 初始数据时间段
  defaultTimeRange = () => {
    return moment.range(this.state.defaultStartDate, this.state.defaultEndDate);
  }

  render() {
    const styles = require('./Graph.scss');
    const options = [
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
          不同节点相同参数对比折线图
        </div>
        <div className={styles.selectionContainer}>
          <div className={styles.node}>
            <span className={styles.nodeNo}>选参数：</span>
            <ReduxSelect
              name="nodeParam"
              options={options}
              defaultValue="airTemperature"
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


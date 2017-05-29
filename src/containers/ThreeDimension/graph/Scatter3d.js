import React from 'react';
import Highcharts from 'highcharts';
import highchart3D from 'highcharts-3d';
import jquery from 'jquery';
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
export default class Scatter3d extends React.Component {
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
      yAxis: 'airHumidity',
      zAxis: 'light'
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.postMsg();
  }

  getOption = () => {
    const xAxis = this.state.xAxis;
    const yAxis = this.state.yAxis;
    const zAxis = this.state.zAxis;
    const xData = this.state[xAxis];
    const yData = this.state[yAxis];
    const zData = this.state[zAxis];
    const len = xData.length;
    const data = [];
    for (let idx = 0; idx < len; idx++) {
      const temp = [xData[idx], yData[idx], zData[idx]];
      data.push(temp);
    }
    return {
      credits: {
        enabled: false
      },
      chart: {
        renderTo: 'container',
        margin: 100,
        type: 'scatter',
        options3d: {
          enabled: true,
          alpha: 10,
          beta: 30,
          depth: 250,
          viewDistance: 5,
          frame: {
            bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
            back: { size: 1, color: 'rgba(0,0,0,0.04)' },
            side: { size: 1, color: 'rgba(0,0,0,0.06)' }
          }
        }
      },
      title: {
        text: ''
      },
      plotOptions: {
        scatter: {
          width: 10,
          height: 10,
          depth: 10
        }
      },
      yAxis: {
        title: null
      },
      xAxis: {
        gridLineWidth: 1
      },
      zAxis: {
      },
      legend: {
        enabled: false
      },
      series: [{
        name: '随机数据',
        colorByPoint: true,
        data: data
      }]
    };
  }

  postMsg = () => {
    const {startDate, endDate, nodeNo} = this.state;
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
    }).then(() => this.drawChart());
  }

  updateMsg = () => {
    highchart3D(Highcharts);
    this.props.getForestryInfo().then(() => {
      Highcharts.chart('3d', this.getOption());
    });
  }

  drawChart = () => {
    highchart3D(Highcharts);
    // Highcharts.getOptions().colors = jquery.map(Highcharts.getOptions().colors, function change(color) {
    //   return {
    //     radialGradient: {
    //       cx: 0.4,
    //       cy: 0.3,
    //       r: 0.5
    //     },
    //     stops: [
    //       [0, color],
    //       [1, Highcharts.Color(color).brighten(-0.2).get('rgb')] // eslint-disable-line
    //     ]
    //   };
    // });
    const chart = Highcharts.chart('3d', this.getOption());
    jquery(chart.container).bind('mousedown.hc touchstart.hc', function todo(exc) {
      const ecc = chart.pointer.normalize(exc);
      const posX = ecc.pageX;
      const posY = ecc.pageY;
      const alpha = chart.options.chart.options3d.alpha;
      const beta = chart.options.chart.options3d.beta;
      let newAlpha;
      let newBeta;
      const sensitivity = 5; // lower is more sensitive
      jquery(document).bind({
        'mousemove.hc touchdrag.hc': function doit(esc) {
            // Run beta
          newBeta = beta + (posX - esc.pageX) / sensitivity;
          newBeta = Math.min(100, Math.max(-100, newBeta));
          chart.options.chart.options3d.beta = newBeta;
          // Run alpha
          newAlpha = alpha + (esc.pageY - posY) / sensitivity;
          newAlpha = Math.min(100, Math.max(-100, newAlpha));
          chart.options.chart.options3d.alpha = newAlpha;
          chart.redraw(false);
        },
        'mouseup touchend': function tt() {
          jquery(document).unbind('.hc');
        }
      });
    });
  }

  // 改变节点
  changeNode = (value) => {
    console.log(value);
    // this.setState({
    //   nodeNo: value
    // }, () => this.updateMsg());
  }

  // 修改 X 轴
  changeX = (value) => {
    console.log(value);
    // this.setState({
    //   xAxis: value
    // }, () => this.updateMsg());
  }

  // 改变 Y 轴
  changeY = (value) => {
    console.log(value);
    // this.setState({
    //   yAxis: value
    // }, () => this.updateMsg());
  }

  // 改变 Z 轴
  changeZ = (value) => {
    console.log(value);
    // this.setState({
    //   zAxis: value
    // }, () => this.postMsg());
  }

  // 初始时间段
  defaultTimeRange = () => {
    return moment.range(this.state.defaultStartDate, this.state.defaultEndDate);
  }

  // 时间选择
  timeSelect = (range) => {
    console.log(range);
  //   const startDate = moment(range.start).format('YYYY-MM-DD');
  //   const endDate = moment(range.end).format('YYYY-MM-DD');
  //   this.setState({
  //     startDate: startDate,
  //     endDate: endDate
  //   }, () => this.postMsg());
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
      {value: 'soilTemperature2', label: '土壤温度2'}
    ];
    const yOptions = [
      {value: 'airTemperature', label: '大气温度'},
      {value: 'airHumidity', label: '大气湿度'},
      {value: 'light', label: '光照'},
      {value: 'soilMoisture1', label: '土壤湿度1'},
      {value: 'soilMoisture2', label: '土壤湿度2'},
      {value: 'soilTemperature1', label: '土壤温度1'},
      {value: 'soilTemperature2', label: '土壤温度2'}
    ];
    const zOptions = [
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
            任意三种参数散点分布图
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
        <div className={styles.selectionContainer3}>
          <div className={styles.node}>
            <span className={styles.nodeNo}>X轴：</span>
            <ReduxSelect
              name="nodeX"
              options={xOptions}
              defaultValue="airTemperature"
              getInfo={this.changeX}
              />
          </div>
          &nbsp;&nbsp;
          <div className={styles.node}>
            <span className={styles.nodeNo}>Y轴：</span>
            <ReduxSelect
              name="nodeY"
              options={yOptions}
              defaultValue="airHumidity"
              getInfo={this.changeY}
              />
          </div>
          &nbsp;&nbsp;
          <div className={styles.node}>
            <span className={styles.nodeNo}>Z轴：</span>
            <ReduxSelect
              name="nodeZ"
              options={zOptions}
              defaultValue="light"
              getInfo={this.changeX}
              />
          </div>
        </div>
        <div style={{width: 800, height: 500}} id="3d"/>
      </div>
    );
  }
}

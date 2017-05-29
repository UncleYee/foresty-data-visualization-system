import React from 'react';
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts-more';

export default class Test extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
    highchartsMore(Highcharts);
    const options = {
      chart: {
        type: 'columnrange',
        // inverted: true
      },

      title: {
        text: 'Temperature variation by month'
      },

      subtitle: {
        text: 'Observed in Vik i Sogn, Norway'
      },

      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },

      yAxis: {
        title: {
          text: 'Temperature ( °C )'
        }
      },

      tooltip: {
        valueSuffix: '°C'
      },

      legend: {
        enabled: false
      },

      series: [{
        name: 'Temperatures',
        data: [
            [-9.7, 9.4],
            [-8.7, 6.5],
            [-3.5, 9.4],
            [-1.4, 19.9],
            [0.0, 22.6],
            [2.9, 29.5],
            [9.2, 30.7],
            [7.3, 26.5],
            [4.4, 18.0],
            [-3.1, 11.4],
            [-5.2, 10.4],
            [-13.5, 9.8]
        ]
      }]
    };
    Highcharts.chart('test', options);
  }

  render() {
    const styles = require('./Graph.scss');
    return (
      <div className={styles.container}>
        <div style={{width: 800, height: 500}} id="test"/>
      </div>
    );
  }
}

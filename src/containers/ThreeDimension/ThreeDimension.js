import React from 'react';
import Scatter3d from './graph/Scatter3d';
import Gauge from './graph/Gauge';

export default class ThreeDimension extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="container" style={{alignItems: 'center'}}>
        <h3>由于学校的传感器参数接收服务器故障，本部分高级图表以静态图表的形式展示，但是后台逻辑已经完成。</h3>
        <Scatter3d />
        <Gauge />
      </div>
    );
  }
}

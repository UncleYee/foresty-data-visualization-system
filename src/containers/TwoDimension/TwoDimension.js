import React from 'react';
import StackedLine from './graph/StackedLine';
import Scatter from './graph/Scatter';
import NodeLine from './graph/NodeLine';
import Area from './graph/Area';

export default class TwoDimension extends React.Component {
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
        <StackedLine />
        <Scatter />
        <NodeLine />
        <Area />
      </div>
    );
  }
}

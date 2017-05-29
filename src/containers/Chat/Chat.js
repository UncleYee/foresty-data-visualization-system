import React from 'react';

export default class Chat extends React.Component {
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
      <div className="container">
        后台管理
      </div>
    );
  }
}

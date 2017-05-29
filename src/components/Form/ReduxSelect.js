import React from 'react';
import Select from 'react-select';

export default class ReduxSelect extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    options: React.PropTypes.array,
    defaultValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    getInfo: React.PropTypes.func,
    placeholder: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this.props.defaultValue,
    };
  }

  componentWillMount() {
  }

  componentWillReceiveProps(Props) {
    if (this.props.defaultValue !== Props.defaultValue) {
      this.setState({
        selectedValue: Props.defaultValue
      });
    }
  }

  changeValue = (val) => {
    this.setState({selectedValue: val.value});
  }

  sendRequest = (val) => {
    this.setState({selectedValue: val.value});
    this.props.getInfo(val.value);
  }

  render() {
    const {name, options} = this.props || {};
    return (
      <div style={{width: 200, float: 'left'}}>
        <Select
          placeholder={this.props.placeholder ? this.props.placeholder : '-请选择-'}
          name={name}
          clearable={false}
          value={this.state.selectedValue || ''}
          options={options}
          onChange={this.props.getInfo ? this.sendRequest : this.changeValue}
        />
      </div>
    );
  }
}

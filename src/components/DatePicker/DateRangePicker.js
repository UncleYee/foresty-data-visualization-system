import React from 'react';
import ReactDOM from 'react-dom';
import RangePicker from 'react-daterange-picker';
import Popover from 'react-bootstrap/lib/Popover';
import Overlay from 'react-bootstrap/lib/Overlay';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
// import moment from 'moment';

/**
 * 日历范围控件
 */
export default class DateRangePicker extends React.Component {
  static propTypes = {
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    defaultValue: React.PropTypes.object,
    onSelect: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue || '',
      show: false,
    };
  }

  // componentWillReceiveProps(props) {
  //   if (this.props.defaultValue !== props.defaultValue) {
  //     this.setState({
  //       value: props.defaultValue
  //     });
  //   }
  // }

  getTime = () => {
    const {start, end} = this.state.value || {};
    const startDate = start ? start.format('YYYY-MM-DD') : '';
    const endDate = end ? end.format('YYYY-MM-DD') : '';
    return startDate ? `${startDate} ~ ${endDate}` : '';
  }

  dateRangeSelect = (range) => {
    this.setState({
      value: range,
      show: false,
    });
    this.props.onSelect(range);
    setTimeout(this.getTime);
  }

  initDate = () => { //  初始化
    this.setState({
      show: !this.state.show
    });
    // if (!this.state.value) {
    //   const datetime = (this.props.value || '').split(' ');
    //   const date = datetime[0];
    //   this.setState({value: date && moment(date) || moment()});
    // }
    setTimeout(this.getTime);
  }

  render() {
    const styles = require('./DateRangePicker.scss');
    const { placeholder, onSelect, style, ...others} = this.props;
    const popover = (
      <Popover className={styles.popover} id="popover-positioned-bottom-daterange-picker">
        <RangePicker
          numberOfCalendars={2}
          locale="zh-cn"
          {...others}
          value={this.state.value}
          onSelect={this.dateRangeSelect}
          />
      </Popover>
    );

    return (
      <div className={styles.root} style={style}>
        <InputGroup onClick={this.initDate} ref="dateRangePicker">
          <FormControl placeholder={placeholder} onChange={()=>{}} value={this.getTime()} />
          <InputGroup.Addon>
            <Glyphicon glyph="calendar" />
          </InputGroup.Addon>
        </InputGroup>
        <Overlay
          rootClose
          show={this.state.show}
          onHide={() => this.setState({show: false})}
          placement="bottom"
          container={this}
          target={() => ReactDOM.findDOMNode(this.refs.dateRangePicker)}
        >
        {popover}
        </Overlay>
      </div>
    );
  }
}

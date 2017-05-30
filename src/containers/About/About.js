import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReduxSelect from 'components/Form/ReduxSelect';
import DateRangePicker from 'components/DatePicker/DateRangePicker';
import moment from 'moment';

const styles = {
  dateRange: {
    float: 'left',
    width: 295,
    height: 35
  },
  time: {
    fontSize: 16,
    lineHeight: '35px',
    float: 'left'
  }
};

export default class About extends Component {

  state = {
    showKitten: false,
    label: '',
    startDate: '',
    endDate: ''
  }

  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});

  changeSelect = (value) => {
    this.setState({
      label: value
    });
  }

  timeSelect = (range) => {
    const startDate = moment(range.start).format('YYYY-MM-DD');
    const endDate = moment(range.end).format('YYYY-MM-DD');
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
  }

  render() {
    const {showKitten} = this.state;
    const kitten = require('./kitten.jpg');
    const options = [
      {value: '第一个选项', label: '第一个选项'},
      {value: '第二个选项', label: '第二个选项'},
      {value: '第三个选项', label: '第三个选项'},
    ];
    console.log(this.state.label);
    return (
      <div className="container" style={{height: 700}}>
        <h1>关于系统</h1>
        <Helmet title="About Us"/>

        <p>本体统由 UncleYee 开发
          (<a >@UncleYee</a>), 同时也借鉴了一些开源项目。在这里要感谢 <a
            href="https://github.com/erikras/react-redux-universal-hot-example"
            target="_blank">react-redux-universal-hot-example</a> 的作者。
        </p>

        <h3>下拉列表组件</h3>

        <p>下拉列表可以用在表单、图标中，可以看下面的展示。</p>
        <p>你选择的选项是：<span style={{color: 'red'}}>{this.state.label}</span></p>
        <ReduxSelect
          name="nodeName"
          options={options}
          getInfo={this.changeSelect}
          />

        <div style={{height: 50}}></div>

        <h3>时间选择组件</h3>

        <p>时间选择组件同样可以使用在表单等页面中，可以看下面的展示。</p>
        <p>你选择的时间段是：<span style={{color: 'red'}}>{this.state.startDate} ~ {this.state.endDate}</span></p>
        <div style={styles.dateRange}>
          <span style={styles.time}>时间段：</span>
          <DateRangePicker
            onSelect={this.timeSelect}
            />
          </div>

        <div style={{height: 50}}></div>

        <h3>图片演示(虚拟DOM)</h3>

        <p>
          炒鸡可爱！你想看看小猫咪吗？

          <button className={'btn btn-' + (showKitten ? 'danger' : 'success')}
                  style={{marginLeft: 50}}
                  onClick={this.handleToggleKitten}>
            {showKitten ? '我不想看了！' : '我要看~'}</button>
        </p>

        {showKitten && <div><img src={kitten}/></div>}
      </div>
    );
  }
}

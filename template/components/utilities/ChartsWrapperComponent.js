import React from 'react';
import ReactDOM from 'react-dom';
import ChartJS from 'chart.js';

class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = this.props.chartType + 'Chart';
    this.chart = {};
    this.canvas = null;
    this.excludedProps = 
      ['data', 'options', 'redraw', 'chartType', 'methodNames', 'dataKeys'];
  }

  updatePoints = (nextProps, chart, dataKey) => {
    let name = chart.name;

    if (name === 'PolarArea' || name === 'Pie' || name === 'Doughnut') {
      nextProps.data.forEach(function (segment, segmentIndex) {
        if (!chart.segments[segmentIndex]) {
          chart.addData(segment);
        } else {
          Object.keys(segment).forEach(function (key) {
            chart.segments[segmentIndex][key] = segment[key];
          });
        }
      });

      while (nextProps.data.length < chart.segments.length) {
        chart.removeData();
      }
    } else if (name === "Radar") {
      chart.removeData();
      nextProps.data.datasets.forEach(function (set, setIndex) {
        set.data.forEach(function (val, pointIndex) {
          if (typeof (chart.datasets[setIndex][dataKey][pointIndex]) == "undefined") {
            addData(nextProps, chart, setIndex, pointIndex);
          } else {
            chart.datasets[setIndex][dataKey][pointIndex].value = val;
          }
        });
      });
    } else {
      while (chart.scale.xLabels.length > nextProps.data.labels.length) {
        chart.removeData();
      }
      nextProps.data.datasets.forEach(function (set, setIndex) {
        set.data.forEach(function (val, pointIndex) {
          if (typeof (chart.datasets[setIndex][dataKey][pointIndex]) == "undefined") {
            addData(nextProps, chart, setIndex, pointIndex);
          } else {
            chart.datasets[setIndex][dataKey][pointIndex].value = val;
          }
        });
      });
    }
  };

  addData = (nextProps, chart, setIndex, pointIndex) => {
    let values = [];
    nextProps.data.datasets.forEach(function (set) {
      values.push(set.data[pointIndex]);
    });
    chart.addData(values, nextProps.data.labels[setIndex]);
  };


  componentDidMount() {
    this.initializeChart();

    this.canvas = ReactDOM.findDOMNode(this);

    let extras = ['clear', 'stop', 'resize', 'toBase64Image', 'generateLegend', 'update', 'addData', 'removeData'],
      i;
    for (i = 0; i < extras.length; i++) {
      this.extra(extras[i]);
    }
    for (i = 0; i < this.props.methodNames.length; i++) {
      this.extra(this.props.methodNames[i]);
    }
  };

  componentWillUnmount() {
    let chart = this.chart;
    if (chart) {
      chart.destroy();
    }
  };

  componentWillReceiveProps(nextProps) {
    let chart = this.chart;
    let dataKeys = this.props.dataKeys ? 
      this.props.dataKeys  :
      {
        'Line': 'points',
        'Radar': 'points',
        'Bar': 'bars'
      };

    if (nextProps.redraw) {
      chart.destroy();
      this.initializeChart(nextProps);
    } else {
      dataKey = dataKey || this.props.dataKeys[chart.name];
      updatePoints(nextProps, chart, dataKey);
      if (chart.scale) {
        chart.scale.xLabels = nextProps.data.labels;

        if (chart.scale.calculateXLabelRotation) {
          chart.scale.calculateXLabelRotation();
        }
      }
      chart.update();
    }
  };

  initializeChart() {
    let el = ReactDOM.findDOMNode(this);
    let ctx = el.getContext("2d");
    let chart = new ChartJS(ctx, {
      type: this.props.chartType || 'bar',
      data: this.props.data || null,
      options: this.props.options || {}
    });
    this.chart = chart;
  };

  extra(type) {
    this[type] = function () {
      return this.chart[type].apply(this.chart, arguments);
    };
  };

  // return the chartjs instance
  getChart() {
    return this.chart;
  }

  // return the canvass element that contains the chart
  _getCanvas() {
    return this.canvas;
  };

  getCanvas() { return this._getCanvas() };

  render() {
    let _props = {};
    for (let name in this.props) {
      if (this.props.hasOwnProperty(name)) {
        if (this.excludedProps.indexOf(name) === -1) {
          _props[name] = this.props[name];
        }
      }
    }
    return React.createElement('canvas', _props)
  }
}

class CreateChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <ChartComponent { ...this.props} />
    )
  }
}

export default CreateChart;
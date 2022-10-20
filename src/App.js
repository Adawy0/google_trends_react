import logo from './logo.svg';
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import React, { Component } from 'react';

am4core.useTheme(am4themes_animated);

class App extends Component {
  componentDidMount() {
    fetch("http://127.0.0.1:8000/apis/read-data/")
      .then(res => res.json())
      .then(
        (result) => {
         // receiving dataframe from backend then draw in charts
          let chart = am4core.create("chartdiv", am4charts.XYChart);
          chart.paddingRight = 20;
        
          chart.data = result.historical_interest;
        
          let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
          dateAxis.renderer.grid.template.location = 0;
        
          let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.tooltip.disabled = true;
          valueAxis.renderer.minWidth = 35;
        
          let series = chart.series.push(new am4charts.LineSeries());
          series.dataFields.dateX = "date";
          series.dataFields.valueY = "value";
        
          series.tooltipText = "{valueY.value}";
          chart.cursor = new am4charts.XYCursor();
        
          let scrollbarX = new am4charts.XYChartScrollbar();
          scrollbarX.series.push(series);
          chart.scrollbarX = scrollbarX;
        
          this.chart = chart;
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}

export default App;
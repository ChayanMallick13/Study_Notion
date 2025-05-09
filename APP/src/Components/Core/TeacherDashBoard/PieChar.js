import React from 'react'
import { Pie } from 'react-chartjs-2';

const PieChart = ({data}) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
      };
  return (
    <Pie
        data={data}
        //redraw={true}
        options={options}
    />
  )
}

export default PieChart;

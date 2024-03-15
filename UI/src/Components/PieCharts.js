import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import Title from './Title';
 

 export default function PieCharts({data,title})  {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <React.Fragment>
      <Title>{title}</Title>
    <ResponsiveContainer width={"100%"} height={50 * data.length} debounce={50}>
      <PieChart>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="pv"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
         
      </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
    );
  
}

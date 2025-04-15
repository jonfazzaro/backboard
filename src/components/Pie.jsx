import React from 'react';
import { countBy } from 'lodash';
import { Pie as ChartJSPie } from 'react-chartjs-2';
import 'chart.js/auto';

import words from "../domain/words";

function Pie(props) {
    const tagsCount = countBy(words.tags(props.cards));

    const data = {
        labels: Object.keys(tagsCount),
        datasets: [{
            data: Object.values(tagsCount),
            backgroundColor: [
                '#F5EA92', // Shallow
                '#5BA4CF', // Deep
            ],
            borderWidth: 0,
        }]
    };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: false,
        maintainAspectRatio: false
    };

    return (
        <div className="pie">
            <ChartJSPie
                data={data}
                options={options}
                width={props.size}
                height={props.size}
            />
        </div>
    );
}

export default Pie;
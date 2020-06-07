import React from 'react';
import { countBy } from 'lodash';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

import words from "../domain/words";

function Pie(props) {
    return <div className="pie">
        <C3Chart
            data={{
                columns: Object.entries(countBy(words.tags(props.cards))),
                type: 'pie',
                colors: {
                    "Deliver Value Continuously": '#a3d96f',
                    "Make Safety a Prerequisite": '#a0bce2',
                    "Make People Awesome": '#fad25c',
                    "Experiment & Learn Rapidly": '#f97977',
                }
            }}
            pie={{
                label: {
                    show: false
                }
            }}
            legend={{
                show: false
            }}
            size={{
                width: props.size,
                height: props.size
            }} />
    </div>
}

export default Pie;
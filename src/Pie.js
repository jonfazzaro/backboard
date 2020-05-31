import React from 'react';
import _ from 'lodash';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

function Pie(props) {
    return <div className="pie">
        <C3Chart
            data={{
                columns: Object.entries(_.countBy(_.flatten(props.cards.map(tags)))),
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

function tags(card) {
    return card.labels.map(l => l.name);
}

export default Pie;
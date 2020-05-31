import React from 'react';
import ReactWordCloud from 'react-wordcloud';
import _ from 'lodash';

function Cloud(props) {
    const data = counts(props.words);
    return <div className="cloud">
        <ReactWordCloud words={data}
            options={{
                fontFamily: "impact",
                fontWeight: "bold",
                rotations: 1,
                rotationAngles: [0, 0],
                scale: 'sqrt',
                spiral: 'archimedean',
                fontSizes: props.fontSizes || [20, 100],
                deterministic: true
            }}
        />
    </div>
}

function counts(items) {
    return _.chain(Object.entries(_.countBy(items.filter(i => !!i), i => i.toLowerCase())))
        .orderBy(([k, c]) => c, 'desc')
        .take(10)
        .value()
        .map(([k, c]) => {
            return {
                text: k,
                value: c
            };
        });
}


export default Cloud;
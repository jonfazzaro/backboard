import React from 'react';
import ReactWordCloud from 'react-wordcloud';
import words from '../src/domain/words';

function Cloud(props) {
    const data = words.top(props.words);
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

export default Cloud;
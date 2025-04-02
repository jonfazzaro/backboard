import React from 'react';
import ReactWordCloud from 'react-wordcloud';

import words from "../domain/words";

function Cloud(props) {
    const allWords = words.prefixes(props.cards).concat(words.words(props.cards))
    const data = words.top(allWords, 100);
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
        <p className="top">(<strong>top:</strong> {data.slice(0,10).map(w => w.text).join(", ")})</p>
    </div>
}

export default Cloud;
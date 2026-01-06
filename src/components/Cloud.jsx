import React from 'react';
import { WordCloud } from '@isoterik/react-word-cloud';

import words from "../domain/words";

function Cloud(props) {
    const allWords = words.prefixes(props.cards).concat(words.words(props.cards))
    const data = words.top(allWords, 100);
    const fontSizes = props.fontSizes || [20, 100];

    // Calculate font size based on word value
    const getFontSize = (word) => {
        const maxValue = Math.max(...data.map(w => w.value));
        const minValue = Math.min(...data.map(w => w.value));
        const normalized = (word.value - minValue) / (maxValue - minValue);
        return fontSizes[0] + normalized * (fontSizes[1] - fontSizes[0]);
    };

    return <div className="cloud">
        <WordCloud
            words={data}
            width={800}
            height={200}
            font="Impact"
            fontWeight="bold"
            fontSize={getFontSize}
            spiral="archimedean"
            rotate={() => 0}
            random={() => 0.5}
        />
        <p className="top">(<strong>top:</strong> {data.slice(0,10).map(w => w.text).join(", ")})</p>
    </div>
}

export default Cloud;
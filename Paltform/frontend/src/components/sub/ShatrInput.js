import React from 'react';
import '../../styles/sub/ShatrInput.css';

function ShatrInput({ value, onChange }) {
    return (
        <textarea
            className="shatr-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter a shatr of Arabic poetry"
            rows="2"
        />
    );
}

export default ShatrInput;

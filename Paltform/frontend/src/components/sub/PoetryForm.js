import React from 'react';
import '../../styles/sub/PoetryForm.css';

function PoetryForm({ text, setText, onSubmit }) {
    return (
        <form className="poetry-form" onSubmit={onSubmit}>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter Arabic poetry text"
                rows="4"
                cols="50"
                className="poetry-textarea"
            />
            <button type="submit" className="analyze-button">Analyze</button>
        </form>
    );
}

export default PoetryForm;

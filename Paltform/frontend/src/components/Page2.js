import React, { useEffect, useState } from 'react';
import { analyzePoetry } from '../services/apiService';

function Page2() {
    const [shatr1, setShatr1] = useState('');
    const [shatr2, setShatr2] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [circleProgress, setCircleProgress] = useState(0); // State to control circle growth
    const [displayedValue, setDisplayedValue] = useState(0); // State to display number

    const handleAnalyze = async () => {
        setLoading(true);
        const combinedText = `${shatr1.trim()} # ${shatr2.trim()}`;
        try {
            const result = await analyzePoetry(combinedText);
            setAnalysis(result);

            const confidence = result.confidence_ratio * 100;
            setCircleProgress(0); // Reset circle progress
            setDisplayedValue(0); // Reset displayed number

            // Animate the circle progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += 0.25;
                const currentValue = Math.min(progress, confidence);
                setCircleProgress(currentValue);
                setDisplayedValue(currentValue);
                if (currentValue >= confidence) {
                    clearInterval(interval);
                }
            }, .0005);
        } catch (error) {
            console.error('Error analyzing poetry:', error);
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        fontFamily: "'Abdoline', sans-serif",
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f7f7f7', // Soft light gray background
        direction: 'rtl',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '95%',
        margin: '0 auto',
    };

    const headerStyle = {
        backgroundColor: 'rgba(100, 80, 60, 0.9)',
        padding: '20px',
        borderRadius: '12px',
        width: '80%',
        height: '95px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '25px',
    };

    const logoStyle = {
        width: '280px',
        height: 'auto',
        marginTop: '15px',
    };

    const poetryContainerStyle = {
        width: '78%',
        padding: '20px',
        border: '5px solid #d4b79e', // Muted beige for soft borders
        borderRadius: '12px',
        backgroundColor: '#fff',
        position: 'relative',
        marginBottom: '20px',
    };

    const poetryTitleStyle = {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        position: 'absolute',
        top: '-29px',
        right: '15px',
        backgroundColor: '#f7f7f7', // Matches container background
        padding: '0 10px',
        color: '#a67c52', // Warm brown tone for the title
    };

    const inputsContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        marginTop: '20px',
    };

    const inputBoxStyle = {
        width: '48%',
        border: '3px solid #d4b79e', // Light beige border for comfort
        borderRadius: '12px',
        backgroundColor: '#fff',
        padding: '15px',
        position: 'relative',
        boxSizing: 'border-box',
    };

    const labelStyle = {
        position: 'absolute',
        top: '-15px',
        right: '15px',
        backgroundColor: '#f7f7f7', // Soft background for the label
        padding: '0 10px',
        fontWeight: 'bold',
        color: '#a67c52', // Warm brown for text
    };

    const inputStyle = {
        width: '100%',
        height: '80px',
        fontSize: '1rem',
        padding: '10px',
        border: '2px solid #d4b79e',
        borderRadius: '12px',
        textAlign: 'right',
        boxSizing: 'border-box',
        resize: 'none',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '30px',
    };

    const buttonStyle = {
        fontSize: '1rem',
        padding: '12px 24px',
        color: 'white',
        background: 'linear-gradient(to right, #a67c52, #d4b79e)', // Warm gradient for buttons
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        boxShadow: '0 4px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s',
    };

    const analysisOuterStyle = {
        width: '78%',
        padding: '20px',
        border: '5px solid #d4b79e', // Soft border to match input and container style
        borderRadius: '12px',
        backgroundColor: '#fff',
        position: 'relative',
        marginTop: '20px',
    };

    const analysisLabelStyle = {
        position: 'absolute',
        top: '-15px',
        right: '15px',
        backgroundColor: '#f7f7f7', // Consistent soft background
        padding: '0 10px',
        fontWeight: 'bold',
        color: '#a67c52', // Consistent warm color for labels
    };

    const analysisInnerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: '20px',
        padding: '45px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Softened inner background
        borderRadius: '12px',
        border: '2px solid #d4b79e',
    };

    const confidenceCircleStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: `conic-gradient(#a67c52 ${circleProgress}%, #f0d0c0 ${circleProgress}%)`,
        color: '#a67c52',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px #fff',
        position: 'relative',
    };

    const confidenceTextStyle = {
        position: 'absolute',
        top: '110px',
        left: '0',
        fontSize: '1rem',
        color: '#a67c52',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
    };

    return (
        <div className="page2-container" style={containerStyle}>
            <style>
                {`
                    @font-face {
                        font-family: 'Abdoline';
                        src: url('${process.env.PUBLIC_URL}/lines/arfonts-abdo-line.ttf') format('truetype');
                    }
                `}
            </style>
            <header style={headerStyle}>
                <img
                    src={`${process.env.PUBLIC_URL}/logos/Arood.png`}
                    alt="Arabic Poetry Logo"
                    style={logoStyle}
                />
            </header>
            <div style={poetryContainerStyle}>
                <h2 style={poetryTitleStyle}>البيت الشعري</h2>
                <div style={inputsContainerStyle}>
                    <div style={inputBoxStyle}>
                        <label style={labelStyle}>الشطر الأول</label>
                        <textarea
                            style={inputStyle}
                            placeholder="أدخل الشطر الأول هنا..."
                            value={shatr1}
                            onChange={(e) => setShatr1(e.target.value)}
                        />
                    </div>
                    <div style={inputBoxStyle}>
                        <label style={labelStyle}>الشطر الثاني</label>
                        <textarea
                            style={inputStyle}
                            placeholder="أدخل الشطر الثاني هنا..."
                            value={shatr2}
                            onChange={(e) => setShatr2(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            {loading && <p>جاري التحليل...</p>}
            {analysis && (
                <div style={analysisOuterStyle}>
                    <label style={analysisLabelStyle}>النتائج</label>
                    <div style={analysisInnerStyle}>
                        <div>
                            <p><strong>البحر:</strong> {analysis.bahr || 'غير معروف'}</p>
                            <p><strong>المودل الذي تنبأ بها:</strong> {analysis.best_model || 'غير متوفر'}</p>
                        </div>
                        <div style={{position: 'relative'}}>
                            <div style={confidenceCircleStyle}></div>
                            <div style={confidenceTextStyle}>{`${displayedValue.toFixed(5)}%`}</div>
                        </div>
                    </div>
                </div>
            )}
            <div style={buttonContainerStyle}>
                <button style={buttonStyle} onClick={handleAnalyze}>
                    تحليل
                </button>
                <button style={buttonStyle} onClick={() => window.location.reload()}>
                    إعادة تحميل الصفحة الحالية
                </button>
                <button style={buttonStyle} onClick={() => (window.location.href = '/')}>العودة إلى الصفحة الرئيسة
                </button>
            </div>
        </div>
    );
}

export default Page2;

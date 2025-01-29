import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Page3() {
    const history = useHistory();

    useEffect(() => {
        const container = document.querySelector('.page3-container');
        if (container) {
            container.style.backgroundImage = `url(${process.env.PUBLIC_URL}/logos/background3.png)`;
            container.style.backgroundSize = 'cover';
            container.style.backgroundRepeat = 'no-repeat';
            container.style.backgroundPosition = 'center';
        }
    }, []);

    const containerStyle = {
        fontFamily: "'Abdoline', sans-serif",
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f7f7f7', // Soft light gray background
    };

    const headerStyle = {
        backgroundColor: 'rgba(100, 80, 60, 0.9)',
        padding: '20px',
        borderRadius: '12px',
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

    const videoContainerStyle = {
        maxWidth: '900px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '12px',
        border: '2px solid #d4b79e', // Light beige border
    };

    const buttonStyle = {
        fontSize: '1rem',
        padding: '15px 25px', // Larger padding for easier clicking
        color: 'white',
        background: 'linear-gradient(to right, #a67c52, #d4b79e)', // Warm gradient
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '30px',
        boxShadow: '0 4px rgba(0, 0, 0, 0.2)',
    };

    return (
        <div className="page3-container" style={containerStyle}>
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
            <div style={videoContainerStyle}>
                <iframe
                    style={{width: '100%', height: '500px', border: '5px solid #5c3b27'}}
                    src="https://www.youtube.com/embed/mwaeJgfPIqg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="شرح تفصيلي"
                ></iframe>
            </div>
            <button style={buttonStyle} onClick={() => history.push('/')}>
                العودة إلى الصفحة الرئيسة
            </button>
        </div>
    );
}

export default Page3;

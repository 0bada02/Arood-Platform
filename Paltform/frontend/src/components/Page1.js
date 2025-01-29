// Choice 1: Replace the header text with the logo and fix the box size
import React from 'react';
import { useHistory } from 'react-router-dom';

function Page1() {
    const history = useHistory();

    const containerStyle = {
        fontFamily: "'Abdoline', sans-serif",
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f7f7f7',
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

    const descriptionOuterStyle = {
        width: '80%',
        padding: '20px',
        border: '5px solid #d4b79e',
        borderRadius: '12px',
        backgroundColor: '#fff',
        position: 'relative',
        boxShadow: '0 4px rgba(0, 0, 0, 0.1)',
    };

    const descriptionLabelStyle = {
        position: 'absolute',
        top: '-20px',
        right: '20px',
        backgroundColor: '#f7f7f7',
        padding: '0 12px',
        fontWeight: 'bold',
        color: '#a67c52',
    };

    const descriptionContentStyle = {
        fontSize: '1.1rem',
        color: '#555',
        lineHeight: '1.6',
        textAlign: 'justify',
        marginBottom: '25px',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '30px',
        flexWrap: 'wrap',
    };

    const buttonStyle = {
        fontSize: '1rem',
        padding: '15px 25px',
        color: 'white',
        background: 'linear-gradient(to right, #a67c52, #d4b79e)',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        boxShadow: '0 4px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s',
        fontWeight: 'bold',
        maxWidth: '240px',
    };

    const biggestButtonStyle = {
        ...buttonStyle,
        width: '100%',
        maxWidth: 'none',
    };

    const handleDownload = (modelName) => {
        const link = document.createElement('a');
        link.href = `${process.env.PUBLIC_URL}/models/${modelName}`;
        link.download = modelName;
        link.click();
    };

    return (
        <div className="page1-container" style={containerStyle}>
            <style>
                {`
                    @font-face {
                        font-family: 'Abdoline';
                        src: url('${process.env.PUBLIC_URL}/lines/arfonts-abdo-line.ttf') format('truetype');
                    }
                `}
            </style>
            {/* Header Box with Fixed Size */}
            <header style={headerStyle}>
                <img
                    src={`${process.env.PUBLIC_URL}/logos/Arood.png`}
                    alt="Arabic Poetry Logo"
                    style={logoStyle}
                />
            </header>

            <div style={descriptionOuterStyle}>
                <label style={descriptionLabelStyle}>العروض</label>
                <div style={descriptionContentStyle}>
                    <p>
                        <strong>العروض:</strong> العروض هو العلم الذي يهتم بدراسة أوزان الشعر العربي وقوافيه.
                        تم تأسيس هذا العلم على يد الخليل بن أحمد الفراهيدي، الذي طور بحور الشعر لتشمل:
                        الكامل، الطويل، الوافر، وغيرها.
                    </p>
                    <p>
                        كل بحر شعري يتميز بنمط خاص من التفعيلات (وهي الوحدات الإيقاعية الأساسية في الشعر).
                        ومن خلال هذا العلم، يستطيع الشعراء والمبدعون إنشاء أبيات شعرية تتبع قواعد دقيقة،
                        مما يجعلها جميلة وسهلة الغناء والتذكر. هذا العلم ساهم في الحفاظ على الشعر العربي
                        وتطويره على مر العصور.
                    </p>
                    <p>
                        علم العروض لا يقتصر فقط على الشعر القديم، بل له تطبيقات في تحليل النصوص الحديثة
                        وحتى في تقنيات الذكاء الاصطناعي التي تهتم بتحليل النصوص وتصنيفها. تعلم هذا العلم
                        يمكن أن يكون ممتعاً ومفيداً لأي شخص مهتم باللغة العربية وشعرها الجميل.
                    </p>
                </div>
            </div>

            <div style={buttonContainerStyle}>
                <button style={buttonStyle} onClick={() => history.push('/page3')}>
                    شرح تفصيلي
                </button>
                <button style={biggestButtonStyle} onClick={() => history.push('/page2')}>
                    !قم بتجربته الآن
                </button>
                <button style={buttonStyle} onClick={() => handleDownload('AroodV1.keras')}>
                    تحميل AroodV1
                </button>
                <button style={buttonStyle} onClick={() => handleDownload('AroodV2.keras')}>
                    تحميل AroodV2
                </button>
                <button style={buttonStyle} onClick={() => handleDownload('AroodV3.keras')}>
                    تحميل AroodV3
                </button>
                <button style={buttonStyle} onClick={() => history.push('/page4')}>
                    Upload your model [AroodV4]
                </button>
            </div>
        </div>
    );
}

export default Page1;

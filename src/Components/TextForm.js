import React, { useState, useEffect, useRef } from 'react';

export default function TextForm(props) {
    const [text, setText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [spokenWordIndex, setSpokenWordIndex] = useState(-1);
    const [msg, setMsg] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const highlightedWordRef = useRef(null);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
            }
            event.preventDefault();
            event.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            if (msg) {
                window.speechSynthesis.cancel();
            }
        };
    }, [isSpeaking, msg]);

    useEffect(() => {
        if (highlightedWordRef.current) {
            highlightedWordRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
        }
    }, [spokenWordIndex]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space' && document.activeElement !== document.getElementById('myBox')) {
                event.preventDefault();
                if (isSpeaking) {
                    if (!isPaused) {
                        window.speechSynthesis.pause();
                        setIsPaused(true);
                        props.showAlert("Paused Speaking!", "success");
                    } else {
                        window.speechSynthesis.resume();
                        setIsPaused(false);
                        props.showAlert("Resumed Speaking!", "success");
                    }
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isSpeaking, isPaused, props]);

    const handleTextFocus = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            setIsPaused(false);
        }
    };

    const wordCount = () => text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

    const handleOnChange = (e) => setText(e.target.value);
    const handleUpper = () => textAction(text.toUpperCase(), "Converted to Uppercase!");
    const handleLower = () => textAction(text.toLowerCase(), "Converted to Lowercase!");
    const handleTitle = () => {
        const newText = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        textAction(newText, "Converted to Titlecase!");
    };
    const handleSentence = () => {
        const newText = text.toLowerCase();
        textAction(newText.charAt(0).toUpperCase() + newText.slice(1), "Converted to Sentence Case!");
    };
    const handleSpaces = () => textAction(text.split(/\s+/).join(" "), "Extra spaces removed!");
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to Clipboard!", "success");
    };
    const handleClear = () => textAction('', "Text Cleared!");
    const handleDownload = () => {
        const blob = new Blob([text], { type: 'text/plain' });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "text.txt";
        a.click();
        props.showAlert("File Downloaded!", "success");
    };
    const textAction = (updatedText, alertMsg) => {
        if (text.trim() === '') return props.showAlert("Text is empty.", "warning");
        setText(updatedText);
        props.showAlert(alertMsg, "success");
    };

    const speak = () => {
        if (text.trim() === '') return props.showAlert("Text is empty.", "warning");
        const utter = new SpeechSynthesisUtterance(text);
        let currentIndex = 0;
        utter.onboundary = (e) => {
            if (e.name === 'word') setSpokenWordIndex(currentIndex++);
        };
        utter.onend = () => {
            setIsSpeaking(false);
            setSpokenWordIndex(-1);
            setMsg(null);
        };
        window.speechSynthesis.speak(utter);
        setIsSpeaking(true);
        setMsg(utter);
        props.showAlert("Speaking!", "success");
    };

    const stop = () => {
        if (!isSpeaking) return props.showAlert("Nothing to pause/resume.", "warning");
        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            props.showAlert("Resumed Speaking!", "success");
        } else {
            window.speechSynthesis.pause();
            setIsPaused(true);
            props.showAlert("Paused Speaking!", "success");
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center fw-semibold mb-4">{props.heading}</h2>

            <textarea
                className="form-control mb-3 p-3"
                id="myBox"
                rows="7"
                value={text}
                onChange={handleOnChange}
                onFocus={handleTextFocus}
                placeholder="Type or paste your text here..."
                style={{
                    backgroundColor: props.mode === 'dark' ? '#000000' : 'white',  // Dark mode: #000000 (dark black)
                    color: props.mode === 'dark' ? 'white' : 'black',               // Text color: white for dark mode
                    border: props.mode === 'dark' ? '1px solid white' : '1px solid #ccc',
                }}
            ></textarea>

            <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center">
                <button className="btn btn-outline-primary btn-sm" onClick={handleUpper}>Uppercase</button>
                <button className="btn btn-outline-primary btn-sm" onClick={handleLower}>Lowercase</button>
                <button className="btn btn-outline-primary btn-sm" onClick={handleTitle}>Titlecase</button>
                <button className="btn btn-outline-primary btn-sm" onClick={handleSentence}>Sentence</button>
                <button className="btn btn-outline-primary btn-sm" onClick={handleSpaces}>Trim Spaces</button>
                <button className="btn btn-outline-success btn-sm" onClick={handleCopy}>Copy</button>
                <button className="btn btn-outline-warning btn-sm" onClick={speak}>Speak</button>
                <button className="btn btn-outline-info btn-sm" onClick={stop}>{isPaused ? "Resume" : "Pause"}</button>
                <button className="btn btn-outline-success btn-sm" onClick={handleDownload}>Download</button>
                <button className="btn btn-outline-danger btn-sm" onClick={handleClear}>Clear</button>
            </div>

            <div className="mt-4 text-center">
                <h5 className="fw-semibold">Summary</h5>
                <p className="mb-1">{wordCount()} words | {text.length} characters</p>
                <p className="text-muted small">{(0.008 * wordCount()).toFixed(2)} minute read</p>
            </div>

            <div className="container mt-4 text-center">
    <h5 className="fw-semibold">Preview</h5>
    <div
        className="p-3 border rounded"
        style={{
            minHeight: '100px',
            backgroundColor: props.mode === 'dark' ? '#000000' : 'white',  // Dark mode: #000000 (dark black), Light mode: #f8f9fa (light gray)
            color: props.mode === 'dark' ? 'white' : 'black',  // Text color: white for dark mode and black for light mode
              wordWrap: 'break-word',
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
        }}
    >
        {text
            ? text.split(/\s+/).map((word, index) => (
                <span
                    key={index}
                    ref={index === spokenWordIndex ? highlightedWordRef : null}
                    style={{
                        backgroundColor: isSpeaking && index === spokenWordIndex ? '#ffecb3' : 'transparent',
                        color: isSpeaking && index === spokenWordIndex ? '#000' : 'inherit',
                        marginRight: '5px'
                    }}
                >
                    {word}
                </span>
            ))
            : <span className="text-muted">Nothing to preview.</span>}
    </div>
</div>

        </div>
    );
}

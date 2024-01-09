import React, { useState } from "react";

function ClipboardCopy({ copyText }) {
    const [isCopied, setIsCopied] = useState(false);

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const handleCopyClick = () => {
        copyTextToClipboard(copyText)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <input class="page-url-info w-100" disabled type="text" value={copyText} readOnly />
            <button className="btn w-100 btn-primary" onClick={handleCopyClick}>
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
            </button>
        </div>
    );
}

export { ClipboardCopy }
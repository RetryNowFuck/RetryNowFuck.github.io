document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');

    // 1. 입력 시 실시간으로 출력창에 텍스트 동기화
    // 바이에버 문자는 기본적으로 로마자(A-Z, a-z) 1:1 매핑 폰트이므로 
    // 입력된 텍스트 내용을 그대로 넣고 폰트만 CSS로 바인딩하면 됩니다.
    inputText.addEventListener('input', (e) => {
        const text = e.target.value;
        outputText.textContent = text;
    });

    // 2. 복사 기능
    copyBtn.addEventListener('click', () => {
        if (!outputText.textContent.trim()) {
            alert('복사할 텍스트가 없습니다.');
            return;
        }
        
        navigator.clipboard.writeText(outputText.textContent)
            .then(() => {
                alert('텍스트가 클립보드에 복사되었습니다!\n(메모장 등에 붙여넣고 바이에버 폰트를 적용하면 똑같이 보입니다.)');
            })
            .catch(err => {
                console.error('복사 실패:', err);
            });
    });

    // 3. 초기화 기능
    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        outputText.textContent = '';
    });
});

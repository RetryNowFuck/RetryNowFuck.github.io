document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Selector elements
    const selector = document.getElementById('scriptSelector');
    const optByever = document.getElementById('optByever');
    const optPlain = document.getElementById('optPlain');
    const outputLabel = document.getElementById('outputLabel');

    // 현재 선택된 스크립트 (byever | plain)
    let currentScript = 'byever';

    function applyScriptToOutput() {
        // 입력값을 그대로 출력영역에 넣고, 선택된 스크립트에 따라 폰트 적용/해제
        const text = inputText.value || '';
        outputText.textContent = text;

        if (currentScript === 'byever') {
            outputText.classList.add('byever-font');
            outputLabel.textContent = '바이에버 문자 출력 (Byever Script):';
        } else {
            outputText.classList.remove('byever-font');
            outputLabel.textContent = '원문 출력:';
        }
    }

    // 1. 입력 시 실시간으로 출력창에 텍스트 동기화
    // 바이에버 문자는 기본적으로 로마자(A-Z, a-z) 1:1 매핑 폰트이므로 
    // 입력된 텍스트 내용을 그대로 넣고 폰트만 CSS로 바인딩하면 됩니다.
    inputText.addEventListener('input', () => {
        applyScriptToOutput();
    });

    // 선택기 탭 클릭 처리 (탭을 클릭하면 해당 스크립트로 전환)
    function handleOptionClick(e) {
        const el = e.currentTarget;
        const script = el.getAttribute('data-script');
        if (!script) return;

        currentScript = script;

        // 선택 상태 토글
        Array.from(selector.querySelectorAll('.option')).forEach(opt => {
            opt.classList.toggle('selected', opt === el);
        });

        // 출력에 바로 반영
        applyScriptToOutput();
    }

    optByever.addEventListener('click', handleOptionClick);
    optPlain.addEventListener('click', handleOptionClick);

    // 키보드 접근성: Enter/Space로 탭 전환
    [optByever, optPlain].forEach(opt => {
        opt.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                opt.click();
            }
        });
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

    // 초기 렌더
    applyScriptToOutput();
});

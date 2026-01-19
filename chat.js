function appendMessage(text, className) {
    let chatBox = document.getElementById("chat-box");
    let msg = document.createElement("div");
    msg.className = className;
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    let input = document.getElementById("user-input");
    let text = input.value;
    if (!text) return;

    appendMessage(text, "user-msg");
    input.value = "";

    fetch("/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: text})
    })
    .then(res => res.json())
    .then(data => {
        appendMessage(data.result + "\nSuggestion: " + data.suggestion, "bot-msg");

        if (data.result.includes("Cyberbullying")) {
            alert("⚠️ Warning: Cyberbullying Content Detected!");
        }
    });
}

// Voice input
function startVoice() {
    let recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = function(event) {
        document.getElementById("user-input").value = event.results[0][0].transcript;
    };
    recognition.start();
}

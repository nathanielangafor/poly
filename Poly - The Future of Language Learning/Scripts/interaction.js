const apiKey = '';
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
let messagesToDisplay = [
    { role: '', content: '' },
    { role: '', content: '' }
];
let currentLanguage = 'en';
let recognition;
let isRecognizing = false;

const getSummarizationPrompt = `
--- Summarization Prompt ---

You are simulating a human assistant designed to help users practice their language skills. To maintain context for the conversation, you will summarize the previous interactions and pass them along with the new user query. The summary should be very detailed, capturing only the most important information to provide a clear representation of the conversation. Here is the conversation data so far:

{previousConversation}

Based on the conversation data provided, generate a summary that captures the essential points, main topics discussed, and any important details or questions raised. The summary should be concise yet comprehensive, ensuring the context is maintained accurately for the next interaction. After generating the summary, respond to the user's new query in a way that is consistent with the previous context.

NEVER mention you are an artificial intelligence. The user should always think you are a person
`;

const getChattingPrompt = `
--- Chatting Prompt ---

You are simulating a human tutor designed to help users practice their Russian language skills through comprehensible input. Your goal is to engage in conversations in Russian while utilizing only the 10,000 most common words. Respond in a way that feels natural and engaging, as if you were a real person. Encourage the user to continue learning by being supportive and using simple sentence structures. Incorporate the principles from "How to Make Friends and Influence People" to make the user feel valued and liked. Always provide your responses in the following JSON format:

{
  "response": "<AI's response in Russian>",
  "translation": "<English translation of the response>"
}

**User Message:** 
{userMessage}

**Guidelines:**
1. Always respond in Russian, using only the 10,000 most common words.
2. Ensure your responses are supportive and encouraging, promoting the user's continued engagement and learning.
3. Use simple sentence structures suitable for a learner.
4. Draw on principles from "How to Make Friends and Influence People" to make the user feel liked and valued.
5. Keep the conversation natural and authentic.
6. Ask questions to the user when appropriate to keep the conversation flowing.
7. Share your own thoughts or information about topics in a way that feels authentic and personal.
8. Keep your responses short and concise to not bore the user
9. NEVER mention you are an artificial intelligence. The user should always think you are a person
10. ALWAYS respond in a json format. No matter what. 

**Example Response Format:**

{
  "response": "Как прошел ваш день?",
  "translation": "How was your day?"
}
`;

let messageHistory = [
    { role: 'system', content: 'You are a helpful assistant.' }
];

async function sendMessage(userMessage) {
    // Add the user's message to the message history
    messageHistory.push({ role: 'user', content: userMessage });

    const requestBody = {
        model: 'gpt-4',
        messages: messageHistory,
        max_tokens: 150,
        temperature: 0.7
    };

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        var assistantMessage = data.choices[0].message.content;
        console.log(assistantMessage);
        var jsonAssistantMessage = JSON.parse(assistantMessage);
        const newAssistantMessage = `
            Response: ${jsonAssistantMessage.response}
            <br>Translation: ${jsonAssistantMessage.translation}
        `;
        console.log("Pushed poly!!!!");
        // Add the assistant's message to the message history
        messageHistory.push({ role: 'assistant', content: assistantMessage });
        messagesToDisplay.push({ role: 'Poly', content: newAssistantMessage });

        console.log(jsonAssistantMessage.response)
        const audioUrl = await textToSpeech(jsonAssistantMessage.response);
        if (audioUrl) {
            const audioElement = document.createElement('audio');
            audioElement.src = audioUrl;
            audioElement.play();
        } else {
            console.log('Error: No audio URL returned');
        }

        return assistantMessage;
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('languageButton').addEventListener('click', () => {
    toggleLanguage();
});

document.getElementById('sendTranscriptionButton').addEventListener('click', async () => {
    const transcription = document.getElementById('transcription').textContent;
    messagesToDisplay.push({ role: 'Nate', content: transcription });
    // Update the text fields with the two most recent messages
    updateTextFields();
    const generatedPrompt = getChattingPrompt.replace(`{userMessage}`, transcription);

    if (transcription.trim()) {
        const response = await sendMessage(generatedPrompt);

        // Update the text fields with the two most recent messages
        updateTextFields();

        stopRecognition();
    } else {
        alert('No transcription available to send.');
    }
});

function updateTextFields() {
    if (messagesToDisplay.length >= 2) {
        const lastMessage = messagesToDisplay[messagesToDisplay.length - 1];
        const secondLastMessage = messagesToDisplay[messagesToDisplay.length - 2];

        document.getElementById('role1').innerHTML = secondLastMessage.role;
        document.getElementById('content1').innerHTML = secondLastMessage.content;

        document.getElementById('role2').innerHTML = lastMessage.role;
        document.getElementById('content2').innerHTML = lastMessage.content;
    } else {
        console.error('Not enough messages to display.');
    }
}

document.getElementById('clearButton').addEventListener('click', () => {
    // Clear the transcription display
    const transcriptionElement = document.getElementById('transcription');
    if (transcriptionElement) {
        transcriptionElement.textContent = '';
    }
    console.log('Transcription cleared.');
});

function updateListeningStatus(isListening) {
    const statusText = isListening ? 'ON' : 'OFF';
    document.getElementById('listeningStatus').textContent = statusText;
}

function toggleLanguage() {
    stopRecognition()
    currentLanguage = currentLanguage === 'en' ? 'ru' : 'en';
    const languageText = currentLanguage === 'en' ? 'English' : 'Russian';
    document.getElementById('currentLanguage').innerHTML = `Current Language: ${languageText} | <span id="listeningStatus">OFF</span>`;
    document.getElementById('languageButton').textContent = `Switch to ${currentLanguage === 'en' ? 'Russian' : 'English'}`;
}

function startRecognition(language) {
    if (isRecognizing) {
        console.log('Recognition is already running.');
        return;
    }

    recognition = initializeSpeechRecognition(language);
    if (recognition) {
        const elementId = 'transcription';
        listenForTranscription(recognition, transcription => {
            updateTranscriptionUI(transcription, elementId);
        });
        updateListeningStatus(true);
    }
}

function initializeSpeechRecognition(language) {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        updateTranscriptionUI("Speech recognition not supported!", 'transcription');
        return null;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

    const languageOptions = {
        'en': 'en-US',
        'ru': 'ru-RU',
    };

    if (!languageOptions[language]) {
        console.error('Unsupported language');
        return null;
    }

    recognition.lang = languageOptions[language];

    recognition.onerror = event => {
        handleRecognitionError(event);
    };

    recognition.onend = () => {
        if (isRecognizing) {
            recognition.start();
        } else {
            updateListeningStatus(false);
        }
    };

    recognition.start();
    isRecognizing = true;

    return recognition;
}

function handleRecognitionError(event) {
    console.error('Speech recognition error:', event.error);
    if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please enable microphone permissions in your browser settings.');
    } else if (event.error === 'aborted') {
        console.warn('Recognition aborted, restarting...');
        startRecognition(currentLanguage);
    } else {
        updateTranscriptionUI(`Error: ${event.error}`, 'transcription');
    }
}

function listenForTranscription(recognition, transcriptionHandler) {
    let fullTranscription = '';

    recognition.onresult = event => {
        let interimTranscription = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript.toLowerCase();
            if (event.results[i].isFinal) {
                fullTranscription += transcript;
            } else {
                interimTranscription += transcript;
            }
        }

        transcriptionHandler(fullTranscription + interimTranscription);
    };
}

function updateTranscriptionUI(transcription, elementId) {
    const transcriptionElement = document.getElementById(elementId);
    if (transcriptionElement) {
        transcriptionElement.textContent = transcription;
    } else {
        console.error(`Element with ID '${elementId}' not found.`);
    }
}

document.getElementById('replyButton').addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
            startRecognition(currentLanguage);
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
            updateTranscriptionUI('Error accessing microphone. Please check your settings.', 'transcription');
        });
});

function stopRecognition() {
    if (recognition) {
        recognition.stop();
        isRecognizing = false;
        updateListeningStatus(false);
        console.log('Recognition stopped.');
    } else {
        console.log('No recognition instance found.');
    }
}

async function textToSpeech(text) {
    const requestBody = {
        model: "tts-1", // Confirm this model name from the OpenAI documentation
        input: text,
        voice: "alloy" // This should match the voice model you intend to use
    };

    try {
        const response = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` // Replace `apiKey` with your actual OpenAI API key
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            console.error('HTTP Response Status:', response.status);
            const errorResponse = await response.json(); // Get more detailed error information
            console.error('API Error Response:', errorResponse);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        return audioUrl;
    } catch (error) {
        console.error('Failed to convert text to speech:', error);
        return null;
    }
}

window.onload = function() {
    navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
            const audioInputDevices = devices.filter(device => device.kind === 'audioinput');
            if (audioInputDevices.length > 0) {
                return navigator.mediaDevices.getUserMedia({ audio: true });
            } else {
                throw new Error('No audio input devices found.');
            }
        })
        .then(function(stream) {
            console.log('You let me use your mic!');
        })
        .catch(function(err) {
            console.error('Error accessing microphone:', err.message);
        });
};

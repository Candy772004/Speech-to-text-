recognition.onresult = function(event) {
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    const result = event.results[i];
    const transcript = result[0].transcript.trim().toLowerCase();
    const normalizedTranscript = transcript.replace(/\s+/g, '');
    const confidence = result[0].confidence;

    console.log(`[DEBUG] Heard: "${transcript}" (confidence: ${confidence})`);

    if (confidence > 0.8) {
      if (!isRecording && normalizedTranscript.includes('hello')) {
        startRecording();
      } else if (isRecording && (normalizedTranscript.includes('thankyou') || transcript.includes('thank you'))) {
        stopRecording();
      } else if (isRecording) {
        if (new Date().getSeconds() % 10 === 0) {
          lastTimestamp = new Date().toLocaleTimeString();
          finalTranscript += `\n[${lastTimestamp}]\n`;
        }
        finalTranscript += transcript + ' ';
        document.getElementById('transcript').innerText = finalTranscript;
      }
    }
  }
};
import os
from google.cloud import texttospeech

from flask import Flask, request, jsonify

app = Flask(__name__)
client = texttospeech.TextToSpeechClient()

@app.route('/text2speech', methods=['post'])
def t2s():
    output = {}
    data = request.json
    print('Get request:')
    print(data)
    text = data.get('text')

    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        name="en-US-Wavenet-D",
        ssml_gender=texttospeech.SsmlVoiceGender.MALE
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    response = client.synthesize_speech(
        input=texttospeech.SynthesisInput(text=text),
        voice=voice,
        audio_config=audio_config
    )

    output_file = "output.mp3"
    with open(output_file, "wb") as out:
        out.write(response.audio_content)

    output['file_path'] = output_file
    return output

if __name__ == "__main__":
    app.run(debug=False, port=2024, host='0.0.0.0')
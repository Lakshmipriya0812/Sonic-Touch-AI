import os
import io
from flask import Flask, request, jsonify
from pydub import AudioSegment
from google.cloud import speech


app = Flask(__name__)
client = speech.SpeechClient()
import os
from ffmpy import FFmpeg

def mp3_to_wav(mp3_path, wav_path):
    if not os.path.isfile(mp3_path):
        raise FileNotFoundError(f"path not exist: {mp3_path}")

    ff = FFmpeg(
        inputs={mp3_path: None},
        outputs={wav_path: None}
    )

    ff.run()
    return wav_path

@app.route('/speech2text', methods=['POST'])
def s2t():
    data = request.json
    print('Received request:')
    print(data)
    audio_path = data.get('audio_path')
    if not audio_path:
        return jsonify({'error': 'No audio_path provided'}), 400

    try:
        if not os.path.isfile(audio_path):
            return jsonify({'error': 'Audio file not found'}), 404

        audio = AudioSegment.from_file(audio_path, format="mp3")
        wav_data = io.BytesIO()
        audio.export(wav_data, format='wav')
        wav_data.seek(0)

        frame_rate = audio.frame_rate

        wav_data.seek(0)
        content = wav_data.read()

        audio_recognition = speech.RecognitionAudio(content=content)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=frame_rate,
            language_code="en-US",
        )

        response = client.recognize(config=config, audio=audio_recognition)

        transcripts = [result.alternatives[0].transcript for result in response.results]
        transcript_text = ' '.join(transcripts)

        return jsonify({'order': transcript_text})

    except Exception as e:
        print(f"Error processing audio file: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=False, port=2025, host='0.0.0.0')

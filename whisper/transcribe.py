from faster_whisper import WhisperModel
import sys

model = WhisperModel("tiny", device="cpu", compute_type="int8")

audio_path = sys.argv[1]
segments, _ = model.transcribe(audio_path)

text = ""
for segment in segments:
    text += segment.text + " "

print(text.strip())
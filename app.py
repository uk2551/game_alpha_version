#.venv/Scripts/activate
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from gemini_module import ai_model
import os


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
port = int(os.environ.get("PORT", 4000))

model = ai_model()

@app.route('/')
def index():
    return render_template('index.html')
    
@app.route('/favicon.ico')
def favicon():
    print("none")
    return "None"


@socketio.on('send_test')
def test(data):
    respond = model.check_value()

    emit('update_html', respond, broadcast=True)

@socketio.on('send_to_python')
def handle_data(data):
    player_input = data['value']

    respond = model.send_massage(player_input)
    print(respond)

    
    emit('update_html', respond, broadcast=True)

app.run(debug=False)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=port)
   



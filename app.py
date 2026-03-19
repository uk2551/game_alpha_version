#.venv/Scripts/activate
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from gemini_module import ai_model


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
model = ai_model()

game_state = {
    "season": "Spring",
    "turn": 1,
    "resources": {
        "gold": 200,
        "food": 300
    },
    "log": []
}

@app.route('/')
def index():

    return render_template('index.html')

"""
@socketio.on('send_test')
def test(data):
    respond = model.check_value()

    emit('update_html', respond, broadcast=True)
    """

# Function to push data every second
@socketio.on('send_to_python')
def handle_data(data):
    player_input = data['value']


    respond = model.send_massage(player_input)
    print(respond)

    # 2. Python sends it back to HTML (broadcast=True updates all users)
    emit('update_html', respond, broadcast=True)

app.run(debug=True)

if __name__ == '__main__':
    socketio.run(app)
app = Flask(__name__)


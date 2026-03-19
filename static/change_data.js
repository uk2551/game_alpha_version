/* ── player input ── */
function send_cmd (){
    const player_input = document.getElementById("cmdInput");
    console.log(player_input.value);
}


/* --data oparation -- */
const socket = io();

const sendBtn = document.getElementById('send-btn');
sendBtn.addEventListener('click', () => {
    const inputField = document.getElementById('cmdInput')
    const dataToSend = inputField.value;
    const loading_div = document.getElementById('loading')

    // Send data to the Python 'send_to_python' listener
    if (loading_div || dataToSend == '') {
        console.warn("กรุณรอจนกว่าจะประมวลผลเสร็จและเขียนอะไรซักอย่าง");
        
    } else{
        socket.emit('send_to_python', { value: dataToSend });
    // Optional: Clear input after sending
    inputField.value = "";
    addplayerbox(dataToSend)
    document.getElementById('chronicleFeed').scrollTop = 99999;
    }
    
    
});

// B. Receive data FROM Python and update the span
socket.on('update_html', (respond) => {
    addfeedback(respond)

});



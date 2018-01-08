const { app, BrowserWindow } = require('electron');
const remote1 = require('electron').remote;
const settings = require('electron-settings');
let mainWindow;
app.on('ready', () => {

    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });
    mainWindow.setMenu(null);
    mainWindow.loadURL('file://' + __dirname + '/startpage.html');
});


function openFile() {
    var inputEmail = document.getElementById('email').value;
    var inputPass = document.getElementById('mobpassword').value;
    $('#loadingmessage').show();
    var request = $.ajax({
        url: "http://api.mobtexting.in/Authentication/login/",
        type: "POST",
        data: {
            username: inputEmail,
            password: inputPass,
            mobileApp: "true"
        },
        dataType: "html"
    });

    request.done(function(msg) {
        $('#loadingmessage').hide();

        //console to print data
        var nodeConsole = require('console');
        var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

        var json = msg;
        obj = JSON.parse(json);
        // myConsole.log(obj.access_token);

        if (obj.response_code == 200) {

            settings.set('mobtexting', {
                email: obj.data.email,
                access_token: obj.access_token
            });

            const remote = require('electron').remote;
            const BrowserWindow = remote.BrowserWindow;
            var win = new BrowserWindow({ width: 800, height: 600 });
            win.setMenu(null);
            win.loadURL('file://' + __dirname + '/first.html');
            var window = remote1.getCurrentWindow();
            window.close();
        } else {
            alert("Request failed: " + "Check username or password");
        }
    });

    request.fail(function(jqXHR, textStatus) {
        $('#loadingmessage').hide();
        alert("Request failed: " + "Check username or password");
    });

};

function saveSetting() {
    var apikey = document.getElementById('apikey').value;
    var senderID = document.getElementById('senderID').value;

    settings.set('mobtextingsetting', {
        apikey: apikey,
        senderID: senderID
    });
    alert("Setting Has been Saved")
};

function openDialog() {
    if (settings.has('mobtextingsetting.apikey'))
    document.getElementById("apikey").value = settings.get('mobtextingsetting.apikey');
    if (settings.has('mobtextingsetting.senderID'))
        document.getElementById('senderID').value = settings.get('mobtextingsetting.senderID');
    //$("#myBtn").click(function() {
    $("#myModal").modal();
    //});
};

function sendMessage() {
    alert("test");
};
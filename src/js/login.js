import { Link } from "react-router-dom";

import "../css/login.css"
import "../css/animation.css"
import { colors } from "@mui/material";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: ""
        }
    }

    

    logInButton = () => {

        var email = document.getElementById("regEmail").value;
        var password = document.getElementById("regPassword").value;
        firebase.auth().signInWithEmailAndPassword(email, password).then( (userCredential) => {
            var user = userCredential.user;
            console.log(user);
            document.getElementById("regEmail").value = "";
            document.getElementById("regPassword").value = "";
            var noo = new Notification("Login Succuss")
            window.location.href = "/main"
        }
        ).then(() => {}).catch(e => alert(e))
    }

    signInGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            var user = result.user;
            var regitered = false;
            console.log(user);

            firebase.database().ref("userData").once("value", (snapshot) => {
                snapshot.forEach((snap2) => {
                    console.log(snap2.val());
                    if(snap2.val().Email == user.email) {
                        //alert("CC");
                        regitered = true;
                    }
                })
            
            }).then(() => {
            
                if(!regitered) {
                    //alert("BB");
                    var data = {
                        Email: user.email,
                        Password: "None",
                        Username: user.displayName,
                        UserImage: "default",
                        UserRoom: [-1],
                        intro: ""
                    }

                    firebase.database().ref("userData").push(data).then(() => {
                        var noo = new Notification("Login Succuss")
                        window.location.href = "/main"; 
                        //alert("CC");
                    }).catch((err) => {
                        alert("error");
                    });
                }
                
                window.location.href = "/main"
                var noo = new Notification("Login Succuss")
            }).catch(function (error) {
                alert('error: ' + error.message);
            });
        }).catch((e) => alert(e.message));
    }

    regButton = () => {
        window.location.href = "/signup";  
    }

    render() {
        return (
            <div style={{width: "100%", height: "100vh", backgroundImage: "url('../img/sunset.jpg')", backgroundSize: "cover"}}>
                <h1 id="Header" style={{textAlign: "center", paddingTop: "100px"}}>Chatroom</h1>
                <div id="center-form">
                    <input className="form-control" id="regEmail" type="email" placeholder="Email"/>
                    <input className="form-control" id="regPassword" type="password" placeholder="password" style={{marginTop: "10px"}}/>
                    <button className="btn button btn-primary" id="loginButton" onClick={() => this.logInButton()}>sign in</button>
                    <button className="button btn btn-success" id="googleButton" onClick={() => this.signInGoogle()}>sign in with google</button>
                    <button className="button btn btn-info" id="signupButton" onClick={() => this.regButton()}>register your account</button>
                </div>
                
            </div>
        )
    }
}

export default Login;
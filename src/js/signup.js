import { Link } from "react-router-dom";
import { Button, Grid, Divider, Box, Typography, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    IconButton,
    Paper,
    List,
    CircularProgress } from "@mui/material";

import "../css/login.css"
import "../css/animation.css"
import aaa from "../img/sunset.jpg"
import bbb from '../img/upload.png';
import ccc from '../img/anoy.jpg';

var profilePic = "../img/anoy.jpg";

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: "../img/anoy.jpg",
            imageFile: null,
            isLoading: false
        };
    }


    regButton = () => {
        var email = document.getElementById("regEmail").value;
        var password = document.getElementById("regPassword").value;
        var username = document.getElementById("regUsername").value;
        console.log(username);
        if(this.state.imageFile == null) {
            alert("please select image");
            return;
        }
        
        if(username == "" || username.length > 30) {
            alert("invalid username (Too long (>30) or empty)");
            return;
        }

        this.setState({isLoading: true});

        firebase.auth().createUserWithEmailAndPassword(email, password).then( (userCredential) => {
                var user = userCredential.user;
                var data = {
                    Email: email,
                    Password: password,
                    Username: username,
                    UserImage: email+".jpg",
                    UserRoom: [-1],
                    intro: ""
                }

                if(this.state.imageFile == null) {
                    alert("please select image");
                    this.setState({isLoading: false});
                    return;
                }

                firebase.database().ref("userData").push(data).then(() => {
                    if(this.state.imageFile == null) {
                        this.setState({isLoading: false});
                        window.location.href = "/"; 
                        return;
                    }
                    
                    firebase.storage().ref("userPic/" + email + ".jpg").put(this.state.imageFile).then(() => {
                        if (!Notification) {
                            alert('Desktop notifications not available in your browser. Try Chromium.');
                            return;
                        }
                        if (Notification.permission !== 'granted')
                            Notification.requestPermission();
                        var no = new Notification("singup successful!");
                        this.setState({isLoading: false});
                        window.location.href = "/"; 
                    }).catch((e) => alert(e.message));
                    
                }).catch((err) => {
                    alert(err.message);
                });


                if(this.state.imageFile == null) return;

                //alert("AA");
                //var picRef = firebase.storage().ref("userPic/" + username + ".jpg");
                //firebase.storage().ref("userPic/" + username + ".jpg").put(this.state.imageFile).catch((e) => alert(e));
                 
            }
        ).catch(e => alert(e.message))
        this.setState({isLoading: false});
    }

    changePic = (e) => {
        //profilePic = URL.createObjectURL(e.target.files[0]);
        if(!e.target.files || !e.target.files[0]) return;
        var validList = ['image/jpg', 'image/jpeg', 'image/png']
        if(!validList.includes(e.target.files[0]['type'])) {
            alert("file type not accepted! \nNeeds to be .jpg, .jpeg, or .png");
            return;
        }
        this.setState({
            image: URL.createObjectURL(e.target.files[0]),
            imageFile: e.target.files[0]
        });
        //console.log(this.state.image);
    }
    

    render() {
        return (
            <div style={{width: "100%", height: "100vh", backgroundImage: "url('../img/sunset.jpg')", backgroundSize: "cover"}}>
                <h1 id="Header" style={{textAlign: "center", paddingTop: "100px"}}>Chatroom</h1>
                <div id="center-form">
                <input className="form-control" id="regEmail" type="email" placeholder="Email"/>
                <input className="form-control" id="regPassword" type="password" placeholder="password" style={{marginTop: "10px"}}/>
                <input className="form-control" id="regUsername" type="text" placeholder="username" style={{marginTop: "10px"}}/>
                <p style={{marginTop: "10px", textAlign: "center"}}>Upload your picture</p>
                <label style={{display: "flex", justifyContent: "center"}}>
                    <input type="file" id="imageInput" style={{display: "none"}} onChange={(e) => this.changePic(e)}/>
                    <img src={this.state.image} id="profPic" style={{width: "100px", display: "block"}}/>
                </label>
                
                <button className="button btn btn-primary" id="signupButton" onClick={() => this.regButton()}>register account</button>
                <button className="button btn btn-info" onClick={() => {window.location.href = "/";  }}>go to sign in</button>
                </div>
                <Dialog open={this.state.isLoading} PaperProps={{ style: { boxShadow: 'none', backgroundColor: 'transparent' } }}>
                            <DialogContent >
                                <CircularProgress size={70} />
                            </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default SignUp;
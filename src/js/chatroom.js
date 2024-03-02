import { Button, Grid, Divider } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import UserProfile from "./userProflie";
import RoomList from "./roomlist";
import RoomBar from "./roombar";
import MsgInput from "./msgInput";
import MsgList from "./msgList";
import aaa from "../img/sunset.jpg"

class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: "../img/anoy.jpg",
            imageFile: null,
            userData: {UserRoom: [1]},
            userKey: "",
            roomID: "",
            ready: false
        };
    }

    componentDidMount() {
        var currentUserData;

        firebase.auth().onAuthStateChanged((user) => {
            var currentKey;
            firebase.database().ref("userData").once("value", (snapshot) => {
                snapshot.forEach((snap2) => {
                    //console.log(snap2.val());
                    //console.log(snap2.key);
                    if(snap2.val().Email == user.email) {
                        currentUserData = snap2.val();
                        currentKey = snap2.key;
                    }
                })
            
            }).then( () => {
                if(currentUserData.UserImage == "default") {
                    this.setState({image: user.photoURL, imageFile: "default", userData: currentUserData, userKey: currentKey});
                }
                else {
                    //currentUserData.UserImage = currentUserData.Email + ".jpg";
                    firebase.storage().ref("userPic/" + currentUserData.UserImage).getDownloadURL().then((e) => {

                        this.setState({image: e, imageFile: currentUserData.UserImage, userData: currentUserData, userKey: currentKey})
                    }).catch((e) => alert(e));
                }

                //console.log(this.state.userData);
            }).catch( (e) => {
                alert(e);
            })
        })

        // firebase.storage().ref("userPic/asd.jpg").getDownloadURL().then((e) => {
        //     this.setState({image: e, imageFile: "asd.jpg"})
        // })
    }

    logout = () => {
        firebase.auth().signOut().then( () => {
            //alert("success signout");
            if (!Notification) {
                alert('Desktop notifications not available in your browser. Try Chromium.');
                return;
            }
            if (Notification.permission !== 'granted')
                Notification.requestPermission();
            var no = new Notification("logout success");
            window.location.href = "/"; 
        }).catch( (e) => { alert("error on signout") });
    }
    //image show =>  {this.state.imageFile && this.state.image && <img src={this.state.image} style={{width: "30%", height: "80%", backgroundSize: "cover"}}></img>}

    handleConfirm = () => {
        //console.log("AA");
        var newData = this.state.userData;
        var tmpUsername = document.getElementById("editUsernameInput").value;
        if(tmpUsername == "" || tmpUsername.length > 30) {
            alert("invalid username (Too long (>30) or empty)");
            return;
        }
        
        else {
            newData.Username = document.getElementById("editUsernameInput").value
        //alert(newData.Username.length)

        firebase.database().ref('userData/' + this.state.userKey).update({
            Username: newData.Username
        }).then(() => {
            this.setState({image: this.state.image,
                imageFile: this.state.imageFile,
                userData: newData, userKey: this.state.userKey})

            if (!Notification) {
                alert('Desktop notifications not available in your browser. Try Chromium.');
                return;
            }
            if (Notification.permission !== 'granted')
                Notification.requestPermission();
            var no = new Notification("change username success", {body: "username changed to " + newData.Username});
        })
        .catch((e) => {alert(e)});
    }

        //this.state.userData.Username = document.getElementById("editUsernameInput").value;
        document.getElementById("editUsernameInput").value = "";
    }

    changePic = (e) => {
        //profilePic = URL.createObjectURL(e.target.files[0]);
        if(!e.target.files || !e.target.files[0]) return;
        var newImage = e.target.files[0];
        var newImageFile = this.state.userData.Email + ".jpg";
        var validList = ['image/jpg', 'image/jpeg', 'image/png']
        if(!validList.includes(newImage['type'])) {
            alert("file type not accepted! \nNeeds to be .jpg, .jpeg, or .png");
            return;
        }
        
        //console.log(this.state.image);

        if(this.state.userData.UserImage == "default") {
            firebase.database().ref('userData/' + this.state.userKey).update({
                UserImage: newImageFile
            }).catch((e) => {alert(e)});
        }
        
        firebase.storage().ref("userPic/" + newImageFile).put(newImage).then(() => {
            firebase.storage().ref("userPic/" + newImageFile).getDownloadURL().then((e) => {
                this.setState({
                    image: e,
                    imageFile: newImageFile,
                    userData: this.state.userData, userKey: this.state.userKey
                })
    
                if (!Notification) {
                    alert('Desktop notifications not available in your browser. Try Chromium.');
                    return;
                }
                if (Notification.permission !== 'granted')
                    Notification.requestPermission();
                var no = new Notification("change user picture success");
            }).catch((e) => {alert(e)});
            
        }).catch((e) => alert(e));

    }


    setRoomID = (ID) => {
        this.setState({ready: false})
        this.setState({roomID: ID});
        console.log(ID);
        let IDPromise = new Promise((resolve, reject) => {
            setTimeout(function(){resolve("successID")}, 100)
        })
        IDPromise.then(() => {this.setState({ready: true})})
    
    }

    handleConfirm2 = () => {
        var newData = this.state.userData;
        var tmpIntro = document.getElementById("editIntroInput").value;
        if(tmpIntro.length > 100) {
            alert("invalid username (Too long (>100) or empty)");
            return;
        }
        
        else {
            newData.intro = document.getElementById("editIntroInput").value
        //alert(newData.Username.length)

        firebase.database().ref('userData/' + this.state.userKey).update({
            intro: newData.intro
        }).then(() => {
            this.setState({image: this.state.image,
                imageFile: this.state.imageFile,
                userData: newData, userKey: this.state.userKey})

            if (!Notification) {
                alert('Desktop notifications not available in your browser. Try Chromium.');
                return;
            }
            if (Notification.permission !== 'granted')
                Notification.requestPermission();
            var no = new Notification("change intro success", {body: "username changed to " + newData.intro});
        })
        .catch((e) => {alert(e)});
    }

        //this.state.userData.Username = document.getElementById("editUsernameInput").value;
        document.getElementById("editIntroInput").value = "";
    }


    render() {
        return (
            <div style={{backgroundImage: "url('../img/sunset.jpg')", backgroundSize: "cover"}}>
                <Grid container direction={"row"} style={{height: "100vh"}} justifyContent={"flex-start"}>
                    <Grid item direction={"column"} style={{width: "25%"}}>
                        <Grid item style={{height: "20vh", border: "2px solid black"}}>
                            {this.state.userKey != "" && <UserProfile logout={this.logout} 
                                 userData={this.state.userData} 
                                 imageFile = {this.state.imageFile} 
                                 image = {this.state.image}
                                 handleConfirm = {this.handleConfirm}
                                 changePic = {this.changePic}
                                 handleConfirm2 = {this.handleConfirm2}/>
                            }
                        </Grid>
                        <Grid item>
                            <div style={{backgroundColor: "transparent", height: "80vh"}} color="aqua">
                                {this.state.userData.UserRoom[0] != 1 && <RoomList
                                roomList = {this.state.userData.UserRoom}
                                userKey = {this.state.userKey}
                                userData = {this.state.userData}
                                setRoomID = {this.setRoomID}
                                />}
                                
                            </div>
                        </Grid>
                    </Grid>
                    
                    <Grid item direction={"row"} justifyContent={"space-evenly"} alignItems={"flex-start"} style={{width: "75%"}}>
                        <Grid item container direction={"row"} alignItems={"flex-start"} >
                            <Grid item style={{backgroundColor: "transparent", height: "15vh", width: "100%", border: "2px solid black"}}>
                                {this.state.roomID != "" && this.state.ready && <RoomBar roomID = {this.state.roomID}/>} 
                            </Grid>
                        </Grid>
                        <Grid  item style={{height: "75vh"}}>
                            {this.state.roomID != "" && this.state.ready &&
                            <div>
                            <MsgList userData={this.state.userData} 
                                roomID = {this.state.roomID}
                                imageFile = {this.state.imageFile} 
                                image = {this.state.image}
                                userName = {this.state.userData.Username}
                            />
                            </div>
                            }
                            {this.state.roomID == "" && <div style={{height: "100%", backgroundColor: "transparent", border: "2px solid black"}}></div>}
                        </Grid>
                        <Grid item style={{height: "10vh"}}>
                            {this.state.roomID != "" && this.state.ready &&<MsgInput userData={this.state.userData} roomID = {this.state.roomID}/>}
                            {this.state.roomID == "" && <div style={{height: "100%", backgroundColor: "transparent", border: "2px solid black"}}></div>}
                        </Grid>
                    </Grid>
                </Grid>

                
                
            </div>
        )
    }
}

export default Chatroom;
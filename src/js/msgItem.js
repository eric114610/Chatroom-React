import { Button, Grid, Divider, Box, Typography, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    IconButton,
    Paper,
    List, 
    Avatar,
    Card,
    CardContent,
    CardHeader} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

class MsgItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            ready: false,
            userImage: "",
            userName: "",
            intro: ""
        };
    }

    componentDidMount() {
        //alert("CC");
        if(this.props.person != "user") {
            //alert("AAA");
            var currentUser;
            var currentKey;
            firebase.database().ref("userData/").once("value", (snapshot) => {
                snapshot.forEach((snap2) => {
                    
                    if(snap2.val().Email == this.props.person) {
                        //exist = true;
                        //currentUser = snap2.val();
                        currentKey = snap2.key;
                    }
                })
            }).then(() => {
                // var currentPic;
                // firebase.storage().ref("userPic/" + currentUser.Email + ".jpg").getDownloadURL().then((e) => {
                //     this.setState({userName: currentUser.Username, userImage: e, intro: currentUser.intro});
                // }).catch((e) => {alert(e.message)});

                firebase.database().ref("userData/" + currentKey).on("value", (snap3) => {
                    currentUser = snap3.val();
                    console.log(currentUser);
                    //currentKey = i;

                    var currentPic;
                    firebase.storage().ref("userPic/" + currentUser.Email + ".jpg").getDownloadURL().then((e) => {
                    this.setState({userName: currentUser.Username, userImage: e, intro: currentUser.intro});
                    }).catch((e) => {alert(e.message)});
                })
            })
            //firebase.database().ref("userData/").off();
            // firebase.database().ref("userData/").on("value", (snapshot) => {
            //     for(var i in snapshot.val()) {
            //         console.log(snapshot.val()[i])
            //         if(snapshot.val()[i].Email == this.props.person) {
            //             currentUser = snapshot.val()[i];
            //             currentKey = i;

            //             var currentPic;
            //             firebase.storage().ref("userPic/" + currentUser.Email + ".jpg").getDownloadURL().then((e) => {
            //             this.setState({userName: currentUser.Username, userImage: e, intro: currentUser.intro});
            //             }).catch((e) => {alert(e.message)});
            //         }
            //     }
            // })
        }

    }


    retrieve = () => {
        if(this.props.person == "user") {
            if(confirm("Do  you want to delete this message?")) {
                firebase.database().ref("roomContext/" + this.props.roomID + "/" + this.props.messageKey).update({
                    type: "back"
                }).then(() => {
                    if (!Notification) {
                        alert('Desktop notifications not available in your browser. Try Chromium.');
                        return;
                    }
                    if (Notification.permission !== 'granted')
                        Notification.requestPermission();
                    var no = new Notification("delete message success", {body: "message {" + this.props.message + "} is deleted"})
                }).catch((e) => {alert(e.message)});
            }
        }
    }

    showProfile = () => {
        //alert("ccc")
        this.setState({open: true});
    }

    render() {
        if(this.props.type == "back") {
            return(
                <div style={{width: "20%", height: "5vh", marginLeft: "40%", marginRight: "40%", backgroundColor: "lightgray", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: '1vh'}}>
                    <Typography> message deleted </Typography>
                </div>
            )
        }
        else if(this.props.person == "user") {
            return (
                <div style={{width: "100%"}}>
                    <div style={{ wordWrap: 'break-word', backgroundColor: '#aaeaff', marginLeft: '57%', marginTop: '1vh', marginBottom: '1vh', maxWidth: '40%', borderRadius: "5px"}}>
                        <Grid container direction={"column"}>
                            <Grid container direction={"row"} sx={{alignItems: "center", display: "flex", justifyContent: "space-evenly"}}>
                                <Grid item sx={{width: "10%"}}>
                                    <IconButton onClick={() => this.showProfile()}>
                                        <Avatar src={this.props.userPic} sx={{ width: '2vh', height: '2vh'}} />
                                    </IconButton>
                                    
                                </Grid>
                                <Grid item sx={{width: "70%"}}>
                                    <Typography sx={{ fontSize: '1.5vh' }}>{this.props.userName}</Typography>
                                </Grid> 
                                <Grid item>
                                    <IconButton onClick={() => {this.retrieve()}} aria-label="delete" sx={{widows: "2vh", height: "2vh"}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                                        
                            </Grid>
                        </Grid>
                                    
                        <Grid item sx={{paddingLeft: "1vh"}}>
                            <Typography className='msgContent'  sx={{ fontSize: '3vh' }}>{this.props.message}</Typography>
                        </Grid> 
                            
                        
                    </div>
                    <Dialog sx={{justifyContent: "center"}} open={this.state.open} onClose={() => {this.setState({open: false})}} fullWidth maxWidth={"xs"}>
                    <DialogTitle>User Profile</DialogTitle>
                    <DialogContent>
                        <DialogContentText variant="h5">
                            Username: {this.props.userName}
                        </DialogContentText>                    
                        <DialogContentText> {" "}</DialogContentText>
                        <Box sx={{justifyContent: "flex-start", display: "flex", alignItems: "center"}}>
                        <DialogContentText sx={{fontSize: "3vh", width: "35%"}}>
                            {"User picture:   "}
                        </DialogContentText>
                        <Avatar src={this.props.userPic} sx={{width: "10vh", height: "10vh"}}></Avatar>
                        </Box>
                        <DialogContentText sx={{fontSize: "3vh"}}>
                            Intro: {this.props.userIntro}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this.setState({open: false})}}>Close</Button>
                    </DialogActions>
                    </Dialog>
                    
                </div>
            )
        }
        else {
            return (
                <div style={{width: "100%"}}>
                    <div style={{ wordWrap: 'break-word', backgroundColor: '#aaaaff', marginLeft: "3%", marginRight: '57%', marginTop: '1vh', marginBottom: '1vh', maxWidth: '40%',  borderRadius: "5px"}}>
                        <Grid container direction={"column"}>
                            <Grid container direction={"row"} sx={{alignItems: "center", display: "flex", justifyContent: "space-evenly"}}>
                                <Grid item sx={{width: "10%"}}>
                                    <IconButton onClick={() => this.showProfile()}>
                                        <Avatar src={this.state.userImage} sx={{ width: '2vh', height: '2vh'}} />
                                    </IconButton>
                                    
                                </Grid>
                                <Grid item sx={{width: "70%"}}>
                                    <Typography sx={{ fontSize: '1.5vh' }}>{this.state.userName}</Typography>
                                </Grid> 
                                <Grid item sx={{width: "10%"}}>
                                    
                                </Grid>
                                        
                            </Grid>
                        </Grid>
                                    
                        <Grid item sx={{paddingLeft: "1vh"}}>
                            <Typography className='msgContent'  sx={{ fontSize: '3vh' }}>{this.props.message}</Typography>
                        </Grid> 
                            
                        
                    </div>
                    <Dialog sx={{justifyContent: "center"}} open={this.state.open} onClose={() => {this.setState({open: false})}} fullWidth maxWidth={"xs"}>
                    <DialogTitle>User Profile</DialogTitle>
                    <DialogContent>
                        <DialogContentText variant="h5">
                            Username: {this.state.userName}
                        </DialogContentText>                    
                        <DialogContentText> {" "}</DialogContentText>
                        <Box sx={{justifyContent: "flex-start", display: "flex", alignItems: "center"}}>
                        <DialogContentText sx={{fontSize: "3vh", width: "35%"}}>
                            {"User picture:   "}
                        </DialogContentText>
                        <Avatar src={this.state.userImage} sx={{width: "10vh", height: "10vh"}}></Avatar>
                        </Box>
                        <DialogContentText sx={{fontSize: "3vh"}}>
                            Intro: {this.state.intro}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {this.setState({open: false})}}>Close</Button>
                    </DialogActions>
                    </Dialog>
                    
                </div>
            )
        }
    }
}

export default MsgItem
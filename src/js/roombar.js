import { Button, Grid, Divider, Box, Typography, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    IconButton,
    Paper,
    List, 
    Avatar} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

class RoomBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            roomName: "",
            roomPic: "",
            ready: false
        };
    }

    componentDidMount() {
        var pic;
        var name;
        firebase.database().ref("roomData/" + this.props.roomID).once("value", (snapshot) => {
            //alert(this.state.userRoomList)
            name = snapshot.val();
        }).then(() => {
            //alert(tmp);
            firebase.storage().ref("roomPic/" + this.props.roomID + ".jpg").getDownloadURL().then((e) => {
                pic = e;
            }).then(() => {
                this.setState({open: false, roomName: name, roomPic: pic, ready: true})
            }).catch((e) => {alert("AC")});
        }).catch(() => {alert(e.message)})
    }


    addMember = () => {
        var newEmail = document.getElementById("memberInput").value;
        var exist = false;
        var newUserKey;
        var newUserData;

        firebase.database().ref("userData/").once("value", (snapshot) => {
            snapshot.forEach((snap2) => {
                
                if(snap2.val().Email == newEmail) {
                    exist = true;
                    newUserData = snap2.val();
                    newUserKey = snap2.key;
                }
            })
        }).then(() => {
            if(!exist) {
                alert("user doesn't exist");
                return;
            }

            for(var i in newUserData.UserRoom) {
                if(this.props.roomID == newUserData.UserRoom[i]) {
                    alert("User is already in this room!");
                    return;
                }
            }

            var newRoomList = newUserData.UserRoom;
            if(newRoomList[0] == -1)
                newRoomList = [];
            newRoomList.push(this.props.roomID)
            
            firebase.database().ref("userData/" + newUserKey).update({
                UserRoom: newRoomList
            }).then(() => {
                if (!Notification) {
                    alert('Desktop notifications not available in your browser. Try Chromium.');
                    return;
                }
                if (Notification.permission !== 'granted')
                    Notification.requestPermission();
                var no = new Notification("add new member to room success", {body: "added " + newEmail + " to room"});
            }).catch((e) => {alert(e.message)});
        }).catch((e) => alert(e.message));
    }
    

    render() {
        return (
            <div style={{height: "100%"}}>
                <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"} style={{height: "100%"}}>
                    <Grid item style={{width: "10%", height: "100%", padding: "1% 1%"}}>
                        <Avatar src={this.state.roomPic} sx={{width: "100%", height: "100%",  boxSizing: "border-box", alignItems: "center"}}></Avatar>
                        
                    </Grid>
                    <Grid item style={{width:"60%"}}>
                        <Typography align="center" variant="h3">{this.state.roomName}</Typography>
                    </Grid>
                    <Grid item style={{width:"10%", height: "100%"}}>
                        <IconButton sx={{width: '100%', height: '100%' }} onClick={() => {this.setState({open: true})}}>
                            <PersonAddAlt1Icon sx={{width: '100%', height: '100%' }} />
                        </IconButton>
                    </Grid>
                </Grid>
                <Dialog open={this.state.open} onClose={() => {this.setState({open: false})}}>
                    <DialogContentText>
                        Add new member
                    </DialogContentText>
                    <TextField
                        id="memberInput"
                        margin="dense"
                        label="new member's email"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <DialogActions>
                        <Button onClick={() => {this.setState({open: false})}}>Cancel</Button>
                        <Button onClick={() => {this.addMember(); this.setState({open: false})}}>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default RoomBar;
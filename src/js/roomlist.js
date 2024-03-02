import { Button, Grid, Divider, Box, Typography, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    IconButton,
    Paper,
    List,
    CircularProgress } from "@mui/material";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RoomButton from "./roomButton";

import PRE from"../img/anoy.jpg";
var roomPrevPic = PRE;
var roomPrevFile = "";

class RoomList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            userRoomList: [-1],
            userRoomPic: [-1],
            userRoomName: [-1],
            ready: false,
            isLoading: false
        };
    }

    componentDidMount() {
        //this.setState({ready: false})
        var tmp;
        
        var tmpPicref;
        var tmpList = [];
        var tmpPic = [];
        var tmpListName = [];
        var count=0;
        var len;

         firebase.database().ref("userData/" + this.props.userKey + "/UserRoom").off()
         

        firebase.database().ref("userData/" + this.props.userKey + "/UserRoom").on("child_added", (snapshot) => {
            //alert("CC");

            this.setState({ready: false})
            //alert("CCCCC");
            
            //console.log(snapshot.val());
            var snap2 = snapshot.val();
            if(snap2 == -1)
                return;
            else {
                var tmpKey;
                tmpKey = snap2
                //alert(snap2);
                //console.log(count);
                tmpList[count] = tmpKey;
                count++;
                
                this.setState({open: false, userRoomList: tmpList, userRoomPic: tmpPic, userRoomName: tmpListName, ready: true})
                            //if(count == len){alert(tmpList[count-1]); this.setState({open: false, userRoomList: tmpList, userRoomPic: tmpPic, userRoomName: tmpListName, ready: true})}
            }
                
        })
    }


    
    addRoom = () => {
        if(roomPrevFile == "") {
            alert("please select pic");
            document.getElementById("roomNameInput").value = "";
            roomPrevPic = PRE;
            roomPrevFile = "";
            this.setState({open: false});
            return;
        }
        var validList = ['image/jpg', 'image/jpeg', 'image/png']
        if(!validList.includes(roomPrevFile['type'])) {
            alert("file type not accepted! \nNeeds to be .jpg, .jpeg, or .png");
            document.getElementById("roomNameInput").value = "";
            roomPrevPic = PRE;
            roomPrevFile = "";
            this.setState({open: false});
            return;
        }
        var tmpname = document.getElementById("roomNameInput").value;
        if(tmpname.length > 15 || tmpname == "") {
            alert("invalid roomname (Too long(>15) or empty)");
            document.getElementById("roomNameInput").value = "";
            roomPrevPic = PRE;
            roomPrevFile = "";
            this.setState({open: false});
            return;
        }
        this.setState({isLoading: true});
        var newRoomList = this.state.userRoomList;
        // var newRoomPic = this.state.userRoomPic;
        // var newRoomListName = this.state.userRoomName;

        if(newRoomList[0] == -1) {
            newRoomList = [];
        //     newRoomPic = [];
        //     newRoomListName = [];
        }
        
        var newRoom = document.getElementById("roomNameInput").value;
        var newRoomKey
        //var newPic = document.getElementById("imageInput").files[0];
        

        var newRoomListToUpdate = this.props.roomList;
        // if(newRoomListToUpdate[0] == -1) {
        //     newRoomListToUpdate = [];
        //     alert('B');
        // }

        firebase.database().ref("roomData").push(newRoom).then((snapshot) => {
            newRoomKey = snapshot.key;
        
            // newRoomListName.push(newRoom)
            newRoomList.push(newRoomKey);
            // console.log(newRoomList);
            newRoomListToUpdate.push(newRoomKey);
            

            firebase.storage().ref("roomPic/" + newRoomKey + ".jpg").put(roomPrevFile).then(() => {
                //alert("success");
                firebase.database().ref('userData/' + this.props.userKey).update({
                    UserRoom: newRoomList
                }).then(() => {
                    var emptyNsg = {sender: "empty"};
                    firebase.database().ref("roomContext/" + newRoomKey).push(emptyNsg).then(() => {
                        
                        if(this.props.roomList[0] == -1)
                            this.setState({open: false, ready: true, userRoomList: newRoomList, isLoading: false})
                        else
                            this.setState({open: false, ready: true, isLoading: false});


                        if (!Notification) {
                            alert('Desktop notifications not available in your browser. Try Chromium.');
                            return;
                        }
                        if (Notification.permission !== 'granted')
                            Notification.requestPermission();
                        var no = new Notification("add new room success")
            
                        //alert("succ");
                    }).catch(() => alert("failed"));
                    // alert("success"); 
                    // if(this.props.roomList[0] == -1)
                    //     this.setState({open: false, ready: true, userRoomList: newRoomList, isLoading: false})
                    // else
                    //     this.setState({open: false, ready: true, isLoading: false});
            
                }).catch((e) => {alert("DD")});
            }).catch((e) => {alert("EE")});
            
            //this.setState({open: false, userRoomList: newRoomList, userRoomPic: newRoomPic, userRoomName: newRoomListName,ready: true});
            
            document.getElementById("roomNameInput").value = "";
            roomPrevPic = PRE;
            roomPrevFile = "";
        })//.catch((e) => { alert(e.massage) });

        
    }


    changePic = (e) => {
        //profilePic = URL.createObjectURL(e.target.files[0]);
        if(!e.target.files || !e.target.files[0]) return;

        roomPrevPic = URL.createObjectURL(e.target.files[0]);
        roomPrevFile = e.target.files[0];
        this.setState({open: false});
        this.setState({open: true});
    }


    listRender = () => {
        var renderList = []
        //alert(this.state.userRoomPic)
        //alert("SSS");
        
        for(var i in this.state.userRoomList)
            renderList.push(<div>
                <RoomButton 
                roomName={this.state.userRoomName[i]} 
                roomPic={this.state.userRoomPic[i]}
                roomID={this.state.userRoomList[i]}
                setRoomID = {this.props.setRoomID}
                />
                <Divider></Divider>
            </div>)
        //alert(this.state.userRoomList)
        return (renderList);
    }

    render() {
        return (
            <div style={{width: "100%", height: "100%", backgroundColor: "transparent"}}>
                <Grid container direction={"row"} justifyContent={"space-evenly"} alignItems={"center"} style={{maxHeight: "10vh", backgroundColor: "khaki"}}>
                    <Grid item style={{width: "80%"}}>
                        <Typography textAlign={"center"} variant="h5" style={{backgroundColor: "khaki"}}> Roomlist </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton id="addRoomButton"  onClick={() => {this.setState({open: true})}}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                        <Dialog open={this.state.open} onClose={() => {this.setState({open: false})}}>
                            <DialogTitle> create new room </DialogTitle>
                            <DialogContentText>
                                room name
                            </DialogContentText>
                            <TextField
                                id="roomNameInput"
                                margin="dense"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <DialogContentText>
                                room pic
                            </DialogContentText>
                            <label style={{display: "flex", justifyContent: "center"}}>
                                <input type="file" id="imageInput" style={{display: "none"}} onChange={(e) => this.changePic(e)}/>
                                <img src={roomPrevPic} id="profPic" style={{width: "100px", display: "block"}}/>
                            </label>
                            <DialogActions>
                                <Button onClick={() => {this.setState({open: false})}}>Cancel</Button>
                                <Button onClick={() => {this.addRoom();}}>Confirm</Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Grid>
                
                <Divider/>

                <Paper elevation={2} style={{maxHeight: "74vh", backgroundColor: "transparent"}}>
                    
                    <Grid sx={{overflowY: "auto", overflowX: "hidden", maxHeight: "74vh", minHeight: "74vh"}}>
                        {this.state.ready && this.listRender()}
                        
                    </Grid>
                </Paper>
                <Dialog open={this.state.isLoading} PaperProps={{ style: { boxShadow: 'none', backgroundColor: 'transparent' } }}>
                            <DialogContent >
                                <CircularProgress size={70} />
                            </DialogContent>
                </Dialog>

            </div>
        )
    }
}

export default RoomList;
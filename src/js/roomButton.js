import { Button, Grid, Divider, Box, Typography, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField, 
    Avatar} from "@mui/material";

class RoomButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            roomImage: "",
            roomName: "",
            firstLoad: true
        };
    }

    componentDidMount() {
        //alert("a");
        var name;
        firebase.storage().ref("roomPic/" + this.props.roomID + ".jpg").getDownloadURL().then((e) => {
            this.setState({roomImage: e});
        }).then(() => {
            firebase.database().ref("roomData/" + this.props.roomID).once("value", (snap3) => {
                this.setState({roomName: snap3.val()});
                name = snap3.val()
            }).then(() => {
            }).catch((e) => {alert(e.message)});
        }).catch((e) => {alert(this.props.roomID)});

        // firebase.database().ref("roomData/" + this.props.roomID).once("value", (snap3) => {
        //     this.setState({roomName: snap3.val()});
        // })
    }

    render() {
        return (
            <div style={{width: "100%", height: "10vh", backgroundColor: "goldenrod", border: "2px solid black", padding: "0 10px"}}>
                <Button sx={{boxSizing: "border-box", width: "100%", display: "flex", alignItems: "center", height: "100%"}} onClick={() => this.props.setRoomID(this.props.roomID)}>
                    <Avatar src={this.state.roomImage}></Avatar>
                    <Typography align="center" sx={{width: "100%", boxSizing: "border-box", color: "black"}} variant="h5">{this.state.roomName}</Typography>
                </Button>
            </div>
        )
    }
}

export default RoomButton;
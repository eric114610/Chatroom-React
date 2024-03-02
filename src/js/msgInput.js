import { Button, Grid, Divider, Box, Typography, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    IconButton,
    Paper,
    List, 
    Avatar} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

class MsgInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            ready: false
        };
    }

    sendMsg = () => {
        var msg = document.getElementById("msgInput").value;
        if(msg == "") return;
        var massage = {
            content: msg,
            sender: this.props.userData.Email,
            type: "massage"
        }
        console.log(massage)
        firebase.database().ref("roomContext/" + this.props.roomID).push(massage).then(() => {
            document.getElementById("msgInput").value = "";
            //alert("succ");
        }).catch(() => alert("DD"));
    }

    checkEnter = (e) => {
        //console.log(e.key);
        if(e.key == "Enter") {
            this.sendMsg();
        }
    }

    render() {
        return (
            <div style={{height: "100%", backgroundColor: "orange"}}>
                <Grid container direction={"row"} justifyContent={"space-between"} alignItems={"center"} style={{height: "100%", padding: "10px"}}>
                    <Grid style={{width: "90%", height: "100%"}}>
                        <TextField id="msgInput" fullWidth multiline
                        placeholder="Type in your message" rows={1} variant="outlined" style={{height: "100%", backgroundColor: "white"}}
                        onKeyDown={(e) => this.checkEnter(e)}
                        >
                        </TextField>
                    </Grid>
                    <Grid style={{width: "5%", height: "100%"}} justifyItems={"center"}>
                        <IconButton style={{height: "100%"}} onClick={() => {this.sendMsg()}}>
                            <SendIcon sx={{width: '100%', height: '100%' }} color="primary"/>
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default MsgInput;
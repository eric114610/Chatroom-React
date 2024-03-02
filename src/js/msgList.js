import { Button, Grid, Divider, Box, Typography, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    IconButton,
    Paper,
    List, 
    Avatar} from "@mui/material";
import MsgItem from "./msgItem";

class MsgList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            ready: false,
            msgList: ["EmPtYRoOm"],
            msgKey: [],
            msgCount: 0
        };
    }

    componentDidMount() {
        this.setState({ready: false})
        firebase.database().ref("roomContext/" + this.props.roomID).off()
        firebase.database().ref("roomContext/" + this.props.roomID).on("value", (snapshot) => {
            var newMsg = snapshot.val();
            var newMsgList = []
            var newMsgKey = []
            //console.log(newMsg);
            for(var i in newMsg) {
                //var key = Object.keys(newMsg)[i];
                console.log(i);
                if(newMsg[i].sender != "empty") {
                    newMsgList.push(newMsg[i])
                    newMsgKey.push(i);
                }
            }

            this.setState({msgList: newMsgList,msgKey: newMsgKey , ready: true});
        })

    }

    listRender = () => {
        var newList = []
        var tmpCount = this.state.msgCount;
        var count=0;
        if(this.state.msgList[0] == "EmPtYRoOm") 
            return <div></div>
        
        for(var i in this.state.msgList) {
            count++;
            // if(this.state.msgList[i].type == "back") {

            // }
            // else {
                if(this.state.msgList[i].sender == this.props.userData.Email)
                    newList.push(<MsgItem person={"user"} message={this.state.msgList[i].content} userPic={this.props.image} userName={this.props.userName} messageKey={this.state.msgKey[i]} roomID={this.props.roomID} type={this.state.msgList[i].type} userIntro={this.props.userData.intro}/>)
                else {
                    newList.push(<MsgItem person={this.state.msgList[i].sender} message={this.state.msgList[i].content} type={this.state.msgList[i].type}/>)
                }
            //}
        }

        document.getElementById('msgListDivTop').scrollTop = document.getElementById("msgListdiv").scrollHeight;
            //alert(document.getElementById("msgListdiv").scrollHeight);

        if(tmpCount!=count)
            this.setState({msgCount: count});

        return (newList)
    }


    render() {
        return (
            <div>
                <Paper elevation={2} style={{maxHeight: "75vh", backgroundColor: "transparent", overflowY: "auto", overflowX: "hidden",}} id="msgListDivTop">
                    
                    <Grid sx={{maxHeight: "75vh", minHeight: "75vh"}}  id="msgListdiv">
                        {this.state.ready && this.listRender()}
                        
                    </Grid>
                </Paper>
            </div>
        )
    }
}

export default MsgList
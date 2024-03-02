import { Button, Grid, Divider, Box, Typography, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField, 
    Avatar,
    IconButton} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            open2: false,
            open3: false
        };
    }


    render() {
        return (
            
            <div style={{padding: "10px 0", width: "100%", height: "100%", backgroundColor: "transparent"}}>
                <Typography textAlign={"center"} style={{height: "25%", overflowY: "hidden", overflowX: "hidden"}} variant="h6">{this.props.userData.Username}</Typography>
                <Grid container direction={"column"} style={{height: "80%"}} justifyContent={"space-evenly"} alignItems={"center"}>
                    <Grid item style={{maxWidth: "40%", maxHeight: "80%"}}>
                        {this.props.imageFile && this.props.image &&
                        <IconButton onClick={() => {this.setState({open2: true})}}>
                            <Avatar src={this.props.image} sx={{width: "10vh", height: "10vh"}}/>
                        </IconButton>
                        }
                        <Dialog sx={{justifyContent: "center"}} open={this.state.open2} onClose={() => {this.setState({open2: false})}} fullWidth maxWidth={"xs"}>
                            <DialogTitle>User Profile</DialogTitle>
                            <DialogContent>
                                <DialogContentText variant="h5">
                                    Username: {this.props.userData.Username}
                                </DialogContentText>                    
                                <DialogContentText> {" "}</DialogContentText>
                                <Box sx={{justifyContent: "flex-start", display: "flex", alignItems: "center"}}>
                                <DialogContentText sx={{fontSize: "3vh", width: "35%"}}>
                                    {"User picture:   "}
                                </DialogContentText>
                                <Avatar src={this.props.image} sx={{width: "10vh", height: "10vh"}}></Avatar>
                                </Box>
                                <DialogContentText sx={{fontSize: "3vh"}}>
                                    Intro: {this.props.userData.intro}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => {this.setState({open2: false})}}>Close</Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                    <Grid item>
                        <Grid container direction={"column"}>
                            <Grid item>
                                <Button variant="contained" id="logoutButton" endIcon={<LogoutIcon/>} onClick={() => {this.props.logout()}}>Logout</Button>
                            </Grid>
                            <Grid item>
                                <DropdownButton title="setting"  style={{marginTop: "1vh"}}>
                                    <Dropdown.Item as={"button"} onClick={() => {document.getElementById("imageInput").click();}}> change pic </Dropdown.Item>
                                    <Dropdown.Item as={"button"} onClick={() => {this.setState({open: true})}}> change username </Dropdown.Item>
                                    <Dropdown.Item as={"button"} onClick={() => {this.setState({open3: true})}}> change user intro </Dropdown.Item>
                                    <Dialog open={this.state.open} onClose={() => {this.setState({open: false})}}>
                                    <DialogContentText>
                                        Change your user name
                                    </DialogContentText>
                                    <TextField
                                        id="editUsernameInput"
                                        margin="dense"
                                        label="User Name (at most 30 character)"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <DialogActions>
                                        <Button onClick={() => {this.setState({open: false})}}>Cancel</Button>
                                        <Button onClick={() => {this.props.handleConfirm(); this.setState({open: false})}}>Confirm</Button>
                                    </DialogActions>
                                    </Dialog>

                                    <Dialog open={this.state.open3} onClose={() => {this.setState({open3: false})}}>
                                    <DialogContentText>
                                        Change your intro
                                    </DialogContentText>
                                    <TextField
                                        id="editIntroInput"
                                        margin="dense"
                                        label="User Intro (at most 100 character)"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                    />
                                    <DialogActions>
                                        <Button onClick={() => {this.setState({open3: false})}}>Cancel</Button>
                                        <Button onClick={() => {this.props.handleConfirm2(); this.setState({open3: false})}}>Confirm</Button>
                                    </DialogActions>
                                    </Dialog>

                                </DropdownButton>
                                <input type="file" id="imageInput" style={{display: "none"}} onChange={(e) => this.props.changePic(e)}/>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            
            
            </div>
                
            
        )
    }
}

export default UserProfile;
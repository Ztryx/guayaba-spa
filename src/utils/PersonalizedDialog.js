import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import connect from "react-redux/es/connect/connect";
import "./PersonalizedDialog.css";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class PersonalizedDialog extends Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
                TransitionComponent={Transition}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title" className={this.props.status}>
                    {this.props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {this.props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} fullWidth variant="contained" color="primary">
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default connect()(PersonalizedDialog);

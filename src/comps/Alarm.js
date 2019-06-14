import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Calendar from 'react-calendar';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class Alarm extends React.Component {
  state = {
    open: false,
    hours:'',
    minutes:'',
    date: new Date()
  };
  
  onChange(date)
  {
    this.setState({date: date})
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  saveData(ev)
  {
    let alarm = ev.target.value
    let timeArr = alarm.split(":")
    let date = this.state.date

    timeArr.map((t,i)=> t.startsWith('0') ? timeArr[i]=t.substring(1) : null)

    this.setState({
        hours: timeArr[0],
        minutes: timeArr[1]
    })
    
    this.props.check(timeArr[0], timeArr[1],date)
  }

  cancelAlarm()
  {
    this.setState({
      hours: "",
      minutes: ""
    })
    this.props.cancel()
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        {this.state.hours!=='' ? <span>{this.state.hours}:</span>: null}{this.state.minutes!=='' ? <span>{this.state.minutes}</span>: null}
        <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          Set Alarm Clock
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            When do you want us to wake you up?!
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              <input name="alarm" onChange={this.saveData.bind(this)} type="time" min="00:00" max="23:59"/>
             
            </Typography>
            <Calendar
          onChange={this.onChange.bind(this)}
          value={this.state.date}
        />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelAlarm.bind(this)} color="primary">
              Cancel Alarm
            </Button >
            <Button onClick={this.handleClose} color="primary">
              Save changes
            </Button >
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Alarm;

import React from 'react';
import './App.css';
import Alarm from './comps/Alarm';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';


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



class App extends React.Component{
  state = {
    currentTime: {
              hours:'',
              minutes:''
            },
    alarmTime: false,
    open: false
  };


  componentDidMount()
  {
    let nowtime = new Date()
    let hours = nowtime.getHours()
    let minutes = nowtime.getMinutes()

    this.setState({currentTime:{
                hours:hours,
                minutes: minutes,
              }})

    setInterval(() => {
      let currentMin = this.state.currentTime.minutes + 1;
      this.checkHourse(currentMin)

      currentMin === 60 ? this.setState({currentTime:{
        hours: this.state.currentTime.hours,
        minutes: 0
      }}):
      this.setState({currentTime:{
        hours: this.state.currentTime.hours,
        minutes: currentMin
      }})
    }, 60000);
  }

  
  
  checkHourse(currentMin)
  {
      if(currentMin === 60)
      { 
        if(this.state.currentTime.hours === 23)
        {
          this.setState({currentTime:{
            hours: 0
          }})
        }else{
        this.setState({currentTime:{
          hours: this.state.currentTime.hours +1 
        }})
      }
     }
  }

   checkAlarm(hours,minutes, date)
  {
    window.intervalID = setInterval(() => {
      
    let dateNow= new Date()

    let nowDay=dateNow.getDate()
    let nowMonth=dateNow.getMonth()
    let nowYear=dateNow.getFullYear()
    let todayFull = `${nowDay}${nowMonth}${nowYear}`

    if(date===todayFull)
    {
      let currentHour = this.state.currentTime.hours.toString();
      let currentMinute = this.state.currentTime.minutes.toString();


      if(currentHour.startsWith('0'))
      {
        currentHour=currentHour.substring(1)

      }
      if(currentMinute.startsWith('0'))
      {
        currentHour=currentMinute.substring(1)
      }

      currentHour=hours && currentMinute===minutes ? this.setState({open:true}): null;


    }
  }, 10000)
  }

   cancelAlerm()
  {
    for(var i=0;i<999;i++)
    {
      clearInterval(i)
    }
    this.componentDidMount()
  }
  
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    localStorage.clear()
    this.setState({ open: false });
    clearTimeout(window.snooneInterval)
    this.cancelAlerm()
  };
 
  snooozing()
  {
    this.setState({open: false})
   window.snooneInterval=setTimeout(()=>{
     this.cancelAlerm()
      this.setState({open: true})
    },10000)
  }
  

  render() {
    return <div className="App">
      <Container>
        <h1>Alarm Clock</h1>
      <div className='clock'><div className='digits'>{this.state.currentTime.hours < 10 ? <span>0{this.state.currentTime.hours}</span>:<span>{this.state.currentTime.hours}</span>}:{this.state.currentTime.minutes<10 ? <span>0{this.state.currentTime.minutes}</span>: <span>{this.state.currentTime.minutes}</span>}</div></div>
      <Alarm check={this.checkAlarm.bind(this)} cancel={this.cancelAlerm.bind(this)}/>
      </Container>

 
  
 
        
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          WAKE UP
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Time to wakeup!
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
                OK
            </Button>
            <Button onClick={this.snooozing.bind(this)} color="primary">
                SNOOZE
            </Button>
          </DialogActions>
        </Dialog>

      
    </div>;
  }
}

export default App;

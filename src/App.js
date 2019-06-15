import React from 'react';
import './App.css';
import Alarm from './comps/Alarm';
import intervalID from './globalVar'
import Snooze from './comps/Snooze';
import Container from '@material-ui/core/Container';



class App extends React.Component{
  state = {
    currentTime: {
              hours:'',
              minutes:''
            },
    alarmTime: false,
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
    console.log(date)
    intervalID =  setInterval(() => {

    console.log('interval')
    let dateNow= new Date()

    let nowDay=dateNow.getDate()
    let nowMonth=dateNow.getMonth()
    let nowYear=dateNow.getFullYear()
    let todayFull = `${nowDay}${nowMonth}${nowYear}`

    if(date===todayFull)
    {
      console.log('date is the same now checking hour')
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

      currentHour=hours && currentMinute===minutes ? this.setState({alarmTime: true}): null;
    }
  }, 20000)
  
  }

  cancelAlerm()
  {
    console.log('End interval')
      clearInterval(intervalID)
  }

 

  render() {
    return <div className="App">
      <Container>
        <h1>Alarm Clock</h1>
      <div className='clock'><div className='digits'>{this.state.currentTime.hours < 10 ? <span>0{this.state.currentTime.hours}</span>:<span>{this.state.currentTime.hours}</span>}:{this.state.currentTime.minutes<10 ? <span>0{this.state.currentTime.minutes}</span>: <span>{this.state.currentTime.minutes}</span>}</div></div>
      <Alarm check={this.checkAlarm.bind(this)} cancel={this.cancelAlerm.bind(this)}/>
      {this.state.alarmTime===true ? <Snooze/> : null}
      </Container>
    </div>;
  }
}

export default App;

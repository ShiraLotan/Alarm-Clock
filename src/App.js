import React from 'react';
import './App.css';
import Alarm from './comps/Alarm';



class App extends React.Component{
  state = {
    currentTime: {
              hours:'',
              minutes:''
            },
    alarmTime: '',
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
    }, 1000);
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

  let intervalID =  setInterval(() => {
    console.log('interval')

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

      currentHour=hours && currentMinute===minutes ? alert('alarm') : null;
    }
    , 1000);
    this.setState({intervalID:intervalID})
  }

  cancelAlerm()
  {
    console.log('End interval')
      clearInterval(this.state.intervalID)
  }

 

  render() {
    return <div className="App">
      <div>{this.state.currentTime.hours < 10 ? <span>0{this.state.currentTime.hours}</span>:<span>{this.state.currentTime.hours}</span>}:{this.state.currentTime.minutes<10 ? <span>0{this.state.currentTime.minutes}</span>: <span>{this.state.currentTime.minutes}</span>}</div>
      <Alarm check={this.checkAlarm.bind(this)} cancel={this.cancelAlerm.bind(this)}/>

    </div>;
  }
}

export default App;

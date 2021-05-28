import React, { Component } from 'react'

 class DrumMachine extends Component {
        
 constructor(props) {
   super(props)
 
   this.state = {
      id : "Audio",
      display : ''
   }
 }
 

 
 play(){
   var Audio = document.getElementById(this.state.id)
   Audio.play()
  
 
   window.Object.onkeyup == function(event){
     if(event.onkeyup =="q"|| event.onkeyup=="Q"){
       document.getElementById("display").innerHTML = "Drums"
     }else if(event.onkeyup =="w"|| event.onkeyup=="W"){
       document.getElementById ("display").innerHTML="Piano"
     }else if(event.onkeyup =="e"|| event.onkeyup=="E"){
      document.getElementById ("display").innerHTML="Sitar"
    }else if(event.onkeyup =="a"|| event.onkeyup=="A"){
      document.getElementById ("display").innerHTML="Flute"
    }else if(event.onkeyup =="s"|| event.onkeyup=="S"){
      document.getElementById ("display").innerHTML="Shehnai"
    }else if(event.onkeyup =="d"|| event.onkeyup=="D"){
      document.getElementById ("display").innerHTML="Claps"
    }else if(event.onkeyup =="z"|| event.onkeyup=="Z"){
      document.getElementById ("display").innerHTML="shehnai"
    }else if(event.onkeyup =="x"|| event.onkeyup=="X"){
      document.getElementById ("display").innerHTML="tabla"
    }else if(event.onkeyup =="c"|| event.onkeyup=="C"){
      document.getElementById ("display").innerHTML="manjira"
    }
  }
}
    
    render() {
      
      
        return (
            <div id ="drum-machine">
            <div id="display">
         
                
            </div>
            <div id="buttons">
            <div id="first">
          <button className="drum-pad  btn-lg btn btn-primary" id="Q" onClick={this.play} >Q</button>
         <audio src="./QuoteMachine/audioFiles/Sample.mp3" id="Audio" />
          <button className="drum-pad btn-lg   btn btn-danger">W</button>
          <audio src="./QuoteMachine/audioFiles/Sample1.mp3" id="Audio" />
          <button className="drum-pad btn-lg btn btn-success">E</button>
          <audio src="./QuoteMachine/audioFiles/Sample2.mp3" id="Audio" />
          </div>
          <div id="second">
          <button className="drum-pad btn-lg  btn btn-warning">A</button>
          <audio src="./QuoteMachine/audioFiles/Sample3.mp3" id="Audio" />
          
          <button className="drum-pad btn-lg btn btn-link">S</button>
          <audio src="./QuoteMachine/audioFiles/Sample4.mp3" id="Audio" />
          <button className="drum-pad btn-lg btn btn-info">D</button>
          <audio src="./QuoteMachine/audioFiles/Sample5.mp3" id="Audio" />
          </div>
          <div id="third">

          <button className="drum-pad  btn-lg  btn btn-secondary">Z</button>
          <audio src="./QuoteMachine/audioFiles/Sample6.mp3" id="Audio" />
          <button className="drum-pad btn-lg btn btn-primary">X</button>
          <audio src="./QuoteMachine/audioFiles/Sample7.mp3" id="Audio" />
          <button className="drum-pad btn-lg btn btn-success">C</button>
          <audio src="./QuoteMachine/audioFiles/Sample8.mp3" id="Audio" />
          </div>
          </div>
          </div>
        )
    }
}

export default DrumMachine

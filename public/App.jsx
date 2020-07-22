import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '../client/Stylesheet.css'
class App extends React.Component {
    constructor(props){
        super(props)
        this.speed =1000;
        this.playStop =true;
        this.state={
            input: 0,
            minets:0,
            sec:0,
            isActiv:false
          }
    }
   
    //this is the function that responsable for calling the count down function
    start() {
        if(this.playStop){
            this.interval = setInterval(() => {
            this.timer();
          }, this.speed);
        }

    }
    handleChange(e) {
         this.setState({ input: e.target.value });
      }
      //get the number, change it into m/s and call thestart function
      getNumber() {
          if(this.state.input<=0){
              alert("enter number bigger than 0")
              return
          }else{
                      this.setState(({ isActiv }) => ({
            isActiv: !isActiv
        }))
          this.setState({
              minets: this.state.input-1,
              sec: 59
          })
          
          this.start();
          }
      }
          //this is the function that responsable for the count down

       timer(){
           
           if(this.state.sec != 0 || this.state.minets !=0){
                this.setState(({ sec }) => ({
            sec: sec - 1
        }))
          if(this.state.sec === 0 && this.state.minets !=0){
             this.setState(({ minets }) => ({
                minets: minets - 1
            }))
             this.setState({ sec:59 })
              

          }
           }
        
         }
             //this is the function that responsable for changing the speed and pause/resume

         changeSpeed(e){
             
            clearInterval( this.interval );
             if(e.srcElement.id === "2.0X"){
                 this.speed= 500

             }else if(e.srcElement.id === "1.0X"){
                this.speed= 1000
             }else if(e.srcElement.id === "1.5X"){
                this.speed= 750
             }else if(e.srcElement.id === "Play"){
                this.playStop= true
                this.setState(({ isActiv }) => ({
                    isActiv:isActiv
                }))
             }else if(e.srcElement.id === "Stop"){
                this.playStop= false
                this.setState(({ isActiv }) => ({
                    isActiv:isActiv
                }))
             }
             this.start();
         }
         playOrStop(){
            if(this.playStop){
                return( <button style={{marginLeft:"3px",marginRight:"3px",width:"81%"}} id="Stop" type="button" className="btn btn-danger">Pause</button>)

            }else{
                return(<button style={{marginLeft:"3px",marginRight:"3px",width:"81%"}} id="Play" type="button" className="btn btn-success">Resume</button>)  
            }
         }
         itIsNotActiv(){
             return(<div style={{marginTop:"30px", maxWidth: "450px",minWidth: "285px" }} className="container input-group mb-3">
             <input type="number" min="0" className="form-control" onChange={()=> this.handleChange(event) } placeholder="(Min)" aria-label="()Min" aria-describedby="button-addon2"></input>
             <div className="input-group-append">
                 <button className="btn btn-success" onClick={()=>this.getNumber()} type="button" id="button-addon2">Start</button>
             </div>
         </div>)
         }

         itIsActiv(){
            return(<div className='center' style={{marginTop:"15px", maxWidth: "350px",minWidth: "285px" }}>
                {this.halfway()}
                {this.lessThan()}
                 <div style={{display:"block",marginBottom:"8px", width:"100%"}} className="btn-group" onClick={()=>this.changeSpeed(event)} role="group" aria-label="Basic example">
                    <button style={{marginLeft:"3px",marginRight:"3px",width:"26%"}} id="1.0X" type="button" className="btn btn-secondary">1.0X</button>
                    <button style={{marginLeft:"3px",marginRight:"3px",width:"26%"}} id="1.5X" type="button" className="btn btn-secondary">1.5X</button>
                    <button style={{marginLeft:"3px",marginRight:"3px",width:"26%"}} id="2.0X" type="button" className="btn btn-secondary">2.0X</button>
                    </div>
                    <div style={{display:"block",marginTop:'4px', width:"100%"}} className="btn-group" onClick={()=>this.changeSpeed(event)} role="group" aria-label="Basic example">
                    {this.playOrStop()}
                 </div>
            </div>)
        }
        halfway(){
            if(this.state.input == 1 && this.state.sec<=30 && this.state.sec != 0 && this.state.isActiv){
                return(<h4 style={{width:"100%"}}>More than halfway there!</h4>)
            }else if(Math.round(this.state.input/2)> this.state.minets && this.state.isActiv && this.state.input != 1){
                if(this.state.minets !=0 ||this.state.sec !=0){
                    return(<h4 style={{width:"100%"}}>More than halfway there!</h4>)
                }else{
                    return(<h4 style={{width:"100%"}}>Time’s up!</h4>)
                }
            }else if(this.state.sec === 0 && this.state.minets === 0 && this.state.isActiv){
                return(<h4 style={{width:"100%"}}>Time’s up!</h4>)
            }
        }
        lessThan(){
            if(this.state.minets ===0 &&this.state.sec <=20 && this.state.sec >10){
                return(<h1 style={{width:"100%", fontSize:"5em"}} className='red'>{this.state.minets<10?"0"+this.state.minets:this.state.minets}:{this.state.sec<10?"0"+this.state.sec:this.state.sec}</h1>)
            }else if(this.state.minets ===0 && this.state.sec <=10 && this.state.sec >0){
               return(<h1 style={{width:"100%", fontSize:"5em"}} className='blink red'>{this.state.minets<10?"0"+this.state.minets:this.state.minets}:{this.state.sec<10?"0"+this.state.sec:this.state.sec}</h1>)
           }else if(this.state.minets ===0 && this.state.sec ===0){
               return(<h1 style={{width:"100%", fontSize:"5em"}} className='red'>{this.state.minets<10?"0"+this.state.minets:this.state.minets}:{this.state.sec<10?"0"+this.state.sec:this.state.sec}</h1>)

           }else{
            return(<h1 style={{width:"100%", fontSize:"5em"}}>{this.state.minets<10?"0"+this.state.minets:this.state.minets}:{this.state.sec<10?"0"+this.state.sec:this.state.sec}</h1>)

        }
        }
    render(){
        
        return(
            
        <>
        {!this.state.isActiv?this.itIsNotActiv():this.itIsActiv()}
         </>
         )
    }
}

ReactDOM.render(<App />, document.getElementById('body'))
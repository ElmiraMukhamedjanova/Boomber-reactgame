
class App extends React.Component{
   constructor(props) {
      super(props);
      this.cube = [];
      this.randomCube = [];
      this.score = 0;
      this.state = {
         inputdata: 3,
         cubesize: 0,
         cubequant: 0,
         score: 0,
         disabled: false
      }
      
   };
   
   render(){
    return(
            <div>        
                     <h3 className="level">{this.state.inputdata}</h3>
                     <input className="range" type="range" onChange={this.onChangeEvent} min="3" max="15" step="1" value={this.state.inputdata} />
                     <button onClick={this.onClickEvent} className="buttonstart">start</button>
                     <h2 className="score">Score: {this.state.score}</h2>
                     <div className="cubeBase" style={{width : this.state.cubesize}}>
                        {this.cube}
                     </div>
                  
            </div>
         );
   }
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
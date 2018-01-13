
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
   onChangeEvent(e){   
      this.setState({inputdata:e.target.value});
   }  
   onClickEvent(){
      this.cube = [];
      this.randomCube.map((arr, index) => {this.returnToDefaultCube()});
      if (this.state.inputdata > 0 ) {      
         let cubesize = this.state.inputdata * 40;
         this.setState({cubesize: cubesize, cubequant:this.state.inputdata});

         this.randomCube = [];
         while(this.randomCube.length < this.state.inputdata){
            let rand = Math.floor(Math.random() * Math.pow(this.state.inputdata, 2));
            if(this.randomCube.indexOf(rand) > -1) continue;
            this.randomCube[this.randomCube.length] = rand;
         }

         this.cube = []; 
         for (var i = Math.pow(this.state.inputdata, 2) - 1; i >= 0; i--) {
            var temp = "";
            this.randomCube.map((ar, index) => { 
               ar == i ? temp = 'X' : false;
            })
            var tempAr = [];
            var boxQuant = Math.pow(this.state.inputdata, 2) - 1;
            var input = Number(this.state.inputdata);
            var n = 0;
            while(n <= boxQuant){
                tempAr.push(n);
                n = n + input;
            }           
            this.cube.push(<button className="cube" onClick={this.onBombClick} key={i} data-id={i} data-linend={tempAr.includes(i) ? 1 : 0}>{/*temp ? temp : '0'*/}</button>);  
         }  
      }else{
         this.setState({cubequant:0});
         console.log('Entered: 0');
      }
   } 
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
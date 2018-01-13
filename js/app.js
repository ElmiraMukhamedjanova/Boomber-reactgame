
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
      this.onClickEvent = this.onClickEvent.bind(this);
      this.onChangeEvent = this.onChangeEvent.bind(this);
      this.onBombClick = this.onBombClick.bind(this);
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
   onBombClick(e){
      this.randomCube.map((arr, index) => {
         if(arr == e.target.getAttribute('data-id')){ 
            this.returnToDefaultCube(index);
            alert('Looser!');
            this.score = 0;   
            this.onClickEvent();          
         }else{        
            e.target.setAttribute("disabled", "");            
            var current_target = Number(e.target.getAttribute('data-id'));
            var curElementSib = Number(e.target.getAttribute('data-linend'));
            var nextElementSib = e.target.nextElementSibling ? Number(e.target.nextElementSibling.getAttribute('data-linend')) : 0;
            var prevElementSib = e.target.previousElementSibling ? Number(e.target.previousElementSibling.getAttribute('data-linend')) : 0;
            var blockStatus = false;
            var prev_target = current_target + 1;
            var next_target = current_target - 1;
            var top_target = current_target + Number(this.state.inputdata);
            var bottom_target = current_target - Number(this.state.inputdata); 
            
            this.randomCube.map((arr2, index2) => {          
               if (bottom_target == Number(arr2) || top_target == Number(arr2)){ 
                  blockStatus = true;
               }else if (prev_target == Number(arr2) &&  curElementSib == 0 && prevElementSib == 0) {
                  blockStatus = true;
               }else if (prev_target == Number(arr2) && prevElementSib == 0) {
                  blockStatus = true;
               }else if (next_target == Number(arr2) && curElementSib == 0 && nextElementSib == 0) {
                  blockStatus = true; 
               }else if (next_target == Number(arr2) && curElementSib == 0) {
                  blockStatus = true; 
               }
            })
              
            if (blockStatus == true) {
               e.target.setAttribute("class", "cube orange");
            } else{
               e.target.setAttribute("class", "cube disabled");
            }           
            this.score++;    
               
         }
      })     
      this.setState({score: Math.floor(this.score/this.state.inputdata), reset: Math.floor(this.score/this.state.inputdata)});
   
      if (this.state.score + 1 == Math.pow(this.state.inputdata, 2) - this.state.inputdata) {
         alert('Good Job! You are Winner!');
          this.score = 0;
      }
   }
   returnToDefaultCube(index){
      var snapCount = document.getElementsByClassName('cube');
            setTimeout(function(){
               for (index = 0; index < snapCount.length; ++index) {
                  snapCount[index].setAttribute("class", "cube");
                  snapCount[index].removeAttribute("disabled");
               }
            }, 0.5)  
   }
   render(){
    return(
            <div>
               <div className="wrapper">
                  <div className="leftpanel">
                  <h1 className="title">The B<span className="fa fa-bomb"></span>mber</h1>
                     <h3 className="level">{this.state.inputdata}</h3>
                     <input className="range" type="range" onChange={this.onChangeEvent} min="3" max="15" step="1" value={this.state.inputdata} />
                     <br/>
<h2 className="score">Score: {this.state.score}</h2>
                     <button onClick={this.onClickEvent} className="buttonstart"><span className="fa fa-play-circle-o"></span></button>
                     
                     <button onClick={this.onClickEvent} className="buttonrestart"><span className="fa fa-repeat"></span></button>
                  </div>
                  <div className="rightpanel">
                     <div className="cubeBase" style={{width : this.state.cubesize}}>
                        {this.cube}
                     </div>
                  </div>
               </div>
            </div>
         );
   }
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
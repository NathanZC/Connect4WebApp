import React from 'react';
import './App.css';





class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id:this.props.id,
      spot:this.props.spot,
      colRow:this.props.colRow
    };
    
    // Bind play function to App component

  }
  componentDidMount() {
    

    
}

  render(){
    
    
    
    if (this.props.spot === 0){ 
    return (
      <div
        onClick={() => {  this.props.clicked(this.state.colRow)  }}
        className={'emptyCell' }
        id={this.state.id}
    />
    );
    } else if (this.props.spot === 1) {
      return (
        <div
          onClick={() => {  this.props.clicked(this.state.colRow)  }}
          className={'playerOneCell'}
          id={1}
      />
      );
    }else {
      return (
        <div
          onClick={() => {  this.props.clicked(this.state.colRow)  }}
          className={'playerTwoCell'}
          id={1}
      />
      );
    }
  }
}






class Grid2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneTurn: 0,
      board: [],
      boardDisplay: [],
      message: 'PLAYER 1 GO!'
    };
    
    // Bind play function to App component

  }
  componentDidMount() {
    this.initBoard();
  }
dropPeice(col, player) {
    if(player === 1){
    this.state.board[this.nextAvalibleRowInCol(col)][col] = 1;
    } else {
    this.state.board[this.nextAvalibleRowInCol(col)][col] = 2;
    }
}
miniMax(depth,isMaximizing, alpha,beta) {
    var moves = this.getAllPossibleMoves();
    var score = 0;
    if(this.gameOver() || moves.length === 0 || depth === 0){
        if(this.checkWinner() === 'P1'){
            return(-100000);
        }else if(this.checkWinner() === 'P2'){
            return(100000);
        }else if(moves.length === 0){
            return(0);
        }else{
            return(0);
        }
    }else {
        if(isMaximizing){
            var bestScore = -Infinity;
            for(var i = 0; i < moves.length;i++){ 
                this.dropPeice(moves[i],2)
                score = this.miniMax(depth-1,false,alpha,beta);
                this.undoMove(moves[i],2);
                bestScore = Math.max(score,bestScore);
                alpha = Math.max(alpha,bestScore);
                if(beta <= alpha ){
                    break;
                }
            }
            return(bestScore);
        }else {
            bestScore = Infinity;
            for(i = 0; i < moves.length;i++){ 
            this.dropPeice(moves[i],1)
            score = this.miniMax(depth-1,true,alpha,beta);
            this.undoMove(moves[i],1);
            bestScore = Math.min(score,bestScore);
            beta = Math.min(beta,bestScore);
            if(beta <= alpha ){
                break;
               }
            }
            return(bestScore);
        }
    }


}
undoMove(col,player){
    if(player === 1){
        this.state.board[this.nextAvalibleRowInCol(col)+1][col] = 0;
        } else {
        this.state.board[this.nextAvalibleRowInCol(col)+1][col] = 0;
        }
}
 nextAvalibleRowInCol(col) {
		var emptySpotFound = false;
		var rowPosition = 6 - 1;

		while (!emptySpotFound) {
			// if row is full then the index will go to -1 wich will cause a error when it
			// gets -1 index of the list. If the row is full the indexes will keep counting
			// past 0 but this will stop it and just return -1 so I know the column is full
			// if this method return -1 for the row

			if (rowPosition < 0) {
				return -1;
			} else {
				if (this.state.board[rowPosition][col] === 0) {
					emptySpotFound = true;

				} else {
					rowPosition--;
				}

			}

		}
		return rowPosition;

	}
  updateboard() {
    
    var NewBoardcopy = [];
    for(var i = 0; i<7;i++){
      NewBoardcopy[i] = [];
    }
    
        for(var z =0; z <6; z++){
          for(var c =0; c<7;c++){
            NewBoardcopy[z][c] =  <Cell clicked={this.clicked} key={z+' '+c} id={z+' '+c} spot={this.state.board[z][c]}/>
          }
         
        }
        
        


    this.setState({
      boardDisplay:NewBoardcopy,
    });
  }
  validMove(x) {
    var isValid = false;
    
    if (this.nextAvalibleRowInCol(x) !== -1) {
      isValid = true;
    }
    return isValid;
  }
  gameOver() {
    var rows = 6;
    var cols = 7;
    var gameOver = false;
          // checks to see if player got 4 horizontally in a row
          var horizontalCounterP1 = 0;
          var horizontalCounterP2 = 0;
          for (var i = 0; i < rows; i++) {
              horizontalCounterP1 = 0;
              horizontalCounterP2 = 0;
              for (var j = 0; j < cols; j++) {
                  if (this.state.board[i][j] === 1) {
                      horizontalCounterP1++;
                  } else {
                      horizontalCounterP1 = 0;
                  }
                  if (this.state.board[i][j] === 2) {
                      horizontalCounterP2++;
                  } else {
                      horizontalCounterP2 = 0;
                  }
  
                  if (horizontalCounterP2 >= 4) {
                      gameOver = true;
                      // System.out.println("GAME OVER Player 2 WINS!");
                      break;
                  }
                  if (horizontalCounterP1 >= 4) {
                      gameOver = true;
                      // System.out.println("GAME OVER Player 1 WINS!");
                      break;
  
                  }
              }
      }
      var verticalCounterP1 = 0;
          var verticalCounterP2 = 0;
          for ( i = 0; i < cols; i++) {
              verticalCounterP1 = 0;
              verticalCounterP2 = 0;
              for ( j = 0; j < rows; j++) {
                  if (this.state.board[j][i] === 1) {
                      verticalCounterP1++;
  
                  } else {
                      verticalCounterP1 = 0;
                  }
                  if (this.state.board[j][i] === 2) {
                      verticalCounterP2++;
                  } else {
                      verticalCounterP2 = 0;
                  }
  
                  if (verticalCounterP1 >= 4) {
                      gameOver = true;
                      // System.out.println("GAME OVER Player 1 WINS!");
                      break;
                  }
                  if (verticalCounterP2 >= 4) {
                      gameOver = true;
                      // System.out.println("GAME OVER Player 2 WINS!");
                      break;
  
                  }
              }
      }
  
      var diagonalCounterP1 = 0;
          var diagonalCounterP2 = 0;
          for (var k = 0; k < rows; k++) {
              diagonalCounterP1 = 0;
              diagonalCounterP2 = 0;
              for ( j = 0; j <= k; j++) {
                   i = k - j;
                  if (this.state.board[i][j] === 1) {
                      diagonalCounterP1++;
  
                  } else {
                      diagonalCounterP1 = 0;
                  }
                  if (this.state.board[i][j] === 2) {
                      diagonalCounterP2++;
                  } else {
                      diagonalCounterP2 = 0;
                  }
  
                  if (diagonalCounterP1 >= 4) {
                      gameOver = true;
                      // System.out.println("GAME OVER Player 1 WINS!");
                      
                  }
                  if (diagonalCounterP2 >= 4) {
                      gameOver = true;
                      // System.out.println("GAME OVER Player 2 WINS!");
                  
  
                  }
  
              }
  
          }
          for ( k = cols - 2; k >= 0; k--) {
              diagonalCounterP1 = 0;
              diagonalCounterP2 = 0;
              for ( j = 0; j <= k; j++) {
                   i = k - j - 1;
  
                  if (this.state.board[cols - j - 2][cols - i - 2] === 1) {
  
                      diagonalCounterP1++;
  
                  } else {
                      diagonalCounterP1 = 0;
                  }
                  if (this.state.board[cols - j - 2][cols - i - 2] === 2) {
                      diagonalCounterP2++;
                  } else {
                      diagonalCounterP2 = 0;
                  }
  
                  if (diagonalCounterP1 >= 4) {
                      gameOver = true;
                      // System.out.println("GAME OVER Player 1 WINS!");
                  
                  }
                  if (diagonalCounterP2 >= 4) {
                      gameOver = true;
                      // System.out.println("GAME OVER Player 2 WINS!");
                      
  
                  }
  
              }
  
          }
  
          // reverse diagonal (Bottom right to top left)
  
          for ( i = rows - 1; i >= 0; i--) {
              diagonalCounterP1 = 0;
              diagonalCounterP2 = 0;
  
              for (var j = 0, x = i; x <= rows - 1; j++, x++) {
  
                  if (this.state.board[x][j] === 1) {
                      diagonalCounterP1++;
  
                  } else {
                      diagonalCounterP1 = 0;
                  }
                  if (this.state.board[x][j] === 2) {
                      diagonalCounterP2++;
                  } else {
                      diagonalCounterP2 = 0;
                  }
  
                  if (diagonalCounterP1 >= 4) {
                      gameOver = true;
                      // System.out.println("GAME OVER Player 1 WINS!");
                      
                  }
                  if (diagonalCounterP2 >= 4) {
                      gameOver = true;
                      // System.out.println("GAME OVER Player 2 WINS!");
                  
  
                  }
              }
  
          }
  
          for ( i = 0; i <= rows - 1; i++) {
              diagonalCounterP1 = 0;
              diagonalCounterP2 = 0;
  
              for (var j = 0, z = i; z <= rows - 1; j++, z++) {
  
                  if (this.state.board[j][z + 1] === 1) {
                      diagonalCounterP1++;
  
                  } else {
                      diagonalCounterP1 = 0;
                  }
                  if (this.state.board[j][z + 1] === 2) {
                      diagonalCounterP2++;
                  } else {
                      diagonalCounterP2 = 0;
                  }
  
                  if (diagonalCounterP1 >= 4) {
                      gameOver = true;
                      // System.out.println("GAME OVER Player 1 WINS!");
                      
                  }
                  if (diagonalCounterP2 >= 4) {
                      gameOver = true;
                      // System.out.println("GAME OVER Player 2 WINS!");
                      
  
                  }
              }
  
          }
          // to check to see if any player got a vertical 4 in a row
          
  //both of these only check the diagonals from the left side to the right side (Bottom left to top right /)
          
  
          return gameOver;
      }
    


toAString(x) {
if(x === 1){
    return('one');
}
if(x === 2){
    return('two');
}
if(x === 3){
    return('three');
}
if(x === 4){
    return('four');
}
if(x === 5){
    return('five');
}
if(x === 6){
    return('six');
}else {
    return('seven');
}


}

      checkWinner() {
        var rows = 6;
        var cols = 7;
                // checks to see if player got 4 horizontally in a row
                var horizontalCounterP1 = 0;
                var horizontalCounterP2 = 0;
                for (var i = 0; i < rows; i++) {
                    horizontalCounterP1 = 0;
                    horizontalCounterP2 = 0;
                    for (var j = 0; j < cols; j++) {
                        if (this.state.board[i][j] === 1) {
                            horizontalCounterP1++;
                        } else {
                            horizontalCounterP1 = 0;
                        }
                        if (this.state.board[i][j] === 2) {
                            horizontalCounterP2++;
                        } else {
                            horizontalCounterP2 = 0;
                        }
        
                        if (horizontalCounterP2 >= 4) {
                            return('P2');
                            // System.out.println("GAME OVER Player 2 WINS!");
                            
                        }
                        if (horizontalCounterP1 >= 4) {
                            return('P1');
                            // System.out.println("GAME OVER Player 1 WINS!");
    
        
                        }
                    }
            }
            var verticalCounterP1 = 0;
                var verticalCounterP2 = 0;
                for (i = 0; i < cols; i++) {
                    verticalCounterP1 = 0;
                    verticalCounterP2 = 0;
                    for (j = 0; j < rows; j++) {
                        if (this.state.board[j][i] === 1) {
                            verticalCounterP1++;
        
                        } else {
                            verticalCounterP1 = 0;
                        }
                        if (this.state.board[j][i] === 2) {
                            verticalCounterP2++;
                        } else {
                            verticalCounterP2 = 0;
                        }
        
                        if (verticalCounterP1 >= 4) {
                            return('P1');
                            // System.out.println("GAME OVER Player 1 WINS!");
    
                        }
                        if (verticalCounterP2 >= 4) {
                            return('P2');
                            // System.out.println("GAME OVER Player 2 WINS!");
    
        
                        }
                    }
            }
        
            var diagonalCounterP1 = 0;
                var diagonalCounterP2 = 0;
                for (var k = 0; k < rows; k++) {
                    diagonalCounterP1 = 0;
                    diagonalCounterP2 = 0;
                    for (j = 0; j <= k; j++) {
                        i = k - j;
                        if (this.state.board[i][j] === 1) {
                            diagonalCounterP1++;
        
                        } else {
                            diagonalCounterP1 = 0;
                        }
                        if (this.state.board[i][j] === 2) {
                            diagonalCounterP2++;
                        } else {
                            diagonalCounterP2 = 0;
                        }
        
                        if (diagonalCounterP1 >= 4) {
                            return('P1');
                            // System.out.println("GAME OVER Player 1 WINS!");
    
                        }
                        if (diagonalCounterP2 >= 4) {
                            return('P2');
                            // System.out.println("GAME OVER Player 2 WINS!");
    
        
                        }
        
                    }
        
                }
                for (k = cols - 2; k >= 0; k--) {
                    diagonalCounterP1 = 0;
                    diagonalCounterP2 = 0;
                    for (j = 0; j <= k; j++) {
                        i = k - j - 1;
        
                        if (this.state.board[cols - j - 2][cols - i - 2] === 1) {
        
                            diagonalCounterP1++;
        
                        } else {
                            diagonalCounterP1 = 0;
                        }
                        if (this.state.board[cols - j - 2][cols - i - 2] === 2) {
                            diagonalCounterP2++;
                        } else {
                            diagonalCounterP2 = 0;
                        }
        
                        if (diagonalCounterP1 >= 4) {
                            return('P1');
                            // System.out.println("GAME OVER Player 1 WINS!");
    
                        }
                        if (diagonalCounterP2 >= 4) {
                            return('P2');
                            // System.out.println("GAME OVER Player 2 WINS!");
    
                        }
        
                    }
        
                }
        
                // reverse diagonal (Bottom right to top left)
        
                for ( i = rows - 1; i >= 0; i--) {
                    diagonalCounterP1 = 0;
                    diagonalCounterP2 = 0;
        
                    for (var j = 0, x = i; x <= rows - 1; j++, x++) {
        
                        if (this.state.board[x][j] === 1) {
                            diagonalCounterP1++;
        
                        } else {
                            diagonalCounterP1 = 0;
                        }
                        if (this.state.board[x][j] === 2) {
                            diagonalCounterP2++;
                        } else {
                            diagonalCounterP2 = 0;
                        }
        
                        if (diagonalCounterP1 >= 4) {
                            return('P1');
                            // System.out.println("GAME OVER Player 1 WINS!");
                          
                        }
                        if (diagonalCounterP2 >= 4) {
                            return('P2');
                            // System.out.println("GAME OVER Player 2 WINS!");
                         
        
                        }
                    }
        
                }
        
                for ( i = 0; i <= rows - 1; i++) {
                    diagonalCounterP1 = 0;
                    diagonalCounterP2 = 0;
        
                    for (var j = 0, z = i; z <= rows - 1; j++, z++) {
        
                        if (this.state.board[j][z + 1] === 1) {
                            diagonalCounterP1++;
        
                        } else {
                            diagonalCounterP1 = 0;
                        }
                        if (this.state.board[j][z + 1] === 2) {
                            diagonalCounterP2++;
                        } else {
                            diagonalCounterP2 = 0;
                        }
        
                        if (diagonalCounterP1 >= 4) {
                            return('P1');
                            // System.out.println("GAME OVER Player 1 WINS!");
                          
                        }
                        if (diagonalCounterP2 >= 4) {
                            return('P2');
                            // System.out.println("GAME OVER Player 2 WINS!");
                          
        
                        }
                    }
        
                }
                // to check to see if any player got a vertical 4 in a row
                
        //both of these only check the diagonals from the left side to the right side (Bottom left to top right /)
                
        
                return('NONE');
            }  
          
          


  initBoard() {
    var stateBoard = [ [0,0,0,0,0,0,0]
                      ,[0,0,0,0,0,0,0]
                      ,[0,0,0,0,0,0,0]
                      ,[0,0,0,0,0,0,0]
                      ,[0,0,0,0,0,0,0]
                      ,[0,0,0,0,0,0,0] ] 
    var NewBoard = [];
    for(var i = 0; i<7;i++){
      NewBoard[i] = [];
    }
    for( i =0; i<6; i++){
      for(var j=0; j<7; j++){
        NewBoard[i][j] = ( <Cell clicked={this.clicked} key={i+' '+j} colRow={i+' '+j} id={this.toAString(j)} spot={stateBoard[i][j]}/>
        );
      }
    }

    this.setState({
      board: stateBoard,
      boardDisplay:NewBoard,
      message:'NEW GAME! YOU GO FIRST'
    });
    
  }

  getAllPossibleMoves() {
      var cols = 7;
      var possibles = [];
    for (var i = 0; i < cols; i++) {
        
        if (this.state.board[0][i] === 0) {
            possibles.push(i);
        }
    }
    return possibles;

  }
aiBestMove() {
    var allPossibleMoves = this.getAllPossibleMoves();
    var score = 0;
    var bestScore = -Infinity;
    var move = 0;
    var alpha = -Infinity;
    var beta = Infinity;
    
    for(var i = 0; i < allPossibleMoves.length; i++){
        this.dropPeice(allPossibleMoves[i],2);
        score = this.miniMax(8,false,alpha,beta);
        this.undoMove(allPossibleMoves[i],2);
        if (score> bestScore){
            bestScore = score;
            move = allPossibleMoves[i];
        }
    }
return(move);
}
playAI() {
    this.dropPeice(this.aiBestMove(),2);
    this.updateboard();
    this.setState({message:'YOUR TURN!'})
    this.setState({playerOneTurn:2})
}

  clicked = (index) => {

    var jValue = index.slice(2,3);

    if(this.validMove(jValue)){
      if(!this.gameOver()){
        if(this.state.playerOneTurn % 2 === 0){
          this.setState({message:'AI is thinking'})
          this.dropPeice(jValue,1);
          this.updateboard()
          
          this.playAI();
        }
      } 
      if(this.gameOver()){
		if(this.checkWinner() === 'P1'){
			this.setState({message:'YOU WIN. ENTER YOUR NAME TO SAVE IT TO THE WEBSITE!'})
		}else if(this.checkWinner() === 'P2'){
			this.setState({message:'YOU LOST!'})
		}else{
			this.setState({message:'tie game'})
		}
        
      }
    }else{
      this.setState({message:'INVALID MOVE. Please try again...'})
    }

  
  }


  render(){
    var width = 103*7 +'px';
    return (
      <div className='all'>
       <div className='newGameButton'>
           <div className='buttononly'>
       <input className="b buttononly1 ph4 pv2 input-reset ba b--black  grow pointer f2 " type="submit" value="RESET GAME" onClick={() => this.initBoard()} />
       </div>
      <div className="grid center" style={{width: width}} >
      
             {this.state.boardDisplay}
             
      </div>
      </div>
      <div className="message">
        {this.state.message}
      </div>
      </div>
    );
  }
}






export default Grid2;
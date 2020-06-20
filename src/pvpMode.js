import React from 'react';
import './App.css';





class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id:this.props.id,
      spot:this.props.spot
    };
    
    // Bind play function to App component

  }
  render(){
    if (this.props.spot === 0){ 
    return (
      <div
        onClick={() => {  this.props.clicked(this.props.id)  }}
        className={'emptyCellPVP'}
        id={this.props.id}
    />
    );
    } else if (this.props.spot === 1) {
      return (
        <div
          onClick={() => {  this.props.clicked(this.props.id)  }}
          className={'playerOneCell'}
          id={this.props.id}
      />
      );
    }else {
      return (
        <div
          onClick={() => {  this.props.clicked(this.props.id)  }}
          className={'playerTwoCell'}
          id={this.props.id}
      />
      );
    }
  }
}






class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneTurn: true,
      board: [],
      boardDisplay: [],
      message: 'PLAYER 1 GO!'
    };
    
    // Bind play function to App component

  }
  componentDidMount() {
    this.initBoard();
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
    console.log(this.state.board[1][1])
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
    console.log(this.nextAvalibleRowInCol(x))
    if (this.nextAvalibleRowInCol(x) !== -1) {
      isValid = true;
    }
    return isValid;
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
        NewBoard[i][j] = ( <Cell clicked={this.clicked} key={i+' '+j} id={i+' '+j} spot={stateBoard[i][j]}/>
        );
      }
    }

    this.setState({
      board: stateBoard,
      boardDisplay:NewBoard,
    });
    console.log(this.state)
  }



  clicked = (index) => {
    
    var jValue = index.slice(2,3);

    if(this.validMove(jValue)){
      if(!this.gameOver()){
        if(this.state.playerOneTurn){
          this.state.board[this.nextAvalibleRowInCol(jValue)][jValue] = 1;
          this.updateboard();
          this.setState({playerOneTurn:false})
          this.setState({message:'player 2 turn'})
        }else{
          this.state.board[this.nextAvalibleRowInCol(jValue)][jValue] = 2;
          this.updateboard();
          this.setState({playerOneTurn:true})
          this.setState({message:'player 1 turn'})
        }
      }
      if(this.gameOver()){
		if(this.checkWinner() === 'P1'){
			this.setState({message:'PLAYER 1 WINS'})
		}else if(this.checkWinner() === 'P2'){
			this.setState({message:'PLAYER 2 WINS'})
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
    console.log(this.state)
    return (
      <div className='all'>
      <div className="grid center" style={{width: width}} >
             {this.state.boardDisplay}
      </div>
      <div className="message">
        {this.state.message}
      </div>
      </div>
    );
  }
}






export default Grid;
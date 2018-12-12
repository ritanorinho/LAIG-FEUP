class Clobber {
  
  constructor(scene){
    this.scene=scene;
    this.whitePlayer=new Player(this.scene,1);
    this.blackPlayer=new Player(this.scene,2);

    this.state= {
      WAITING:0,
      CHOOSING_PIECE_TO_MOVE: 1,
      CHOOSING_NEW_CELL: 2,
      DRAW_GAME:3,
      WON_GAME:4,
      EXIT_GAME:5,
      MOVIE:6,
      ERROR:7,
    };

    this.mode ={
      PLAYER_VS_PLAYER:1,
      PLAYER_VS_BOT:2,
      BOT_VS_PLAYER:3,
      BOT_VS_BOT:4,
    };
    this.currentState = this.state.WAITING;
    this.previousState=this.state.WAITING;
    this.board;
  }

  startGame(mode,level){

      if(this.currentState==this.state.WAITING){

        switch (gameMode) {
          case "Player vs Player":
            this.gameMode = this.mode.PLAYER_VS_PLAYER;
            break;
          case "Player vs Bot":
            this.gameMode = this.mode.PLAYER_VS_BOT;
            break;
          case "Bot vs Player":
            this.gameMode = this.mode.BOT_VS_PLAYER;
            break;
          case "Bot vs Bot":
            this.gameMode = this.mode.BOT_VS_BOT;
            break;
          default:
            break;
        }
    
        switch (gameLevel) {
          case "Rookie":
            this.gameLevel = 0;
            break;
          case "Pro":
            this.gameLevel = 1;
            break;
          default:
            break;
        }
        this.initializeVariables();
      }
    }

      initializeVariables(){
        this.moves=[];
        this.player=1;
        this.previousPlayer=this.player;
      }
  
    getInitialBoard(){
      let game=this;
      this.scene.client.getPrologRequest('initialBoard',function(data){
        game.board=game.parseBoard(data.target.response);
        game.scene.isReady=1;  
        console.log(game.board);
        //game.validatePlay(0,1,0,0);
        game.test();
      },function(data){
        console.log('connection error');
      });
      }

      parseBoard(board){

        let parsedBoard=[];
        let row,column,i;
        let line;
        i=0;
    
        for (column = 0;column < 8;column++){
            line=[];
            row=0;
            while(row !=8){
              if (!(board[i] =='[' || board[i] ==',' || board[i] == ']')){
              line.push(board[i]);
              row++;
            }
            i++; 
            }
            parsedBoard.push(line);
        }
        return parsedBoard;
      }
 parseBoardProlog(){
      var boardString = "";
      boardString = boardString + "[";
    
      for (let i = 0; i < this.board.length; i++) {
        boardString = boardString + "[";
    
        for (let j = 0; j < this.board[i].length; j++) {
          let element;
          switch (this.board[i][j]) {
            case "0":
              element = "empty";
              break;
            case "1":
              element = "white";
              break;
            case "2":
              element = "black";
              break;
            default:
              break;
          }
          boardString = boardString + element;
          if (j != this.board[i].length - 1) boardString = boardString + ",";
        }
    
        boardString = boardString + "]";
        if (i != this.board.length - 1) boardString = boardString + ",";
      }
    
      boardString = boardString + "]";
    
      return boardString;
    }
    

      getBoard(){
        return this.board;
      }
    validatePlay(row,column,newRow,newColumn){
    
      let game=this;
      let board= game.parseBoardProlog();
      var command="validate_move("+row+","+newRow+","+column+","+newColumn+",1,"+board+",0)";
      console.log(command);
      this.scene.client.getPrologRequest(command,function(data){
        console.log(data.target.response)
      },function(data){
        console.log('connection error');
      });

    }
    test(){
      let game=this;
      let board= game.parseBoardProlog();
      let i=0;
     let command="test("+i+")";
      console.log(command);
      this.scene.client.getPrologRequest(command,function(data){
        console.log(data.target.response)
      },function(data){
        console.log('connection error');
      });

    }
    }




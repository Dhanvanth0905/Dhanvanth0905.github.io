const player = (name, tile) => {

    return {
        name: name,
        tile: tile,
    }
}


var UICtrl = (function(){

    var DOMstrings = {
        PVPbtn: '#pvp',
        PVCbtn: '#pvc',
        mode: '#mode',
        name: '#name',
        progressBack: '#back-name',
        progressNext: '#next-name',
        gameBoard: '.game',
        newGame: '.newgame',
        resetGame: '.resetgame',
        result: '.result',
        player1Name: '.player1-name',
        player2Name: '.player2-name',
        winner: '#winner',
    }

    let name = document.querySelector(DOMstrings.name);
    let gameBoard = document.querySelector(DOMstrings.gameBoard);
    let mode = document.querySelector(DOMstrings.mode);
    let result = document.querySelector(DOMstrings.result);
    let player1Name = document.querySelector(DOMstrings.player1Name);
    let player2Name = document.querySelector(DOMstrings.player2Name);
    let winnerText = document.querySelector(DOMstrings.winner);
    let p1name, p2name;

    return {
        getDOMstrings: function() {
            return DOMstrings;
        },
        playerName : function(nav) {
        
            if(nav =="next")
            {
                name.style.display = "none";
                gameBoard.style.display = "block";

            }
            else
            {
                name.style.display = "none";
                mode.style.display = "block";
            }
        },
        setName: function(p1, p2)
        {
            player1Name.textContent = p1;
            player2Name.textContent = p2;
            p1name = p1;
            p2name = p2;
        },
        type: function(m) {
            // if(m == "pvp") {
            //     console.log("kmn")
            // }
            // else
            // {
            //     console.log("pvc")
            // }
    
            mode.style.display="none";
            document.querySelector(DOMstrings.name).style.display="block";
        },
        clearInput: function() {
            let inputs = document.querySelectorAll('.input');
            inputs[0].value = "";
            inputs[1].value = "";
        },
        gameBoard: function(type) {
            if(type == "newgame") {
                gameBoard.style.display = "none";
                result.style.display = "none";
                mode.style.display = "block";
                this.clearInput();
                
            }
            else
            {
                console.log("resetttt");
                result.style.display = "none";
                gameBoard.style.display = "block";
                this.clearInput();
            }
        },
        gameOver: function(message) {
            result.style.display = "block";
            winnerText.textContent = message;
            gameBoard.style.display = "none";
        },
        
    
    }
})();


var controller = (function(UICtrl) {

    let over = 0;
    var DOM = UICtrl.getDOMstrings();
    let mode;
    let player1Name;
    let player2Name;
    let board = [0,1 , 2, 3, 4, 5, 6, 7, 8]
    let cur = "X";
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    let boxes = document.querySelectorAll('.game-board-box');

    var setUpEventListeners = function() {

        document.querySelector(DOM.PVPbtn).addEventListener('click', function(){
            mode = "pvp";
            UICtrl.type("pvp")}
        );

        document.querySelector(DOM.PVCbtn).addEventListener('click', function(){
            mode = "pvc";
            UICtrl.type("pvc")
        });

        document.querySelector(DOM.progressNext).addEventListener('click', function(){
            getNames();
            player1 = player(player1Name, "X");
            player2 = player(player2Name, "O");
            UICtrl.playerName("next");
        });

        document.querySelector(DOM.progressBack).addEventListener('click', function(){
            UICtrl.playerName("back");
        });
        
        var newGame = document.querySelectorAll(DOM.newGame);
        for(var i = 0;i < newGame.length;i++)
        {
            newGame[i].addEventListener('click', function() {
                UICtrl.gameBoard('newgame');
                clearBoard();
                reset();
            });
        }

        var resetGame = document.querySelectorAll(DOM.resetGame);
        for(var j = 0;j < resetGame.length;j++)
        {
            resetGame[j].addEventListener('click', function() {
                UICtrl.gameBoard('resetgame');
                clearBoard();
                reset();
            });
        }

        

        // board event listeners
        for(i = 0;i < 9;i++)
        {
            boxes[i].addEventListener('click', function(event){
                console.log("id = "+event.target.id)
                if(typeof board[event.target.id] == "number")
                {    
                    turnClick(event.target.id)
                }
            
            })
        }
    };

    let turnClick = function(id) 
    {
        board[id] = cur;
        console.log("turnclick id = "+id)
        turn(id, cur);
        if(mode === "pvc" && !over)
        {
            console.log("my turn bitch")
            var best = bestSpot
            turn(bestSpot(), "O")
        }
        console.log(board)
    }

    function bestSpot() {
        return minimax(board, "O", 0).index;
    }

    let turn = function(squareId, player) {
        console.log("turn id = "+squareId)
        board[squareId] = player;
        document.getElementById(squareId).textContent = player;

        if(hasWon(board, cur))
        {
            if(cur=="X")
                UICtrl.gameOver(player1Name+" Wins");
            else
                UICtrl.gameOver(player2Name+" Wins");
            over = 1
        }
        else if(isTie())
        {
            UICtrl.gameOver("Tie")
            over = 1
        }
        else
        {
            if(cur == "X")
                cur = "O"
            else    
                cur = "X"
        }
    }
    let isTie = function()
    {
        for(var i = 0;i < board.length;i++)
        {
            if(typeof board[i] === "number")
                return false
        }
        return true
    }
    
    let reset = function()
    {
        board = [0,1 , 2, 3, 4, 5, 6, 7, 8]
        cur = "X";
        over = 0
    }
    let clearBoard = function()
    {
        for(var i = 0;i < 9;i++)
        {
            boxes[i].textContent = "";
        }
    }

    
    let emptySquares = function(){
        return board.filter(s => typeof s === "number")
    }

    function minimax(newBoard, curPlayer) {
        var availSpots = emptySquares();
        if (hasWon(newBoard, "X")) {
            return {score: -10};
        } else if (hasWon(newBoard, "O")) {
            return {score: 10};
        } else if (availSpots.length === 0) {
            return {score: 0};
        }
        var moves = [];
        for (var i = 0; i < availSpots.length; i++) {
            var move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = curPlayer;

            if (curPlayer == "O") {
                if (hasWon(newBoard, "O"))
                {
                    move.score = 10;
                    newBoard[availSpots[i]] = move.index;
                    return move;
                }
                var result = minimax(newBoard, "X");
                move.score = result.score;
            } else {
                var result = minimax(newBoard, "O");
                move.score = result.score;
            }

            newBoard[availSpots[i]] = move.index;

            moves.push(move);
        }

        var bestMove;
        if(curPlayer === "O") {
            var bestScore = -10000;
            for(var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 10000;
            for(var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }
    let hasWon = function(curBoard, current) {
        
        return ((curBoard[0] == current && curBoard[1] == current && curBoard[2] == current ) ||
		   (curBoard[3] == current && curBoard[4] == current && curBoard[5] == current) ||
		   (curBoard[6] == current && curBoard[7] == current && curBoard[8] == current)||
		   (curBoard[0] == current && curBoard[3] == current && curBoard[6] == current)||
		   (curBoard[1] == current && curBoard[4] == current && curBoard[7] == current)||
		   (curBoard[2] == current && curBoard[5] == current && curBoard[8] == current)||
		   (curBoard[0] == current && curBoard[4] == current && curBoard[8] == current)||
		   (curBoard[2] == current && curBoard[4] == current && curBoard[6] == current ))
    }

   

    let getNames = function() {
        let inputs = document.querySelectorAll('.input');
        player1Name = inputs[0].value;
        player2Name = inputs[1].value;
        console.log(player1Name);
        console.log(player2Name);
        if (player1Name === "")
        {
            player1Name = "Player1";
        }
        if (player2Name === "")
        {
            player2Name = "Player2";

        }
        UICtrl.setName(player1Name, player2Name);
    }
    
    return {
        init: function() {
            UICtrl.clearInput();
            reset();
            setUpEventListeners();
        }
    }

})(UICtrl);


controller.init();



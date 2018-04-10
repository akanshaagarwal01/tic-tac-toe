(function() {
  class Board {
    constructor(n, cells) {
      this._dimension = n;
      this._cells = cells;
      this._cachedElements = {};
      this._callback = null;
    }

    cachedElementsfn() {
      this._cachedElements = {
        board: document.getElementById("BoardContainer"),
        m: document.getElementById("message"),
        s_btn: document.getElementById("Start"),
        r_btn: document.getElementById("Reset")
      };
    }

    makeBoard() {
      for (let i = 0; i < this._dimension; i++) {
        let tCells = [];
        for (let j = 0; j < this._dimension; j++) {
          let tCell = new window.Cell(i, j);
          tCells.push(tCell);
        }
        this._cells.push(tCells);
      }
    }

    renderBoard() {
      let html = "<table id= 'Tic'>";
      for (let i = 0; i < this._dimension; i++) {
        html += "<tr>";
        for (let j = 0; j < this._dimension; j++) {
          html += this._cells[i][j].renderCell();
        }
        html += "</tr>";
      }
      html += "</table>";
      this._cachedElements.board.innerHTML = html;
      this._cachedElements.c = document.getElementById("Tic");
    }

    resetGame() {
      this._cachedElements.m.innerHTML = "Player 1's turn";
      this._cells.length = 0;
      p1.reset("Y");
      p2.reset("N");
      this.makeBoard();
      this.renderBoard();
      this._cachedElements.c.addEventListener("click", this._callback);
    }

    calcCell(pos) {
      let cell = null;
      for (let i = 0; i < this._dimension; i++) {
        cell = this._cells[i].find(
          item => item._x === pos.x && item._y === pos.y
        );
        if (cell) {
          break;
        }
      }
      return cell;
    }

    clickHandler(p1, p2, event) {
      let ActivePlayer = p1._turn === "Y" ? p1 : p2;
      this._cachedElements.m.innerHTML =
        ActivePlayer === p1 ? "Player 2's turn" : "Player 1's turn";
      let pos = {
        x: event.target.parentElement.rowIndex,
        y: event.target.cellIndex
      };
      let board_size = Math.pow(this._dimension, 2);
      let clicked = this.calcCell(pos);
      if (clicked && clicked.checkMark()) {
        alert("Already marked! Please choose another cell..");
      } else {
        ActivePlayer._markedCells.push(clicked);
        ActivePlayer._numOfTurns++;
        clicked._marker = ActivePlayer._mark;
        event.target.innerHTML = clicked._marker;
        if (ActivePlayer.checkVictory(this._dimension)) {
          this._cachedElements.m.innerHTML =
            ActivePlayer === p1 ? "Player 1 Wins !!" : "Player 2 Wins !!";
          this._cachedElements.c.removeEventListener("click", this._callback);
        } else if (
          p1._markedCells.length + p2._markedCells.length ===
          board_size
        ) {
          this._cachedElements.m.innerHTML = "Game Over !!";
          this._cachedElements.c.removeEventListener("click", this._callback);
        } else {
          [p1._turn, p2._turn] = [p2._turn, p1._turn];
        }
      }
    }

    playBoard(p1, p2) {
      alert("Game On !!");
      this._cachedElements.s_btn.style.display = "none";
      this._cachedElements.r_btn.style.display = "inline-block";
      this._callback = function() {
        tictactoe.clickHandler(p1, p2, event);
      };
      this._cachedElements.c.addEventListener("click", this._callback);
    }
  }

  let n = +prompt("Enter board dimension", "3");
  let tictactoe = new Board(n, [], {});
  tictactoe.cachedElementsfn();
  let p1 = new window.Player("Player1", "X", "Y");
  let p2 = new window.Player("Player2", "O", "N");
  tictactoe.makeBoard();
  tictactoe.renderBoard();
  let s_callbck = function() {
    tictactoe.playBoard(p1, p2);
  };
  let r_callbck = function() {
    tictactoe.resetGame();
  };
  tictactoe._cachedElements.s_btn.addEventListener("click", s_callbck);
  tictactoe._cachedElements.r_btn.addEventListener("click", r_callbck);
})();

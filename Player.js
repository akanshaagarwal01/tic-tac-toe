(function() {
  class Player {
    constructor(id, mark, turn) {
      this._id = id;
      this._numOfTurns = 0;
      this._turn = turn;
      this._markedCells = [];
      this._mark = mark;
    }
    reset(turn) {
      this._numOfTurns = 0;
      this._markedCells = [];
      this._turn = turn;
    }
    checkVictory(n) {
      if (this._numOfTurns < n) {
        return false;
      } else if (
        this.straightWin(n, "row") ||
        this.straightWin(n, "col") ||
        this.ldiagWin(n) ||
        this.rdiagWin(n)
      ) {
        return true;
      } else {
        return false;
      }
    }
    straightWin(n, rc) {
      let item_dim = rc === "row" ? "_x" : "_y";
      for (let i = 0; i < n; i++) {
        if (
          this._markedCells.filter(item => item[item_dim] === i).length === n
        ) {
          return true;
        }
      }
      return false;
    }
    ldiagWin(n) {
      if (this._markedCells.filter(item => item._x === item._y).length === n) {
        return true;
      }
      return false;
    }
    rdiagWin(n) {
      if (
        this._markedCells.filter(item => item._x + item._y === n - 1).length ===
        n
      ) {
        return true;
      }
      return false;
    }
  }
  window.Player = Player;
})();

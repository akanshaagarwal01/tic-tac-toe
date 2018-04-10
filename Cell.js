(function() {
  class Cell {
    constructor(x, y) {
      this._x = x;
      this._y = y;
      this._marker = " ";
    }
    renderCell() {
      return "<td>" + this._marker + "</td>";
    }
    checkMark() {
      if (this._marker !== " ") {
        return true;
      } else {
        return false;
      }
    }
  }
  window.Cell = Cell;
})();

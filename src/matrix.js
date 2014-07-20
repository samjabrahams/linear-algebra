/**
 * @fileOverview  Additional matrix operations
 */






/**
 * Compute dot product of given row with a vector.
 * 
 * @param {Number} rowNum 0-based row index.
 * @param  {Vector} vector.
 * 
 * @return {Number}
 */
Matrix.prototype.dot = function(rowNum, vector) {
  if (this.cols !== vector.size) {
    _throwError('Vector dot product requires this.columns = vector.size');
  }

  var a = 0;

  for (var j=0; j<this.cols; ++j) {
    a += this.data[rowNum][j] * vector.data[j];
  }

  return a;
};




/**
 * Multiply this matrix by a matrix or vector.
 * @param  {Matrix|Vector} arg Matrix or vector.
 * @return {Matrix|Vector} A Matrix or Vector depending on the result.
 */
Matrix.prototype.mul = function(arg) {
  var result, i, j, k;

  // matrix
  if (arg.isMatrix) {
    if (this.cols !== arg.rows) {
      _throwError('Multiplying by matrix requires this.columns = matrix.rows');
    }

    result = new Array(this.rows);

    for (i=0; i<this.rows; ++i) {
      result[i] = new Array(arg.cols);

      for (k=0; k<arg.cols; ++k) {
        result[i][k] = 0;

        for (j=0; j<this.cols; ++j) {
          result[i][k] += this.data[i][j] * arg.data[j][k];
        }
      }
    }

    return new Matrix(result);
  }
  // vector
  else if (arg.isVector) {
    if (this.cols !== arg.size) {
      _throwError('Multiplying by vector requires this.columns = vector.size');
    }

    result = new Array(this.rows);

    for (i=0; i<this.rows; ++i) {
      result[i] = 0;

      for (j=0; j<this.cols; ++j) {
        // store values to add in temporary array
        result[i] += this.data[i][j] * arg.data[j];
      }
    }

    return new Vector(result);
  }
};




/**
 * Add each value from given array to each column in this matrix.
 * 
 * @param  {Vector} vector Array with same length as matrix columns.
 * 
 * @return {Matrix} New instance.
 */
Matrix.prototype.plusCols = function(vector) {
  if (this.cols !== vector.size) {
    _throwError('Vector length must equal no. of columns');
  }

  var a = new Array(this.rows);

  for (var i=0; i<this.rows; ++i) {
    a[i] = new Array(this.cols);

    for (var j=0; j<this.cols; ++j) {
      a[i][j] = this.data[i][j] + vector.data[j];
    }
  } 

  return new Matrix(a); 
};




/**
 * Add each value from given array to each column in this matrix.
 * 
 * @param  {Vector} vector Array with same length as matrix columns.
 * 
 * @return {this}
 */
Matrix.prototype.plusColsP = function(vector) {
  if (this.cols !== vector.size) {
    _throwError('Vector length must equal no. of columns');
  }

  for (var i=0; i<this.rows; ++i) {
    for (var j=0; j<this.cols; ++j) {
      this.data[i][j] += vector.data[j];
    }
  } 

  return this;
};




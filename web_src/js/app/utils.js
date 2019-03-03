function indexOfMax(arrayToCheck) {
    if (arrayToCheck.length === 0) {
        return -1;
    }

    var max = arrayToCheck[0];
    var maxIndex = 0;

    for (var i = 1; i < arrayToCheck.length; i++) {
        if (arrayToCheck[i] > max) {
            maxIndex = i;
            max = arrayToCheck[i];
        }
    }

    return maxIndex;
}
function indexOfMin(arrayToCheck) {
    if (arrayToCheck.length === 0) {
        return -1;
    }

    var min = arrayToCheck[0];
    var minIndex = 0;

    for (var i = 1; i < arrayToCheck.length; i++) {
        if (arrayToCheck[i] < min) {
            minIndex = i;
            min = arrayToCheck[i];
        }
    }

    return minIndex;
}
function hasCommonElement(arr1,arr2)
{
   var bExists = false;
   $.each(arr2, function(index, value){

     if($.inArray(value,arr1)!=-1){
        bExists = true;
     }

     if(bExists){
         return false;  //break
     }
   });
   return bExists;
}
/**
 * Object.prototype.forEach() polyfill
 * https://gomakethings.com/looping-through-objects-with-es6/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!Object.prototype.forEach) {
    Object.defineProperty(Object.prototype, 'forEach', {
        value: function (callback, thisArg) {
            if (this == null) {
                throw new TypeError('Not an object');
            }
            thisArg = thisArg || Game;
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    callback.call(thisArg, this[key], key, this);
                }
            }
        }
    });
}

Object.defineProperty(Array.prototype, 'unique', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function() {
        var a = this.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }
});
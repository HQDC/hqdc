/**
 * Created by Tile on 2015/8/21.
 */
/**
 *
 * @param deleteitem
 */
Array.prototype.deleteitem = function(deleteitem) {
    console.log("indexOf",this.indexOf(deleteitem));
    this.splice(this.indexOf(deleteitem),1);
};
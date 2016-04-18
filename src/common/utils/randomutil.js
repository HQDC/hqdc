/**
 * Created by Tile on 2015/8/20.
 */
Math.getRandomNum = function(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
};

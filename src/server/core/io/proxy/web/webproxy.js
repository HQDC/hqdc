/**
 * Created by Tile on 2015/10/9.
 */
import { Router } from 'express';
import {routerHandler,setLineType,TYPES} from '../../lineswitcher';
const webProxy = new Router();

webProxy.post('*', async (req, res, next) => {
    console.log("web proxy get api request",req.body);
    setLineType(res,TYPES.HTTP);
    res._req = req;
    res._next = next;
    if (req.body == null){
        console.error("post data can't be null");
        return;
    }
    if (req.body.type == null || req.body.type == ""){
        console.error("post data.type can't be null");
        return;
    }
    routerHandler(req.body,res);
});

exports.webProxy = webProxy;

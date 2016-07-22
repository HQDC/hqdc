/**
 * Created by Tile on 2015/8/17.
 */
import path from 'path';
import _ from 'lodash';

function ProcessManger(maxworker) {
    if (ProcessManger.instance != undefined) {
        return ProcessManger.instance;
    }
    /**
     * 工作者
     * @type {Array}
     */
    this.freeworkers = [];
    this.busyworkers = [];
    /**
     *  需要做处理的数据
     * @type {Array}
     */
    this.orderlist = [];
    //this.workingorder = [];
    /**
     * 同时工作的最多人数
     * @type {number}
     */
    this.max = maxworker;
    ProcessManger.instance = this;
}

/**
 * 加入工作处理队列
 * @param workdata
 */
ProcessManger.prototype.doWork = function(workdata) {
    if (this.haveFree() == false) {
        if (workdata.busyreturn == true) {
            workdata.errorfun();
        }
    }
    this.orderlist.push(workdata);
    this.doNext();
};

ProcessManger.prototype.doNext = function() {
    if (this.haveOrder()) {
        if (this.haveFree()) {
            var targetorder = this.orderlist.pop();
            var worker = this.getFreeWorker();
            worker.isbusy = true;
            ProcessManger.instance.busyworkers.push(worker);
            worker.on('message', function(retdata) {
                targetorder.returnfun(retdata);
                worker.isbusy = false;
                worker.removeAllListeners("message");
                if (targetorder.overexit == true) {
                    worker.exit(1);
                } else {
                    ProcessManger.instance.freeworkers.push(worker)
                }
                _.remove(ProcessManger.instance.freeworkers, (n) => {
                    return (ProcessManger.instance.freeworkers[n] == worker);
                });
                ProcessManger.instance.doNext();
                //console.log("-----------------\n",ProcessManger.instance.busyworkers.length ,(ProcessManger.instance.busyworkers[0]==worker),ProcessManger.instance.busyworkers.indexOf(worker));
            });
            worker.send(targetorder);
        }
    }
};

ProcessManger.prototype.pushWorkingOrder = function(data) {
    var randomnum = Math.getRandomNum(1, 99999990);
    while (this.workingorder[randomnum] != undefined) {
        randomnum = Math.getRandomNum(1, 99999999);
    }
    this.workingorder[randomnum] = data;
    return randomnum;
};

ProcessManger.prototype.haveOrder = function() {
    return this.orderlist.length != 0;
};

ProcessManger.prototype.getFreeWorker = function() {
    var datapaser = null;
    if (this.freeworkers.length > 0) {
        datapaser = this.freeworkers.pop();
    } else {
        var childProcess = require('child_process');
        datapaser = childProcess.fork(path.join(__dirname + '/dataexchanger'));
    }
    return datapaser;
};

/**
 * 是否有空闲worker
 * @returns {boolean}
 */
ProcessManger.prototype.haveFree = function() {
    return this.busyworkers.length < this.max;
};

/**
 * 创建一个工作者信息
 * @param execdata      此数据会被传入处理class中 exec 函数
 * @param doclass       执行格式化数据的class
 * @param returnfun     后调用函数
 * @param overexit      执行完毕后是否释放工作者
 * @param busyreturn    如果队列忙是否直接返回(不会执行)
 * @returns {{}}
 */
ProcessManger.prototype.creatworkdata = function(execdata, doclass, returnfun, overexit, busyreturn) {
    var obj = {};
    obj.doclass = doclass;
    obj.execdata = execdata;
    obj.returnfun = returnfun;
    /**
     * 如果繁忙不处理立刻返回
     * @type {boolean}
     */
    obj.busyreturn = busyreturn;
    /**
     * 执行完是否立刻退出
     */
    obj.overexit = overexit;
    console.log("workdatacreat");
    return obj;
};
//image  http://webmap0.map.bdimg.com/maps/services/thumbnails?width=150&height=150&align=center,center&quality=100&src= + src
module.exports = new ProcessManger(4);
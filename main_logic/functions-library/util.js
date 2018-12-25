const path = require('path');

let util = {};

util.array = {
    // Combine multiple arrays, the default will be heavy, you can keep the duplicate content by setting the parameter isDuplicate=true
    merge: (arys, isDuplicate = false) => {
        let result = [];

        arys.forEach(ary => {
            ary.forEach(item => {
                if (isDuplicate) result.push(item);
                else result.indexOf(item) === -1 ? result.push(item) : 0;
            });
        });

        return result;
    },
    // Clean up the invalid elements of the array and return a new array. If you pass [1,9,,9,2,,10,,,21], it will return [1,9,9,2,10,21]
    clear: ary => {
        let newAry = [];

        ary.forEach(item => {
            newAry.push(item);
        });

        return newAry;
    }
};

util.talk = {
    // String type activity information, parsed into structured type data, convenient for subsequent operations
    str2Obj: talks => {
        let results = [];
        let lightnings = {
            title: '#MERGED#',
            lightning: '',
            timeCost: 0,
            unit: global.config.timeUnit,
            weight: 0,
            scheduled: '',
            merged: []
        };

        talks.forEach(talk => {
            let regExpTitle = /[a-zA-Z0-9\u4E00-\u9FA5\uF900-\uFA2D]+[\-\']*$/g;
            let regExpTimeSymbol = /[\w\u4E00-\u9FA5\uF900-\uFA2D]+$/g;
            let tmp = {};
            talk = talk.trim();

            tmp.title = talk.replace(regExpTitle, '').trim();
            if (!tmp.title) tmp.title = talk.match(regExpTitle) ? talk.match(regExpTitle)[0] : 'Unknown';

            let timeSymbol = talk.match(regExpTimeSymbol);
            if (!timeSymbol) timeSymbol = '0';
            else timeSymbol = timeSymbol[0];

            tmp.lightning = '';
            if (timeSymbol === global.config.lightning.symbol) {
                tmp.lightning = global.config.lightning.symbol;
                tmp.timeCost = global.config.lightning.timeCost;
            }
            else {
                let timeCost = timeSymbol.replace(/[^0-9]/ig, '');

                if (!timeCost) {
                    tmp.timeCost = 0;
                    tmp.title += ` ${timeSymbol}`;
                    //console.log('Error[Get time cost error!]');
                }
                else tmp.timeCost = Number(timeCost);
            }

            tmp.unit = global.config.timeUnit;
            tmp.weight = tmp.timeCost;
            tmp.scheduled = '';

            if (global.config.lightning.merge && !!tmp.lightning) {
                lightnings.merged.push(tmp);
                lightnings.timeCost += global.config.lightning.timeCost;
                lightnings.weight = lightnings.timeCost;
            } else if (tmp.timeCost) results.push(tmp);
        });

        if (global.config.lightning.merge && lightnings.merged.length !== 0) {
            lightnings.timeCost += global.config.lightning.merge.timeCost;
            lightnings.weight = lightnings.timeCost;
            lightnings.type = 'merged';

            results.push(lightnings);
        }

        return results;
    }
};

util.path = {
    getRightPath: paths => {
        let rightPath = [];

        paths.forEach(_path => {
            let tmp = path.relative(__dirname, _path);
            rightPath.push(path.join(__dirname, tmp));
        });

        return rightPath;
    }
};

module.exports = util;

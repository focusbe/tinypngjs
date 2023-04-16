const https = require('https');
const fs = require('fs');
const path = require('path');
// 从缓存中获取
const cacheFile = path.resolve(__dirname, 'cache.json');
function getCache() {
    return new Promise((resolve, reject) => {
        fs.readFile(cacheFile, (err, data) => {
            if (err) {
                resolve(null);
                return;
            }
            try {
                var obj = JSON.parse(data.toString());
                resolve(obj);
            } catch (error) {
                resolve(null);
            }
        });
    });
}

// 更新缓存
function updateCache(obj) {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            cacheFile,
            JSON.stringify({ time: Date.now(), value: obj }),
            (err) => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve();
            }
        );
    });
}

class Utli {
    static async getOptions() {
        //生成请求头部
        var time = Date.now();
        let UserAgent =
            'Mozilla/5.0(WindowsNT10.0;Win64;x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/' +
            59 +
            Math.round(Math.random() * 10) +
            '.0.3497.' +
            Math.round(Math.random() * 100) +
            'Safari/537.36';
        var options = {
            method: 'POST',
            hostname: 'tinypng.com',
            path: '/backend/opt/shrink',
            headers: {
                rejectUnauthorized: false,
                'Postman-Token': (time -= 5000),
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': UserAgent,
                'X-Forwarded-For': Utli.getIp(),
                Cookie: '',
            },
            timeout: 5000,
        };
        var cache = await getCache();
        if (
            cache &&
            cache.time &&
            cache.time > Date.now() - 24 * 60 * 60 * 1000 &&
            cache.value
        ) {
            Object.assign(options, cache.value);
        } else {
            var obj = await Utli.getOptionsFromUrl();
            if (obj) {
                Object.assign(options, obj);
                updateCache(obj);
            }
        }
        return options;
    }

    static getOptionsFromUrl(cb) {
        // 获取文件缓存
        return new Promise((resolve, reject) => {
            var todo = '';
            https
                .get('https://www.focusbe.com/tinypng.json', (response) => {
                    // called when a data chunk is received.
                    response.on('data', (chunk) => {
                        todo += chunk;
                    });
                    response.on('end', () => {
                        try {
                            const obj = JSON.parse(todo);
                            resolve(obj);
                        } catch (error) {
                            resolve(null);
                        }
                    });
                })
                .on('error', (error) => {
                    resolve(null);
                });
            setTimeout(() => {
                resolve(null);
            }, 3000);
        });
    }
    static getIp() {
        var _ = {
            random: function (start, end) {
                return parseInt(Math.random() * (end - start) + start);
            },
        };
        var ip =
            _.random(1, 254) +
            '.' +
            _.random(1, 254) +
            '.' +
            _.random(1, 254) +
            '.' +
            _.random(1, 254);
        return ip;
    }
}
module.exports = Utli;

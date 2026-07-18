//- Writing a promisified version of fs.readFile

const fs = require("fs")

function readFilePromise(filePath, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

readFilePromise("a.txt", "utf-8")
    .then((data) => {
        console.log(data)
    })
    .catch((e) => {
        console.log("Error while reading")
    })


//- Writing a promisified version of setTimeout

function setTimeoutPromise(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}

setTimeoutPromise(1000)
    .then(() => {
        console.log("1 sec later")
    })
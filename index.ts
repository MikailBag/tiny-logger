import * as util from "util"
function replaceAll(text:string, pat:string, s:string):string {
    return text.split(pat).join(s)
}

let enabledS = process.env.DEBUG || ""
let enabled = enabledS.split(',').filter(x => x.length > 0)
console.log(enabled)
let enabledRegexs = 
enabled
 .map(entry => {
     return replaceAll(entry, '*', '\.*')
 })
 .map(entry => {
     return new RegExp(entry)
 })
function create(name: string) {
    for (let regex of enabledRegexs) {
        if (name.search(regex) != -1) {
            return (...args: any[]) => {
                args.unshift(name)
                console.log(util.format.apply(util, args))
            }
        }
    }
    return (...args: any[]) => {}
}

export default create
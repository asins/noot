/**
 * 用于在phone/pad等端查看console.log信息
 */

export default function createConsole(height = 50) {
    const historyHeight = height;
    const consoleId = '_ConsoleId_' + Math.floor(Math.random() * 100);
    const consoleDom = `<div id="${consoleId}" style="position:fixed;left:0;bottom:0;width:100%;height:${height}%;overflow:scroll;background:rgba(0,0,0,.7);word-break:break-all;color:#f00;"></div>`;
    document.body.insertAdjacentHTML('afterend', consoleDom);

    const $console = document.getElementById(consoleId);
    $console.addEventListener('click', e => {
        $console.style.height = (height = height === historyHeight ? 5 : historyHeight) + '%';
    }, false);

    if (!window.console) window.console = {};
    window.console.log = function() {
        const args = [];
        for (let i = 0; i < arguments.length; i++) {
            const arg = arguments[i];
            args.push(typeof arg === 'object' ? JSON.stringify(arg) : arg);
        }
        const msg = `<div style="border-top:1px solid rgba(0,0,0,.6);">${args.join(', ')}</div>`;
        $console.insertAdjacentHTML('beforeend', msg);
    };
}

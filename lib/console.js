/**
 * 用于在phone/pad等端查看console.log信息
 */

function createDom(html) {
  return document.createRange().createContextualFragment(html).firstChild;
}

export default function createConsole(height = 50) {
  const historyHeight = height;
  const consoleDom = createDom(`<div style="position:fixed;left:0;bottom:0;width:100%;height:${height}%;overflow:scroll;background:rgba(0,0,0,.7);word-break:break-all;color:#f00;"></div>`);
  consoleDom.addEventListener('click', e => {
    consoleDom.style.height = (height = height === historyHeight ? 5 : historyHeight) + '%';
  }, false);
  document.body.appendChild(consoleDom);

  if (!window.console) window.console = {};
  window.console.log = function() {
    const args = [];
    for (let i = 0; i < arguments.length; i++) {
      const arg = arguments[i];
      args.push(typeof arg === 'object' ? JSON.stringify(arg) : arg);
    }
    const $msg = createDom(`<div style="border-top:1px solid rgba(255,255,255,.6);">${args.join(', ')}</div>`);
    consoleDom.appendChild($msg);
    // consoleDom.insertBefore($msg, consoleDom.firstChild);
  };
}


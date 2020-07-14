import _ from 'lodash';
import printMe from './print.js';
import {cube} from './math.js';


async function getComponent() {
    // var element = document.createElement('div');

    // Lodash, now imported by this script
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    // return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    //     var element = document.createElement('div');
    //
    //     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    //
    //     return element;
    //
    // }).catch(error => 'An error occurred while loading the component');

    var element = document.createElement('div');
    const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

// document.body.appendChild(component());
getComponent().then(component => {
    document.body.appendChild(component);
});


/*
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

function component() {
    // const element = document.createElement('div');
    let element = document.createElement('pre');
    let btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to '  cube(5)
    ].join('\n\n');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);


    return element;
}

// document.body.appendChild(component());

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        // printMe();
        document.body.removeChild(element);
        element = component(); // 重新渲染页面后，component 更新 click 事件处理
        document.body.appendChild(element);
    })
}
*/

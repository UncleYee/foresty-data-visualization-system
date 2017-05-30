import React, { Component } from 'react';
// import { Link } from 'react-router';
import { GithubButton } from 'components';
import config from '../../config';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>

            <p>
              <a className={styles.github} href="https://github.com/UncleYee/foresty-data-visualization-system"
                 target="_blank">
                <i className="fa fa-github"/> 查看源码
              </a>
            </p>
            <GithubButton user="erikras"
                          repo="react-redux-universal-hot-example"
                          type="star"
                          width={160}
                          height={30}
                          count large/>
            <GithubButton user="erikras"
                          repo="react-redux-universal-hot-example"
                          type="fork"
                          width={160}
                          height={30}
                          count large/>

            <p className={styles.humility}>
              本系统由 <a href="/react" target="_blank">@UncleYee</a>开发
            </p>
          </div>
        </div>

        <div className="container">
          <br/>

          <h4>本系统的开发使用了以下下技术：</h4>

          <ul>
            <li>
              <del>Isomorphic</del>
              {' '}
              <a href="https://medium.com/@mjackson/universal-javascript-4761051b7ae9">Universal</a> rendering
            </li>
            <li>Both client and server make calls to load data from separate API server</li>
            <li><a href="https://github.com/facebook/react" target="_blank">React</a></li>
            <li><a href="https://github.com/rackt/react-router" target="_blank">React Router</a></li>
            <li><a href="http://expressjs.com" target="_blank">Express</a></li>
            <li><a href="http://babeljs.io" target="_blank">Babel</a> for ES6 and ES7 magic</li>
            <li><a href="http://webpack.github.io" target="_blank">Webpack</a> for bundling</li>
            <li><a href="http://webpack.github.io/docs/webpack-dev-middleware.html" target="_blank">Webpack Dev Middleware</a>
            </li>
            <li><a href="https://github.com/glenjamin/webpack-hot-middleware" target="_blank">Webpack Hot Middleware</a></li>
            <li><a href="https://github.com/rackt/redux" target="_blank">Redux</a>'s futuristic <a
              href="https://facebook.github.io/react/blog/2014/05/06/flux.html" target="_blank">Flux</a> implementation
            </li>
            <li><a href="https://github.com/gaearon/redux-devtools" target="_blank">Redux Dev Tools</a> for next
              generation DX (developer experience).
              Watch <a href="https://www.youtube.com/watch?v=xsSnOQynTHs" target="_blank">Dan Abramov's talk</a>.
            </li>
            <li><a href="https://github.com/rackt/redux-router" target="_blank">Redux Router</a> Keep
              your router state in your Redux store
            </li>
            <li><a href="http://eslint.org" target="_blank">ESLint</a> to maintain a consistent code style</li>
            <li><a href="https://github.com/erikras/redux-form" target="_blank">redux-form</a> to manage form state
              in Redux
            </li>
            <li><a href="https://github.com/webpack/style-loader" target="_blank">style-loader</a> and <a
              href="https://github.com/jtangelder/sass-loader" target="_blank">sass-loader</a> to allow import of
              stylesheets
            </li>
            <li><a href="https://github.com/shakacode/bootstrap-sass-loader" target="_blank">bootstrap-sass-loader</a> and <a
              href="https://github.com/gowravshekar/font-awesome-webpack" target="_blank">font-awesome-webpack</a> to customize Bootstrap and FontAwesome
            </li>
          </ul>

          <h3>本系统的一些特点</h3>

          <dl>
            <dt>前端高度组件化</dt>
            <dd>
              前端框架的 <code>components</code> 文件夹下所包含的即使本系统的所有组件，组件化开发有很多优势，开发者可以重复利用组件到不同的
              页面，加快开发效率，同时也可以在发现问题的时候花最短的时间定位问题所在，节省系统维护的成本。
            </dd>
            <dt>全面使用 ES6 语法</dt>
            <dd>
              ECMAScript 6.0（以下简称 ES6）是 <code>JavaScript</code> 语言的下一代标准，已经在2015年6月正式发布了。
              它的目标，是使得 <code>JavaScript</code> 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。
            </dd>
            <dt>使用自动化工具 WebPack</dt>
            <dd>
              <code>WebPack</code> 可以看做是模块打包机：它做的事情是，分析你的项目结构，找到 <code>JavaScript</code> 模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），
              并将其打包为合适的格式以供浏览器使用。
              <br/>
              很多网页其实可以看做是功能丰富的应用，它们拥有着复杂的JavaScript代码和一大堆依赖包。为了简化开发的复杂度，前端社区涌现出了很多好的实践方法
              <br/>
              a:模块化，让我们可以把复杂的程序细化为小的文件;
              <br/>
              b:类似于TypeScript这种在JavaScript基础上拓展的开发语言：使我们能够实现目前版本的JavaScript不能直接使用的特性，并且之后还能能装换为JavaScript文件使浏览器可以识别；
              <br/>
              c:scss，less等CSS预处理器
              <br/>
              <code>WebPack</code> 的出现就是用来解决上面这些问题的。
            </dd>
            <dt>使用非关系型数据库 MongoDB</dt>
            <dd>
              <code>MongoDB</code> 的出现是为网络应用提供一些问题的解决方案如可扩展性、如何高性能地存储问题等。
              <br/>
              <code>MongoDB</code> 这种数据库很特别，它有别于传统的关系型数据库，又不完全像其他的非关系型数据库，它在非关系型数据库中是功能最丰富的、最类似于关系型数据库的。
              <br/>
              <code>MongoDB</code> 拥有非常松散的数据结构，类似于 <code>JSON</code> 等，这也决定了它可以存储相对复杂的数据类型。
              <br/>
              <code>MongoDB</code> 主要是以键值对的方式和传统的 <code>RDBMS</code> 系统之间架起一座桥梁，它集两者的优势于一身。
              <br/>
              <code>MongoDB</code> 拥有很多特点，这也是为什么它是目前最火的非关系型数据库之一。它的特点在于它拥有强大的查询语言，它的语法在某种程度上类似于面向对象的查询语言，可以实现类似于关系型数据库单表查询的几乎绝大部分查询功能，同时它还可以对集合中的数据建立索引。
            </dd>
            <dt>使用 React 进行前端开发</dt>
            <dd>
              <code>React</code> 组件化的特点使得它满足本项目的开发需求，同时，<code>React</code> 对 DOM 的渲染是一种虚拟的，它会根据 <code>state</code> 的
              变化来做出对虚拟 DOM 的重新渲染，从而达到页面动态变化的效果，而不需要我们使用代码来进行人为的 DOM 操作，可以避免
              回流、重绘等一系列消耗性能的问题。
            </dd>
          </dl>

          <h3>关于作者</h3>

          <p>
            我是一名南京林业大学的在读大四学生，本系统的开发是作为毕业设计来推进的，使用了大量的前沿技术，本系统的前、后端开发均由我独立完成。
            <br/>
            如果你对本系统的任何方面有兴趣想与我探讨，欢迎你与我联系，我的联系方式在页面的底部。
          </p>

          <p>谢谢！</p>

          <p>–  UncleYee</p>
        </div>
      </div>
    );
  }
}

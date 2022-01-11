//해당 문서에서 React의 기능을 사용하기 위해 import한다.
import React, {Component} from 'react';
import './App.css';

/*
외부 JS파일로 모듈화한 컴포넌트를 해당 문서로 import하기위한 구문으로
export default로 지정한 이름을 그대로 사용하면 된다.
형식] import 컴포넌트명 from '컴포넌트경로'
*/
import Subject from './components/Subject';
import Navi from './components/Navi';
import Content from './components/Content';


//클래스형 컴포넌트(함수형 컴포넌트는 Hook(훅)에서 다루겠다)
class App extends Component{
  //생성자에서 state를 생성 및 초기화한다.
  constructor(props){
    super(props);
    //해당 앱에서 사용할 데이터
    this.state = {
      subject : {title: 'WEB(st)', sub: 'World Wide Web(st)'},
      contents : [
        { id:1, title: 'HTML', desc: 'HTML은 내용을 출력합니다.'},
        { id:2, title: 'CSS', desc: 'CSS는 스타일을 지정합니다.'},
        { id:3, title: 'JavaScript', desc: 'JS는 화면을 동적으로 제어합니다.'}
      ]
    }   
  }
  render(){
    return(
      <div className="App">
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}></Subject>
        <Navi data={this.state.contents}></Navi>
        <Content title="HTML(pr)" sub="HTML is HyperText MarkUp Language(pr)"></Content>
      </div>
    );
  }
}

export default App;

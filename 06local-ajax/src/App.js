import React, {Component} from 'react';
import './App.css';


//Nav 컴포넌트를 제작하여 모듈화
class Nav extends Component {
  //state 선언
  state = {
    list : [] //배열로 선언
  }
  //수명주기 함수 중 render()가 호출되기 전에 미리 호출되는 함수로 전처리에 사용됨
  componentDidMount(){
    //비동기 처리를 위한 fetch()함수를 호출한다. 
    fetch('list.json') //해당 JSON 파일을 읽어온다.
      .then(function(result){
        return result.json(); //요청에 성공한 경우 콜백데이터를 반환한다.
      })
      .then(function(json){
        //앞의 then절에서 반환한 값이 해당 then절로 전송된다.
        console.log(json);
        //state 값을 설정한다.
        this.setState({list:json}); 
      }.bind(this));
  }
  //렌더링을 처리하는 함수
  render(){
    //네비의 반복되는 <li>태그를 저장할 배열
    var listTag = [];
    //state의 list의 갯수만큼 반복
    for(var i=0; i<this.state.list.length; i++){
      //각 인덱스의 객체를 얻어옴
      var li = this.state.list[i];
      //배열에 <li>태그를 추가한다.
      listTag.push(
        //반복되는 li태그에 중복되지 않는 key prop을 추가한다.
        <li key={li.id} >
          {/* 이벤트 객체를 통해 값을 전달하기 위해 data-id 속성을 추가한다. */}
          <a href={li.id} data-id={li.id} onClick={(e)=>{
            //화면의 새로고침 중단
            e.preventDefault();
            console.log("링크 클릭함")
            //props를 통한 이벤트를 발생시켜 부모쪽으로 id값을 전달한다.
            this.props.myLinkClick(e.target.dataset.id);
          }}>{li.title}</a>
        </li>
      )
    }
    return(
      <nav>
        <ul>
          {listTag}
        </ul>
      </nav>
    );
  }
}


//Article 컴포넌트 추가하여 모듈화
class Article extends Component{
  //부모로부터 props를 받아서 내용 출력
  render(){
    return(
      <article>
          <h2>{this.props.title}</h2>
          {this.props.desc}
      </article>
    );
  }
}

class App extends Component{
  //앱에 첫 진입시 출력할 내용을 state로 선언
  state={
    article:{title:'welcome', desc:'Hello, Ajax!'}
  }
  render(){
    return(
      <div className="App">
        <h1>WEB</h1>
        <Nav myLinkClick={(id)=>{
          /*
            각 링크를 클릭할 경우 인자로 전달되는 id값을 통해
            JSON파일을 읽어서 state값을 변경한다.
          */
          fetch(id+'.json')
            .then(function(result){
              return result.json();
            })
            .then(function(json){
              /*
              JSON에서 읽어온 내용으로 state를 변경한다. state가 변경되면
              render()가 재호출되면서 렌더링된다.
              */
              this.setState({
                article:{
                  title:json.title,
                  desc:json.desc
                }
              });
            }.bind(this))
        }}></Nav>
        <Article title={this.state.article.title} desc={this.state.article.desc}></Article>
      </div>
    )
  }
}
export default App;
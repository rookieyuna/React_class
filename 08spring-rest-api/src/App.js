import React, { Component } from 'react';
import './App.css';

import Top from './components/Top';
import Left from './components/Left';
import Bottom from './components/Bottom';
import ListContents from './components/ListContents';
import ViewContents from './components/ViewContents';
import WriteContents from './components/WriteContents';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      mode:'list',
      num : 0
    };
  }
  render(){
    //mode에 따라 화면의 내용을 변경하기 위해 컴포넌트를 저장할 목적으로 생성된 변수
    let content;
    //게시판 목록(state의 초기값)
    if(this.state.mode ==='list'){
      content=<ListContents 
        /*
        부모가 자식 컴포넌트로 데이터를 전달할때는 props를 사용한다
        자식이 부모로 데이터를 전달할때는 Event를 통해 전달한다. 단 이때
        부모가 내려준 props 기능(함수)를 사용한다.
        */
        myBoardView={(pnum,pmode)=>{
          /*
          2개의 파라미터를 통해 화면의 상태(mode)를 view로 변경하고,
          서버와 통신시 사용할 일련번호를 받아온다. 
          */
          console.log("num",pnum,"mode",pmode);
          //파라미터를 통해 state를 변경하고 화면을 업데이트 한다
          this.setState({
            mode:pmode, num:pnum, pageNum:'1'
          });
        }}
        myBoardWrite={(pmode)=>{
          this.setState({
            mode:pmode
          });
        }}
      ></ListContents>
    }

    else if(this.state.mode==='view'){
      /*
      리스트에서 특정게시물을 클릭할때 전달된 파라미터를 통해 mode는 view로 변경하고
      게시물 일련번호는 state의 num을 변경한다. 이때 새롭게 렌더링 되면서 얻어온 num을
      ViewContents컴포넌트의 props로 사용한다.
      */
      content = <ViewContents num={this.state.num} myBoardList={(pmode)=>{
        //리스트로 전환하기 위한 props를 정의한다.
        console.log("mode",pmode);
        this.setState({mode:pmode});
      }}></ViewContents>
    }

    else if(this.state.mode==='write'){
      //mode가 글쓰기 일 때 진입
      content = <WriteContents
        //리스트 바로가기 버튼에서 사용
        myBoardList={(pmode)=>{
          console.log("mode",pmode);
          this.setState({mode:pmode});
        }}
        //폼값을 submit했을 때 서버로 전송하기 위한 함수를 props로 전달한다.
        mySubmitValue={(_id, _title, _content)=>{
          console.log(_id, _title, _content);

          //파라미터는 JSON객체로 조립
          let param ={
            id : _id,
            title : _title,
            content : _content,
          };

          //요청URL 선언
          let url = 'http://localhost:8081/jsonrestapi/restapi/boardWrite.do';
          /*요청하기 : fetch()를 통해 POST로 폼값을 JSON으로 전송
          JSON 객체를 String으로 변환한 후 body에 실어 전송한다.
          스프링서버에서는 @RequestBody 어노테이션을 통해 폼값을 받는다.
          */
          fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(param)
            })
            .then((response)=>{
              return response.json();
            })
            .then(function(json){
              console.log(json);
              if(json.result==='success'){
                console.log("글쓰기 성공");
              }
              else{
                alert("글쓰기에 실패했습니다.")
              }
            });
            //state변경을 통해 게시판 리스트를 렌더링 한다.
            this.setState({mode:'list'});
        }}
      ></WriteContents>
    }

    return (
      <div className="container">
        {/* Top컴포넌트 */}
        <Top></Top>
        {/* Middel 영역 */}
        <div className="row">
          {/* Left컴포넌트 */}
          <Left></Left>
          {/* Contents영역 - List, View 컴포넌트 삽입 */}
          {content}
        </div>
        <Bottom></Bottom>
      </div>
    );
  }
}

export default App;

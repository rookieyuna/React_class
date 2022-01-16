/*
react-router-dom
  : 리액트는 기본적으로 화면의 새로고침 없이 화면을 갱신한다. 이 경우 
  주소가 하나로 고정되기 때문에 즐겨찾기와 같은 기능을 사용할 수가 없다. 
  어떤 주소로 들어왔을 때 그 주소를 알아내어 그에 해당하는 컴포넌트를
  렌더링하고, 그상태를 관리하기 위해 내부적으로 state나 props를 관리할 수 
  있게 해주는 도구가 react-router-dom 이다.
*/
import './App.css';
import {BrowserRouter, Route, Switch, NavLink, useParams} from "react-router-dom"
/*
BrowserRouter 
  : 리액트 라우터 돔을 적용하고 싶은 컴포넌트의 최상위 컴포넌트를
  감싸주는 Wrapper(래퍼)로 사용한다.
Route 
  : URL에 따른 적당한 컴포넌트를 렌더링하기 위해 사용한다.
Switch
  : URL과 일치하는 첫번째 컴포넌트가 발견되면 나머지 컴포넌트는 아예
  렌더링 하지 않는 역할을 한다. 즉, 최초로 발견된 컴포넌트 하나만 렌더링한다.
Link
  : a태그를 통한 링크는 클릭할때마다 화면의 새로고침되어 갱신된다.
  React는 화면의 깜빡임이 없어야 하므로, 링크를 눌렀을 때 reload되지 않도록 처리한다.
*/

//함수형 컴포넌트 정의
function Home(){
  return (
    <div>
      <h2>Home</h2>
      Home컴포넌트
    </div>
  );
}



//Topics의 메뉴링크를 구성하기 위한 JSON 배열 생성
let contents = [
  {id:1, cate:'free', title:'자유게시판', desc:'<h2>자유게시판 리스트</h2>'},
  {id:2, cate:'qna', title:'QNA게시판', desc:'<h2>QNA게시판 리스트</h2>'},
  {id:3, cate:'faq', title:'FAQ게시판', desc:'<h2>FAQ게시판 리스트</h2>'},
]

function Topics(){
  //링크를 구성하는 li태그를 저장할 배열 생성
  let liTag =[];
  //배열의 크기만큼 반복
  for(var i=0; i<contents.length; i++){
    liTag.push(
      <li key={contents[i].id}>
        <NavLink to={"/Topics/"+contents[i].cate}>{contents[i].title}</NavLink>
      </li>
    );
    /*
    li태그와 같이 반복되는 엘리먼트를 사용하는 경우 React는 중복되지 않는
    key prop을 요구한다. 그러므로 key라는 prop을 추가해야한다.
    */
  }
  return (
    <div>
      <h2>Topics</h2>
      <div>Topics컴포넌트</div>
      <ul>
        {liTag}
      </ul>
      {/* <Switch>
        <Route path="/Topics/free"><h2>자유게시판 리스트</h2></Route>
        <Route path="/Topics/qna"><h2>QNA게시판 리스트</h2></Route>
        <Route path="/Topics/faq"><h2>FAQ게시판 리스트</h2></Route>
      </Switch> */}
      <Route path="/Topics/:topic_cate">
        <Desc></Desc>
      </Route>
    </div>
  );
}

/*
useParams() : 파라미터로 전송된 값을 받아오기 위한 리액트 훅으로
  <Route path="/Topics/:topic_cate">와 같이 라우팅 처리를 할 때
  파라미터를 :변수명 형태로 전송하게 된다.
*/

function Desc(){
  //파라미터를 받아오기 위한 훅을 실행
  let params = useParams()
  console.log("params",params); //topic_cate : "qna"와 같이 출력됨
  let topic_cate = params.topic_cate; //파라미터 값을 얻어옴

  //일치하는 파라미터가 없을 경우 출력할 기본내용 추가
  let selected_item = {
    title : "Sorry", desc : "Not Found"
  }
  //배열내에서 파라미터와 일치하는 값이 있는지 확인한다.
  for(var i=0; i<contents.length; i++){
    if(contents[i].cate===topic_cate){
      //일치하는 값이 확인되면 배열에서 추출한다.
      selected_item = contents[i];
      break;
    }
  }

  return(
    <div>
      <h3>{selected_item.title}</h3>
      {selected_item.desc}
    </div>
  )
}




function Contact(){
  return (
    <div>
      <h2>Contact</h2>
      Contact컴포넌트
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Hello React Router DOM</h1>
        {/* 이동하기 위한 링크 정의(a태그 사용) : 화면이 새로고침 됨 */}
        <ul>
          <li><a href="/">Home(a)</a></li>
          <li><a href="/Topics">Topics(a)</a></li>
          <li><a href="/Contact">Contact(a)</a></li>
        </ul>
        {/* 이동하기 위한 링크 정의(Link태그 사용) : 화면이 새로고침 안됨 */}
        <ul>
          <li><NavLink exact to="/">Home(Link)</NavLink></li>
          <li><NavLink to="/Topics">Topics(Link)</NavLink></li>
          <li><NavLink to="/Contact">Contact(Link)</NavLink></li>
        </ul>
        {/* 
        Route path="매핑할경로명"
          : 해당 경로로 요청이 들어오면 매핑된 컴포넌트를 렌더링한다.
        exact
          : <Route 컴포넌트에 삽입하면 path(경로)가 정확히 일치하는 경우에만
          라우팅된다. 만약 포함하지 않으면 Topics를 눌렀을 때 Home이 보이는 문제가
          발생한다.
        */}
        <Route exact path="/"><Home></Home></Route>
        <Route path="/Topics"><Topics></Topics></Route>
        <Route path="/Contact"><Contact></Contact></Route>

        <h3>Switch 적용</h3>
        {/* 
        Switch컴포넌트를 사용하는 경우 첫번째 Route에 exact를 기술하지 않으면 
        /가 모든 URL 을 포함하는 형태이므로 아래쪽에 정의된 컴포넌트는 
        렌더링되지 않는다.
        일치하는 URL이 없는 경우 404메세지를 보여준다.
        */}
        <Switch>
          <Route exact path="/"><Home></Home></Route>
          <Route path="/Topics"><Topics></Topics></Route>
          <Route path="/Contact"><Contact></Contact></Route>
          <Route path="/">404:Page Not Found</Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

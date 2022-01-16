/*
Hook(훅)
  : 리액트 기본 버전에서는 간단한 기능을 제작할때만 함수를 사용했다
  이유는 state를 변경하는 것이 클래스형 컴포넌트에서만 가능했기 때문이다
  하지만 16.8버전부터 Hook을 통해 함수형 컴포넌트에서도 state를 변경할 수 
  있게 되었다. React Hook은 useXXX()와 같은 이름의 함수를 사용한다.
  사용을 위해서는 반드시 import 해야한다.
*/
import React, {useState, useEffect} from 'react';
import './App.css';

/*
최상위 컴포넌트를 함수형으로 제작
*/
function App() {
  /*
  useState()사용시 전달된 true는 좌측항의 첫번째 인자로 전달된다.
  즉 state의 초기값은 true인 것이다.
  */
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);
  return (
    <div className="container">
      <h1>Class형 vs Function형 컴포넌트</h1>
      {/* 이벤트 리스너에 사용한 함수는 useState()의 두번째
        반환값으로 state를 변경하는 역할을 한다.
        즉, false로 변경한다
      */}
      <input type="button" value="함수형컴포넌트삭제" onClick={
        function(){
          setFuncShow(false);
        }
      } />
      <input type="button" value="클래스형컴포넌트삭제" onClick={
        function(){
          setClassShow(false);
        }
      } />

      {/* 부모에서 자식으로 데이터를 전달할 때는 props를 사용 */}
      {funcShow? <FuncComponent initNumber={2}></FuncComponent> : null}
      {classShow? <ClassComponent initNumber={2}></ClassComponent> : null}
      {/* 각 변수가 false가 되면 삼항연산자에 의해 컴포넌트는 숨김처리된다. */}
    </div>
  );
}

/*
함수형 컴포넌트
  : 출력할 내용을 즉시 return하면 된다. 함수안에 또다른 함수를 사용할 수 
  없으므로 render()함수가 별도로 존재하지 않고 자기 자신이 
  render()역할을 수행한다.
*/
function FuncComponent(props){
  /*
  함수형 컴포넌트에서는 return이 render()의 역할을 하므로 
  특정함수를 호출하거나 해서 렌더링 전 전처리를 할 수 있다.
  */
  console.log('#Life1#', 'FuncComponent==>함수실행');
  /*
  useState()로 얻어온 값을 출력하면 크기가 2인 배열로 출력된다.
  0번째 요소는 인자로 전달한 값(상태값)이고
  1번째 요소는 state값을 변경할 수 있는 함수가된다. 
   */
  var numberState = useState(props.initNumber);
  //console.log("numberState", numberState);
  var number = numberState[0];//state값
  var setNumber = numberState[1];//state를 변경할 수 있는 함수

  /*
  함수형 컴포넌트에서는 state가 추가될때마다 Hook을 통해 추가해야함
  */
  var dateState = useState((new Date()).toString());
  var nowDate = dateState[0];
  var setDate = dateState[1];
  //=> 반환값이 배열이므로 위 코드를 아래와 같이 변경가능
  //var [nowDate, setDate] = useState((new Date()).toString());

  /*
  해당 컴포넌트가 렌더링 된 후 자동으로 호출된다. 해당 함수는 첫번째
  인자로 반드시 함수가 와야한다.
  클래스형 컴포넌트는 마운팅단계와 업데이트 단계에서 사용하는 별도의
  수명주기 함수가 있지만, 함수형 컴포넌트는 별도로 존재하지 않는다.

  */
  useEffect(function(){
    console.log('#Life3#','FuncComponent==>useEffect');
  });


  //함수형 컴포넌트에서는 return이 될 때 렌더링된다.
  console.log('#Life2#','FuncComponent==>return 실행(render와 동일)');

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>initNumber : {number}</p>
      <p>날짜 : {nowDate}</p>
      {/* 
      Hook을 통해 생성된 numberState의 2번째 인자를 setNumber라는 함수명으로
      받았으므로, 해당 버튼의 이벤트 처리에서 사용할 수 있다. 
      버튼 클릭 시 number값을 생성한 난수로 변경하게 된다.
      */}
      <input type="button" value="난수생성" onClick={function(){
        setNumber(Math.random());
      }}/>
      {/* 
        함수형 컴포넌트에서는 state값을 변경하기 위해 this를 사용할 필요가 없으므로,
        어떤 형식의 함수를 사용해도 별도의 바인딩이 필요하지 않다.
      */}
      <input type="button" value="현재날짜" onClick={function(){
        setDate((new Date()).toString());
      }}/>
    </div>
  );
}


/***************************************************************/



/*
클래스형 컴포넌트
  : React.Component를 상속하며 선언한다. 수명주기 함수중에 
  render()함수를 통해 렌더링하므로 필수적으로 선언해야한다.
*/
class ClassComponent extends React.Component { 
  /*
  state의 초기값으로 props를 사용하고 있다.
  props는 부모가 전달해준 일종의 파라미터로 "this.props.프롭스명"으로 
  사용한다.
  state는 항상 JSON객체 형태로 생성한다.
  */
  state ={
    number : this.props.initNumber,
    nowDate : (new Date()).toString(),
  }
  /*
  클래스형 컴포넌트에서는 2개 이상의 state가 필요하면 컴마로 구분하여 추가하면 된다.
  */

  /***********
   
   ************/



  /*
  render()가 호출되기 전에 호출되는 수명주기 함수
  getDerivedStateFromProps()라는 함수도 있는데 , render가 호출되기 전에
  전달된 props를 통해 state를 변경하는 역할을 한고 반환값이 반드시 있어야한다.

  */
  UNSAFE_componentWillMount(){
    /*
    해당 함수는 17버전 이상에서 사용할때는 UNSAFE_를 붙이지 않으면
    경고메세지가 뜨게된다.
    */
    console.error("ClassComponent => componentWillMount() 호출됨");
  }
  //render()가 호출된 후 자동 호출되는 수명주기 함수
  componentDidMount(){
    console.error("ClassComponent => componentDidMount() 호출됨");
  }
  /*
  최초 렌더링 시에는 호출되지 않고, state 값이 변경에 의해 재렌더링이 
  될 때 호출된다. 해당 함수에서 true가 호출될때만 render()가 호출된다.
  만약 false를 반환하면 화면이 갱신되지 않는다.
  */
  shouldComponentUpdate(){
    console.error("ClassComponent => shouldComponentUpdate() 호출됨");
    let rNum = Math.round(this.state.number*100) %2;
    if(rNum===0){
      return true;
    }
    else{
      console.log("홀수는 렌더링 안됨");
      return false;
    }
  }


  render(){
    console.error("ClassComponent => render() 호출됨");
    return (
      <div className="container">
        <h2>클래스형 component</h2>
        <p>initNumber : {this.state.number}</p>
        <p>날짜 : {this.state.nowDate}</p>
        {/* 
          해당버튼을 누를때마다 난수를 생성하여 state의 number를 변경한다.
          클래스형 컴포넌트에서는 setState()를 통해 state를 변경할 수 있고,
          이때 새롭게 렌더링이 된다.
        */}
        <input type="button" value="난수생성" onClick={()=>{
          this.setState({number : Math.random()});
        }}/>
        <input type="button" value="현재날짜" onClick={function(){
          this.setState({nowDate : (new Date()).toString()});
        }.bind(this)}/>
        {/* 
          일반적인 함수를 사용하면 컴포넌트와 버튼을 바인딩하기 위해 bind()를 
          사용해야 하다미나, 화살표 함수(Arrow Function)를 사용하면 별도의 
          바인딩이 필요없다.
        */}
      </div>
    );
  }
}

export default App;

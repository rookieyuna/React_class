import React, {Component} from "react";

class ListContents extends Component{
    /*
    게시판 목록을 저장할 배열과 페이지 번호 생성
    React에서는 컴포넌트의 상태를 표현하기 위해 state를 사용하고
    state값이 변경되면 render()함수가 호출되어 화면이 갱신된다.
    */
    state ={
        blists : [],
        pageNum :1
    }
    /*
    render()함수가 호출된 직후 호출되는 수명주기 함수로
    첫 렌더링에서는 빈화면을 먼저 출력하고, 서버와 통신 후 데이터가 있는 화면을 출력한다.
    */
    componentDidMount(){
        //state의 pageNum을 가져와서 요청URL에 파라미터로 사용
        let pageNum = this.state.pageNum;
        /*
        fetch()함수는 별도의 옵션이 없으면 Get방식의 요청 수행
        스프링 서버로 요청한 후 콜백데이터가 있으면 then()절에서 콜백받는다.
        */
        fetch('http://localhost:8081/jsonrestapi/restapi/boardList.do?nowPage='+pageNum) //페이지X
        .then(function(result){
        //서버에서 콜백된 데이터를 result매개변수로 받아온다.
        return result.json();
        })
        .then(function(json){
        //앞의 then절에서 return한 내용은 해당 then절로 전달된다.
        console.log(json);
        //콜백데이터를 통해 state값을 변경하면 화면이 갱신된다.
        this.setState({blists:json});

        /*
        this.state.blists = json;
        이와 같이 state를 변경할 수 있으나, 이경우 render()함수가 호출되지 않으므로
        화면이 갱신되지 않는다. 반드시 setState함수를 통해 state값을 변경해야한다.
        */
        }.bind(this)); //then절에서 일반함수를 사용했으므로 bind()함수가 필요하다.
    }

    render(){
        console.log("ListContents render완료");
        //파싱된 데이터를 출력하기 위해 배열생성
        let listTr = [];
        //출력할 리스트 항목의 개수만큼 반복
        for(var i=0; i<this.state.blists.length; i++){
        //인덱스를 통해 해당반복에서 출력할 객체를 저장
        var row =this.state.blists[i];
        //push()를 통해 배열의 마지막 부분에 데이터 삽입
        /*
        tr태그에 key는 리액트가 중복되지 않는 key prop을 요구하므로 삽입
        data-id : event객체를 통해 dataset.id속성값으로 지정된 값을 얻어올 수 있다.
            여기서는 게시물의 일련번호를 전달할 목적으로 사용된다.
        */
        listTr.push(
            <tr align="center" key={row.num}>
            <td>{row.num}</td>
            <td align="left"><a href={row.num} data-id={row.num} onClick={
                (e)=>{
                //화면의 새로고침을 차단한다.
                e.preventDefault();
                /*
                부모 컴포넌트가 props를 통해 전달한 값(함수)을 통해 파라미터 전달
                게시물의 일련번호와 화면의 mode값이 사용된다.
                */
                this.props.myBoardView(e.target.dataset.id, 'view');
                }
            }>{row.title}</a></td>
            <td align="center">{row.id}</td>
            <td align="center">{row.visitcount}</td>
            <td align="center">{row.postdate}</td>
            </tr>
        );
        }
        return(
        <div className="col-lg-10" id="lay_contents">
            <h2>게시판목록</h2>
            <table className="table table-bordered">
            <thead>
                <tr>
                <th width="10%">번호</th>
                <th width="*">제목</th>
                <th width="15%">작성자</th>
                <th width="15%">조회수</th>
                <th width="15%">작성일</th>
                </tr>
            </thead>
            <tbody>
                {listTr}
            </tbody>
            </table>
            <div align="right">
                <button type="button" onClick={(e)=>{
                    this.props.myBoardWrite('write');
                }}>글쓰기</button>
            </div>
        </div>
        );
    }
}

export default ListContents;
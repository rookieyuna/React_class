import React, {Component} from "react";

class WriteContents extends Component{
    render(){
        console.log("WriteContents render완료");
        return(
        <div className="col-10" id="lay_contents">
            <h2>게시판글쓰기</h2>
            <form method="post" onSubmit={(e)=>{
                //submit이벤트 발생시 화면 새로고침 방지
                e.preventDefault();
                /*
                부모컴포넌트에서 props로 전달한 함수를 호출하여
                입력된 폼값을 전달한다.
                */
                this.props.mySubmitValue(
                    e.target.id.value,
                    e.target.title.value,
                    e.target.content.value
                );
            }}>
                <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th width="20%">아이디</th>
                        <td width="80%">
                            <input type="text" name="id" value="test1" readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>
                            <input type="text" name="title" />
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td height="100">
                            <textarea name="content"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4" align="center">                     
                            <button type="submit" onClick="">
                                작성완료
                            </button>
                            <button type="button" onClick={(e)=>{
                                this.props.myBoardList('list');
                            }}>
                                리 스 트
                            </button>
                        </td>
                    </tr>  
                </tbody>                              
                </table>
            </form>
        </div>
        );
    }
}

export default WriteContents;
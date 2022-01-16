import React, {Component} from "react";

class CreateForm extends Component {
    render(){
        return (
            <article>
                <h2>Create</h2>
                <form action="/create_process" method="post" onSubmit={(e)=>{
                    //submit되었을 때 화면의 새로고침 차단
                    e.preventDefault();
                    //부모가 내려준 props를 통해 폼값을 전달
                    this.props.onSubmitValue(
                        e.target.title.value,
                        e.target.desc.value,
                    );
                }}>
                    <p><input type="text" name="title" placeholder="제목입력" /></p>
                    <p><textarea name="desc" placeholder="내용입력"></textarea></p>
                    <p><input type="submit" value="전송" /></p>
                </form>
            </article>
        );
    }
}

export default CreateForm
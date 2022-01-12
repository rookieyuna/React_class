import React, {Component} from 'react';

//게시물 수정을 위한 수정폼
class UpdateForm extends Component{
    /*
    state를 추가하기 위해 생성자를 선언한다.
    props로 전달된 데이터를 state로 초기화 한다.
    */
    constructor(props){
        super(props);
        this.state = {
            id : this.props.readData.id,
            title : this.props.readData.title,
            desc : this.props.readData.desc
        }
    }
    /*
    각 input 상자에서 입력한 내뇽이 있을때 state 값을 변경하기 위해
    선언한 함수로, setState()함수를 통해 값을 변경한다. 이벤트 객체를 통해
    input상자의 name, value 속성을 얻어와서 지정된 값을 변경할 수 있다.
    */
    inputChangeHandler = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }
    render(){
        return(
            <article>
                <h2>Update</h2>
                {/* 서브밋 이벤트 리스너에서 이벤트 객체를 통해 입력값을 전송한다. */}
                <form action='/create_process' method='post' onSubmit={function(e){
                    // submit되었을때 화면의 새로고침 차단
                    e.preventDefault();
                    this.props.onSubmitValue(
                        e.target.id.value,
                        e.target.title.value,
                        e.target.desc.value,
                    );
                }.bind(this)}>
                {/* 기존 게시물에 대한 수정이므로 게시물 아이디를 저장할 hidden상자 필요 */}
                {/* 
                    App.js에서 기존 게시물을 props로 전달한 후 input 상자에 즉시 삽입하면
                    값을 변경하는 것이 불가능하다. props는 읽기 전용 데이터이므로 값의 변경은
                    state를 통해서만 가능하다.
                    이 경우 props로 전달된 데이터를 통해 state를 초기화 하고, 각 input 상자에서
                    변경되는 값은 onChange 이벤트를 통해 동기화 해야 한다.
                */}
                    <input type="hidden" name="id" value={this.props.readData.id}/>
                    <p><input type="text" name="title" placeholder="제목입력"
                        value={this.state.title}
                        onChange={this.inputChangeHandler}/></p>
                    <p><textarea name="desc" placeholder="내용입력"
                        value={this.state.desc}
                        onChange={this.inputChangeHandler}/></p>
                    <p><input type="submit" value="전송" /></p>
                </form>
            </article>
        );
    }
}
export default UpdateForm
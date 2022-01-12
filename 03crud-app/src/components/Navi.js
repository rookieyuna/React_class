import React, {Component} from 'react';

class Navi extends Component{
    render(){
        let lists = [];
        let data = this.props.data;
        let i = 0;
        /*
        state에 정의한 contents를 props로 받아서 배열 크기만큼 반복하여
        li태그를 출력한다.
        이때 warning이 뜨게 되는데, 중복되지 않는 key prop을 추가하라고 한다.
        (Warning: Each child in a list should have a unique "key" prop.) 오류는 안나지만 경고..
        리액트의 요청사항이므로 li태그에 key속성으로 중복되지않는 값을 부여한다.

        자식은 부모쪽으로 데이터를 전달할 때 event를 이용한다.
        data-id라는 속성은 event를 통해 전달될 때 "이벤트객체.target.dataset.id"를
        통해 그 값을 얻어올 수 있다.
        */
        while(i<data.length){
            lists.push(<li key={data[i].id}>
                <a href={"/content/"+ data[i].id}
                    data-id={data[i].id}
                    onClick={function(event){
                        //console.log(event); //event확인용
                        //debugger; //실행을 잠시 멈추고 디버깅모드 진입
                        event.preventDefault();
                        /*부모가 props로 전달해준 함수를 호출할 때 매개변수로
                        data-id속성으로 지정한 값을 얻어와서 전달한다.*/
                        this.props.onChangePage(event.target.dataset.id);
                    }.bind(this)}
                >{data[i].title}</a>
            </li>);
            i++;
        }
        return(
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default Navi;
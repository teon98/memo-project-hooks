import React, { Component } from 'react';
import './Modal.scss';


class ReModal extends Component {
    //modal이 붙어있어서 memo창을 바로 열었을 때, 지정한 state값이 뜨지 않는다.
    //modal창이라는 상태를 history에 넣어 pupState를 통해 불러오거나
    //라우터를 만들어 수정 입력시 reload시키는 방법이 있을 것 같다.
    //우리가 하는 memo프로젝트는 이 point가 중요한게 아니니 넘어가자
    state = {
        title:this.props.data.title,
        content:this.props.data.content,
        author:this.props.data.author,
    }
  
  handleUpdate = (event) => {
      event.preventDefault();
      this.props.onUpdate(this.props.data.index, this.state);
      this.setState({
        title:'',
        content:'',
        author:''
      });
      this.props.reclose();
  };

  handleChange = (event) => {
      const {target: {name, value}} = event //비구조화 할당
      this.setState({[name] : value})
  };

  handleRemove = () => {
    console.log(this.props.data.index)
    this.props.onRemove(this.props.data.index);
    this.props.reclose();
  }

  render() {
    //props : 부모 컴포넌트로부터 가져오는 상태 값
    const { reOpen, reclose} = this.props;

    return (
        <div>
            {
                reOpen?
                //모달 창이 열려 있다면
                <React.Fragment>
                    <div className="Modal-verlay" onClick={reclose} />
                    <div className="Modal">
                        <h1 className="title">메모를 수정하세요!</h1>
                        <form onSubmit = {this.handleUpdate}>
                            <div className="content">
                                <h4>
                                    <input type='text' placeholder="아이디를 입력하세요"
                                            name='author' value={this.state.author}
                                            onChange={this.handleChange}>
                                            </input>
                                </h4>
                                <br/>
                                <h4>
                                    <input type='text' placeholder="제목을 입력하세요"
                                            name="title" value={this.state.title}
                                            onChange={this.handleChange}></input>
                                </h4>
                                <textarea name="content" value={this.state.content} 
                                            onChange={this.handleChange}>
                                </textarea>
                            </div>
                            <div className="button-wrap">
                                <button type="submit">
                                    <p>수정하기</p>
                                </button>
                                <button type="button" onClick={this.handleRemove}>
                                    <p>삭제하기</p>
                                </button>
                            </div>
                        </form>
                    </div>
                </React.Fragment> : null
            }
        </div>
    );
  }
}

export default ReModal;
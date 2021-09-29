import React, { Component } from 'react';
import './Modal.scss';


class ReModal extends Component {
  constructor(props){
      super(props);
      this.state = {
          title:this.props.data.title,
          content:this.props.data.content,
          author:this.props.data.author,
      }
  }
  
  handleUpdate = (event) => {
      event.preventDefault();
      this.setState({
        title:'',
        content:'',
        author:''
      });
      this.props.close();
  };

  handleChange = (event) => {
      const {target: {name, value}} = event //비구조화 할당
      this.setState({[name] : value})
  };

  render() {
    //props : 부모 컴포넌트로부터 가져오는 상태 값
    const { reOpen, reclose } = this.props;
    return (
        <React.Fragment>
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
                                    <input type='text'
                                            name='author' value={this.state.author}
                                            onChange={this.handleChange}></input>
                                </h4>
                                <br/>
                                <h4>
                                    <input type='text'
                                            name="title" value={this.state.title}
                                            onChange={this.handleChange}></input>
                                </h4>
                                <textarea name="content" value={this.state.content} 
                                            onChange={this.handleChange}>
                                </textarea>
                            </div>
                            <div className="button-wrap">
                                <button type="submit">
                                    <p>메모 수정하기</p>
                                </button>
                            </div>
                        </form>
                    </div>
                </React.Fragment> : null
            }
        </React.Fragment>
    );
  }
}

export default ReModal;
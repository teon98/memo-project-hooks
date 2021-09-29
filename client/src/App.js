import React, { memo } from 'react';
import './App.css';
import plus from './plus.png';
import Modal from './components/Modal';
import ReModal from './components/ReModal';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isModalOpen: false,
      reModalOpen: false,
      memos:[
        {
          title: "첫번째 메모",
          author: "ty",
          content: "필라테스 4시"
        },
        {
          title: "두번째 메모",
          author: "ty",
          content: "웨이트 OT 6시"
        },
      ],
      clickmemo:{
        title:'',
        author:'',
        content:'',
      }
    };
  }

  openModal = () => {
    this.setState({isModalOpen: true});
  }

  closeModal = () => {
    this.setState({ isModalOpen: false});
  }

  //수정할 메모는 모달창을 열 때 입력되어있는 state대로 올라갈 수 있도록 한다.
  reopenModal = (index, event) => {
    //reModal창을 열어주자
    this.setState({
      reModalOpen: true, 
      clickmemo:{
        title:this.state.memos[index].title,
        author:this.state.memos[index].author,
        content:this.state.memos[index].content,
      }
    });
    //console.log(index,this.state.memos[index]);
  }

  recloseModal = () => {
    this.setState({reModalOpen: false});
  }

  handleCreate = (new_memo) => {
    console.log(new_memo);
    let memos = this.state.memos;
    this.setState({memos: [...memos, new_memo]});
  }

  handleUpdate = (index, change_memo) => {
    console.log(index);
    console.log(change_memo);
  }

  render(){
    return(
      <div className='container'>
        <div className='App'>
            <h1>메모장</h1>
            <br/>
            <br/>
            <table>
              <tbody>
                <tr className="trList">
                  {this.state.memos.map((memo,index) =>
                    <td className="cell" key={index} onClick={(e)=>this.reopenModal(index,e)}>
                      <div className="inner">
                        <h2>{memo.title}</h2>
                        <h5>{memo.author}</h5>
                        <br/>
                        <br/>
                        <h4>{memo.content}</h4>
                        <br/>
                      </div>
                    </td>
                  )}
                  <td className='cell'>
                    <div className="inner" onClick={this.openModal}>
                      <img src={plus} className='picture' alt='logo' />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <main className='App'>
              <Modal isOpen={this.state.isModalOpen} close={this.closeModal} 
                    onCreate={this.handleCreate}/>
              <ReModal reOpen={this.state.reModalOpen} close={this.recloseModal} 
                    data={this.state.clickmemo} onUpdate={this.handleUpdate}/>
            </main>
        </div>
      </div>
    );
  }
}

export default App;

import Router from "next/router";
import { Component } from "react";

export default class ClassCounterPage extends Component {
  state = {
    count: 0,
  };

  componentDidMount(): void {
    console.log("컴포넌트가 마운트 되었습니다.");
  }

  componentDidUpdate(): void {
    console.log("컴포넌트가 업데이트 되었습니다.");
  }

  componentWillUnmount(): void {
    console.log("컴포넌트가 곧 언마운트 됩니다.");
  }

  onClickCountUp(): void {
    console.log(this.state.count);
  }

  onClickMove = (): void => {
    void Router.push("/");
  };

  render(): JSX.Element {
    return (
      <>
        <div>{this.state.count}</div>
        <button onClick={this.onClickCountUp}>카운트 올리기</button>
        <button onClick={this.onClickMove}>나가기</button>
      </>
    );
  }
}

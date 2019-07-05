import * as React from "react";
import * as io from "socket.io-client";
import "./App.scss";
import ColumnLTR from "./containers/ColumnLTR";
import {
  Receive,
  Info,
  Decide,
  Undo,
  Gaming,
  Waiting,
  RemoteReady,
  WaitDecide,
  RemoteLeave
} from "./actions";
import StatusBarLTR from "./containers/StatusBarLTR";
import { WAIT_DECIDE } from "./constants";
import ModelLTR from "./containers/ModelLTR";
import { paint } from "./service";

export interface AppProps {
  dispatch: React.Dispatch<any>;
  board: string[][];
  status: string;
}

class App extends React.Component<AppProps> {
  socket: SocketIOClient.Socket;
  constructor(props: AppProps) {
    super(props);
    this.socket = io("http://47.106.210.109:7001", {
      autoConnect: false
    });
  }

  componentDidMount() {
    const { dispatch } = this.props; //注意此处位于mount生命周期（仅触发一次），不可在此获取基本元素类型属性，否则感应不到变化
    const { socket } = this;

    socket.open();

    if (window.location.hash) {
      socket.emit("ready", window.location.hash.slice(1));
      dispatch(Waiting());
    }

    socket.on("connect", () => {
      console.log(`Your id ${socket.id}`);
    });

    socket.on("disconnect", () => {  //手动重启重新获取新的ID
      socket.open()
    })

    socket.on("random-1p", () => {
      dispatch(WaitDecide());
    });

    socket.on("random-2p", () => {
      dispatch(Waiting());
      window.location.hash = "#2p";
    });

    socket.on("remote-ready", () => {
      console.log("开始");
      dispatch(Gaming());
    });

    socket.on("remote-leave", () => {
      socket.disconnect();
      dispatch(RemoteLeave());
    });

    socket.on("remote-chess", (info: Info) => {
      paint(this.props.board, info.player, info.pos, () =>
        dispatch(Receive(info))
      );
    });

    socket.on("remote-undo", () => {
      dispatch(Decide());
    });

    socket.on("remote-agree", () => {
      dispatch(Undo());
    });

    socket.on("remote-reject", () => {
      dispatch(Waiting());
    });

    socket.on("remote-restart", () => {
      //处于仅触发一次的周期中，必须这样才能获取实时props里的status。
      if (this.props.status === WAIT_DECIDE) {
        dispatch(Gaming());
      } else {
        dispatch(RemoteReady());
      }
    });
  }

  shouldComponentUpdate() {
    //App组件仅需在开头渲染，避免因status改变导致的重复渲染，仅需Redux更新组件状态
    return false;
  }

  render() {
    let columns = [];
    const { socket } = this;

    for (let i = 0; i < 7; i++) {
      columns.push(<ColumnLTR socket={socket} pcs={6} pos={i} key={i} />);
    }
    return (
      <div id="app">
        <div className="title">
          <h1>Connect4</h1>
          <p>
            Produced by{" "}
            <a href="https://www.kavelaa.work" target="_blank">
              Kavelaa
            </a>
          </p>
        </div>
        <div id="columns">
          {columns}
          <canvas id="canvas" width={364} height={302} />
          <ModelLTR socket={socket} />
        </div>
        <StatusBarLTR socket={socket} />
      </div>
    );
  }
}

export default App;

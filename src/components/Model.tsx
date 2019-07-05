import * as React from "react";
import { DECIDE, WAIT_DECIDE, INIT, REMOTE_LEAVE } from "../constants";
import { Undo, Gaming, Init } from "../actions";

interface Props {
  status: string;
  socket: SocketIOClient.Socket;
  dispatch: React.Dispatch<any>;
}

interface State {
  confirm: boolean;
}

class Model extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      confirm: false
    };
  }

  render() {
    const { status, socket, dispatch } = this.props;
    const { confirm } = this.state;

    if (status === INIT) {
      let link = `${document.location.href}#${socket.id}`;

      return (
        <div id="model">
          {!confirm && (
            <div id="model-block">
              <div
                className="btn"
                onClick={() => {
                  this.setState({ confirm: true });
                }}
              >
                邀请朋友
              </div>
              <div className="btn" onClick={() => socket.emit("random")}>
                随机匹配
              </div>
            </div>
          )}
          {confirm && (
            <div id="model-block">
              让你的朋友访问该链接，以进行对局：
              <p>{link}</p>
            </div>
          )}
        </div>
      );
    } else if (status === DECIDE) {
      const confirm = () => {
        dispatch(Undo());
        socket.emit("agree");
      };
      const reject = () => {
        dispatch(Gaming());
        socket.emit("reject");
      };

      return (
        <div id="model">
          <div id="model-block">
            <div>对方请求悔棋，是否同意？</div>
            <div id="model-choice">
              <div className="btn" onClick={confirm}>
                是
              </div>
              <div className="btn" onClick={reject}>
                否
              </div>
            </div>
          </div>
        </div>
      );
    } else if (status === WAIT_DECIDE) {
      return (
        <div id="model">
          <div id="model-block">等待中。。。</div>
        </div>
      );
    } else if (status === REMOTE_LEAVE) {
      return (
        <div id="model">
          <div id="model-block">
            对方离开了
            <div
              className="btn"
              onClick={() => {
                dispatch(Init());
              }}
            >
              好的
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Model;

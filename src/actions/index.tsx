import * as React from 'react'
import * as constants from '../constants'

export interface Dealing {
  (dispatch: React.Dispatch<Chess | Receive>): Promise<void>
}

export interface Init {
  type: constants.INIT
}

export interface Gaming {
  type: constants.GAMING
}

export interface Waiting {
  type: constants.WAITING
}

export interface Receive {
  type: constants.RECEIVE
  info: Info
}

export interface Chess {
  type: constants.CHESS
  info: Info
}

export interface Decide {
  type: constants.DECIDE
}

export interface WaitDecide {
  type: constants.WAIT_DECIDE
}

export interface Undo {
  type: constants.UNDO
}

export interface Reset {
  type: constants.RESET
}

export interface RemoteReady {
  type: constants.REMOTE_READY
}

export interface RemoteLeave {
  type: constants.REMOTE_LEAVE
}

export interface Info {
  player: string
  pos: number
}

export function Init() {
  return {
    type: constants.INIT
  }
}

export function Gaming(): Gaming {
  return {
    type: constants.GAMING
  }
}

export function Waiting() {
  return {
    type: constants.WAITING
  }
}

export function WaitDecide() {
  return {
    type: constants.WAIT_DECIDE
  }
}

export function Chess(info: Info): Chess {
  return {
    type: constants.CHESS,
    info
  }
}

export function Receive(info: Info): Receive {
  return {
    type: constants.RECEIVE,
    info
  }
}

export function Decide() {
  return {
    type: constants.DECIDE
  }
}

export function Undo(): Undo {
  return {
    type: constants.UNDO
  }
}

export function Reset(): Reset {
  return {
    type: constants.RESET
  }
}

export function RemoteReady(): RemoteReady {
  return {
    type: constants.REMOTE_READY
  }
}

export function RemoteLeave() {
  return {
    type: constants.REMOTE_LEAVE
  }
}
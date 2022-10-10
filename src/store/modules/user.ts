import { MutationTree, ActionTree } from 'vuex'
import * as types from '../mutation-types'

interface UserInfoState {
  name: string;
  position: string;
}

export const state: UserInfoState = {
  name: '',
  position: ''
}

export const mutations: MutationTree<UserInfoState> = {
  [types.SET_CURRENT_USER]: (state: UserInfoState, payload: UserInfoState) => {
    state.name = payload.name
    state.position = payload.position
  }
}

export const actions: ActionTree<UserInfoState, any> = {
  updateUserInfo({ commit }, payload: UserInfoState) {
    commit(types.SET_CURRENT_USER, payload)
  }
}

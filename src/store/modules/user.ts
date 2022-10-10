import { GetterTree, MutationTree, ActionTree } from 'vuex'
import * as types from '../mutation-types'
import { getCurrentUser } from '@/api/main'
interface UserInfoState {
  name: string;
  position: string;
}

export const state: UserInfoState = {
  name: '',
  position: ''
}

export const getters: GetterTree<UserInfoState, any> = {
  loggedIn: (state: UserInfoState) => state.name,
  userInfo: (state: UserInfoState) => state
}

export const mutations: MutationTree<UserInfoState> = {
  [types.SET_CURRENT_USER]: (state: UserInfoState, payload: UserInfoState) => {
    state.name = payload.name
    state.position = payload.position
  }
}

export const actions: ActionTree<UserInfoState, any> = {
  async getCurrentUser({ dispatch }) {
    try {
      const result: any = await getCurrentUser()
      dispatch('updateUserInfo', result.user)
    } catch (e) {
    }
  },
  updateUserInfo({ commit }, payload: UserInfoState) {
    commit(types.SET_CURRENT_USER, payload)
  }
}

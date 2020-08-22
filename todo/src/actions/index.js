export const todotoupdate = (todo) => {
  return {
    type:'TODOTOUPDATE',
    payload:todo
  }
}
export const turnoneditmode = (mode) => {
  return {
    type:'TURNONEDITMODE',
    payload:mode
  }
}
export const turnoffeditmode = (mode) => {
  return {
    type:'TURNOFFEDITMODE',
    payload:mode
  }
}
export const login = () => {
  return {
    type:'LOGIN'
  }
}
export const logout = () => {
  return {
    type:'LOGOUT'
  }
}

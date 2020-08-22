// action to the todo which have to be updated to do
export const todotoupdate = (todo) => {
  return {
    type:'TODOTOUPDATE',
    payload:todo
  }
}
// action to turn on the editmode
export const turnoneditmode = (mode) => {
  return {
    type:'TURNONEDITMODE',
    payload:mode
  }
}
// action to turn off  the edit mode
export const turnoffeditmode = (mode) => {
  return {
    type:'TURNOFFEDITMODE',
    payload:mode
  }
}
// action to set the user is login and allow acess to the application
export const login = () => {
  return {
    type:'LOGIN'
  }
}
// action to set the islogged state to false to not allow access to the application
export const logout = () => {
  return {
    type:'LOGOUT'
  }
}

export const Routes = {
  Home: '/',
  Blog: 'https://blog.kases.anirudhdixit.com',
  Register: '/register',
  Login: '/login',
  MyProfile: '/me',
  MyDashboard: '/me/dashboard',
  MySettings: '/me/settings',
  CreateCase: '/me/cases/new',
  MyCases: '/me/cases',
  MyCase: (id?: number) => '/me/cases/' + (id ?? ':id'),
  EditCase: (id?: number) => '/me/cases/' + (id ?? ':id') + '/edit',
  CreateHearing: '/me/hearings/new',
  MyHearings: '/me/hearings',
  MyHearing: (id?: number) => '/me/hearings/' + (id ?? ':id'),
  CreateTodo: '/me/todos/new',
  MyTodos: '/me/todos',
  MyTodo: (id?: number) => '/me/todos/' + (id ?? ':id'),
}

export const StorageKeys = {
  LoginToken: 'loginToken',
}

export const ErrorMessages = {
  Unknown: 'Something went wrong',
}

export const DateTimeFormat = 'YYYY-MM-DD HH:mm:ss'

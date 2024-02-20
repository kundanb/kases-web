export const Routes = {
  Home: '/',
  Blog: 'https://blog.kases.anirudhdixit.com',
  Register: '/register',
  Login: '/login',
  MyProfile: '/me',
  MyDashboard: '/me/dashboard',
  MySettings: '/me/settings',
  MyCases: '/me/cases',
  CreateCase: '/me/cases/new',
  EditCase: (id?: number) => '/me/cases/' + (id ?? ':id') + '/edit',
  MyCase: (id?: number) => '/me/cases/' + (id ?? ':id'),
  MyHearings: '/me/hearings',
  CreateHearing: '/me/hearings/new',
  EditHearing: (id?: number) => '/me/hearings/' + (id ?? ':id') + '/edit',
  MyHearing: (id?: number) => '/me/hearings/' + (id ?? ':id'),
  MyTodos: '/me/todos',
  CreateTodo: '/me/todos/new',
  EditTodo: (id?: number) => '/me/todos/' + (id ?? ':id') + '/edit',
  MyTodo: (id?: number) => '/me/todos/' + (id ?? ':id'),
}

export const StorageKeys = {
  LoginToken: 'loginToken',
}

export const ErrorMessages = {
  Unknown: 'Something went wrong',
}

export const DateTimeFormat = 'YYYY-MM-DD HH:mm:ss'

import { Nullable } from './types'
import { CaseStatus, CommonFilter, DayType, TodoStatus, UserRole } from './enums'

export const Routes = {
  Home: '/',
  Register: '/register',
  Login: '/signin',
  Profile: (username?: Nullable<string>) => `/profile/${username ?? ':username'}`,
  Dashboard: '/me/dashboard',
  Settings: '/me/settings',
  Cases: '/me/cases',
  CreateCase: '/me/cases/new',
  Case: (id?: Nullable<number>) => `/me/cases/${id ?? ':id'}`,
  EditCase: (id?: Nullable<number>) => `/me/cases/${id ?? ':id'}/edit`,
  Hearings: '/me/hearings',
  CreateHearing: '/me/hearings/new',
  Hearing: (id?: Nullable<number>) => `/me/hearings/${id ?? ':id'}`,
  EditHearing: (id?: Nullable<number>) => `/me/hearings/${id ?? ':id'}/edit`,
  Todos: '/me/todos',
  CreateTodo: '/me/todos/new',
  Todo: (id?: Nullable<number>) => `/me/todos/${id ?? ':id'}`,
  EditTodo: (id?: Nullable<number>) => `/me/todos/${id ?? ':id'}/edit`,
}

export const StorageKeys = {
  authToken: 'authToken',
}

export const ApiDateTimeFormat = 'YYYY-MM-DD HH:mm:ss'
export const ApiDateFormat = 'YYYY-MM-DD'
export const ApiYearFormat = 'YYYY'

export const ErrMessages = {
  Unknown: 'Something went wrong',
}

export const UserRoleLabels = {
  [UserRole.Lawyer]: 'Lawyer',
  [UserRole.Client]: 'Client',
}

export const CaseStatusLabels = {
  [CaseStatus.Open]: 'Open',
  [CaseStatus.Closed]: 'Closed',
}

export const TodoStatusLabels = {
  [TodoStatus.Pending]: 'Pending',
  [TodoStatus.InProgress]: 'In Progress',
  [TodoStatus.Completed]: 'Completed',
  [TodoStatus.Cancelled]: 'Cancelled',
}

export const DayTypeLabels = {
  [DayType.Today]: 'Today',
  [DayType.Upcoming]: 'Upcoming',
  [DayType.Past]: 'Past',
}

export const CommonFilterLabels = {
  [CommonFilter.All]: 'All',
}

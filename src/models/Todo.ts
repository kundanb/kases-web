import moment from 'moment'
import { Nullable } from '@/utils/types'
import { TodoStatus } from '@/utils/enums'
import { ApiDateFormat, ApiDateTimeFormat } from '@/utils/consts'
import { defNul } from '@/utils/funcs'
import Case, { RespCase } from './Case'

export interface RespTodo {
  todoId: number
  todoAddedById: number
  todoCaseId?: Nullable<number>
  todoTitle: string
  todoDescription?: Nullable<string>
  todoStartDate?: Nullable<string>
  todoDueDate?: Nullable<string>
  todoStatus: TodoStatus
  todoCreatedAt: string
  todoUpdatedAt: string

  $todoCase?: Nullable<RespCase>
}

export default class Todo implements RespTodo {
  todoId: number
  todoAddedById: number
  todoCaseId: Nullable<number>
  todoTitle: string
  todoDescription: Nullable<string>
  todoStartDate: Nullable<string>
  todoDueDate: Nullable<string>
  todoStatus: TodoStatus
  todoCreatedAt: string
  todoUpdatedAt: string

  $todoCase: Nullable<Case>

  constructor(respTodo: RespTodo) {
    this.todoId = respTodo.todoId
    this.todoAddedById = respTodo.todoAddedById
    this.todoCaseId = defNul(respTodo.todoCaseId)
    this.todoTitle = respTodo.todoTitle
    this.todoDescription = defNul(respTodo.todoDescription)
    this.todoStartDate = defNul(respTodo.todoStartDate && moment(respTodo.todoStartDate, ApiDateFormat).toISOString())
    this.todoDueDate = defNul(respTodo.todoDueDate && moment(respTodo.todoDueDate, ApiDateFormat).toISOString())
    this.todoStatus = respTodo.todoStatus
    this.todoCreatedAt = moment(respTodo.todoCreatedAt, ApiDateTimeFormat).toISOString()
    this.todoUpdatedAt = moment(respTodo.todoUpdatedAt, ApiDateTimeFormat).toISOString()

    this.$todoCase = defNul(respTodo.$todoCase && new Case(respTodo.$todoCase))
  }
}

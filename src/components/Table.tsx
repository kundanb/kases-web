export type TableRecord = Record<string, React.ReactNode>

export interface TableColumn<T = TableRecord> {
  title: string
  key: keyof T
  render?: (value: T[keyof T], record: T) => React.ReactNode
}

export interface TableProps<T = TableRecord> {
  columns: TableColumn<T>[]
  data: T[]
}

export default function Table<T = TableRecord>({ columns, data }: TableProps<T>) {
  return (
    <div className="overflow-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Sr.</th>
            {columns.map((col, i) => (
              <th key={i}>{col.title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              {columns.map((col, j) => (
                <td key={j}>{(col.render ? col.render(row[col.key], row) : row[col.key]) as React.ReactNode}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

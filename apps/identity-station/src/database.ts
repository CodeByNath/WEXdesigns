export interface QueryResult<Row extends object = Record<string, unknown>> {
  readonly rows: readonly Row[];
}

export interface Transaction {
  query<Row extends object = Record<string, unknown>>(
    text: string,
    values?: readonly unknown[],
  ): Promise<QueryResult<Row>>;
}

export interface TransactionDatabase {
  withTransaction<Result>(operation: (transaction: Transaction) => Promise<Result>): Promise<Result>;
  withAdminManagerHeaderBootstrapTransaction<Result>(
    operation: (transaction: Transaction) => Promise<Result>,
  ): Promise<Result>;
}

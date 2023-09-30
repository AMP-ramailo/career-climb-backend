export interface IDatabaseConfigAttributes {
  database?: string;
  dialect?: string;
  username?: string;
  password?: string;
  host?: string;
  port?: number | string;
  urlDatabase?: string;
}
export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
}

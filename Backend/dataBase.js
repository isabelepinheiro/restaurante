// 3° passo: criar o arquivo database.js para conectar ao banco de dados
import { Pool } from "pg";

const URL = "postgres://postgres:123@localhost:5432/Restaurante";

export const database = new Pool({
    connectionString: URL
});
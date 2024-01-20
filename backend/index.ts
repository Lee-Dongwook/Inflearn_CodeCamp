import { DataSource } from "typeorm";
import { Board } from './Board.postgres';

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "codeCamp",
    entities: [Board],
    synchronize: true,
})


AppDataSource.initialize().then(() => {
    console.log("DB접속에 성공했습니다.");
}).catch((error) => {
    console.log("DB 접속에 실패하였습니다.", error);
}) 
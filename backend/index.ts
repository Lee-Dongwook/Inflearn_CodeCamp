import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { DataSource } from "typeorm";
import { Board } from './Board.postgres';

const typeDefs = `#graphql
    type MyBoard {
        number: Int
        writer: String
        title: String
        contents: String
    }

    type CreateBoardInput {
        writer: String
        title: String
        contents: String
    }

    type Query {
        fetchBoards: [MyBoard]
    }

    type Mutation {
        createBoard(createBoardInput: CreateBoardInput): String
    }
`;

const resolvers = {
    Query: {
        fetchBoards: async() => {
            const result = await Board.find();
            console.log(result);

            /*
                한개만 꺼내기
                const result = await Board.findOne({
                    where: {number: 3},
                });

                console.log(result);
            */

            return result;
        },
    },
    Mutation: {
        createBoard: async(parent: any, args: any, context: any, info: any) => {
            await Board.insert({
                ...args.createBoardInput,
            });

            return "Board가 만들어졌니다.";
        },

        updateBoard: async() => {
            await Board.update({ number: 3 }, { writer: "동욱" });
        },

        deleteBoard: async() => {
            await Board.delete({ number: 3 })
            await Board.update({ number: 3 }, { isDeleted: true });
            await Board.update({ number: 3 }, { deletedAt: new Date() })
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

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

    startStandaloneServer(server).then(() => {
        console.log("GraphQL 서버가 실행되었습니다.")
    })
}).catch((error) => {
    console.log("DB 접속에 실패하였습니다.", error);
}) 
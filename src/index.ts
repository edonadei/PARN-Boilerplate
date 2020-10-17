import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false
    }),
    // We need to get the orm.en object in our resolvers
    context: () => ({ em: orm.em })
  });

  apolloServer.applyMiddleware({ app });

  app.get("/", (_, res) => {
    res.send("Hello world");
  });
  app.listen(4000, () => console.log("server started on port 4000"));
};

main().catch(err => {
  console.log(err);
});

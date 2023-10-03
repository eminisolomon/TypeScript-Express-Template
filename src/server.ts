import { App } from "./app";
import { ValidateEnv } from "@utils/validateEnv";
import { AuthRoute, UserRoute } from "@routes";


ValidateEnv();

const app = new App([
    new AuthRoute(),
    new UserRoute(),
]);

app.listen();
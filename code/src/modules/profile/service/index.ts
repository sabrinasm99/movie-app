import { authService } from "../../auth/service";
import { AccountService } from "./account-service";

const accountService = new AccountService(authService);

export { accountService };

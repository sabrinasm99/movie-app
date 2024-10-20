import { AuthService } from "./auth-service";
import { GuestService } from "./guest-service";
import { LoginService } from "./login-service";
import { LogoutService } from "./logout-service";

const authService = new AuthService();
const loginService = new LoginService(authService);
const logoutService = new LogoutService(authService);
const guestService = new GuestService(authService);

export { authService, loginService, logoutService, guestService };

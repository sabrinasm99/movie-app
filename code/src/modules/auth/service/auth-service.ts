export interface IAuthService {
  getSessionId(): string | null;
  getApiKey(): string;
  setSessionId(sessionId: string): void;
  removeSessionId(): void;
  setAccountId(accountId: number): void;
  getAccountId(): string | null;
  removeAccountId(): void;
  setGuestSessionId(guestSessionId: number): void;
  getGuestSessionId(): string | null;
  removeGuestSessionId(): void;
}

export class AuthService implements IAuthService {
  private apiKey: string = "7df4cf7d54ddd57023f856099667ebb9";

  constructor() {}

  getApiKey(): string {
    return this.apiKey;
  }

  getSessionId(): string | null {
    const sessionId = localStorage.getItem("sessionId");
    return sessionId ? sessionId : null;
  }

  setSessionId(sessionId: string) {
    localStorage.setItem("sessionId", sessionId);
  }

  removeSessionId() {
    localStorage.removeItem("sessionId");
  }

  setAccountId(accountId: number) {
    localStorage.setItem("accountId", `${accountId}`);
  }

  getAccountId() {
    const accountId = localStorage.getItem("accountId");
    return accountId ? accountId : null;
  }

  removeAccountId(): void {
    localStorage.removeItem("accountId");
  }

  setGuestSessionId(guestSessionId: number) {
    localStorage.setItem("guestSessionId", `${guestSessionId}`);
  }

  getGuestSessionId() {
    const guestSessionId = localStorage.getItem("guestSessionId");
    return guestSessionId ? guestSessionId : null;
  }

  removeGuestSessionId(): void {
    localStorage.removeItem("guestSessionId");
  }
}

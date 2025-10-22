import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

// eslint-disable-next-line no-unused-vars
type Transformer<T> = (value: string) => T;

export class Config {
  private static instance: Config;

  public readonly NODE_ENV: string;
  public readonly PORT: number;
  public readonly MONGODB_URI: string;
  public readonly JWT_SECRET: string;

  public readonly cors: {
    origin: string | string[];
    methods: string[];
    allowedHeaders: string[];
    credentials: boolean;
  };

  public readonly rateLimit: {
    windowMs: number;
    max: number;
  };

  private constructor() {
    this.NODE_ENV = this.getEnvVariable("NODE_ENV", true);
    this.PORT = this.getEnvVariable("PORT", true, parseInt);
    this.MONGODB_URI = this.getEnvVariable("MONGODB_URI", true);
    this.JWT_SECRET = this.getEnvVariable("JWT_SECRET", true);


    this.cors = {
      origin: this.getCorsOrigin(),
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    };

    this.rateLimit = {
      windowMs: this.getEnvVariable("RATE_LIMIT_WINDOW_MS", true, parseInt),
      max: this.getEnvVariable("RATE_LIMIT_MAX", true, parseInt),
    };
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  private getEnvVariable<T = string>(
    key: string,
    required = false,
    transform: Transformer<T> = (val) => val as unknown as T,
  ): T {
    const value = process.env[key];
    if (value === undefined || value === "") {
      if (required) {
        console.error(`Missing required environment variable: ${key}`);
        process.exit(1);
      }
      return undefined as unknown as T;
    }
    return transform(value);
  }

  private getCorsOrigin(): string | string[] {
    if (this.NODE_ENV === "development") {
      // Support multiple origins in development
      const corsOrigin = this.getEnvVariable("CORS_ORIGIN", true);
      return corsOrigin.split(",").map((origin) => origin.trim());
    }
    return this.getEnvVariable("CORS_ORIGIN", true);
  }
}

export const config = Config.getInstance();
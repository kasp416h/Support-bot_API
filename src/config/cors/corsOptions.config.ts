import allowedOrigins from "./allowedOrigins.config";
import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, origin?: boolean) => void
  ) => {
    console.log("Request Origin:", origin);
    const NODE_ENV: string | undefined = process.env.NODE_ENV;

    if (
      allowedOrigins.indexOf(origin as string) !== -1 ||
      NODE_ENV === "development"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;

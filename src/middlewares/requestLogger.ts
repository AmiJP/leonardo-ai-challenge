import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "test") {
    return next();
  }

  const startTime = new Date();
  const { method, url } = req;

  // Log the request DateTime, Method, URL, Status Code and Response Time
  res.on("finish", () => {
    const responseTime = new Date().getTime() - startTime.getTime();
    const statusCode = getColoredStatusCode(res.statusCode);

    console.log(
      `[${startTime.toLocaleString()}] ${method} ${url} ${statusCode} - ${responseTime}ms`
    );
  });

  next();
};

// this will returns a colored status code
const getColoredStatusCode = (statusCode: number) => {
  const color =
    statusCode >= 500
      ? 31 // red
      : statusCode >= 400
      ? 33 // yellow
      : statusCode >= 300
      ? 36 // cyan
      : statusCode >= 200
      ? 32 // green
      : 0; // no color

  return `\x1b[${color}m${statusCode}\x1b[0m`;
};

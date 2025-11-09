import {
  createServer,
  IncomingMessage,
  Server as NodeServer,
  ServerResponse,
} from "http";
import { Authorizer } from "../auth/Authorizer";
import { ReservationsDataAccess } from "../data/ReservationsDataAccess";
import { LoginHandler } from "../handlers/LoginHandler";
import { RegisterHandler } from "../handlers/RegisterHandler";
import { ReservationsHandler } from "../handlers/ReservationsHandler";
import { HTTP_CODES } from "../model/ServerModel";

export class Server {
  private server: NodeServer;
  private authorizer = new Authorizer();
  private reservationsDataAccess = new ReservationsDataAccess();

  public async startServer() {
    this.server = createServer(async (req, res) => {
      console.log(`Got request from ${req.headers["user-agent"]}`);
      console.log(`Got request for ${req.url}`);
      await this.handleRequest(req, res);
      res.end();
    });
    this.server.listen(8089);
    console.log("server started ");
  }

  private async handleRequest(
    request: IncomingMessage,
    response: ServerResponse
  ) {
    try {
      const route = this.getRouteFromUrl(request);
      switch (route) {
        case "register":
          await new RegisterHandler(
            request,
            response,
            this.authorizer
          ).handleRequest();
          break;
        case "login":
          await new LoginHandler(
            request,
            response,
            this.authorizer
          ).handleRequest();
          break;
        case "reservation":
          const reservation = new ReservationsHandler(
            request,
            response,
            this.authorizer,
            this.reservationsDataAccess
          );
          await reservation.handleRequest();
          break;
        default:
          response.writeHead(404, {
            "Content-Type": "text/plain",
          });
          response.write("Route Not Found");
          break;
          break;
      }
    } catch (error) {
      response.writeHead(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        JSON.stringify(`Internal server error: ${error.message}`)
      );
      console.log(error);
    }
  }
  private getRequestBody(request: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
      request.on("end", () => {
        resolve(body);
      });
      request.on("error", (err) => {
        reject(err);
      });
    });
  }
  private getRouteFromUrl(request: IncomingMessage): string | undefined {
    const fullUrl = request.url;
    if (fullUrl) {
      // 1. Get the path without query parameters (e.g., from '/register/?key=value' to '/register/')
      const urlPath = fullUrl.split("?")[0];

      // 2. Split and filter out empty strings
      const routeParts = urlPath.split("/").filter((s) => s.length > 0);

      // 3. The route is the first non-empty part
      return routeParts.length > 0 ? routeParts[0] : undefined;
    }
    return undefined;
  }

  public async stopServer() {
    if (this.server) {
      this.server.close();
      console.log("server closed");
    }
  }
}

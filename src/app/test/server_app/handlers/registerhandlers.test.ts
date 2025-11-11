import { Authorizer } from "../../../server_app/auth/Authorizer";
import { RegisterHandler } from "../../../server_app/handlers/RegisterHandler";
import { IncomingMessage, ServerResponse } from "http";
import { getRequestBody } from "../../../server_app/utils/Utils";
import {
  HTTP_CODES,
  HTTP_METHODS,
} from "../../../server_app/model/ServerModel";
import { Account } from "../../../server_app/model/AuthModel";
import { json } from "stream/consumers";

const getRequestBodyMock = jest.fn();
jest.mock("../../../server_app/utils/Utils", () => ({
  getRequestBody: () => getRequestBodyMock(),
}));
describe("Register handler test suite ", () => {
  let sut: RegisterHandler;

  const request = {
    method: undefined,
  };

  const responseMock = {
    statusCode: 201,
    writeHead: jest.fn(),
    write: jest.fn(),
  };

  const authorizerMock = {
    registerUser: jest.fn(),
  };

  const someAccount: Account = {
    id: "",
    password: "password",
    userName: "username",
  };

  const someId = "1234";

  beforeEach(() => {
    sut = new RegisterHandler(
      request as IncomingMessage,
      responseMock as any as ServerResponse,
      authorizerMock as any as Authorizer
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should Register valid accounts in request", async () => {
    request.method = HTTP_METHODS.POST;

    getRequestBodyMock.mockResolvedValueOnce(someAccount);
    authorizerMock.registerUser.mockResolvedValueOnce(someId);

    await sut.handleRequest();
    expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, {
      "Content-Type": "application/json",
    });

    expect(responseMock.write).toHaveBeenCalledWith(
      JSON.stringify({
        userId: someId,
      })
    );
  });
});

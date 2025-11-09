import { DataBase } from "../../../server_app/data/DataBase";
import { UserCredentialsDataAccess } from "../../../server_app/data/UserCredentialsDataAccess";
import { Account } from "../../../server_app/model/AuthModel";

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock("../../../server_app/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
      };
    }),
  };
});

describe("", () => {
  let sut: UserCredentialsDataAccess;

  const someAccount: Account = {
    id: "123",
    password: "password",
    userName: "usernameData",
  };
  const someId = "12134";

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should add user and return th id", async () => {
    insertMock.mockResolvedValueOnce(someId);
    const actualId = await sut.addUser(someAccount);
    console.log(actualId, someId);
    expect(actualId).toBe(someId);
    expect(insertMock).toHaveBeenCalledTimes(1);
  });
});

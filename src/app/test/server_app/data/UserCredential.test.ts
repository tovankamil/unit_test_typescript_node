import { DataBase } from "../../../server_app/data/DataBase";

import { Account } from "../../../server_app/model/AuthModel";

// 1. Definisikan semua mock function di tingkat atas
const insertMock = jest.fn();
const getByMock = jest.fn();

const DataBaseMock = jest.fn().mockImplementation(() => {
  return {
    insert: insertMock,
    getBy: getByMock,
  };
});

// 3. Gunakan jest.mock untuk mengganti modul DataBase secara global
// (Ini akan di-hoist oleh Jest)
jest.mock("../../../server_app/data/DataBase", () => {
  return {
    DataBase: DataBaseMock,
  };
});

import { UserCredentialsDataAccess } from "../../../server_app/data/UserCredentialsDataAccess";

const someAccount: Account = {
  id: "1111",
  password: "password",
  userName: "username",
};

const someId = "1234";

describe("UserCrendential test suite", () => {
  let sut: UserCredentialsDataAccess;

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();
    expect(DataBaseMock).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
    DataBaseMock.mockClear();
  });

  it("Should initialize DataBase connection on instantiation", () => {
    expect(DataBaseMock).toHaveBeenCalled();
  });

  it("Should add user and return id", async () => {
    insertMock.mockResolvedValueOnce(someId);
    const actualId = await sut.addUser(someAccount);
    expect(actualId).toBe(someId);
    expect(insertMock).toHaveBeenCalledWith(someAccount);
  });

  it("Should get user and return id", async () => {
    getByMock.mockResolvedValueOnce(someAccount);

    const actualUser = await sut.getUserById(someId);
    console.log(actualUser);
    expect(actualUser).toEqual(someAccount);
    expect(getByMock).toHaveBeenCalledWith("id", someId);
  });

  it("Should get user by username", async () => {
    getByMock.mockResolvedValueOnce(someAccount);
    const actualUser = await sut.getUserByUserName(someAccount.userName);
    expect(actualUser).toEqual(someAccount);
    expect(getByMock).toHaveBeenCalledWith("userName", someAccount.userName);
  });
});

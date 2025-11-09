import { DataBase } from "../../../server_app/data/DataBase";
import * as IdGenerator from "../../../server_app/data/IdGenerator";

type someTypeWithId = {
  id: string;
  name: string;
  color: string;
};

const someObject = {
  id: "",
  name: "Somename",
  color: "blue",
};

const someObject2 = {
  id: "",
  name: "Somename2",
  color: "blue",
};

describe("Database test suite, ", () => {
  let sut: DataBase<someTypeWithId>;
  const fakeID = "12345";
  beforeEach(() => {
    sut = new DataBase<someTypeWithId>();
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeID);
  });

  it("Should Return id after insert", async () => {
    const actual = await sut.insert({
      id: "",
    } as any);
    expect(actual).toBe(fakeID);
  });

  it("Should get element after insert", async () => {
    const id = await sut.insert(someObject);
    const actual = await sut.getBy("id", id);
    expect(actual).toBe(someObject);
  });

  it("Should get element with then same property", async () => {
    await sut.insert(someObject);
    await sut.insert(someObject2);
    const expected = [someObject, someObject2];
    const actual = await sut.findAllBy("color", "blue");
    expect(actual).toEqual(expected);
  });

  it("Should change color of object", async () => {
    const id = await sut.insert(someObject);
    const expectedColor = "red";
    await sut.update(id, "color", expectedColor);
    const object = await sut.getBy("id", id);
    const actualColor = object.color;
    expect(expectedColor).toEqual(actualColor);
  });

  it("Should delete of object", async () => {
    const id = await sut.insert(someObject);
    await sut.delete(id);

    const actual = await sut.getBy("id", id);
    expect(actual).toBeUndefined();
  });

  it("Should get elements", async () => {
    await sut.insert(someObject);
    await sut.insert(someObject2);
    const expected = [someObject, someObject2];
    const actual = await sut.getAllElements();
    expect(actual).toEqual(expected);
  });
});

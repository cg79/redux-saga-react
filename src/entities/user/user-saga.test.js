import { takeEvery, call, put } from "redux-saga/effects";
import userSagas from "./user-saga";

function* gen1() {
  yield 1;
  return yield 2;
}

describe("gen1", () => {
  const genObject = gen1();

  it("should return 1", () => {
    const val = genObject.next().value;
    expect(val).toEqual(1);
  });

  it("should return 2", () => {
    const val = genObject.next().value;
    expect(val).toEqual(2);
  });

  it("should return undefined", () => {
    const val = genObject.next().value;
    expect(val).toEqual(undefined);
  });
});

describe('callGetUsers', () => {
  const genObject =  userSagas.callGetUsers({});
  // console.log(userSagas)

  it('should wait for every getUsers action and call makeAuthorsApiRequest', () => {

    const usersValue = genObject.next().value;

    expect(usersValue)
      .toEqual( call(userSagas.getUsers, {}));
  });

  it('should return FETCH_SUCCEEDED', () => {

    const usersValue = genObject.next().value;

    expect(usersValue)
      .toEqual( put({ type: "FETCH_SUCCEEDED",  }));
  });


  
  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});

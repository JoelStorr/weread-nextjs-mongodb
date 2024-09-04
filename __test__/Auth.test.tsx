
import "@testing-library/jest-dom";
import { login } from "@/lib/auth";

describe("should login user", async () => {
  
    const user = await login("test@test.com", "123456789");

    expect(user).toBe({
      _id: "66d5bbe5b4af923d4f588538",
      email: "test@test.com",
      password:
        "3dc91f013f65ceb572a1c7fc8b9a2de14d7f8842b38a1394f4fdc3bdeca9e83d0c28e63624f5f13ebc3505db2c81cf579268ebdb563ec7a19a984fa9e8da7e97:7bba09eba6304d15aa269c26e6ed5c0b",
      username: "Joel",
      lists: [
        { name: "Current Reads", private: false, books: [Array] },
        { name: "Read", private: false, books: [Array] },
      ],
    });

});

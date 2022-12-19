import { act, renderHook } from "@testing-library/react";

import { useLocalStorage } from "../useLocalStorage";

class LocalStorageMock {
  store: Record<string, unknown> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: unknown) {
    this.store[key] = value + "";
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

Object.defineProperty(window, "localStorage", {
  value: new LocalStorageMock(),
});

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("initial state is in the returned state", () => {
    const { result } = renderHook(() => useLocalStorage("key", "value"));

    expect(result.current[0]).toBe("value");
  });

  test("Initial state is a callback function", () => {
    window.localStorage.setItem(
      "codat-admin-site_key",
      JSON.stringify("value")
    );
    const { result } = renderHook(() => useLocalStorage("key", () => "value"));

    expect(result.current[0]).toBe("value");
  });

  test("Initial state is an array", () => {
    const { result } = renderHook(() => useLocalStorage("digits", [1, 2]));

    expect(result.current[0]).toEqual([1, 2]);
  });

  test("Update the state", () => {
    const { result } = renderHook(() => useLocalStorage("key", "value"));

    act(() => {
      const setState = result.current[1];
      setState("edited");
    });

    expect(result.current[0]).toBe("edited");
  });

  test("Updating the state writes to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("key", "value"));

    act(() => {
      const setState = result.current[1];
      setState("edited");
    });

    expect(window.localStorage.getItem("codat-admin-site_key")).toBe(
      JSON.stringify("edited")
    );
  });

  test("Update the state with undefined", () => {
    const { result } = renderHook(() =>
      useLocalStorage<string | undefined>("key", "value")
    );

    act(() => {
      const setState = result.current[1];
      setState(undefined);
    });

    expect(result.current[0]).toBeUndefined();
  });

  test("Update the state with null", () => {
    const { result } = renderHook(() =>
      useLocalStorage<string | null>("key", "value")
    );

    act(() => {
      const setState = result.current[1];
      setState(null);
    });

    expect(result.current[0]).toBeNull();
  });

  test("Update the state with a callback function", () => {
    const { result } = renderHook(() => useLocalStorage("count", 2));

    act(() => {
      const setState = result.current[1];
      setState((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(3);
    expect(window.localStorage.getItem("codat-admin-site_count")).toEqual("3");
  });
});

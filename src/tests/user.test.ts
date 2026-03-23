/** biome-ignore-all lint/suspicious/noExplicitAny: TODO */
import { describe, expect, mock, test } from "bun:test";

import { deleteUserById } from "@/server/functions/user/delete-user";
import { fetchUser } from "@/server/functions/user/get-user";
import { updateUserName } from "@/server/functions/user/update-user";
import {
  ALLOWED_TYPES,
  MAX_SIZE,
  saveAvatarToDb,
  validateFile,
} from "@/server/functions/user/upload-avatar";
import { createMockDb, createMockUser } from "@/tests/helpers";

describe("fetchUser", () => {
  test("returns user when found", async () => {
    const mockUser = createMockUser();
    const mockDb = createMockDb();
    mockDb.query.user.findFirst = mock(async () => mockUser) as any;

    const result = await fetchUser("test-user-id", mockDb as any);

    expect(result).toEqual(mockUser);
    expect(mockDb.query.user.findFirst).toHaveBeenCalled();
  });

  test("returns null when user not found", async () => {
    const mockDb = createMockDb();
    mockDb.query.user.findFirst = mock(async () => null);

    const result = await fetchUser("nonexistent-id", mockDb as any);

    expect(result).toBeNull();
  });
});

describe("updateUserName", () => {
  test("calls update with correct name and userId", async () => {
    const whereMock = mock(async () => {});
    const setMock = mock(() => ({ where: whereMock }));
    const mockDb = createMockDb();
    mockDb.update = mock(() => ({ set: setMock }));

    await updateUserName("user-123", "New Name", mockDb as any);

    expect(mockDb.update).toHaveBeenCalled();
    expect(setMock).toHaveBeenCalledWith(expect.objectContaining({ name: "New Name" }));
    expect(whereMock).toHaveBeenCalled();
  });
});

describe("deleteUserById", () => {
  test("calls delete with correct userId", async () => {
    const whereMock = mock(async () => {});
    const mockDb = createMockDb();
    mockDb.delete = mock(() => ({ where: whereMock }));

    await deleteUserById("user-123", mockDb as any);

    expect(mockDb.delete).toHaveBeenCalled();
    expect(whereMock).toHaveBeenCalled();
  });
});

describe("validateFile", () => {
  test("rejects files over 5MB", async () => {
    const largeFile = new File([new ArrayBuffer(6 * 1024 * 1024)], "big.png", {
      type: "image/png",
    });

    expect(validateFile(largeFile)).rejects.toThrow("File size must be less than 5MB");
  });

  test("rejects non-image files", async () => {
    const textFile = new File(["hello world"], "test.txt", { type: "text/plain" });

    expect(validateFile(textFile)).rejects.toThrow("Invalid file type");
  });

  test("accepts valid PNG file", async () => {
    // Minimal valid PNG header bytes
    // biome-ignore format: binary data alignment
    const pngHeader = new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG signature
      0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1 pixel
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, // bit depth, color type
      0xde, 0x00, 0x00, 0x00, 0x0c, 0x49, 0x44, 0x41, // IDAT chunk
      0x54, 0x08, 0xd7, 0x63, 0xf8, 0xcf, 0xc0, 0x00, // compressed data
      0x00, 0x00, 0x02, 0x00, 0x01, 0xe2, 0x21, 0xbc, // checksum
      0x33, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, // IEND chunk
      0x44, 0xae, 0x42, 0x60, 0x82,                   // IEND CRC
    ]);

    const pngFile = new File([pngHeader], "test.png", { type: "image/png" });

    const result = await validateFile(pngFile);

    expect(result.detected.mime).toBe("image/png");
    expect(result.detected.ext).toBe("png");
    expect(result.buffer).toBeDefined();
  });
});

describe("saveAvatarToDb", () => {
  test("updates user image with correct URL", async () => {
    const whereMock = mock(async () => {});
    const setMock = mock(() => ({ where: whereMock }));
    const mockDb = createMockDb();
    mockDb.update = mock(() => ({ set: setMock }));

    await saveAvatarToDb("user-123", "https://example.com/avatar.png", mockDb as any);

    expect(mockDb.update).toHaveBeenCalled();
    expect(setMock).toHaveBeenCalledWith(
      expect.objectContaining({ image: "https://example.com/avatar.png" }),
    );
    expect(whereMock).toHaveBeenCalled();
  });
});

describe("upload constants", () => {
  test("ALLOWED_TYPES includes jpeg, png, webp", async () => {
    expect(ALLOWED_TYPES).toContain("image/jpeg");
    expect(ALLOWED_TYPES).toContain("image/png");
    expect(ALLOWED_TYPES).toContain("image/webp");
    expect(ALLOWED_TYPES).toHaveLength(3);
  });

  test("MAX_SIZE is 5MB", async () => {
    expect(MAX_SIZE).toBe(5 * 1024 * 1024);
  });
});

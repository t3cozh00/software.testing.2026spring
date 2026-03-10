import { describe, test, expect, vi, beforeEach } from "vitest";
import { getDogImage } from "../controllers/dogController";
import * as dogService from "../services/dogService";

describe("dogController positive test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should return success true and mocked service data", async () => {
    const mockServiceData = {
      imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success",
    };

    vi.spyOn(dogService, "getRandomDogImage").mockResolvedValue(
      mockServiceData,
    );

    const req = {} as any;

    const res = {
      json: vi.fn(),
      status: vi.fn(function (this: any) {
        return this;
      }),
    } as any;

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockServiceData,
    });
  });
});

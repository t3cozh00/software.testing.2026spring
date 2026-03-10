import { describe, expect, test, vi, beforeEach } from "vitest";
import { getRandomDogImage } from "../services/dogService";

describe("dogService positive test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should return imageUrl and success", async () => {
    const mockData = {
      message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success",
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockData),
      }),
    );

    const result = await getRandomDogImage();

    // 3️⃣ expect result
    expect(result.imageUrl).toBe(mockData.message);
    expect(result.status).toBe("success");
    expect(fetch).toHaveBeenCalledOnce();
  });
});

describe("dogService negative test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should throw error when API response is not ok ", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    );

    await expect(getRandomDogImage()).rejects.toThrow(
      "Failed to fetch dog image: Dog API returned status 500",
    );
  });
});

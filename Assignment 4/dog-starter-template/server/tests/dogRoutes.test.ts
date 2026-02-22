import { describe, test, expect, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";

vi.mock("../controllers/dogController", () => ({
  getDogImage: vi.fn(),
}));

import dogRoutes from "../routes/dogRoutes";
import { getDogImage } from "../controllers/dogController";

describe("dogRoutes positive test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should return 200 and success true with mocked imageUrl", async () => {
    (getDogImage as any).mockImplementation((req: any, res: any) => {
      return res.status(200).json({
        success: true,
        data: {
          imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
          status: "success",
        },
      });
    });

    const app = express();
    app.use(express.json());
    app.use("/api/dogs", dogRoutes);

    const res = await request(app).get("/api/dogs/random");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.imageUrl).toContain("terrier-welsh");
  });
});

describe("dogRoutes negative test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should return 500 and error message", async () => {
    (getDogImage as any).mockImplementation((req: any, res: any) => {
      return res.status(500).json({
        success: false,
        error: "Failed to fetch dog image: Network error",
      });
    });

    const app = express();
    app.use(express.json());
    app.use("/api/dogs", dogRoutes);

    const res = await request(app).get("/api/dogs/random");

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Failed to fetch dog image: Network error");
  });
});

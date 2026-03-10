import { describe, expect, test, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import dogRoutes from "../routes/dogRoutes";

describe("Dog API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("GET /api/dogs/random returns 200 and includes imageUrl", async () => {
    const mockData = {
      message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success",
    };

    // Mock external fetch used by dogService
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockData),
      } as any),
    );

    // Build a real app instance for API testing (without importing index.ts)
    const app = express();
    app.use(express.json());
    app.use("/api/dogs", dogRoutes);

    // add 404 handler as in index.ts
    app.use((_req, res) => {
      res.status(404).json({
        success: false,
        error: "Route not found",
      });
    });

    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("imageUrl");
    expect(typeof response.body.data.imageUrl).toBe("string");
  });

  test("GET /api/dogs/invalid returns 404 and correct error message", async () => {
    const app = express();
    app.use(express.json());
    app.use("/api/dogs", dogRoutes);

    // 404 handler as real implementation
    app.use((_req, res) => {
      res.status(404).json({
        success: false,
        error: "Route not found",
      });
    });

    const response = await request(app).get("/api/dogs/invalid");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Route not found");
  });
});

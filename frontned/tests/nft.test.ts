import request from "supertest";
import app from "../src/server";

// Mock the eth module to avoid real blockchain calls
const mockGetContract = jest.fn();
const mockIsValidAddress = jest.fn();

jest.mock("../src/lib/eth", () => ({
  getContract: mockGetContract,
  isValidAddress: mockIsValidAddress,
}));

describe("NFT API Endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /health", () => {
    it("should return health status", async () => {
      const response = await request(app).get("/health");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: "ok" });
    });
  });

  describe("POST /api/mint", () => {
    it('should return 400 for missing "to" field', async () => {
      const response = await request(app).post("/api/mint").send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toContain("Missing required field: to");
    });

    // TODO-A: Implement this test case
    // This test should verify that /api/mint returns 400 for invalid address format
    // Steps:
    // 1. Mock isValidAddress to return false for invalid address
    // 2. Send POST request with invalid address in "to" field
    // 3. Expect 400 status and appropriate error message
    it.skip("TODO-A: should return 400 for invalid address format", async () => {
      // Your implementation here
      expect(true).toBe(false); // TODO-A: Implement validation test for invalid address
    });

    it("should handle contract errors gracefully", async () => {
      const mockContract = {
        safeMint: jest
          .fn()
          .mockRejectedValue(new Error("Gas estimation failed")),
      };
      mockGetContract.mockReturnValue(mockContract);

      const response = await request(app)
        .post("/api/mint")
        .send({ to: "0x742d35Cc6634C0532925a3b8D321Fa95c77e4665" });

      // This will return 501 until TODO-1 and TODO-2 are implemented
      expect(response.status).toBe(501);
    });
  });

  describe("GET /api/owner/:tokenId", () => {
    it("should return 400 for invalid token ID", async () => {
      const response = await request(app).get("/api/owner/invalid");
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid token ID");
    });

    // TODO-B: Implement this test case
    // This test should verify that /api/owner/:tokenId returns mocked owner address
    // Steps:
    // 1. Mock getContract to return a contract with ownerOf method
    // 2. Mock ownerOf to return a test address
    // 3. Send GET request to /api/owner/1
    // 4. Expect 200 status and owner address in response
    it.skip("TODO-B: should return owner address for valid token ID", async () => {
      // Your implementation here
      expect(true).toBe(false); // TODO-B: Implement owner lookup test
    });

    it("should handle non-existent token gracefully", async () => {
      const mockContract = {
        ownerOf: jest.fn().mockRejectedValue(new Error("nonexistent token")),
      };
      mockGetContract.mockReturnValue(mockContract);

      const response = await request(app).get("/api/owner/999");

      // This will return 501 until TODO-3 is implemented
      expect(response.status).toBe(501);
    });
  });
});

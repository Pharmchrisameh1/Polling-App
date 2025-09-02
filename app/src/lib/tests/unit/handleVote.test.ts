import { vi, describe, it, expect } from "vitest";
import { supabase } from "../../app/src/lib/supabaseClient";

async function handleVote(pollId: string, option: string) {
  if (!option) throw new Error("No option selected");

  const { data, error } = await supabase
    .from("votes")
    .insert([{ poll_id: pollId, option }]);

  if (error) throw error;
  return data;
}

describe("handleVote", () => {
  it("should throw if no option is selected", async () => {
    await expect(handleVote("123", "")).rejects.toThrow("No option selected");
  });

  it("should call Supabase insert with poll_id and option", async () => {
    const mockInsert = vi.fn().mockResolvedValue({ data: [{ id: 1 }], error: null });
    supabase.from = vi.fn().mockReturnValue({ insert: mockInsert });

    const result = await handleVote("123", "Option A");

    expect(mockInsert).toHaveBeenCalledWith([{ poll_id: "123", option: "Option A" }]);
    expect(result).toEqual([{ id: 1 }]);
  });
});


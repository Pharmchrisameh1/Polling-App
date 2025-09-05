// voteHandler.ts

import { supabase } from "../lib/supabaseClient";

/**
 * Inserts a vote for the given poll and option.
 * Optimized for readability, reusability, and reduced nesting.
 */
export async function handleVote(pollId: string, option: string) {
  if (!option) throw new Error("No option selected");

  const { data, error } = await supabase
    .from("votes")
    .insert([{ poll_id: pollId, option }]);

  if (error) {
    console.error("Voting failed:", error.message);
    throw new Error(`Vote submission failed: ${error.message}`);
  }

  return data;
}


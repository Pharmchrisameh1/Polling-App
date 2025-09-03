// voteHandler-before.ts

import { supabase } from "../lib/supabaseClient";

/**
 * Handles inserting a vote for a given poll and option.
 * Original version: works but not super clean or optimized.
 */
export async function handleVote(pollId: string, option: string) {
  if (!option) {
    throw new Error("No option selected");
  }

  try {
    const { data, error } = await supabase
      .from("votes")
      .insert([{ poll_id: pollId, option }]);

    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Voting failed:", err);
    throw err;
  }
}


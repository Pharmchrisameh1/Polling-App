// /app/polls/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function PollDetailPage() {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Temporary mock poll (later you’ll fetch from Supabase polls table)
  const poll = {
    id,
    question: "What’s your favorite programming language?",
    options: ["JavaScript", "Python", "Go", "Rust"],
  };

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return;

    try {
      const { data, error } = await supabase
        .from("votes")
        .insert([{ poll_id: poll.id, option: selectedOption }]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Voting failed:", err);
    }
  };

  if (submitted) {
    return (
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>✅ Thank you for voting!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your response has been recorded.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>{poll.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVote} className="space-y-4">
          <RadioGroup
            onValueChange={setSelectedOption}
            value={selectedOption || ""}
          >
            {poll.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>

          <Button type="submit" disabled={!selectedOption}>
            Submit Vote
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


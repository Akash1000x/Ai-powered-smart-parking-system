"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { z } from "zod";
import { imageDetectionAndStartSession } from "../action/image-detection";
import { Input } from "@/components/ui/input";
import { getSession } from "next-auth/react";

// Zod schema for validating URL
const imageUrlSchema = z.string().url("Invalid URL format");

export default function Page() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };
    fetchSession();
  }, []);

  const handleImageDetection = () => {
    // Validate the imageUrl using Zod
    const result = imageUrlSchema.safeParse(imageUrl);

    if (!result.success) {
      // If validation fails, set the error message
      setError(result.error.errors[0].message);
      return;
    }

    // Clear any previous errors if validation passes
    setError(null);
    if (session) {
      imageDetectionAndStartSession(imageUrl, session.user.placeId);
    }
  };

  return (
    <div className="p-4 w-96 flex gap-4">
      <div>
        <Input
          type="url"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
      <Button onClick={handleImageDetection}>Analyze IMage</Button>
    </div>
  );
}

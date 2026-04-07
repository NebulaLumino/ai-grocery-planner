import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.deepseek.com/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { mealPlan, people, dietary, store, budget, pantry, appliances } = await req.json();

    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `You are an expert culinary AI specializing in grocery planning and meal prep organization. Generate comprehensive output including: a categorized grocery list organized by store section (produce, dairy, meat, pantry, etc.), a meal prep schedule broken down by day, batch cooking suggestions, pantry staples to restock, and estimated total cost. Format with clear section headers and checklists.`,
        },
        {
          role: "user",
          content: `Generate a grocery list and meal prep plan:
- Weekly Meal Plan: ${mealPlan}
- Number of People: ${people}
- Dietary Restrictions: ${dietary}
- Store Preference: ${store}
- Weekly Budget: $${budget}
- Pantry Items Already Owned: ${pantry}
- Cooking Appliances Available: ${appliances}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

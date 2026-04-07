"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    mealPlan: "",
    people: "",
    dietary: "",
    store: "",
    budget: "",
    pantry: "",
    appliances: "",
  });
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setOutput(data.result || "Error generating grocery plan.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-emerald-400 text-sm font-medium">🛒 AI × Food & Cooking</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">AI Grocery List & Meal Prep Planner</h1>
          <p className="text-gray-400 text-lg">Generate organized grocery lists and meal prep schedules for the week</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-300">Weekly Meal Plan Description</label>
              <textarea name="mealPlan" value={form.mealPlan} onChange={handleChange} required rows={2} className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm" placeholder="e.g. Mediterranean week: grilled chicken, falafel bowls, salmon with quinoa, vegetable stir-fry" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Number of People</label>
              <select name="people" value={form.people} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm">
                <option value="">Select</option>
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5">5 people</option>
                <option value="6">6 people</option>
                <option value="8">8+ people</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Dietary Restrictions</label>
              <select name="dietary" value={form.dietary} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm">
                <option value="">Select</option>
                <option value="none">None</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="dairy-free">Dairy-Free</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
                <option value="halal">Halal</option>
                <option value="low-sodium">Low-Sodium</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Preferred Store</label>
              <select name="store" value={form.store} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm">
                <option value="">Select store type</option>
                <option value="whole-foods">Whole Foods / Organic</option>
                <option value="trader-joes">Trader Joe's</option>
                <option value="costco">Costco / Bulk</option>
                <option value="safeway">Safeway / Kroger</option>
                <option value="aldi">ALDI</option>
                <option value="farmers-market">Farmers Market</option>
                <option value="local-specialty">Local Specialty Shop</option>
                <option value="any">Any / Mix</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Weekly Budget</label>
              <select name="budget" value={form.budget} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm">
                <option value="">Select budget</option>
                <option value="50">Under $50</option>
                <option value="75">$50–$75</option>
                <option value="100">$75–$100</option>
                <option value="150">$100–$150</option>
                <option value="200">$150–$200</option>
                <option value="250+">$200+</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-300">Pantry Items Already Owned</label>
              <textarea name="pantry" value={form.pantry} onChange={handleChange} required rows={2} className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm" placeholder="e.g. olive oil, rice, pasta, canned tomatoes, garlic, soy sauce" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-300">Cooking Appliances Available</label>
              <input type="text" name="appliances" value={form.appliances} onChange={handleChange} required className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm" placeholder="e.g. slow cooker, instant pot, air fryer, grill, stand mixer" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-white font-semibold py-4 rounded-xl transition-all duration-200 text-base flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Building Your Grocery Plan...
              </>
            ) : "🛒 Generate My Grocery & Meal Prep Plan"}
          </button>
        </form>

        {output && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">Grocery List & Meal Prep Plan</h2>
            <div className="prose prose-invert prose-emerald max-w-none text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">{output}</div>
          </div>
        )}
      </div>
    </main>
  );
}

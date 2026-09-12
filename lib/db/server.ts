/* eslint-disable @typescript-eslint/no-explicit-any */
import { neon } from "@neondatabase/serverless";

let client: any = null;

const mockData: any = {
  goals: [{ id: "1", title: "Grow BuildUp to 100 users", status: "active", progress: 45 }],
  tasks: [
    { id: "1", title: "Review Q3 financials", status: "active" },
    { id: "2", title: "Write new case study", status: "active" }
  ],
  captures: [
    { id: "1", raw_input: "Had a great idea for a new fintech product focusing on SMEs.", status: "inbox", created_at: new Date().toISOString() },
    { id: "2", raw_input: "Met with a potential investor at the tech conference.", status: "inbox", created_at: new Date().toISOString() }
  ],
  projects: [
    { id: "1", title: "BuildUp Financials", slug: "buildup", summary: "A platform for SMEs.", visibility: "ready_to_publish" }
  ],
  skills: [
    { id: "1", title: "Financial Modeling", validated: true },
    { id: "2", title: "TypeScript", validated: false }
  ],
  career_targets: [
    { id: "1", role: "CFO", status: "active" }
  ],
  deals: [
    { id: "1", title: "Enterprise Contract A", stage: "negotiation" }
  ],
  actions: [
    { id: "1", title: "Publish BuildUp Case Study", reason: "Ready for review", impact_score: 90, effort_minutes: 30, priority_rank: 1, status: "recommended", due_date: null },
    { id: "2", title: "Follow up with Investor", reason: "Met at conference", impact_score: 85, effort_minutes: 15, priority_rank: 2, status: "recommended", due_date: null }
  ],
  scores: [{ personal_value: 8.5 }],
};

export function getDb(): any {
  if (!client) {
    console.warn('[AI Studio] Database not connected — using advanced mock router');
    client = async (strings: TemplateStringsArray, ...values: any[]) => {
      const query = strings.join(" ").toLowerCase();
      
      // Handle the big summary query for /os/page.tsx
      if (query.includes("select count(*) from public.goals") && query.includes("open_tasks")) {
        return [{
          goals: mockData.goals.length,
          open_tasks: mockData.tasks.length,
          unprocessed_captures: mockData.captures.length,
          projects: mockData.projects.length,
          skills: mockData.skills.length,
          career_targets: mockData.career_targets.length,
          deals: mockData.deals.length,
          next_actions: mockData.actions.length
        }];
      }

      // Return counts
      if (query.includes("count(*)")) {
        if (query.includes("goals")) return [{ count: mockData.goals.length, goals: mockData.goals.length }];
        if (query.includes("tasks")) return [{ count: mockData.tasks.length, open_tasks: mockData.tasks.length }];
        if (query.includes("captures")) return [{ count: mockData.captures.length, unprocessed_captures: mockData.captures.length }];
        if (query.includes("projects")) return [{ count: mockData.projects.length, projects: mockData.projects.length }];
        if (query.includes("skills")) return [{ count: mockData.skills.length, skills: mockData.skills.length }];
        if (query.includes("career_targets")) return [{ count: mockData.career_targets.length, career_targets: mockData.career_targets.length }];
        if (query.includes("deals")) return [{ count: mockData.deals.length, deals: mockData.deals.length }];
        if (query.includes("next_best_actions")) return [{ count: mockData.actions.length, next_actions: mockData.actions.length }];
      }

      // Return lists
      if (query.includes("from public.quick_captures")) return mockData.captures;
      if (query.includes("from public.projects")) return mockData.projects;
      if (query.includes("from public.next_best_actions")) return mockData.actions;
      if (query.includes("from public.score_snapshots")) return mockData.scores;
      if (query.includes("from public.site_events")) return [];

      return [];
    };
  }
  return client;
}

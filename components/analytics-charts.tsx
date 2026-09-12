"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = ["#171717", "#525252", "#a3a3a3", "#d4d4d4"];

export function TrafficChart({ data }: { data: any[] }) {
  return (
    <div style={{ width: "100%", height: 350, marginTop: 24 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#171717" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#171717" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#737373" }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#737373" }} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #e5e5e5", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
            itemStyle={{ color: "#171717", fontWeight: 500 }}
          />
          <Area type="monotone" dataKey="views" stroke="#171717" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
          <Area type="monotone" dataKey="visitors" stroke="#737373" strokeWidth={2} fill="none" strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SourcesChart({ data }: { data: any[] }) {
  return (
    <div style={{ width: "100%", height: 250, marginTop: 24 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e5e5" />
          <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#737373" }} />
          <YAxis dataKey="source" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#171717" }} width={100} />
          <Tooltip cursor={{ fill: "#f5f5f5" }} contentStyle={{ borderRadius: 8, border: "1px solid #e5e5e5" }} />
          <Bar dataKey="visits" fill="#171717" radius={[0, 4, 4, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DevicesChart({ data }: { data: any[] }) {
  return (
    <div style={{ width: "100%", height: 250, marginTop: 24 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="visits"
            nameKey="device"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-\${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e5e5" }} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 13 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

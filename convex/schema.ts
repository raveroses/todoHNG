import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// @snippet start schema
export default defineSchema({
  todoList: defineTable({
    isCompleted: v.string(),
    item: v.string(),
  }),
});

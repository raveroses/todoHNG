import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addTodo = mutation({
  args: { isCompleted: v.string(), item: v.string() },
  handler: async (ctx, args) => {
    const newTodo = await ctx.db.insert("todoList", {
      item: args.item,
      isCompleted: args.isCompleted,
    });
    return newTodo;
  },
});

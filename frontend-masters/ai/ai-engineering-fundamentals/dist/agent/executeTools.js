import { tools } from "./tools/index.js";
export const executeTool = async (name, args) => {
    const tool = tools[name];
    if (!tool) {
        return "Unknown tool, this does not exixt";
    }
    const execute = tool.execute;
    if (!execute) {
        return "This is not a registered tool";
    }
    const result = await execute(args, {
        toolCallId: "",
        messages: []
    });
    return String(result);
};

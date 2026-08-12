export type ChannelState = "connected" | "ready" | "later" | "soon";
export type OnboardingData = { name:string; email:string; role:string; source:string; company:string; website:string; language:string; timezone:string; industry:string; size:string; goal:string; assistant:string; prompt:string; channels:Record<string,ChannelState> };
export const initialOnboarding: OnboardingData = { name:"", email:"", role:"", source:"", company:"", website:"", language:"English", timezone:"Africa/Accra", industry:"", size:"", goal:"", assistant:"", prompt:"", channels:{ Website:"connected", WhatsApp:"ready", Voice:"ready", SMS:"later", "API / SDK":"later", "Knowledge connectors":"ready" } };
export const steps = ["Welcome", "Business", "Goal", "Assistant", "Workspace", "Channels", "Finish"] as const;

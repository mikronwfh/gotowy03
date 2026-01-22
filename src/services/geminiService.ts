import { BusinessProfile } from "../types";

// Mock data templates
const mockStrategyResponses: Record<string, string> = {
  'SWOT Analysis': `## SWOT Analysis\n\n### Strengths\n- Innovative approach\n- Strong team\n- Clear market positioning\n\n### Weaknesses\n- Limited resources\n- Market awareness\n\n### Opportunities\n- Market expansion\n- Strategic partnerships\n- Technology adoption\n\n### Threats\n- Competition\n- Market changes`,
  
  'Business Model Canvas': `## Business Model Canvas\n\n**Key Partners:** Suppliers, partners\n**Key Activities:** Development, marketing, support\n**Value Propositions:** Innovation, customer focus\n**Customer Relationships:** Direct support, community\n**Revenue Streams:** Sales, subscriptions\n**Key Resources:** Team, technology\n**Cost Structure:** Personnel, operations\n**Customer Segments:** Diverse market`,
  
  'PESTEL Analysis': `## PESTEL Analysis\n\n**Political:** Favorable environment\n**Economic:** Growth opportunities\n**Social:** Digital adoption\n**Technological:** Innovation enabled\n**Environmental:** Sustainability focus\n**Legal:** Compliance managed`,
  
  'Buyer Persona': `## Buyer Persona\n\n**Name:** Professional Manager\n**Goals:** Efficiency, growth, cost reduction\n**Pain Points:** Manual processes, complexity\n**Budget:** Flexible\n**Timeline:** Immediate need`
};

export const generateStrategyTool = async (
  toolName: string, 
  profile: BusinessProfile
) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return mockStrategyResponses[toolName] || `Generated ${toolName} for ${profile.name}`;
};

export const chatWithCopilot = async (
  messages: { role: 'user' | 'model', text: string }[],
  profile: BusinessProfile
): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const lastMessage = messages[messages.length - 1].text.toLowerCase();
  
  // Mock responses based on input
  if (lastMessage.includes('strategy') || lastMessage.includes('plan')) {
    return `For ${profile.name}, I recommend: strong market positioning, customer acquisition focus, revenue optimization, and strategic team scaling.`;
  } else if (lastMessage.includes('market') || lastMessage.includes('customer')) {
    return `Your audience of ${profile.targetAudience} offers great opportunities. Consider tailored messaging and targeted campaigns.`;
  } else {
    return `Great question! For ${profile.name}, focus on understanding your market, building relationships, and data-driven decisions.`;
  }
};

export const generateMarketingContent = async (
  format: string,
  topic: string,
  profile: BusinessProfile
): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const templates: Record<string, string> = {
    'social': `🚀 Ready to transform your business?\n\nDiscover how ${profile.name} can help with ${topic}.\n\n✨ Learn more!\n\n#Innovation #Business #Growth`,
    'email': `Subject: Unlock Your Potential\n\nHi there,\n\nWe're excited to share how we help with ${topic}.\n\nJoin us today!\n\nBest regards,\n${profile.name}`,
    'ad': `Headline: ${topic}\nDescription: Discover ${profile.name}'s solution for ${profile.targetAudience}.\n\nCTA: Learn More`,
    'landing': `# Transform Your Business\n\n## ${topic}\n\nOur proven solution helps achieve exceptional results.\n\n### Key Benefits\n- Increased efficiency\n- Better insights\n- Faster growth\n\n[Get Started Now]`
  };
  
  return templates[format] || `Generated ${format} content about ${topic}`;
};

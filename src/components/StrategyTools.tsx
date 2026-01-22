
import React from 'react';
import { Loader2, Target, Users, LayoutTemplate, Briefcase } from 'lucide-react';
import { BusinessProfile } from '../types';
import { generateStrategyTool } from '../services/geminiService';

interface StrategyToolsProps {
  profile: BusinessProfile;
}

const StrategyTools: React.FC<StrategyToolsProps> = ({ profile }) => {
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [activeTool, setActiveTool] = React.useState<string | null>(null);

  const tools = [
    { id: 'swot', name: 'SWOT Analysis', desc: 'Strengths, Weaknesses, Opportunities, Threats', icon: Target },
    { id: 'bmc', name: 'Business Model Canvas', desc: 'Key partners, activities, and value props', icon: LayoutTemplate },
    { id: 'pestel', name: 'PESTEL Analysis', desc: 'Political, Economic, Social, Tech factors', icon: Briefcase },
    { id: 'persona', name: 'Buyer Persona', desc: 'Deep dive into your ideal customer segments', icon: Users },
  ];

  const handleGenerate = async (toolId: string, toolName: string) => {
    setLoading(true);
    setActiveTool(toolName);
    try {
      const output = await generateStrategyTool(toolName, profile);
      setResult(output);
    } catch (error) {
      console.error(error);
      setResult("Error generating strategy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold text-slate-900">Strategy Vault</h2>
        <p className="text-slate-500 mt-2 text-lg">Build robust business foundations in seconds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleGenerate(tool.id, tool.name)}
            disabled={loading}
            className={`p-6 rounded-2xl border text-left transition-all ${
              activeTool === tool.name 
                ? 'border-indigo-600 bg-indigo-50 shadow-sm' 
                : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md'
            }`}
          >
            <tool.icon className={`w-8 h-8 mb-4 ${activeTool === tool.name ? 'text-indigo-600' : 'text-slate-400'}`} />
            <h3 className="font-bold text-slate-900">{tool.name}</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">{tool.desc}</p>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-100 shadow-sm">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          <p className="mt-4 text-slate-500 font-medium">Generating analysis...</p>
        </div>
      ) : result ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-900">{activeTool} Result</h3>
          </div>
          <div className="p-10">
             <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
               {result.split('\n').map((line, i) => (
                 <p key={i} className={line.startsWith('#') ? 'text-xl font-bold text-indigo-900 mt-6 mb-2' : 'mt-2'}>
                   {line}
                 </p>
               ))}
             </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[400px] flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-3xl">
          <h3 className="text-lg font-bold text-slate-900">No analysis yet</h3>
          <p className="text-slate-500 mt-1">Select a framework to begin</p>
        </div>
      )}
    </div>
  );
};

export default StrategyTools;


import React from 'react';
import { Megaphone, MessageSquare, Mail, Layout, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { BusinessProfile } from '../types';
import { generateMarketingContent } from '../services/geminiService';

interface Props {
  profile: BusinessProfile;
}

const MarketingTools: React.FC<Props> = ({ profile }) => {
  const [topic, setTopic] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  const formats = [
    { id: 'social', name: 'Social Post', icon: MessageSquare, color: 'text-blue-500' },
    { id: 'email', name: 'Email Campaign', icon: Mail, color: 'text-indigo-500' },
    { id: 'ad', name: 'Search Ad', icon: Megaphone, color: 'text-rose-500' },
    { id: 'landing', name: 'Landing Page Copy', icon: Layout, color: 'text-emerald-500' },
  ];

  const handleGenerate = async (format: string) => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const output = await generateMarketingContent(format, topic, profile);
      setResult(output);
    } catch (error) {
      console.error(error);
      setResult("Error generating content. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold text-slate-900">Marketing Hub</h2>
        <p className="text-slate-500 mt-2">Generate high-converting copy tailored to your brand voice.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">What are you promoting today?</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Our new summer collection or 20% off SaaS launch"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formats.map((format) => (
            <button
              key={format.id}
              onClick={() => handleGenerate(format.name)}
              disabled={loading || !topic}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 transition-all group disabled:opacity-50"
            >
              <format.icon className={`w-8 h-8 ${format.color}`} />
              <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600">{format.name}</span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-100">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          <p className="mt-4 text-slate-500 font-medium">Drafting high-conversion copy...</p>
        </div>
      ) : result && (
        <div className="bg-slate-900 rounded-3xl p-8 text-slate-100 relative group">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-indigo-400">AI Generated Copy</h3>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
          </div>
          <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-300">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingTools;

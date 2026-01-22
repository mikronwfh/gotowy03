
import React from 'react';
import { Send, User, Bot, Loader2, Sparkles } from 'lucide-react';
import { BusinessProfile, ChatMessage } from '../types';
import { chatWithCopilot } from '../services/geminiService';

interface CopilotProps {
  profile: BusinessProfile;
}

const Copilot: React.FC<CopilotProps> = ({ profile }) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { role: 'model', content: `Hello! I'm your BizNexus Copilot. I've analyzed "${profile.name}" and I'm ready to help you scale. What's on your mind today?`, timestamp: Date.now() }
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatWithCopilot(
        messages.concat(userMsg).map(m => ({ role: m.role, text: m.content })),
        profile
      );
      setMessages(prev => [...prev, { role: 'model', content: response, timestamp: Date.now() }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "I'm having trouble connecting right now. Please check your API key.", timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in zoom-in-95 duration-500">
      <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold">Business Copilot</h3>
            <p className="text-xs text-indigo-100">AI Expert Advisor • Powered by Gemini Pro</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-slate-50 text-slate-800'} shadow-sm`}>
                <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                <span className="text-sm text-slate-400 font-medium">Copilot is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-slate-100">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about strategy, marketing, or next steps..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          AI can make mistakes. Consider checking important business decisions.
        </p>
      </div>
    </div>
  );
};

export default Copilot;

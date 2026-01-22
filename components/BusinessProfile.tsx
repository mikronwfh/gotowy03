
import React from 'react';
import { BusinessProfile as BusinessProfileType } from '../types';
import { Save, Building2, MapPin, Target, Globe } from 'lucide-react';

interface Props {
  profile: BusinessProfileType;
  setProfile: (profile: BusinessProfileType) => void;
}

const BusinessProfile: React.FC<Props> = ({ profile, setProfile }) => {
  const [localProfile, setLocalProfile] = React.useState(profile);
  const [isSaved, setIsSaved] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(localProfile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Business Profile</h2>
          <p className="text-slate-500 mt-2">Update your business context to improve AI recommendations.</p>
        </div>
        {isSaved && (
          <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Profile Saved
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-500" /> Business Name
            </label>
            <input
              type="text"
              value={localProfile.name}
              onChange={(e) => setLocalProfile({ ...localProfile, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g. Acme Tech Solutions"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-500" /> Industry
            </label>
            <input
              type="text"
              value={localProfile.industry}
              onChange={(e) => setLocalProfile({ ...localProfile, industry: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g. SaaS, Retail, Manufacturing"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-500" /> Growth Stage
            </label>
            <select
              value={localProfile.stage}
              onChange={(e) => setLocalProfile({ ...localProfile, stage: e.target.value as any })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            >
              <option>Idea</option>
              <option>Startup</option>
              <option>Scaling</option>
              <option>Established</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-500" /> Target Audience
            </label>
            <input
              type="text"
              value={localProfile.targetAudience}
              onChange={(e) => setLocalProfile({ ...localProfile, targetAudience: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g. Tech-savvy millennials"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Business Description</label>
          <textarea
            value={localProfile.description}
            onChange={(e) => setLocalProfile({ ...localProfile, description: e.target.value })}
            rows={4}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="Tell us what your business does, your mission, and your unique value proposition..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100"
        >
          <Save className="w-5 h-5" /> Save Business Context
        </button>
      </form>
    </div>
  );
};

export default BusinessProfile;

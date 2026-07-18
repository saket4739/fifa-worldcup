"use client";

export default function AnnouncementForm() {
  return (
    <div className="glass-card p-6 bg-gradient-to-br from-fifa-secondary/40 to-transparent">
      <h3 className="text-lg font-bold text-white mb-6">Broadcast New Message</h3>
      
      <form className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-fifa-muted mb-2">Announcement Title</label>
          <input type="text" className="input-field text-sm" placeholder="e.g., Gate Update" required />
        </div>
        
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-fifa-muted mb-2">Message Content</label>
          <textarea 
            className="input-field text-sm min-h-[100px] resize-y" 
            placeholder="Type your message here..." 
            required 
          ></textarea>
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-fifa-gold focus:ring-fifa-gold focus:ring-offset-fifa-navy" />
            <span className="text-sm text-fifa-gold font-medium">Mark as High Priority</span>
          </label>
          
          <button type="submit" className="btn-primary py-2 px-6 text-sm">
            Send Broadcast
          </button>
        </div>
      </form>
    </div>
  );
}
import { getSettings } from "@/app/actions/settings"
import { SettingForm } from "./setting-form"
import { Settings, ShieldAlert } from "lucide-react"
import { headers } from "next/headers"

export default async function SettingsPage() {
  await headers()
  const settings = await getSettings()

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-serif font-bold italic text-white flex items-center gap-4">
          Configuration
        </h1>
        <p className="text-white/50 mt-2 font-light text-sm">Manage global website variables and constants.</p>
      </div>

      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-md flex items-start gap-3 mt-8">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-amber-500 mb-1">Global Impact Warning</h4>
          <p className="text-xs text-amber-500/80 font-light">
            Changes made here alter the state of the live website immediately. Double-check all inputs before saving.
          </p>
        </div>
      </div>

      <div className="bg-stone-900 border border-white/5 rounded-xl divide-y divide-white/5">
        {settings.map((setting) => (
          <div key={setting.key} className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-4 h-4 text-white/30" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{setting.key.replace(/_/g, ' ')}</h3>
              </div>
              <p className="text-xs text-white/50 font-light pr-4">{setting.description}</p>
              <p className="text-[10px] text-white/20 font-mono mt-4">
                Last updated: {new Date(setting.updated_at).toLocaleDateString()}
              </p>
            </div>
            
            <div className="w-full md:w-2/3">
              <SettingForm 
                settingKey={setting.key} 
                initialValue={setting.value || ""} 
              />
            </div>
          </div>
        ))}
      </div>
      
      {settings.length === 0 && (
        <div className="text-center py-12 text-white/30 italic text-sm border border-white/5 rounded-xl bg-stone-900">
          No settings found in the database.
        </div>
      )}
    </div>
  )
}

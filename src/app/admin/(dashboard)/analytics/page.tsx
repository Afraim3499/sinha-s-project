import { getAnalytics } from "@/app/actions/analytics"
import { Eye, Monitor, Smartphone, Tablet } from "lucide-react"
import { headers } from "next/headers"

export default async function AnalyticsPage() {
  await headers()
  const analytics = await getAnalytics(30) // Last 30 days

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return <Monitor className="w-4 h-4" />
      case 'mobile': return <Smartphone className="w-4 h-4" />
      case 'tablet': return <Tablet className="w-4 h-4" />
      default: return <Monitor className="w-4 h-4" />
    }
  }

  const maxViews = Math.max(...analytics.topPages.map(p => p.view_count), 1)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold italic text-white flex items-center gap-4">
          Analytics
        </h1>
        <p className="text-white/50 mt-2 font-light text-sm">Traffic insights for the last 30 days.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Total Views Card */}
        <div className="p-6 bg-stone-900 border border-white/5 rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start mb-12">
            <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Total Page Views</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <Eye className="w-4 h-4 text-accent" />
            </div>
          </div>
          <div>
            <span className="text-5xl font-serif font-bold text-white block mb-2">{analytics.totalViews}</span>
            <span className="text-xs text-white/40">Unique page loads tracked via local analytics</span>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="md:col-span-2 p-6 bg-stone-900 border border-white/5 rounded-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-6">Device Breakdown</h2>
          <div className="grid grid-cols-3 gap-4 h-full pb-8">
            {analytics.deviceBreakdown.length > 0 ? (
              analytics.deviceBreakdown.map((device) => (
                <div key={device.name} className="flex flex-col justify-end gap-3 h-full pb-4">
                  <div className="w-full bg-white/5 h-32 rounded-lg relative overflow-hidden flex flex-col justify-end">
                    <div 
                      className="w-full bg-accent/40 rounded-b-lg transition-all duration-1000"
                      style={{ height: `${Math.max((device.value / analytics.totalViews) * 100, 5)}%` }}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    {getDeviceIcon(device.name)}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-2">{device.name}</span>
                    <span className="text-sm font-mono text-white/80">{Math.round((device.value / analytics.totalViews) * 100)}%</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 h-full flex items-center justify-center text-white/30 italic text-sm">No device data yet</div>
            )}
          </div>
        </div>

      </div>

      {/* Top Pages */}
      <div className="p-6 bg-stone-900 border border-white/5 rounded-xl">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-6">Top Pages</h2>
        
        <div className="space-y-4">
          {analytics.topPages.length > 0 ? (
            analytics.topPages.map((page, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 group">
                <div className="w-full sm:w-1/3 truncate">
                  <span className="text-sm font-mono text-white/80 group-hover:text-white transition-colors">
                    {page.path === '/' ? '/ (Homepage)' : page.path}
                  </span>
                </div>
                <div className="w-full sm:w-2/3 flex items-center gap-4">
                  <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all duration-1000"
                      style={{ width: `${(page.view_count / maxViews) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono w-12 text-right text-white/50">{page.view_count}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-white/30 italic text-sm">No page views recorded yet. Data will appear here once users navigate the site.</div>
          )}
        </div>
      </div>
    </div>
  )
}

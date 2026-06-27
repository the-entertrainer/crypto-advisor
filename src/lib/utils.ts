export function formatPrice(p: number): string {
  if (!p || isNaN(p)) return '$0';
  if (p >= 10000) return '$' + Math.round(p).toLocaleString('en-US');
  if (p >= 1000) return '$' + p.toLocaleString('en-US', { maximumFractionDigits: 1 });
  if (p >= 100) return '$' + p.toFixed(1);
  if (p >= 1) return '$' + p.toFixed(2);
  if (p >= 0.001) return '$' + p.toFixed(4);
  return '$' + p.toFixed(6);
}

export function formatChange(pct: number): string {
  const abs = Math.abs(pct).toFixed(1);
  return pct >= 0 ? `+${abs}%` : `−${abs}%`;
}

export function formatLargeNumber(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return '$' + n.toLocaleString();
}

export function timeGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning.';
  if (h < 17) return 'Good afternoon.';
  return 'Good evening.';
}

export function formatTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

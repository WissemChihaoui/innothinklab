interface RateLimitData {
  count: number;
  resetTime: number;
}

const rateLimits = new Map<string, RateLimitData>();

export class RateLimitTracker {
  private key: string;
  private maxRequests: number;
  private windowMs: number;

  constructor(key: string, maxRequests: number = 15, windowMs: number = 60000) {
    this.key = key;
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    const limit = rateLimits.get(this.key);

    if (!limit || now > limit.resetTime) {
      // Reset the limit
      rateLimits.set(this.key, {
        count: 0,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    return limit.count < this.maxRequests;
  }

  incrementCount(): void {
    const limit = rateLimits.get(this.key);
    if (limit) {
      limit.count++;
    }
  }

  getTimeUntilReset(): number {
    const limit = rateLimits.get(this.key);
    if (!limit) return 0;
    return Math.max(0, limit.resetTime - Date.now());
  }

  getRemainingRequests(): number {
    const limit = rateLimits.get(this.key);
    if (!limit || Date.now() > limit.resetTime) {
      return this.maxRequests;
    }
    return Math.max(0, this.maxRequests - limit.count);
  }
}
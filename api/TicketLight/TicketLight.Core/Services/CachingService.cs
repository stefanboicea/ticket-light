using System;
using System.Collections.Generic;

namespace TicketLight.Core.Services
{
    public interface ICachingService
    {
        void Cache(string key, object value);
        void Cache(string key, TimeSpan validity, object value);
        void Remove(string key);
        object Get(string key);
        T Get<T>(string key);

        void RemoveSearchKey();
    }

    public class CacheItem
    {
        public string Key { get; set; }
        public DateTime CreationTimestamp { get; set; }
        public DateTime? ExpirationTimestamp { get; set; }
        public object Value { get; set; }
    }

    public class CacheKeys
    {
        public const string TicketSearchCacheKey = "TicketSearchCacheKey";
    }

    public class CachingService : ICachingService
    {
        Dictionary<string, CacheItem> _items = new Dictionary<string, CacheItem>();
        object _lock = new object();

        public void RemoveSearchKey()
        {
            lock (_lock)
            {
                Remove(CacheKeys.TicketSearchCacheKey);
            }
        }

        public void Cache(string key, object value)
        {
            lock (_lock)
            {
                var item = new CacheItem
                {
                    CreationTimestamp = DateTime.UtcNow,
                    ExpirationTimestamp = null,
                    Value = value,
                    Key = key
                };
                _items[key] = item;
            }
        }

        public void Cache(string key, TimeSpan validityTimespan, object value)
        {
            lock (_lock)
            {
                var item = new CacheItem
                {
                    CreationTimestamp = DateTime.UtcNow,
                    ExpirationTimestamp = DateTime.UtcNow + validityTimespan,
                    Value = value,
                    Key = key
                };
                _items[key] = item;
            }
        }

        public void Remove(string key)
        {
            lock (_lock)
            {
                if (!_items.ContainsKey(key))
                    return;
                _items.Remove(key);
            }
        }

        public object Get(string key)
        {
            lock (_lock)
            {
                if (!_items.ContainsKey(key))
                    return null;

                var item = _items[key];

                if (item.ExpirationTimestamp != null && item.ExpirationTimestamp.Value < DateTime.UtcNow)
                {
                    _items.Remove(key);
                    return null;
                }

                return item.Value;
            }
        }

        public T Get<T>(string key)
        {
            var item = Get(key);
            return (item == null)
                ? default(T)
                : (T)item;
        }

        public string GetCacheKeyForUser(int userId)
        {
            return $"User[{userId}]";
        }
    }
}

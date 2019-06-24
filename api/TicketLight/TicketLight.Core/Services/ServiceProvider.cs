using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace TicketLight.Core.Services
{
    public class ServiceProvider
    {
        private static readonly Dictionary<string, ServiceProvider> _namedServiceProviders = new Dictionary<string, ServiceProvider>();
        private static object _namedServiceProvidersLock = new object();
        private ConcurrentDictionary<Type, object> _services = new ConcurrentDictionary<Type, object>();

        public readonly static ServiceProvider Instance = new ServiceProvider();

        public T GetService<T>() where T : class
        {
            if (_services.ContainsKey(typeof(T)))
                return _services[typeof(T)] as T;
            return null;
        }

        public T AddService<T>(T service)
        {
            _services.AddOrUpdate(typeof(T), service, (key, oldValue) => service);
            return service;
        }

        public void RemoveService<T>()
        {
            object service;
            _services.TryRemove(typeof(T), out service);
        }

        public static T Get<T>() where T : class
        {
            return ServiceProvider.Instance.GetService<T>();
        }

        public static T Single<T>() where T : class
        {
            var service = ServiceProvider.Instance.GetService<T>();
            if (service == null)
                throw new ServiceNotRegisteredException(typeof(T));

            return service;
        }

        public static T Add<T>(T service)
        {
            return ServiceProvider.Instance.AddService<T>(service);
        }

        public static void Remove<T>()
        {
            ServiceProvider.Instance.RemoveService<T>();
        }



        public static ServiceProvider GetProvider(string key)
        {
            lock (_namedServiceProvidersLock)
            {
                if (!_namedServiceProviders.ContainsKey(key))
                    _namedServiceProviders.Add(key, new ServiceProvider());
                return _namedServiceProviders[key];
            }
        }

        public static void CloseProvider(string key)
        {
            lock (_namedServiceProvidersLock)
            {
                if (_namedServiceProviders.ContainsKey(key))
                    _namedServiceProviders.Remove(key);
            }
        }
    }

    public class ServiceNotRegisteredException : Exception
    {
        public Type ServiceType { get; set; }

        public ServiceNotRegisteredException(Type type)
        {
            this.ServiceType = type;
        }
    }
}

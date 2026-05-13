// Polyfill for __publicField used by terra-draw
if (typeof (globalThis as any).__publicField === 'undefined') {
  (globalThis as any).__publicField = function(target: any, prop: string, descriptor: any) {
    if (descriptor) {
      Object.defineProperty(target, prop, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(target) : undefined
      });
    } else {
      Object.defineProperty(target, prop, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined
      });
    }
  };
}


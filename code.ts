function log(
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (this: any, ...args: any[]) {
    console.log(`INFO: Running function ${propertyKey} with input ${args}`);
    const res = originalMethod.call(this, ...args);
    console.log(`INFO: function ${propertyKey} ran with result ${res}`);
    return res;
  };
}

function withBonus(target: Object, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    get() {
      return this.value * 1.2;
    },
    set(value) {
      this.value = value;
    },
  });
}

class Company {
  @withBonus
  public total = 0;
  @log
  calculateSalary(salary: number) {
    return salary * 0.2;
  }
}

const c = new Company();
c.total = 400;
console.log("My total is:", c.total);

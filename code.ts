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

class Company {
  @log
  calculateSalary(salary: number) {
    return salary * 0.2;
  }
}

const c = new Company();
c.calculateSalary(100);
c.calculateSalary(75);

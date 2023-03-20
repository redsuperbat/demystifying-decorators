import "reflect-metadata";

function Injectable(): ClassDecorator {
  return function (target) {
    return target;
  };
}

export interface Type<T = unknown> extends Function {
  new (...args: any[]): T;
}

export interface DIContainer {
  get<T = unknown>(token: Type<T>): T;
}

export const createContainer = <T>(root: Type<T>): DIContainer => {
  const container = new Map<Type, any>();

  const instantiateDeps = (token: Type): unknown => {
    if (container.get(token)) {
      return container.get(token);
    }

    const dependencyMetadata: Type[] =
      Reflect.getMetadata("design:paramtypes", token.prototype.constructor) ??
      [];

    const instance = new token(
      ...dependencyMetadata.map((it) => instantiateDeps(it))
    );
    container.set(token, instance);
    return instance;
  };

  instantiateDeps(root);

  return {
    get(token) {
      return container.get(token);
    },
  };
};

@Injectable()
class FishingGear {}

@Injectable()
class FishingBoat {}

@Injectable()
class FisherManRoot {
  constructor(
    private readonly gear: FishingGear,
    private readonly boat: FishingBoat
  ) {}
}

function main() {
  const container = createContainer(FisherManRoot);
  // Logs true
  console.log(container.get(FishingBoat) === container.get(FishingBoat));
}
main();

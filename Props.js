class Props {
  constructor(position) {
    this.position = position;
  }
}

class HP extends Props {
  constructor(position, name) {
    super(position);
    this.name = name;
    this.emoji = "💉";
  }
}

class Gun extends Props {
  constructor(position, name) {
    super(position);
    this.name = name;
    this.atack = 40;
    this.emoji = "🔫";
  }
}

class Knife extends Props {
  constructor(position, name) {
    super(position);
    this.name = name;
    this.atack = 30;
    this.emoji = "🔪";
  }
}

class CheckPoint extends Props {
  constructor(position, name) {
    super(position);
    this.name = name;
    this.emoji = "🚩";
  }
}
export { HP, Gun, Knife, CheckPoint };

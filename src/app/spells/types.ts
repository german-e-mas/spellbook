export interface APIReference {
  index: string;
  name: string;
  url: string;
}

export interface APIReferenceList {
  count: number;
  results: APIReference[];
}

export interface Spell {
  index: string;
  name: string;
  desc: string[];
  higher_level: string[];
  range: string;
  components: string[];
  material: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  attack_type: string;
  damage: {
    damage_type: APIReference;
    damage_at_slot_level: { [key: string]: string };
  };
  area_of_effect: { type: string; size: number };
  school: APIReference;
  classes: APIReference[];
  subclasses: APIReference[];
  url: string;
}

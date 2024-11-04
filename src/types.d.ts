export interface ITrackerForm {
  nameCategory: string;
  description: string;
  calories: number;
  date: string;
}

export interface ITracker {
  id: string;
  nameCategory: string;
  description: string;
  calories: number;
  date: string;
}

export interface ITrackerAPI {
  [id: string]: ITracker;
  nameCategory: string;
  description: string;
  calories: number;
  date: string;
}

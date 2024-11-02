export interface ITrackerForm {
    nameCategory: string;
    description: string;
    calories: number;
}

export interface ITracker {
   id: string;
    nameCategory: string;
    description: string;
    calories: number;
}

export interface ITrackerAPI {
    [id: string]: ITracker;
    nameCategory: string;
    description: string;
    calories: number;
}